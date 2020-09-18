package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// User represents a user
type User struct {
	ID        primitive.ObjectID   `bson:"_id"`
	Username  string               `bson:"username"`
	Password  string               `bson:"password"`
	Roles     []primitive.ObjectID `bson:"roles"`
	CreatedAt time.Time            `bson:"created_at"`
	UpdatedAt time.Time            `bson:"updated_at"`
}
