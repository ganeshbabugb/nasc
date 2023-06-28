import { userRoles } from "../config/variables.js";
import Department from "../models/departmentModel.js";
import User from "../models/userModel.js";

// Controller to create the staff user and assign a staff member to a department
const createStaff = async (req, res) => {
  try {
    const userData = req.body;

    const users = [];

    for (const data of userData) {
      const { name, id, password, department } = data;

      // Handling error if user exists
      const userExists = await User.findOne({ id });

      if (userExists) {
        throw new Error(`User with ID ${id} already exists`);
      }

      // Create the student user
      const staff = new User({
        name,
        id,
        password,
        role: userRoles.staff,
        department,
      });

      await staff.save();

      // Assign the student to the department
      const dept = await Department.findById(department);

      dept.staffs.push(staff);
      await dept.save();

      users.push(staff);
    }

    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createStaff };
