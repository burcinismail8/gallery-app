import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Dispatch } from "redux";
import { firestore } from "../../firebase";
import { fetchDataError, fetchDataRequest, fetchDataSuccess } from "./actions";

export const readUserData = async () => {
  const imagesRef = collection(firestore, "images");
  const q = query(imagesRef, orderBy("createdAt", "desc"));
  const mySnapshot = await getDocs(q);
  const result = [] as any;
  mySnapshot.forEach((doc: any) => {
    result.push(doc.data());
  });

  return result;
};
export const fetchImagesData = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchDataRequest());
    readUserData()
      .then((response = []) => {
        dispatch(fetchDataSuccess(response));
      })
      .catch((error) => {
        dispatch(fetchDataError(error.message));
      });
  };
};
