package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Category defines a category.
type Category struct {
	ID        primitive.ObjectID `bson:"_id" json:"_id"`
	Name      string             `bson:"name" json:"name"`
	CreatedAt time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updated_at"`
	IsRetired bool               `bson:"isRetired" json:"isRetired"`
}
