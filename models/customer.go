package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Customer defines a customer.
type Customer struct {
	ID          primitive.ObjectID `bson:"_id" json:"_id"`
	Name        string             `bson:"name" json:"name"`
	PhoneNumber string             `bson:"phoneNumber" json:"phoneNumber"`
	CreatedAt   time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt   time.Time          `bson:"updated_at" json:"updated_at"`
}
