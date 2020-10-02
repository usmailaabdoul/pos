package report

import (
	"net/http"
	"strconv"
	"sync"
	"time"

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
	auth.AddHandler(http.MethodGet, "/sales", sales)
}

// times in nano seconds
func getTimeLabels(start int64, end int64, rangeType string) (res []time.Time) {
	if rangeType == "day" {
		sy, sm, sd := time.Unix(0, start).Date()
		startDate := time.Date(sy, sm, sd, 0, 0, 0, 0, time.Local)
		nextDay := startDate
		res = append(res, startDate)
		for {
			nextDay = nextDay.AddDate(0, 0, 1)
			if nextDay.UnixNano() <= end {
				res = append(res, nextDay)
			} else {
				break
			}
		}
		return
	}
	if rangeType == "week" {
		sy, sm, sd := time.Unix(0, start).Date()
		startDate := time.Date(sy, sm, sd, 0, 0, 0, 0, time.Local)
		nextWeek := startDate
		res = append(res, startDate)
		for {
			nextWeek = startDate.AddDate(0, 0, 7)
			if nextWeek.UnixNano() <= end {
				res = append(res, nextWeek)
			} else {
				break
			}
		}
		return
	}
	if rangeType == "month" {
		sy, sm, sd := time.Unix(0, start).Date()
		startDate := time.Date(sy, sm, sd, 0, 0, 0, 0, time.Local)
		nextMonth := startDate
		res = append(res, startDate)
		for {
			nextMonth = startDate.AddDate(0, 1, 0)
			if nextMonth.UnixNano() <= end {
				res = append(res, nextMonth)
			} else {
				break
			}
		}
		return
	}
	if rangeType == "year" {
		sy, sm, sd := time.Unix(0, start).Date()
		startDate := time.Date(sy, sm, sd, 0, 0, 0, 0, time.Local)
		nextYear := startDate
		res = append(res, startDate)
		for {
			nextYear = startDate.AddDate(1, 0, 0)
			if nextYear.UnixNano() <= end {
				res = append(res, nextYear)
			} else {
				break
			}
		}
		return
	}
	res = []time.Time{}
	return
}

func sales(c echo.Context) error {
	startStr := c.QueryParam("start")
	endStr := c.QueryParam("end")
	rangeType := c.QueryParam("rangeType")
	if startStr == "" || endStr == "" || rangeType == "" {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: "start, end and rangeType are required",
		})
	}
	itemID := c.QueryParam("itemId")
	categoryID := c.QueryParam("categoryID")
	start, err := strconv.ParseInt(startStr, 10, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}
	end, err := strconv.ParseInt(endStr, 10, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{
			Error: err.Error(),
		})
	}
	timeLabels := getTimeLabels(start*1000000, end*1000000, rangeType)
	data := make(map[time.Time]float64)

	sales, _ := saleService.FindAll()
	for _, t := range timeLabels {
		for _, sale := range sales {
			if rangeType == "day" {
				if sale.CreatedAt.Day() != t.Day() {
					continue
				}
			} else if rangeType == "week" {
				if sale.CreatedAt.Weekday() != t.Weekday() {
					continue
				}
			} else if rangeType == "month" {
				if sale.CreatedAt.Month() != t.Month() {
					continue
				}
			} else {
				if sale.CreatedAt.Year() != t.Year() {
					continue
				}
			}

			if categoryID != "" {
				for _, li := range sale.LineItems {
					if li.Item.Category.Hex() != categoryID {
						continue
					}
				}
			}
			if itemID != "" {
				for _, li := range sale.LineItems {
					if li.Item.ID.Hex() != itemID {
						continue
					}
				}
			}
			data[t] += sale.Total
		}
	}

	return c.JSON(http.StatusOK, data)
}

type errorResponse struct {
	Error string `json:"error"`
}
