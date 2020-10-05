package common

import (
	"crypto/md5"
	"encoding/hex"
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

// GetClaims returns the claims of the signed in user.
func GetClaims(ctx echo.Context) *JWTCustomClaims {
	user := ctx.Get("user").(*jwt.Token)
	return user.Claims.(*JWTCustomClaims)
}

// IsDevelopment returns true if the server is running in dev mode.
func IsDevelopment() bool {
	development := os.Getenv("ENV")
	return strings.HasPrefix(development, "d")
}

func GetMD5Hash(text string) string {
	hash := md5.Sum([]byte(text))
	return hex.EncodeToString(hash[:])
}
