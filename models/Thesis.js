import mongoose from "mongoose";

const ThesisSchema = new mongoose.Schema(
  {
    thesis: {
      type: String,
      required: [true, "Please provide thesis"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    professorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide professorId"],
    },
    studentId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["free", "pending", "taken", "declined"],
      default: "free",
    },
    isReviewed: {
      type: Boolean,
      default: false,
    },
    reviewScore: {
      type: Number,
      default: 0,
    },
    reviewComment: {
      type: String,
      default: "",
    },
    attachments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Attachment",
        default: [],
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Thesis", ThesisSchema);
