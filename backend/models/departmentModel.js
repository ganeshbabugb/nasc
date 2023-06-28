import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  staffs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Department = mongoose.model("Department", departmentSchema);
export default Department;
