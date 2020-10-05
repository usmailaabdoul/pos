package backup

import (
	"net/http"
	"os"
	"os/exec"
	"sync"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"

	"github.com/acha-bill/pos/models"
	backupService "github.com/acha-bill/pos/packages/dblayer/backup"
	"github.com/acha-bill/pos/plugins"
	"github.com/labstack/echo/v4"
)

const (
	// PluginName defines the name of the plugin
	PluginName = "backup"
)

var (
	plugin *Backup
	once   sync.Once
)

// Auth structure
type Backup struct {
	name     string
	handlers []*plugins.PluginHandler
}

// AddHandler Method definition from interface
func (plugin *Backup) AddHandler(method string, path string, handler func(echo.Context) error, authLevel ...plugins.AuthLevel) {
	pluginHandler := &plugins.PluginHandler{
		Path:      path,
		Handler:   handler,
		Method:    method,
		AuthLevel: plugins.AuthLevelAdmin,
	}
	if len(authLevel) > 0 {
		pluginHandler.AuthLevel = authLevel[0]
	}
	plugin.handlers = append(plugin.handlers, pluginHandler)
}

// Handlers Method definition from interface
func (plugin *Backup) Handlers() []*plugins.PluginHandler {
	return plugin.handlers
}

// Name defines the name of the plugin
func (plugin *Backup) Name() string {
	return plugin.name
}

// NewPlugin returns the new plugin
func NewPlugin() *Backup {
	plugin := &Backup{
		name: PluginName,
	}
	return plugin
}

// Plugin returns an instance of the plugin
func Plugin() *Backup {
	once.Do(func() {
		plugin = NewPlugin()
	})
	return plugin
}

func init() {
	auth := Plugin()
	auth.AddHandler(http.MethodGet, "/latest", getLatestBackup)
	auth.AddHandler(http.MethodPost, "/", backupNow)
}

func backupNow(c echo.Context) error {
	dir, err := os.Getwd()
	if err != nil {
		return c.JSON(http.StatusBadRequest, errResponse{
			Error: err.Error(),
		})
	}
	backupDir := dir + "/backups"
	if _, err := os.Stat(backupDir); os.IsNotExist(err) {
		err = os.Mkdir(backupDir, 0777)
		if err != nil {
			return c.JSON(http.StatusBadRequest, errResponse{
				Error: err.Error(),
			})
		}
	}

	_, err = exec.Command("mongodump", "--out", backupDir).Output()
	if err != nil {
		return c.JSON(http.StatusBadRequest, errResponse{
			Error: err.Error(),
		})
	}
	created, _ := backupService.Create(models.Backup{
		ID:        primitive.NewObjectID(),
		Path:      backupDir,
		CreatedAt: time.Now(),
		Status:    true,
	})

	return c.JSON(http.StatusOK, created)
}

func getLatestBackup(c echo.Context) error {
	backups, err := backupService.FindAll()
	if err != nil {
		return c.JSON(http.StatusBadRequest, errResponse{
			Error: err.Error(),
		})
	}
	var backup *models.Backup
	if len(backups) > 0 {
		backup = backups[len(backups)-1]
	}
	return c.JSON(http.StatusOK, backup)
}

// Response is the response
type errResponse struct {
	Error string `json:"error,omitempty"`
}
