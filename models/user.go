package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// User represents a user
type User struct {
	ID          primitive.ObjectID   `bson:"_id" json:"_id"`
	Username    string               `bson:"username" json:"username"`
	Password    string               `bson:"password" json:"-"`
	Name        string               `bson:"name" json:"name"`
	Roles       []primitive.ObjectID `bson:"roles" json:"roles"`
	PhoneNumber string               `bson:"phoneNumber" json:"phoneNumber"`
	CreatedAt   time.Time            `bson:"created_at" json:"created_at"`
	UpdatedAt   time.Time            `bson:"updated_at" json:"updated_at"`
	IsRetired   bool                 `bson:"isRetired" json:"isRetired"`
}
