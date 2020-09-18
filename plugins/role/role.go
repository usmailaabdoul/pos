package role

import (
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/acha-bill/pos/models"
	roleService "github.com/acha-bill/pos/packages/dblayer/role"
	"github.com/acha-bill/pos/plugins"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	// PluginName defines the name of the plugin
	PluginName = "role"
)

var (
	plugin *Role
	once   sync.Once
)
var defaultRoles = []models.Role{
	{
		Name:        "Administrator",
		Description: "Admin",
	},
	{
		Name:        "Items",
		Description: "Item",
	},
	{
		Name:        "Sales",
		Description: "Sales",
	},
	{
		Name:        "Customers",
		Description: "Customers",
	},
	{
		Name:        "Reports",
		Description: "Reports",
	},
	{
		Name:        "Employees",
		Description: "Employees",
	},
	{
		Name:        "Settings",
		Description: "Settings",
	},
}

// Auth structure
type Role struct {
	name     string
	handlers []*plugins.PluginHandler
}

// AddHandler Method definition from interface
func (plugin *Role) AddHandler(method string, path string, handler func(echo.Context) error, authLevel ...plugins.AuthLevel) {
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
func (plugin *Role) Handlers() []*plugins.PluginHandler {
	return plugin.handlers
}

// Name defines the name of the plugin
func (plugin *Role) Name() string {
	return plugin.name
}

// NewPlugin returns the new plugin
func NewPlugin() *Role {
	plugin := &Role{
		name: PluginName,
	}
	return plugin
}

// Plugin returns an instance of the plugin
func Plugin() *Role {
	once.Do(func() {
		plugin = NewPlugin()
	})
	return plugin
}

// Seed creates default system roles
func Seed() (res []*models.Role, err error) {
	if roles, err := roleService.FindAll(); err == nil && len(roles) == 0 {
		for _, role := range defaultRoles {
			r := models.Role{
				ID:          primitive.NewObjectID(),
				Name:        role.Name,
				Description: role.Description,
				CreatedAt:   time.Now(),
				UpdatedAt:   time.Now(),
			}
			_r, err := roleService.Create(r)
			if err != nil {
				log.Panicf("error creating roles: %s", err.Error())
			}
			res = append(res, _r)
		}
	}
	return
}

func init() {
	auth := Plugin()
	auth.AddHandler(http.MethodGet, "/", getAllRoles)
}

func getAllRoles(c echo.Context) error {
	roles, err := roleService.FindAll()
	if err != nil {
		return c.JSON(http.StatusBadRequest, Response{
			Error: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, Response{
		Roles: roles,
	})
}

// Response is the response
type Response struct {
	Error string         `json:"error,omitempty"`
	Roles []*models.Role `json:"roles"`
}
