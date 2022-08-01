import express from "express";
const walletController = require("../controller/wallet");
const { isAdmin, verifyAccess } = require("../middleware/authenticator");

const router = express.Router();

router
  .get("/", isAdmin, walletController.listWallets)
  .post("/topup/method", verifyAccess, walletController.topUpMethod)
  .put("/topup/:id", verifyAccess, walletController.topUpInput)
  .post(
    "/topup/confirmation/:id",
    verifyAccess,
    walletController.topUpConfirmation
  )
  .get("/topup/history", verifyAccess, walletController.topUpHistory)
  .get("/topup/list", verifyAccess, walletController.topUpList);

module.exports = router;

export default module;