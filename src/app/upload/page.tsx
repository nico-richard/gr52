"use client";
import { useRef } from "react";

export default function Upload() {
  const fileInput = useRef<HTMLInputElement>(null);
  const titleInput = useRef<HTMLInputElement>(null);

  const allowedExtensions = ["jpg", "jpeg", "png"];

  async function uploadFiles(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    evt.preventDefault();

    const formData = new FormData();
    if (fileInput.current?.files) {
      Array.from(fileInput.current.files).forEach((file) => {
        const fileExtension = file.name.split(".").pop();
        if (allowedExtensions.includes(fileExtension!)) {
          formData.append("files", file);
        }
      });
    }
    if (titleInput.current?.value) {
      formData.append("title", titleInput.current?.value);
    }

    if (formData.has("files")) {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log(result);
    } else {
      console.log("No valid files to upload.");
    }
  }

  return (
    <form className="flex flex-col gap-4">
      <label>
        <span>Title</span>
        <input type="text" name="title" ref={titleInput} />
      </label>
      <label>
        <span>Upload files</span>
        <input type="file" name="files" multiple ref={fileInput} />
      </label>
      <button type="submit" onClick={uploadFiles}>
        Submit
      </button>
    </form>
  );
}
