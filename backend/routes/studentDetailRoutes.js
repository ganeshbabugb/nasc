import express from "express";
import { studentDetailController } from "../controllers/studentDetailsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new student detail
router.post("/studentDetail", protect, studentDetailController.create);

// Get student detail by ID
router.get("/studentDetail/:id", studentDetailController.getById);

// Update student detail by ID
router.put("/studentDetail/:id", studentDetailController.updateById);

// Delete student detail by ID
router.delete("/studentDetail/:id", studentDetailController.deleteById);

// Get student details with pagination, search, and sorting
router.get("/studentDetails", studentDetailController.getStudentDetails);

// Export student details to Excel
router.get("/exportToExcel", studentDetailController.exportToExcel);

export default router;
