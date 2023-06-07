import { useEffect, useRef, useState } from "react";

export default function FileDrop(props) {
  const [drag, setDrag] = useState(false);

  const dropRef = useRef(null);

  const { handleUpload, text, allowMultiple, whitelist } = props;

  let dragCounter = useRef(0);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
      setDrag(true);
    }
  };
  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDrag(false);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files);
      e.dataTransfer.clearData();
      dragCounter.current = 0;
    }
  };

  useEffect(() => {
    const div = dropRef.current;
    if (!div) return;

    document.addEventListener("dragenter", handleDragIn);
    document.addEventListener("dragleave", handleDragOut);
    document.addEventListener("dragover", handleDrag);
    document.addEventListener("drop", handleDrop);

    return () => {
      document.removeEventListener("dragenter", handleDragIn);
      document.removeEventListener("dragleave", handleDragOut);
      document.removeEventListener("dragover", handleDrag);
      document.removeEventListener("drop", handleDrop);
    };
  }, []);

  return (
    <div style={{ display: "flex", marginTop: "1rem" }} ref={dropRef}>
      <label
        style={{
          display: "flex",
          height: "8rem",
          width: "100%",
          cursor: "pointer",
          appearance: "none",
          justifyContent: "center",
          borderRadius: "0.375rem",
          borderWidth: "2px",
          borderStyle: "dashed",
          borderColor: "#d1d5db",
          backgroundColor: drag ? "#d1fae5" : "#ffffff",
          padding: "1rem",
          transition: "colors 0.15s ease-in-out",
          outline: "none",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontWeight: "500", color: "#6b7280" }}>
            {text ?? "Drop files here"}, or{" "}
            <span style={{ color: "#3b82f6", textDecoration: "underline" }}>
              browse
            </span>
          </span>
        </span>
        <input
          onChange={(e) => {
            if (!e.target.files) return;

            if (whitelist) {
              for (let i = 0; i < e.target.files.length; i++) {
                if (
                  !whitelist.includes(
                    e.target.files[i].name.split(".").pop().toLowerCase()
                  )
                ) {
                  return;
                }
              }
            }

            handleUpload(e.target.files);
          }}
          multiple={allowMultiple}
          type="file"
          name="file_upload"
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
}
