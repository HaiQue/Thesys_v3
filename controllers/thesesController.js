import Thesis from "../models/Thesis.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import Attachment from "../models/Attachment.js";
import Comment from "../models/Comment.js";
import mongoose from "mongoose";

const createThesis = async (req, res) => {
  const { thesis, description } = req.body;

  if (!thesis || !description) {
    throw new BadRequestError("Please Provide All Values");
  }

  req.body.status = "free";

  const thesisObj = await Thesis.create(req.body);
  res.status(StatusCodes.CREATED).json({ thesisObj });
};

const getAllTheses = async (req, res) => {
  const { search, status, sort, professorId } = req.query;
  const queryObject = {};

  if (search) {
    queryObject.thesis = { $regex: search, $options: "i" };
  }

  if (status !== "all") {
    queryObject.status = status;
  }

  if (professorId) {
    queryObject.professorId = professorId;
  }

  let result = Thesis.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }

  if (sort === "oldest") {
    result = result.sort("createdAt");
  }

  if (sort === "a-z") {
    result = result.sort("thesis").collation({ locale: "en", strength: 2 });
  }

  if (sort === "z-a") {
    result = result.sort("-thesis").collation({ locale: "en", strength: 2 });
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const theses = await result;

  const totalTheses = await Thesis.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalTheses / limit);

  res.status(StatusCodes.OK).json({ theses, totalTheses, numOfPages });
};

const deleteThesis = async (req, res) => {
  const { id: thesisId } = req.params;

  const thesisObj = await Thesis.findOne({ _id: thesisId });

  if (!thesisObj) {
    throw new NotFoundError(`No thesis with id : ${thesisId}`);
  }

  await thesisObj.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Success. Thesis removed" });
};

const updateThesis = async (req, res) => {
  const { id: thesisId } = req.params;

  const { thesis, description } = req.body;

  if (!thesis || !description) {
    throw new BadRequestError("Please Provide All Values");
  }

  const thesisObj = await Thesis.findOne({ _id: thesisId });

  if (!thesisObj) {
    throw new NotFoundError(`No thesis with id ${thesisId}`);
  }

  const updatedThesis = await Thesis.findOneAndUpdate(
    { _id: thesisId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedThesis });
};

const reviewThesis = async (req, res) => {
  const { id: thesisId } = req.params;

  const { score, comment } = req.body;

  const thesisObj = await Thesis.findOne({ _id: thesisId });

  if (!thesisObj) {
    throw new NotFoundError(`No thesis with id : ${thesisId}`);
  }

  thesisObj.isReviewed = true;
  thesisObj.reviewScore = score;
  thesisObj.reviewComment = comment;

  await thesisObj.save();

  res.status(StatusCodes.OK).json(thesisObj);
};

const reserveThesis = async (req, res) => {
  const { id: thesisId } = req.params;
  const userId = req.user.userId;

  const thesisObj = await Thesis.findOne({ _id: thesisId });

  if (!thesisObj) {
    throw new NotFoundError(`No thesis with id : ${thesisId}`);
  }

  if (thesisObj.studentId) {
    throw new BadRequestError("This thesis has already been selected");
  }

  thesisObj.studentId = userId;
  thesisObj.status = "pending";
  await thesisObj.save();

  res
    .status(StatusCodes.OK)
    .json({ msg: "Success. Thesis reserved", thesis: thesisObj });
};

const approveThesis = async (req, res) => {
  const { id: thesisId } = req.params;

  const thesisObj = await Thesis.findOne({ _id: thesisId });

  if (!thesisObj) {
    throw new NotFoundError(`No thesis with id : ${thesisId}`);
  }

  thesisObj.status = "taken";
  await thesisObj.save();

  res
    .status(StatusCodes.OK)
    .json({ msg: "Success. Thesis approved", thesis: thesisObj });
};

const uploadThesisAttachment = async (req, res) => {
  const { id: thesisId } = req.params;
  const { fileName, fileContent } = req.body;

  const fileExtension = fileName.slice(fileName.lastIndexOf("."));
  const contentType = getContentType(fileExtension);

  if (!contentType) {
    throw new Error(`Unsupported file type: ${fileExtension}`);
  }
  const userId = req.user.userId;

  const thesisObj = await Thesis.findOne({ studentId: userId });

  if (!thesisObj) {
    throw new NotFoundError(`No thesis with id : ${thesisId}`);
  }

  // Assuming fileContent is base64 string
  const content = Buffer.from(fileContent, "base64");

  const attachment = await Attachment.create({
    name: fileName,
    fileExtension: fileExtension,
    contentType: contentType,
    uploadedBy: userId,
    content: content,
  });

  thesisObj.attachments.push(attachment);
  await thesisObj.save();

  res.status(201).json({
    name: attachment.name,
    id: attachment._id,
  });
};

const getThesisAttachments = async (req, res) => {
  const { id: thesisId } = req.params;

  // Validate the provided id
  if (!mongoose.Types.ObjectId.isValid(thesisId)) {
    return res.status(400).send("Invalid ObjectId");
  }

  // Find the thesis with the populated attachments field
  const thesis = await Thesis.findOne({ _id: thesisId }).populate(
    "attachments"
  );

  if (!thesis) {
    return res.status(404).send("Thesis not found");
  }

  // Map over the attachments and pick only the 'name' and '_id' fields
  const attachments = thesis.attachments.map(({ _id, name }) => ({
    id: _id,
    name,
  }));

  res.status(200).json({
    attachments,
  });
};

const getThesisByStudentId = async (req, res) => {
  const { id: studentId } = req.params;

  const thesis = await Thesis.findOne({ studentId });

  if (!thesis) {
    throw new NotFoundError(`No thesis with user id : ${studentId}`);
  }

  res.status(StatusCodes.OK).json({ thesis: thesis });
};

const getContentType = (fileExtension) => {
  const mapping = {
    ".doc": "application/msword",
    ".docx": "application/msword",
    ".pdf": "application/pdf",
  };

  return mapping[fileExtension];
};

const getThesisComments = async (req, res) => {
  const { id: thesisId } = req.params;

  // Find the thesis with the provided ID
  const thesisObj = await Thesis.findOne({ _id: thesisId }).populate(
    "comments"
  );

  if (!thesisObj) {
    throw new NotFoundError(`No thesis with id : ${thesisId}`);
  }

  res.status(StatusCodes.OK).json(thesisObj.comments);
};

const createThesisComment = async (req, res) => {
  const { id: thesisId } = req.params;

  const { comment } = req.body;

  const thesisObj = await Thesis.findOne({ _id: thesisId }).populate(
    "comments"
  );

  if (!thesisObj) {
    throw new NotFoundError(`No thesis with id : ${thesisId}`);
  }

  // Create a new Comment object
  // I'm assuming comment object is something like { content: '...', createdBy: '...' }
  const commentObj = Comment.create({
    thesis: thesisId,
    content: comment,
    createdBy: req.user.userId,
  });

  await commentObj.save();

  // Append it to the comments array
  thesisObj.comments.push(commentObj._id);

  await thesisObj.save();

  res.status(StatusCodes.OK).json(commentObj);
};

export {
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
};
