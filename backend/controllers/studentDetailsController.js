import StudentDetail from "../models/studentDetailModel.js";
import ExcelJS from "exceljs";

export const studentDetailController = {
  // create new personal information
  // Not verified
  async create(req, res, next) {
    try {
      // extract personal information fields from request body
      const {
        userName,
        gender,
        email,
        mobileNumber,
        dob,
        fatherName,
        fatherOccupation,
        motherName,
        motherOccupation,
        motherTongue,
        languagesKnown,
        emisNumber,
        aadharNumber,
        panNumber,
        religion,
        community,
        communityCertificationNumber,
        bloodGroup,
        nationality,
        state,
        district,
        place,
        isPhysicalChallenged,
        permanentAddress,
        communicationAddress,
      } = req.body;

      // create new personal information document
      const studentDetail = new StudentDetail({
        user: req.user._id,
        userName,
        gender,
        email,
        mobileNumber,
        dob,
        fatherName,
        fatherOccupation,
        motherName,
        motherOccupation,
        motherTongue,
        languagesKnown,
        emisNumber,
        aadharNumber,
        panNumber,
        religion,
        community,
        communityCertificationNumber,
        bloodGroup,
        nationality,
        state,
        district,
        place,
        isPhysicalChallenged,
        permanentAddress,
        communicationAddress,
      });

      // save personal information to database
      await studentDetail.save();

      // populate personal information document with user data
      // await studentDetail.populate("user");

      // create DTO for personal information
      // const studentDetailDTO = new StudentDetailDTO(studentDetail);

      // send response with created personal information DTO
      res.status(201).json({ studentDetail });
    } catch (error) {
      // pass error to next middleware
      next(error);
    }
  },

  // Not verified
  async getById(req, res, next) {
    try {
      // Find personal information document for user
      const studentDetail = await StudentDetail.findOne(req.user._id);

      if (!studentDetail) {
        // Send error response if personal information not found
        return res
          .status(404)
          .json({ message: "Personal information not found" });
      }

      // Send response with personal information DTO
      res.status(200).json({ studentDetail });
    } catch (error) {
      // Pass error to next middleware
      next(error);
    }
  },

  //Verified : Working properly.
  async deleteById(req, res, next) {
    try {
      const { studentId } = req.params;
      await StudentDetail.findByIdAndDelete(studentId);
      res.status(200).json({ message: "Student detail deleted successfully" });
    } catch (error) {
      next(error);
    }
  },

  //Verified : Working properly.
  async updateById(req, res, next) {
    try {
      const { studentId } = req.params;
      const {
        userName,
        gender,
        email,
        mobileNumber,
        dob,
        fatherName,
        fatherOccupation,
        motherName,
        motherOccupation,
        motherTongue,
        languagesKnown,
        emisNumber,
        aadharNumber,
        panNumber,
        religion,
        community,
        communityCertificationNumber,
        bloodGroup,
        isPhysicalChallenged,
        nationality,
        state,
        district,
        place,
        permanentAddress,
        communicationAddress,
      } = req.body;

      const updatedPersonalInfo = await StudentDetail.findByIdAndUpdate(
        studentId,
        {
          userName,
          gender,
          email,
          mobileNumber,
          dob,
          fatherName,
          fatherOccupation,
          motherName,
          motherOccupation,
          motherTongue,
          languagesKnown,
          emisNumber,
          aadharNumber,
          panNumber,
          religion,
          community,
          communityCertificationNumber,
          bloodGroup,
          isPhysicalChallenged,
          nationality,
          state,
          district,
          place,
          permanentAddress,
          communicationAddress,
        },
        { new: true }
      );
      // const studentDetailDTO = new StudentDetailDTO(updatedPersonalInfo);
      res.status(200).json({ StudentDetail });
    } catch (error) {
      next(error);
    }
  },

  //get student details using pagination search and filter like shorting
  async getStudentDetails(req, res) {
    try {
      const { limit, offset, search, sortBy, sortOrder } = req.query;

      // Constructing the search and sort options based on the query parameters
      const searchOptions = search
        ? { userName: { $regex: search, $options: "i" } }
        : {};
      const sortOptions = sortBy
        ? { [sortBy]: sortOrder === "desc" ? -1 : 1 }
        : {};

      // Querying the database with pagination, search, and sort options
      const [studentDetails, totalCount] = await Promise.all([
        StudentDetail.find(searchOptions)
          .sort(sortOptions)
          .skip(Number(offset))
          .limit(Number(limit))
          .populate("user"),
        StudentDetail.countDocuments(searchOptions),
      ]);

      res.json({
        count: totalCount,
        results: studentDetails,
      });
    } catch (error) {
      console.error("Error fetching student details:", error);
      res.status(500).json({ error: "Failed to fetch student details." });
    }
  },

  // Export data to Excel
  async exportToExcel(req, res) {
    try {
      // Fetch data from the StudentDetail model
      const studentDetails = await StudentDetail.find(); /* .populate("user") */

      // Create a new Excel workbook and sheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Student Details");

      // Set column style
      const columnStyle = {
        fill: {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFEFEFEF" }, // Change the color code as desired
        },
        alignment: {
          vertical: "middle",
          horizontal: "center",
        },
      };

      // Define the column headers
      worksheet.columns = [
        { header: "S No", key: "sno", width: 15 },
        { header: "Name", key: "userName", width: 15 },
        { header: "Gender", key: "gender", width: 15 },
        { header: "Email", key: "email", width: 15 },
        { header: "Mobile Number", key: "mobileNumber", width: 15 },
        { header: "Date of Birth", key: "dob", width: 15 },
        { header: "Father's Name", key: "fatherName", width: 15 },
        { header: "Father's Occupation", key: "fatherOccupation", width: 15 },
        { header: "Mother's Name", key: "motherName", width: 15 },
        { header: "Mother's Occupation", key: "motherOccupation", width: 15 },
        { header: "Mother Tongue", key: "motherTongue", width: 15 },
        { header: "Languages Known", key: "languagesKnown", width: 15 },
        { header: "Emis Number", key: "emisNumber", width: 15 },
        { header: "Aadhar Number", key: "aadharNumber", width: 15 },
        { header: "PAN Number", key: "panNumber", width: 15 },
        { header: "Religion", key: "religion", width: 15 },
        { header: "Community", key: "community", width: 15 },
        {
          header: "Community Certification Number",
          key: "communityCertificationNumber",
          width: 15,
        },
        { header: "Blood Group", key: "bloodGroup", width: 15 },
        {
          header: "Physical Challenged",
          key: "isPhysicalChallenged",
          width: 15,
        },
        { header: "Nationality", key: "nationality", width: 15 },
        { header: "State", key: "state", width: 15 },
        { header: "District", key: "district", width: 15 },
        { header: "Place", key: "place", width: 15 },
        { header: "Permanent Address", key: "permanentAddress", width: 15 },
        {
          header: "Communication Address",
          key: "communicationAddress",
          width: 15,
        },
      ];

      // Apply column style to all columns
      worksheet.columns.forEach((column) => {
        column.style = columnStyle;
      });

      // Set the alignment for the entire worksheet
      worksheet.eachRow((row, rowNumber) => {
        row.alignment = {
          vertical: "middle",
          horizontal: "center",
        };
      });

      // Add the data rows
      studentDetails.forEach((studentDetail, index) => {
        worksheet.addRow({
          sno: index + 1,
          userName: studentDetail.userName,
          gender: studentDetail.gender,
          email: studentDetail.email,
          mobileNumber: studentDetail.mobileNumber,
          dob: studentDetail.dob,
          fatherName: studentDetail.fatherName,
          fatherOccupation: studentDetail.fatherOccupation,
          motherName: studentDetail.motherName,
          motherOccupation: studentDetail.motherOccupation,
          motherTongue: studentDetail.motherTongue,
          languagesKnown: studentDetail.languagesKnown,
          emisNumber: studentDetail.emisNumber,
          aadharNumber: studentDetail.aadharNumber,
          panNumber: studentDetail.panNumber,
          religion: studentDetail.religion,
          community: studentDetail.community,
          communityCertificationNumber:
            studentDetail.communityCertificationNumber,
          bloodGroup: studentDetail.bloodGroup,
          isPhysicalChallenged: studentDetail.isPhysicalChallenged
            ? "Yes"
            : "No",
          nationality: studentDetail.nationality,
          state: studentDetail.state,
          district: studentDetail.district,
          place: studentDetail.place,
          permanentAddress: studentDetail.permanentAddress,
          communicationAddress: studentDetail.communicationAddress,
        });
      });

      // Auto-size all columns based on content length
      worksheet.columns.forEach((column) => {
        let maxCellLength = 0;

        worksheet
          .getColumn(column.key)
          .eachCell({ includeEmpty: true }, (cell) => {
            const cellLength = cell.value ? cell.value.toString().length : 0;
            if (cellLength > maxCellLength) {
              maxCellLength = cellLength;
            }
          });

        const adjustedWidth = Math.min(50, Math.max(10, maxCellLength + 2));
        column.width = adjustedWidth;
      });

      // Set the response headers for downloading the file
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=student_details.xlsx"
      );

      // Write the workbook to the response
      await workbook.xlsx.write(res);

      // End the response
      res.end();
    } catch (error) {
      // console.error("Error exporting data to Excel:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
