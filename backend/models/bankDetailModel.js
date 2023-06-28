import mongoose from "mongoose";

const bankDetailsSchema = mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  name: {
    type: String,
    required: [true, "Please provide the name."],
  },
  bankName: {
    type: String,
    required: [true, "Please provide the bank name."],
  },
  branchName: {
    type: String,
    required: [true, "Please provide the branch name."],
  },
  accountNumber: {
    type: Number,
    required: [true, "Please provide the account number."],
  },
  ifscCode: {
    type: String,
    required: [true, "Please provide the IFSC code."],
  },
});

export default mongoose.model("BankDetails", bankDetailsSchema);
