import express from "express";
import { ADMIN, AUTH, LINKS } from "./constants";
import {
  adminController,
  authController,
  linksController
} from "./controllers";
import { middlewares } from "./middlewares";

export const router = express.Router();
// Authorization
router.post(AUTH.CREATE_ACCOUNT, authController.createAccount);
router.post(AUTH.LOGIN, authController.login);
router.delete(AUTH.DELETE_ACCOUNT, authController.deleteAccount);

// Admin
// router.patch(
//   ADMIN.ADMIN_ROUTE,
//   middlewares.ensureAuthorization,
//   middlewares.ensureIsAdmin,
//   // adminController.IncreaseUserLinks
// );

// Links
router.get(
  LINKS.MY_LINKS,
  middlewares.ensureAuthorization,
  middlewares.ensureUserExists,
  linksController.GetMyLinks
);

router.post(
  LINKS.MY_LINKS,
  middlewares.ensureAuthorization,
  linksController.CreateLink
);
