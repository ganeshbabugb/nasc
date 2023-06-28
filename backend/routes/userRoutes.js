import express from "express";
import { createStaff } from "../controllers/adminController.js";
import { createStudents } from "../controllers/staffController.js";
import { createAdminWithDepartment } from "../controllers/superAdminController.js";

const router = express.Router();

// Create a new student detail
router.post("/create-admin-with-department", createAdminWithDepartment);
router.post("/create-staff", createStaff);
router.post("/create-student", createStudents);

export default router;
