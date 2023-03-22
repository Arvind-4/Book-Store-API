import { type Request, type Response } from 'express'
import { DynamoDbInstance } from '@src/loaders/database'
import { yupProductSchema, ProductSchema } from '@src/api/models/product'

export const createProduct = async (req: Request, res: Response) => {
  try {
    const db = await DynamoDbInstance.getInstance()
    const productCollection = db.collection('products')
    const error = await yupProductSchema.validate(req.body).catch((err) => err)
    if (error.errors) {
      console.log('error.errors', error.errors)
      return res.status(409).json({
        status: false,
        message: [...error.errors],
        data: null,
      })
    }
    const id = yupProductSchema.getDefault().id
    const product = {
      ...req.body,
      id,
    }
    console.log('product', product)
    const productData = await productCollection.set(id, product)
    if (productData) {
      return res.status(200).json({
        status: true,
        message: 'Product Created Successfully',
        data: product,
      })
    } else {
      return res.status(409).json({
        status: false,
        message: 'Product Creation Failed',
        data: null,
      })
    }
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const db = await DynamoDbInstance.getInstance()
    const productCollection = db.collection('products')
    const { name, description, price, category, image } = req.body
    const productId = req.params.id
    const { props: ProductSchema } = await productCollection.get(productId)
    if (!ProductSchema) {
      return res.status(409).json({
        status: false,
        message: 'Product Not Found',
        data: null,
      })
    }
    const product = {
      name: name || ProductSchema.name,
      description: description || ProductSchema.description,
      price: price || ProductSchema.price,
      category: category || ProductSchema.category,
      image: image || ProductSchema.image,
    }
    const error = await yupProductSchema.validate(product).catch((err) => err)
    if (error.errors) {
      return res.status(409).json({
        status: false,
        message: [...error.errors],
        data: null,
      })
    }
    const productData = await productCollection.set(productId, product)
    if (productData) {
      return res.status(200).json({
        status: true,
        message: 'Product Updated Successfully',
        data: product,
      })
    } else {
      return res.status(409).json({
        status: false,
        message: 'Product Update Failed',
        data: null,
      })
    }
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
      data: null,
    })
  }
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const db = await DynamoDbInstance.getInstance()
    const productCollection = db.collection('products')
    const { results } = await productCollection.list()
    const products = await Promise.all(
      results.map(async ({ key }) => (await productCollection.get(key)).props)
    )
    res.status(200).json({
      status: true,
      message: 'Fetched Products Successfully',
      data: products,
    })
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const db = await DynamoDbInstance.getInstance()
    const productCollection = db.collection('products')
    const productId = req.params.id
    const productData = await productCollection.delete(productId)
    if (productData) {
      return res.status(200).json({
        status: true,
        message: 'Product Deleted Successfully',
        data: productId,
      })
    } else {
      return res.status(409).json({
        status: false,
        message: 'Product Deletion Failed',
        data: null,
      })
    }
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    })
  }
}

export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const db = await DynamoDbInstance.getInstance()
    const productCollection = db.collection('products')
    const productId = req.params.id
    const { props: ProductSchema } = await productCollection.get(productId)
    if (ProductSchema) {
      return res.status(200).json({
        status: true,
        message: 'Fetched Product Successfully',
        data: ProductSchema,
      })
    } else {
      return res.status(409).json({
        status: false,
        message: 'Product Not Found',
        data: null,
      })
    }
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
      data: null,
    })
  }
}
