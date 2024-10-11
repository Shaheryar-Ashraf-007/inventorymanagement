import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  try {
    const search = req.query.search?.toString() || '';
    const users = await prisma.users.findMany({
      where: {
        name: {
          contains: search,
        },
      },

    }); 
    res.json(users);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Error retrieving users" });
  } 
};
export const createUsers = async (req, res) => {
  try {
    const {userId,name, email, phoneNumber, quantity, totalAmount, paidAmount, remainingAmount,unitCost,timestamp} = req.body;
    const users = await prisma.users.create({
      data: {
        userId,
        name,
        email,
        phoneNumber,
        quantity,
        totalAmount,
        paidAmount,
        remainingAmount,
        unitCost,
        timestamp,
      },
    });
    res.status(201).json(users);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product" });
  }}

  export const deleteUsers = async (req, res) => {
    const { userId } = req.params;
    console.log("Attempting to delete salary with ID:", userId);
  
    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
  
    try {
      // First check if the salary exists
      const existingUser = await prisma.users.findUnique({
        where: {
          userId: userId // Make sure this matches your schema's field name
        }
      });
  
      if (!existingUser) {
        return res.status(404).json({
          message: `Salary with ID ${userId} not found`
        });
      }
  
      // Delete the salary
      const deletedUser = await prisma.users.delete({
        where: {
          userId: userId // Make sure this matches your schema's field name
        }
      });
  
      console.log("Successfully deleted salary:", userId);
      res.status(200).json({
        message: "Salary deleted successfully",
        data: deletedUser
      });
  
    } catch (error) {
      console.error("Error deleting salary:", error);
      
      // Handle Prisma-specific errors
      if (error.code === 'P2025') {
        return res.status(404).json({
          message: "Record to delete does not exist",
          error: error.message
        });
      }
  
      res.status(500).json({
        message: "Failed to delete salary",
        error: error.message
      });
    }
  };


  

