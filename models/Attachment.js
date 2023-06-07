import mongoose from "mongoose";

const AttachmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      trim: true,
    },
    fileExtension: {
      type: String,
      required: [true, "Please provide fileExtension"],
    },
    contentType: {
      type: String,
      required: [true, "Please provide contentType"],
    },
    uploadedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    content: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Attachment", AttachmentSchema);
