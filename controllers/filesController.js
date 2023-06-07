import Attachment from "../models/Attachment.js";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import mongoose from "mongoose";

const downloadFileById = async (req, res) => {
  const { id: attachmentId } = req.params;

  // validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(attachmentId)) {
    throw new BadRequestError("Invalid ObjectId");
  }

  // Find the attachment by its id
  const attachment = await Attachment.findById(attachmentId);

  if (!attachment) {
    throw new NotFoundError(`No attachment found with id: ${attachmentId}`);
  }

  // set headers and send response
  res.set({
    "Content-Type": attachment.contentType,
    "Content-Disposition": "attachment; filename=" + attachment.name,
  });

  res.send(attachment.content);
};

export { downloadFileById };
