import ExcelJS from "exceljs";
import BankDetails from "../models/bankDetailModel.js";

export const bankDetailsController = {
  async create(req, res, next) {
    try {
      const { name, bankName, branchName, accountNumber, ifscCode } = req.body;
      const userId = req.user._id;
      let bankDetails = await BankDetails.findOne({ user: userId });
      if (bankDetails) {
        bankDetails.name = name || bankDetails.name;
        bankDetails.bankName = bankName || bankDetails.bankName;
        bankDetails.branchName = branchName || bankDetails.branchName;
        bankDetails.accountNumber = accountNumber || bankDetails.accountNumber;
        bankDetails.ifscCode = ifscCode || bankDetails.ifscCode;
      } else {
        bankDetails = new BankDetails({
          user: userId,
          name,
          bankName,
          branchName,
          accountNumber,
          ifscCode,
        });
      }
      await bankDetails.save();
      res.status(bankDetails ? 200 : 201).json({ bankDetails });
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const bankDetails = await BankDetails.find();
      res.status(200).json({ bankDetails });
    } catch (error) {
      next(error);
    }
  },

  async get(req, res, next) {
    try {
      const userId = req.user._id;
      const bankDetails = await BankDetails.findOne({ user: userId });
      if (!bankDetails) {
        const error = {
          status: 404,
          message: "Bank details not found",
        };
        throw error;
      }
      res.status(200).json(bankDetails);
    } catch (error) {
      next(error);
    }
  },

  async deleteById(req, res, next) {
    try {
      const { bankDetailsId } = req.params;
      await BankDetails.findByIdAndDelete(bankDetailsId);
      res.status(200).json({ message: "Bank details deleted successfully" });
    } catch (error) {
      next(error);
    }
  },

  async updateById(req, res, next) {
    try {
      const { bankDetailId } = req.params;
      const { name, bankName, branchName, accountNumber, ifscCode } = req.body;
      const updatedBankDetails = await BankDetails.findByIdAndUpdate(
        bankDetailId,
        {
          name,
          bankName,
          branchName,
          accountNumber,
          ifscCode,
        },
        { new: true }
      );
      res.status(200).json({ bankDetails: updatedBankDetails });
    } catch (error) {
      next(error);
    }
  },

  async getBankDetails(req, res) {
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
      const [bankDetail, totalCount] = await Promise.all([
        BankDetails.find(searchOptions)
          .sort(sortOptions)
          .skip(Number(offset))
          .limit(Number(limit))
          .populate("user", "id"),
        BankDetails.countDocuments(searchOptions),
      ]);

      res.json({
        count: totalCount,
        results: bankDetail,
      });
    } catch (error) {
      console.error("Error fetching student details:", error);
      res.status(500).json({ error: "Failed to fetch student details." });
    }
  },

  async exportToExcel(req, res) {
    try {
      // Fetch data from the BankDetails model
      // const bankDetails = await BankDetails.find().populate("user");
      const bankDetails = await BankDetails.find();

      // Create a new Excel workbook and sheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Bank Details");

      // Define the column headers
      worksheet.columns = [
        // { header: "User", key: "user", width: 15 },
        { header: "Name", key: "name", width: 15 },
        { header: "Bank Name", key: "bankName", width: 15 },
        { header: "Branch Name", key: "branchName", width: 15 },
        { header: "Account Number", key: "accountNumber", width: 15 },
        { header: "IFSC Code", key: "ifscCode", width: 15 },
      ];

      // Add the data rows
      bankDetails.forEach((bankDetail) => {
        worksheet.addRow({
          // user: bankDetail.user.username,
          name: bankDetail.name,
          bankName: bankDetail.bankName,
          branchName: bankDetail.branchName,
          accountNumber: bankDetail.accountNumber,
          ifscCode: bankDetail.ifscCode,
        });
      });

      // Set the response headers for downloading the file
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=bank_details.xlsx"
      );

      // Write the workbook to the response
      await workbook.xlsx.write(res);

      // End the response
      res.end();
    } catch (error) {
      console.error("Error exporting data to Excel:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
