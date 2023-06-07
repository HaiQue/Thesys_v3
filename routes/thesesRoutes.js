import express from "express";
const router = express.Router();

import {
  createThesis,
  deleteThesis,
  getAllTheses,
  updateThesis,
  reserveThesis,
  uploadThesisAttachment,
  getThesisAttachments,
  getThesisByStudentId,
  approveThesis,
  reviewThesis,
  getThesisComments,
  createThesisComment,
} from "../controllers/thesesController.js";

router.route("/").get(getAllTheses).post(createThesis);
router
  .route("/:id")
  .get(getThesisByStudentId)
  .delete(deleteThesis)
  .patch(updateThesis);

router.route("/reserve/:id").post(reserveThesis);
router.route("/approve/:id").post(approveThesis);

router.route("/review/:id").post(reviewThesis);

router
  .route("/attachments/:id")
  .post(uploadThesisAttachment)
  .get(getThesisAttachments);

router.route("/comments/:id").get(getThesisComments).post(createThesisComment);

export default router;
