import { onSnapshot, orderBy, query, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase";

const useFirestore = (
  collectionApp: string,
  searchTags: string[],
  setOptions: any
) => {
  const [docs, setDocs] = useState([]);
  const searchTagsArr = searchTags.map((tag: string) =>
    tag.trim().toLowerCase()
  );
  searchTagsArr.pop();
  let arrOptions = [] as any;
  useEffect(() => {
    const imagesRef = collection(firestore, collectionApp);
    const q = query(imagesRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap: any) => {
      let documents = [] as any;

      snap.forEach((doc: any) => {
        const currDocTags = doc.data().tags;
        currDocTags.forEach((tag: string) => {
          if (!arrOptions.includes(tag) && tag !== "") {
            arrOptions.push(tag);
          }
        });
        let addToArray = false;
        if (searchTagsArr.length > 0) {
          searchTagsArr.map((tag: string) => {
            if (currDocTags.includes(tag)) {
              addToArray = true;
            }
            return "";
          });
          addToArray && documents.push({ ...doc.data(), id: doc.id });
        } else {
          documents.push({ ...doc.data(), id: doc.id });
        }
      });
      setDocs(documents);

      documents = [] as any;
      setOptions(arrOptions);
    });
    return () => unsub();
  }, [searchTags]);
  return { docs };
};

export default useFirestore;
