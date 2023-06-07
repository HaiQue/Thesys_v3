import { SelectThesis, FileDrop } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/MyThesisPage";

import axios from "axios";

import { useEffect, useState } from "react";

const MyThesis = () => {
  const {
    isLoading,
    user,
    studentThesis,
    getStudentThesis,
    uploadThesisAttachments,
    getThesisAttachments,
    thesisAttachments,
  } = useAppContext();
  const [file, setFile] = useState();

  const handleUpload = (files) => {
    setFile(files[0]);
  };

  useEffect(() => {
    getStudentThesis();
  }, []);

  useEffect(() => {
    getThesisAttachments();
  }, [studentThesis]);

  useEffect(() => {}, [thesisAttachments]);

  useEffect(() => {}, [studentThesis]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = function () {
      const base64String = reader.result.split(",")[1];
      uploadThesisAttachments(file.name, base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Wrapper>
      <SelectThesis />

      <form onSubmit={handleSubmit}>
        <h3>Upload thesis files here</h3>
        <FileDrop
          handleUpload={handleUpload}
          text={file ? file.name : "Drag and drop your files here"}
          allowMultiple={false}
        />
        <button className="btn btn-block" type="submit" disabled={isLoading}>
          {isLoading ? "Please Wait..." : "upload"}
        </button>
      </form>

      {file && <span>{file.name}</span>}

      {thesisAttachments.map((attachment, index) => {
        return (
          <>
            <span key={"s" + index}>{attachment.name} </span>
            <a
              download
              href={`http://localhost:5000/api/v1/files/${attachment.id}`}
              key={"a" + index}
            >
              Download
            </a>
            <br />
          </>
        );
      })}
    </Wrapper>
  );
};
export default MyThesis;
