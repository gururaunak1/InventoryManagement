import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// The purpose of these handlers is to retrieve and create products in the database.
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // The search query parameter is extracted from the request's query string (req.query.search).
    // The ?.toString() ensures that the value is treated as a string if it exists.
    const search = req.query.search?.toString();
    // This function retrieves a list of products from the database based on a search query.
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId, name, price, rating, stockQuantity } = req.body;
    const product = await prisma.products.create({
      // The data object contains the product details that will be saved in the database.
      data: {
        productId,
        name,
        price,
        rating,
        stockQuantity,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};