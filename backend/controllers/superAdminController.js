import { userRoles } from "../config/variables.js";
import Department from "../models/departmentModel.js";
import User from "../models/userModel.js";

// const createAdminWithDepartment = async (req, res) => {
//   try {
//     const userData = req.body;
//     const departmentName = userData[0].departmentName; // Take departmentName from the first user data
//
//     // Handling error if department exists
//     const deptExists = await Department.findOne({ name: departmentName });
//     if (deptExists) {
//       throw new Error(`Department ${departmentName} already exists`);
//     }
//
//     // Create the department
//     const department = new Department({
//       name: departmentName,
//       admins: [],
//     });
//     await department.save();
//
//     const users = [];
//
//     for (const data of userData) {
//       const { name, id, password } = data;
//
//       // Handling error if user exists
//       const userExists = await User.findOne({ id });
//
//       if (userExists) {
//         throw new Error(`User with ID ${id} already exists`);
//       }
//
//       // Create the admin user
//       const admin = new User({
//         name,
//         id,
//         password,
//         role: userRoles.admin,
//         department: department._id, // Associate the admin with the department
//       });
//       await admin.save();
//
//       department.admins.push(admin); // Add the admin to the department's admins array
//
//       users.push(admin);
//     }
//
//     await department.save(); // Save the department with the updated admins array
//
//     res.status(201).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const createAdminWithDepartment = async (req, res) => {
  try {
    const userData = req.body;
    const users = [];

    for (const data of userData) {
      const { name, id, password, departmentName } = data;

      // Handling error if user exists
      const userExists = await User.findOne({ id });

      if (userExists) {
        throw new Error(`User with ID ${id} already exists`);
      }

      // Handling error if department exists
      const deptExists = await Department.findOne({ name: departmentName });

      if (deptExists) {
        throw new Error(`Department ${departmentName} already exists`);
      }

      // Create the department
      const department = new Department({
        name: departmentName,
        admins: [],
      });
      await department.save();

      // Create the admin user
      const admin = new User({
        name,
        id,
        password,
        role: userRoles.admin,
        department: department._id, // Associate the admin with the department
      });
      await admin.save();

      department.admins.push(admin); // Add the admin to the department's admins array

      users.push(admin);
    }

    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createAdminWithDepartment };
