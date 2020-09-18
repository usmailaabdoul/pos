package main

import (
	"github.com/acha-bill/pos/packages/mongodb"
	"github.com/acha-bill/pos/packages/server"
	"github.com/acha-bill/pos/plugins/auth"
	"github.com/acha-bill/pos/plugins/role"
	"github.com/joho/godotenv"
	"github.com/labstack/gommon/log"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err.Error())
		return
	}
}

// @title pos API
// @version 1.0
// @description API for pos
// @termsOfService http://swagger.io/terms/

// @contact.name Acha Bill
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8080
// @BasePath /api/v1
// @query.collection.format multi

// @securityDefinitions.basic BasicAuth

// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization
func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err.Error())
		return
	}

	_, err = mongodb.Connect()
	if err != nil {
		log.Fatal(err)
	}

	_, err = role.Seed()
	if err != nil {
		log.Errorf("error seeding default user: %w", err)
	}

	_, err = auth.Seed()
	if err != nil {
		log.Errorf("error seeding default user: %w", err)
	}

	e := server.Instance()
	e.Static("/", "./public")
	e.Logger.Fatal(e.Start(":8081"))
}
