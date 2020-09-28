package item

import (
	"fmt"
	"net/http"
	"sync"
	"time"

	"github.com/acha-bill/pos/models"
	categoryService "github.com/acha-bill/pos/packages/dblayer/category"
	itemService "github.com/acha-bill/pos/packages/dblayer/item"
	"github.com/acha-bill/pos/plugins"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	// PluginName defines the name of the plugin
	PluginName = "item"
)

var (
	plugin   *Item
	once     sync.Once
	validate *validator.Validate
)

// Auth structure
type Item struct {
	name     string
	handlers []*plugins.PluginHandler
}

// AddHandler Method definition from interface
func (plugin *Item) AddHandler(method string, path string, handler func(echo.Context) error, authLevel ...plugins.AuthLevel) {
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
func (plugin *Item) Handlers() []*plugins.PluginHandler {
	return plugin.handlers
}

// Name defines the name of the plugin
func (plugin *Item) Name() string {
	return plugin.name
}

// NewPlugin returns the new plugin
func NewPlugin() *Item {
	plugin := &Item{
		name: PluginName,
	}
	return plugin
}

// Plugin returns an instance of the plugin
func Plugin() *Item {
	once.Do(func() {
		plugin = NewPlugin()
		validate = validator.New()
	})
	return plugin
}

func init() {
	auth := Plugin()
	auth.AddHandler(http.MethodGet, "/", listItems)
	auth.AddHandler(http.MethodPost, "/", createItem)
	auth.AddHandler(http.MethodGet, "/:id", getItem)
	auth.AddHandler(http.MethodPut, "/:id", updateItem)
	auth.AddHandler(http.MethodDelete, "/:id", deleteItem)

}

func updateItem(c echo.Context) error {
	id := c.Param("id")
	item, err := itemService.FindById(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}
	if item == nil {
		return c.JSON(http.StatusNotFound, errorResponse{
			Error: "item not found",
		})
	}
	var req editRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}

	if err := validate.Struct(req); err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}

	if req.Category != "" {
		cat, err := categoryService.FindById(req.Category)
		if err != nil {
			return c.JSON(http.StatusBadRequest, errorResponse{
				Error: err.Error(),
			})
		}
		if cat == nil {
			return c.JSON(http.StatusBadRequest, errorResponse{
				Error: fmt.Sprintf("category %s not found", req.Category),
			})
		}
		item.Category = cat.ID
	}
	if req.Barcode != "" {
		item.Barcode = req.Barcode
	}
	if req.Name != "" {
		item.Name = req.Name
	}
	if req.CostPrice != 0 {
		item.CostPrice = req.CostPrice
	}
	if req.RetailPrice != 0 {
		item.RetailPrice = req.RetailPrice
	}
	if req.Quantity != 0 {
		item.Quantity = req.Quantity
	}
	item.UpdatedAt = time.Now()

	err = itemService.UpdateById(item.ID.Hex(), *item)
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}

	updated, err := itemService.FindById(item.ID.Hex())
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}
	return c.JSON(http.StatusCreated, updated)
}

func deleteItem(c echo.Context) error {
	id := c.Param("id")

	item, err := itemService.FindById(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}
	if item == nil {
		return c.JSON(http.StatusNotFound, errorResponse{
			Error: "item not found",
		})
	}
	item.IsRetired = true
	err = itemService.UpdateById(item.ID.Hex(), *item)
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}
	return c.NoContent(http.StatusNoContent)
}

func getItem(c echo.Context) error {
	id := c.Param("id")
	item, err := itemService.FindById(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}
	if item == nil {
		return c.JSON(http.StatusNotFound, errorResponse{
			Error: "item not found",
		})
	}
	return c.JSON(http.StatusOK, item)
}

func listItems(c echo.Context) error {
	items, err := itemService.FindAll()
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, items)
}

func createItem(c echo.Context) error {
	var req createRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}

	if err := validate.Struct(req); err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}

	var categoryID string
	if req.Category == "" {
		cat, err := categoryService.FindByName("General")
		if err != nil {
			return c.JSON(http.StatusBadRequest, errorResponse{
				Error: err.Error(),
			})
		}
		if cat == nil {
			return c.JSON(http.StatusBadRequest, errorResponse{
				Error: "General category has not been set",
			})
		}
		categoryID = cat.ID.Hex()
	} else {
		categoryID = req.Category
	}

	cat, err := categoryService.FindById(categoryID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}
	if cat == nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: fmt.Sprintf("Category %s not found", req.Category),
		})
	}

	_item, err := itemService.FindByNameAndCategory(req.Name, cat.ID.Hex())
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: fmt.Sprintf("Category %s not found", req.Category),
		})
	}
	if _item != nil {
		_item.Quantity += req.Quantity
		_item.UpdatedAt = time.Now()
		_ = itemService.UpdateById(_item.ID.Hex(), *_item)
		updated, _ := itemService.FindById(_item.ID.Hex())
		return c.JSON(http.StatusCreated, updated)
	}

	created, err := itemService.Create(models.Item{
		ID:          primitive.NewObjectID(),
		Name:        req.Name,
		Quantity:    req.Quantity,
		Barcode:     req.Barcode,
		Category:    cat.ID,
		CostPrice:   req.CostPrice,
		RetailPrice: req.RetailPrice,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
		IsRetired:   false,
	})
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}
	return c.JSON(http.StatusCreated, created)

}

type errorResponse struct {
	Error string `json:"error"`
}

type editRequest struct {
	Name        string  `json:"name"`
	Barcode     string  `json:"barcode"`
	Category    string  `json:"category"`
	CostPrice   float64 `json:"costPrice"`
	RetailPrice float64 `json:"retailPrice"`
	Quantity    uint32  `json:"qty"`
}

type createRequest struct {
	Name        string  `json:"name" validate:"required"`
	Barcode     string  `json:"barcode"`
	Category    string  `json:"category"`
	CostPrice   float64 `json:"costPrice" validate:"required"`
	RetailPrice float64 `json:"retailPrice" validate:"required"`
	Quantity    uint32  `json:"qty"`
}
