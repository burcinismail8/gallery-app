import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { store } from "..";
import { firestore } from "../firebase";
import { IItem } from "../models/IItem";
import { IUser } from "../models/IUser";
import { addUser, editImage, removeImage } from "../store/actions/actions";

export const editButtonClick = (
  setShowEditAlert: React.Dispatch<React.SetStateAction<boolean>>,
  docs: Array<IItem>,
  setTags: React.Dispatch<React.SetStateAction<string>>,
  selectedImgId: number
) => {
  setShowEditAlert(true);
  setTags(docs[selectedImgId].tags.join(" "));
};

export const editTags = (
  currUser: IUser,
  selectedImgId: number,
  tags: string,
  setShowEditAlert: React.Dispatch<React.SetStateAction<boolean>>
) => {
  currUser.photos[selectedImgId].tags = tags.split(" ");
  setShowEditAlert(false);
  store.dispatch(editImage(currUser));
  setDoc(doc(firestore, "usersData", localStorage.email), currUser);
};
export const saveSignedInUserInRedux = async (email: string) => {
  const docRef = doc(firestore, "usersData", email);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    store.dispatch(addUser(docSnap.data()));
  }
};
export const handleDeleteButtonClick = (
  currUser: IUser,
  docs: Array<IItem>,
  selectedImgId: number,
  setSelectedImg: React.Dispatch<React.SetStateAction<string>>,
  setShowDeleteAlert: React.Dispatch<React.SetStateAction<boolean>>
) => {
  docs.splice(selectedImgId, 1);
  store.dispatch(removeImage(currUser));
  setShowDeleteAlert(false);
  setDoc(doc(firestore, "usersData", localStorage.email), currUser);
  setSelectedImg("");
};

export const authFormValidation = (email: string, password: string) => {
  let errors = [];
  const emailRegex =
    /(?<name>[A-z0-9]{3,})[@](?<emailType>[a-z]{2,})[.](?<emailEnd>[a-z]{2,})/gm;
  if (!email.match(emailRegex)) {
    errors.push("*The email is invalid! (ex. joe4@gmail.com)");
  }
  if (password.length < 8) {
    errors.push("*The password should be more than 8 characters!");
  }
  return errors;
};
