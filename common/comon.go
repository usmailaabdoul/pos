package common

import (
	"os"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
)

type JWTCustomClaims struct {
	Username string   `json:"username"`
	Roles    []string `json:"roles"`
	Id       string   `json:"_id"`
	jwt.StandardClaims
}

// HasRole checks if the user has the role specified.
func HasRole(name string, c echo.Context) bool {
	user := c.Get("user").(*jwt.Token)
	roles := user.Claims.(JWTCustomClaims).Roles
	for _, r := range roles {
		if r == name {
			return true
		}
	}
	return false
}

// GetUsername returns the username of the user holding this context
func GetUsername(ctx echo.Context) string {
	user := ctx.Get("user").(*jwt.Token)
	claims := user.Claims.(JWTCustomClaims)
	return claims.Username
}

// IsDevelopment returns true if the server is running in dev mode.
func IsDevelopment() bool {
	return strings.HasPrefix(os.Getenv("ENV"), "d")
}
