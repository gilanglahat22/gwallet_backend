import express from "express";
const upload = require("../utils/multer");
const userControllers = require("../controller/user");
const { validatePhoneNumber } = require("../middleware/validator");
const {
  verifyAccess,
  isAdmin,
  verifyEmail
} = require("../middleware/authenticator");

const router = express.Router();

router
  .post("/register", userControllers.signUp)
  .post("/login", userControllers.login)
  .get("/verification/:token", verifyEmail, userControllers.verifyAccount)
  .put("/PIN/:id", userControllers.createPinById)

  .get("/profile", verifyAccess, userControllers.profile)
  .put(
    "/profile",
    verifyAccess,
    validatePhoneNumber,
    userControllers.addPhoneNumber
  )
  .put(
    "/profile/picture",
    verifyAccess,
    upload.single("picture"),
    userControllers.addProfilePicture
  )
  .put(
    "/profile/delete-phone-number",
    verifyAccess,
    userControllers.deletePhoneNumber
  )
  .put("/profile/change-password", verifyAccess, userControllers.changePassword)
  .put("/PIN", verifyAccess, userControllers.createPIN)
  .post("/PIN", verifyAccess, userControllers.confirmationPIN)

  .get("/", verifyAccess, userControllers.listAccounts)
  .get("/search", verifyAccess, userControllers.searchUsers)
  .get("/details/:id", verifyAccess, userControllers.detailsAccount)
  .delete("/profile/:id", isAdmin, userControllers.deleteAccount);

module.exports = router;

export default module;
