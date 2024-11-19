const BorrowerController = require("../../controllers/BorrowerController");
const borrowerService = require("../../services/BorrowerService");
const jwt = require("jsonwebtoken");

jest.mock("../../services/BorrowerService"); 
jest.mock("jsonwebtoken"); 

describe("BorrowerController", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {}, query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("createBorrower", () => {
    it("should create a borrower and return a token", async () => {
      const mockBorrower = {
        _id: "12345",
        contactInfo: { email: "test@example.com" },
      };
      const mockToken = "mocked-token";
      req.body = {
        name: "John Doe",
        contactInfo: { email: "test@example.com" },
      };

      borrowerService.createBorrower.mockResolvedValue(mockBorrower);
      jwt.sign.mockReturnValue(mockToken);

      await BorrowerController.createBorrower(req, res);

      expect(borrowerService.createBorrower).toHaveBeenCalledWith(req.body);
      expect(jwt.sign).toHaveBeenCalledWith(
        { borrowerId: mockBorrower._id, email: mockBorrower.contactInfo.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        borrower: mockBorrower,
        token: mockToken,
      });
    });

    it("should handle errors and return 500", async () => {
      const mockError = new Error("Failed to create borrower");
      borrowerService.createBorrower.mockRejectedValue(mockError);

      await BorrowerController.createBorrower(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to create borrower",
      });
    });
  });

  describe("getBorrowerById", () => {
    it("should return a borrower by ID", async () => {
      const mockBorrower = { _id: "12345", name: "John Doe" };
      req.params.id = "12345";

      borrowerService.getBorrowerById.mockResolvedValue(mockBorrower);

      await BorrowerController.getBorrowerById(req, res);

      expect(borrowerService.getBorrowerById).toHaveBeenCalledWith("12345");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBorrower);
    });

    it("should return 404 if borrower is not found", async () => {
      req.params.id = "12345";
      borrowerService.getBorrowerById.mockRejectedValue(
        new Error("Borrower not found")
      );

      await BorrowerController.getBorrowerById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Borrower not found" });
    });
  });

  describe("getAllBorrowers", () => {
    it("should return all borrowers", async () => {
      const mockBorrowers = [
        { _id: "1", name: "John Doe" },
        { _id: "2", name: "Jane Doe" },
      ];

      borrowerService.getAllBorrowers.mockResolvedValue(mockBorrowers);

      await BorrowerController.getAllBorrowers(req, res);

      expect(borrowerService.getAllBorrowers).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBorrowers);
    });

    it("should handle errors and return 500", async () => {
      borrowerService.getAllBorrowers.mockRejectedValue(
        new Error("Database error")
      );

      await BorrowerController.getAllBorrowers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Database error" });
    });
  });

  describe("updateBorrower", () => {
    it("should update a borrower and return the updated data", async () => {
      const mockBorrower = { _id: "12345", name: "Updated Name" };
      req.params.id = "12345";
      req.body = { name: "Updated Name" };

      borrowerService.updateBorrower.mockResolvedValue(mockBorrower);

      await BorrowerController.updateBorrower(req, res);

      expect(borrowerService.updateBorrower).toHaveBeenCalledWith(
        "12345",
        req.body
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBorrower);
    });

    it("should handle errors and return 500", async () => {
      req.params.id = "12345";
      req.body = { name: "Updated Name" };

      borrowerService.updateBorrower.mockRejectedValue(
        new Error("Update failed")
      );

      await BorrowerController.updateBorrower(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Update failed" });
    });
  });

  describe("deleteBorrower", () => {
    it("should delete a borrower and return 204", async () => {
      req.params.id = "12345";

      borrowerService.deleteBorrower.mockResolvedValue();

      await BorrowerController.deleteBorrower(req, res);

      expect(borrowerService.deleteBorrower).toHaveBeenCalledWith("12345");
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it("should handle errors and return 500", async () => {
      req.params.id = "12345";

      borrowerService.deleteBorrower.mockRejectedValue(
        new Error("Delete failed")
      );

      await BorrowerController.deleteBorrower(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Delete failed" });
    });
  });
});


