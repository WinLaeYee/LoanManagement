const contractService = require("../services/ContractService");
const upload = require("../middlewares/fileUploadMiddleware");

class ContractController {
  async createContract(req, res) {
    
   upload.single("contractDocument")(req, res, async (err) => {
     if (err) {
       return res.status(400).json({ error: err.message });
     }

     console.log("Uploaded file path: ", req.file.path); 

     try {
       const contractData = {
         loanId: req.body.loanId,
         contractDocument: req.file.path, 
         signingDate: req.body.signingDate,
       };

       
       const contract = await contractService.createContract(contractData);
       res.status(201).json(contract);
     } catch (error) {
       res.status(400).json({ error: error.message });
     }
   });

  }

  async getContractByLoan(req, res) {
    try {
      const contract = await contractService.getContractByLoan(
        req.params.loanId
      );
      if (!contract) {
        return res.status(404).json({ message: "Contract not found" });
      }
      res.status(200).json(contract);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  async downloadContract(req, res) {
    try {
      const contract = await contractService.getContractByLoan(
        req.params.loanId
      );
      if (!contract) {
        return res.status(404).json({ message: "Contract not found" });
      }
      const filePath = contract.contractDocument;
      res.download(filePath, (err) => {
        if (err) {
          res.status(500).json({ error: "Failed to download file" });
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ContractController();

