const express = require("express");
const transactionController = require("../controller/transaction");
const { isAdmin, verifyAccess } = require("../middleware/authenticator");

const router = express.Router();

router
  .get("/", isAdmin, transactionController.transferList)
  .get("/history", verifyAccess, transactionController.transferHistory)
  .post("/transfer", verifyAccess, transactionController.transfer)
  .post(
    "/transfer/:id",
    verifyAccess,
    transactionController.transferConfirmation
  );

module.exports = router;
