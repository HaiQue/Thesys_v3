import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    thesisId: {
      type: mongoose.Types.ObjectId,
      ref: "Thesis",
      required: [true, "Please provide thesisId"],
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide createdBy"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
