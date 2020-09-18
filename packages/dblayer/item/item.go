package item

import (
	"context"
	"errors"

	"github.com/acha-bill/pos/models"
	"github.com/acha-bill/pos/packages/mongodb"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	collectionName = "items"
)

var (
	ctx              = context.TODO()
	ErrNoRowsDeleted = errors.New("no rows were deleted")
)

func collection() *mongo.Collection {
	db, _ := mongodb.Database()
	return db.Collection(collectionName)
}

func FindAll() (rows []*models.Item, err error) {
	// passing bson.D{{}} matches all documents in the collection
	filter := bson.D{{}}
	rows, err = filterRows(filter)
	return
}

func Find(filter interface{}) (rows []*models.Item, err error) {
	rows, err = filterRows(filter)
	return
}

func Create(item models.Item) (created *models.Item, err error) {
	res, err := collection().InsertOne(ctx, item)
	if err != nil {
		return nil, err
	}
	item.ID = res.InsertedID.(primitive.ObjectID)
	created = &item
	return
}

func FindById(id string) (item *models.Item, err error) {
	filter := bson.D{primitive.E{Key: "_id", Value: id}}
	rows, err := filterRows(filter)
	if err != nil {
		return
	}
	if len(rows) == 0 {
		item = nil
	} else {
		item = rows[0]
	}
	return
}

func UpdateById(id string, item models.Item) error {
	filter := bson.D{primitive.E{Key: "_id", Value: id}}
	b, _ := bson.Marshal(&item)
	update := bson.D{primitive.E{Key: "$set", Value: b}}
	updated := &models.Item{}
	return collection().FindOneAndUpdate(ctx, filter, update).Decode(updated)
}

func DeleteById(id string) error {
	filter := bson.D{primitive.E{Key: "_id", Value: id}}

	res, err := collection().DeleteOne(ctx, filter)
	if err != nil {
		return err
	}

	if res.DeletedCount == 0 {
		return ErrNoRowsDeleted
	}

	return nil
}

func filterRows(filter interface{}) ([]*models.Item, error) {
	rows := []*models.Item{}

	cur, err := collection().Find(ctx, filter)
	if err != nil {
		return rows, err
	}

	for cur.Next(ctx) {
		var u models.Item
		err := cur.Decode(&u)
		if err != nil {
			return rows, err
		}

		rows = append(rows, &u)
	}

	if err := cur.Err(); err != nil {
		return rows, err
	}

	// once exhausted, close the cursor
	_ = cur.Close(ctx)

	return rows, nil
}
