import { Autocomplete, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { IFile } from "../models/IFile";
import ProgressBar from "./ProgressBar";

function AddImage() {
  const [file, setFile] = useState({} as IFile);
  const [error, setError] = useState("");
  const [tags, setTags] = useState("");
  const types = ["image/png", "image/jpeg"];

  const handleChange = (e: any) => {
    if (!tags) {
      setError("Tag list must contain at least 1 tag");
      return;
    }
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile({} as IFile);
      setError("Please select an image file (png or jpeg)");
    }
  };

  return (
    <div className="upload-form">
      <form>
        <TextField
          label="Tags"
          variant="standard"
          color="secondary"
          className="input-field"
          focused
          helperText="Tag list must contain at least 1 tag"
          onChange={(e: any) => {
            setTags(e.target.value);
          }}
        />
        <label className="add-photo">
          <input type="file" onChange={handleChange} />
          <span>+</span>
        </label>
        <div className="output">
          {error && <div className="error">{error}</div>}
          {file && <div>{file.name}</div>}
          {file && <ProgressBar file={file} setFile={setFile} tags={tags} />}
        </div>
      </form>
    </div>
  );
}

export default AddImage;
