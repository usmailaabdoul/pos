package report

import (
	"net/http"
	"sync"

	saleService "github.com/acha-bill/pos/packages/dblayer/sale"

	"github.com/acha-bill/pos/plugins"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

const (
	// PluginName defines the name of the plugin
	PluginName = "report"
)

var (
	plugin   *Report
	once     sync.Once
	validate *validator.Validate
)

// Auth structure
type Report struct {
	name     string
	handlers []*plugins.PluginHandler
}

// AddHandler Method definition from interface
func (plugin *Report) AddHandler(method string, path string, handler func(echo.Context) error, authLevel ...plugins.AuthLevel) {
	pluginHandler := &plugins.PluginHandler{
		Path:      path,
		Handler:   handler,
		Method:    method,
		AuthLevel: plugins.AuthLevelUser,
	}
	if len(authLevel) > 0 {
		pluginHandler.AuthLevel = authLevel[0]
	}
	plugin.handlers = append(plugin.handlers, pluginHandler)
}

// Handlers Method definition from interface
func (plugin *Report) Handlers() []*plugins.PluginHandler {
	return plugin.handlers
}

// Name defines the name of the plugin
func (plugin *Report) Name() string {
	return plugin.name
}

// NewPlugin returns the new plugin
func NewPlugin() *Report {
	plugin := &Report{
		name: PluginName,
	}
	return plugin
}

// Plugin returns an instance of the plugin
func Plugin() *Report {
	once.Do(func() {
		plugin = NewPlugin()
		validate = validator.New()
	})
	return plugin
}

func init() {
	auth := Plugin()
	auth.AddHandler(http.MethodGet, "/sales", list)
}

func list(c echo.Context) error {
	sales, _ = saleService.FindAll()

	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, customers)
}

type errorResponse struct {
	Error string `json:"error"`
}
