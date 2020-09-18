package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Item defines an item
type Item struct {
	ID          primitive.ObjectID `bson:"_id" json:"_id"`
	Name        string             `bson:"name" json:"name"`
	Barcode     string             `bson:"barcode" json:"barcode"`
	Category    primitive.ObjectID `bson:"category" json:"category"`
	CostPrice   float64            `bson:"costPrice" json:"costPrice"`
	RetailPrice float64            `bson:"retailPrice" json:"retailPrice"`
	CreatedAt   time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt   time.Time          `bson:"updated_at" json:"updated_at"`
	IsRetired   bool               `bson:"isRetired" json:"isRetired"`
}
