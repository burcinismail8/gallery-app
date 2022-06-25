import { useEffect, useState } from "react";
import { firestore, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { RootStateOrAny, useSelector } from "react-redux";
import { store } from "..";
import { addImage } from "../store/actions/actions";
import { useNavigate } from "react-router-dom";
import { IFile } from "../models/IFile";

const useStorage = (file: IFile, tags: string) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const tagsArr = tags
    .split(" ")
    .map((tag: string) => tag.trim().toLowerCase());
  const currUserData = useSelector((state: RootStateOrAny) => state.userData);
  const navigate = useNavigate();
  useEffect(() => {
    if (!tags || !file.name) {
      return;
    }
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(
      storageRef,
      file as unknown as Blob
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setError(error.message);
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const newArr = currUserData.photos.slice();
          newArr.unshift({
            url: downloadURL,
            tags: tagsArr,
          });
          const newData = {
            email: currUserData.email,
            password: currUserData.password,
            name: currUserData.name,
            photos: newArr,
          };

          setUrl(downloadURL);
          setDoc(doc(firestore, "usersData", localStorage.email), newData);
          store.dispatch(addImage(newData));
          navigate("/my-gallery");
        });
      }
    );
  }, [file]);
  return { progress, url, error };
};

export default useStorage;
