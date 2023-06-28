import mongoose from "mongoose";

const studentDetailSchema = mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  userName: {
    type: String,
    required: [true, "Please provide your name."],
  },
  gender: {
    type: String,
    required: [true, "Please specify your gender."],
  },
  email: {
    type: String,
    required: [true, "Please provide your email address."],
  },
  mobileNumber: {
    type: String,
    required: [true, "Please provide your mobile number."],
  },
  dob: {
    type: Date,
    required: [true, "Please provide your date of birth."],
  },
  fatherName: {
    type: String,
    required: [true, "Please provide your father's full name."],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Please provide your father's Occupation."],
  },
  motherName: {
    type: String,
    required: [true, "Please provide your mother's full name."],
  },
  motherOccupation: {
    type: String,
    required: [true, "Please provide your mother's Occupation."],
  },
  motherTongue: {
    type: String,
    required: [true, "Please provide your mother tongue."],
  },
  languagesKnown: {
    type: [String],
    required: [true, "Please provide at least one language you know."],
  },
  emisNumber: {
    type: String,
    required: [true, "Please provide your Emis card number."],
  },
  aadharNumber: {
    type: String,
    required: [true, "Please provide your Aadhar card number."],
  },
  panNumber: {
    type: String,
    required: [true, "Please provide your PAN card number."],
  },
  religion: {
    type: String,
    required: [true, "Please specify your religion."],
  },
  community: {
    type: String,
    required: [true, "Please specify your community."],
  },
  communityCertificationNumber: {
    type: String,
    required: [true, "Please provide your community certification number."],
  },
  bloodGroup: {
    type: String,
    required: [true, "Please specify your blood group."],
  },
  isPhysicalChallenged: {
    type: Boolean,
    required: [true, "Please specify if you have any physical challenges."],
  },
  nationality: {
    type: String,
    required: [true, "Please provide your nationality."],
  },
  state: {
    type: String,
    required: [true, "Please provide your state."],
  },
  district: {
    type: String,
    required: [true, "Please provide your district."],
  },
  place: {
    type: String,
    required: [true, "Please provide your place."],
  },
  permanentAddress: {
    type: String,
    required: [true, "Please provide your permanent address."],
  },
  communicationAddress: {
    type: String,
    required: [true, "Please provide your communication address."],
  },
});

export default mongoose.model(
  "StudentDetail",
  studentDetailSchema,
  "studentDetails"
);
