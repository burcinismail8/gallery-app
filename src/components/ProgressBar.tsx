import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import { IFile } from "../models/IFile";

const ProgressBar = (props: {
  file: IFile;
  setFile: React.Dispatch<React.SetStateAction<IFile>>;
  tags: string;
}) => {
  const { url, progress } = useStorage(props.file, props.tags);
  useEffect(() => {
    if (url) {
      props.setFile({} as IFile);
    }
  }, [url]);
  return <div className="progress-bar" style={{ width: progress + "%" }}></div>;
};

export default ProgressBar;
