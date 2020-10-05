package customer

import (
	"fmt"
	"net/http"
	"sync"
	"time"

	"github.com/acha-bill/pos/common"
	userService "github.com/acha-bill/pos/packages/dblayer/user"

	"github.com/acha-bill/pos/models"
	customerService "github.com/acha-bill/pos/packages/dblayer/customer"
	"github.com/acha-bill/pos/plugins"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	// PluginName defines the name of the plugin
	PluginName = "customer"
)

var (
	plugin   *Customer
	once     sync.Once
	validate *validator.Validate
)

// Auth structure
type Customer struct {
	name     string
	handlers []*plugins.PluginHandler
}

// AddHandler Method definition from interface
func (plugin *Customer) AddHandler(method string, path string, handler func(echo.Context) error, authLevel ...plugins.AuthLevel) {
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
func (plugin *Customer) Handlers() []*plugins.PluginHandler {
	return plugin.handlers
}

// Name defines the name of the plugin
func (plugin *Customer) Name() string {
	return plugin.name
}

// NewPlugin returns the new plugin
func NewPlugin() *Customer {
	plugin := &Customer{
		name: PluginName,
	}
	return plugin
}

// Plugin returns an instance of the plugin
func Plugin() *Customer {
	once.Do(func() {
		plugin = NewPlugin()
		validate = validator.New()
	})
	return plugin
}

func init() {
	auth := Plugin()
	auth.AddHandler(http.MethodGet, "/", list)
	auth.AddHandler(http.MethodPost, "/", create)
	auth.AddHandler(http.MethodPut, "/:id", update)
	auth.AddHandler(http.MethodGet, "/:id", get)
	auth.AddHandler(http.MethodPost, "/:id/pay", payDebt)
}

func payDebt(c echo.Context) error {
	id := c.Param("id")
	customer, err := customerService.FindById(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}
	if customer == nil {
		return c.JSON(http.StatusNotFound, errorResponse{
			Error: "category not found",
		})
	}

	var req debtPaymentRequest
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

	if req.Amount > customer.Debt {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: fmt.Sprintf("Amount of %f is greater than outstanding debt of %f", req.Amount, customer.Debt),
		})
	}

	userID := common.GetClaims(c).Id
	user, err := userService.FindById(userID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}

	debtPayments := customer.DebtPayments
	debtPayments = append(debtPayments, models.DebtPayment{
		Amount:    req.Amount,
		Cashier:   *user,
		CreatedAt: time.Now(),
	})
	customer.DebtPayments = debtPayments
	customer.Debt = customer.Debt - req.Amount

	err = customerService.UpdateById(customer.ID.Hex(), *customer)
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}

	updated, err := customerService.FindById(customer.ID.Hex())
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}
	return c.JSON(http.StatusCreated, updated)
}

func get(c echo.Context) error {
	id := c.Param("id")
	customer, err := customerService.FindById(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}
	if customer == nil {
		return c.JSON(http.StatusNotFound, errorResponse{
			Error: "category not found",
		})
	}
	return c.JSON(http.StatusOK, customer)

}

func update(c echo.Context) error {
	id := c.Param("id")
	customer, err := customerService.FindById(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}
	if customer == nil {
		return c.JSON(http.StatusNotFound, errorResponse{
			Error: "customer not found",
		})
	}
	var req updateRequest
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

	if req.PhoneNumber != "" {
		customer.PhoneNumber = req.PhoneNumber
	}
	if req.Name != "" {
		customer.Name = req.Name
	}
	customer.UpdatedAt = time.Now()
	err = customerService.UpdateById(id, *customer)
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}
	updated, err := customerService.FindById(customer.ID.Hex())
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}
	return c.JSON(http.StatusCreated, updated)
}

func list(c echo.Context) error {
	customers, err := customerService.FindAll()
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, customers)
}

func create(c echo.Context) error {
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

	created, err := customerService.Create(models.Customer{
		ID:           primitive.NewObjectID(),
		Name:         req.Name,
		PhoneNumber:  req.PhoneNumber,
		DebtPayments: []models.DebtPayment{},
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
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

type updateRequest struct {
	Name        string `json:"name"`
	PhoneNumber string `json:"phoneNumber"`
}
type createRequest struct {
	Name        string `json:"name" validate:"required"`
	PhoneNumber string `json:"phoneNumber" validate:"required"`
}
type debtPaymentRequest struct {
	Amount float64 `json:"amount" validate:"required"`
}
