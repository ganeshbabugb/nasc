import express from "express";
import { bankDetailsController } from "../controllers/bankDetailController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new bank detail
router.post("/bank-details", protect, bankDetailsController.create);

// Get all bank details
// router.get("/bank-details", bankDetailsController.getAll);

// Get a bank detail by ID
router.get("/bank-details/:bankDetailId", bankDetailsController.getById);

// Delete a bank detail by ID
router.delete("/bank-details/:bankDetailsId", bankDetailsController.deleteById);

// Update a bank detail by ID
router.put("/bank-details/:bankDetailId", bankDetailsController.updateById);

// Get bank details with pagination, search, and sort options
router.get("/bank-details", bankDetailsController.getBankDetails);

// Export bank details to Excel
router.get("/bank-details/export", bankDetailsController.exportToExcel);

export default router;
