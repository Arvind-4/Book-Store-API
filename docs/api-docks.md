This document outlines the REST API for a Product Store. The Product Store API allows users to access, create, update, and delete products from the store. This API uses the HTTP protocol and adheres to REST principles.

API Endpoints:

The Product Store API has the following endpoints:

1.  GET /api/products/all - This endpoint returns a list of all products in the store.
    
2.  GET /api/products/single/{id} - This endpoint returns a single product by ID.
    
3.  POST /api/products/create - This endpoint creates a new product in the store.
    
4.  PUT /api/products/update/{id} - This endpoint updates an existing product by ID.
    
5.  DELETE /api/products/delete/{id} - This endpoint deletes a product by ID.
    

Request and Response Formats:

The Product Store API uses JSON as the request and response format. All requests should include the "Content-Type" header with the value "application/json". All responses will include the "Content-Type" header with the value "application/json".

## Get all Products

```bash
curl https://productstore.cyclic.app/api/products/all
```


## Get a Single Products

```bash
curl https://productstore.cyclic.app/api/products/single/082b7e47-1a23-4c2e-be23-7db1dbb192a9
```


## Create a Product

```bash
curl -H "Content-Type: application/json" -d '{"name": "op","price": 8,"description": "Dog","category": {"name": "pets"	}}' https://productstore.cyclic.app/api/products/create
```



## Update/Edit a Product

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"name": "op","price": 8,"description": "Dog","category": {"name": "pets"	}}' https://productstore.cyclic.app/api/products/update/ed1c6ce2-6473-4a97-acbe-095ecc7f2957
```


## Delete a Product

```bash
curl -X DELETE https://productstore.cyclic.app/api/products/delete/ed1c6ce2-6473-4a97-acbe-095ecc7f2957
```
