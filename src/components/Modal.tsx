import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { firestore } from "../firebase";
import { editTags } from "../hooks/functions";
import { IItem } from "../models/IItem";
import { store } from "..";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { removeImage } from "../store/actions/actions";

const Modal = (props: {
  selectedImgId: number;
  setSelectedImg: React.Dispatch<React.SetStateAction<string>>;
  selectedImg: string;
  docs: any;
  setSelectedImgId: React.Dispatch<React.SetStateAction<number>>;
  tags: Array<string>;
}) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [tags, setTags] = useState("");
  const currUser = useSelector((state: any) => state.userData);

  const handleClick = (e: any) => {
    if (
      e.target.classList.contains("backdrop") ||
      e.target.classList.contains("image-swipe-div")
    ) {
      props.setSelectedImg("");
    }
  };
  const nextImgClick = () => {
    props.setSelectedImg(
      props.docs[props.selectedImgId + 1].url + "?w=248&fit=crop&auto=format"
    );
    props.setSelectedImgId(props.selectedImgId + 1);
  };

  const prevImgClick = () => {
    props.setSelectedImg(
      props.docs[props.selectedImgId - 1].url + "?w=248&fit=crop&auto=format"
    );
    props.setSelectedImgId(props.selectedImgId - 1);
  };
  const handleDeleteButtonClick = () => {
    props.docs.splice(props.selectedImgId, 1);
    store.dispatch(removeImage(currUser));
    setShowDeleteAlert(false);
    setDoc(doc(firestore, "usersData", localStorage.email), currUser);
    props.setSelectedImg("");
  };
  return (
    <div className="backdrop" onClick={handleClick}>
      <div className="img-buttons">
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          sx={{ margin: "auto" }}
          onClick={() => {
            setShowEditAlert(true);
            setTags(props.docs[props.selectedImgId].tags.join(" "));
          }}
        >
          Edit tags
        </Button>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          color="error"
          sx={{ margin: "auto" }}
          onClick={() => setShowDeleteAlert(true)}
        >
          Delete
        </Button>
        <Dialog
          open={showDeleteAlert}
          onClose={() => setShowDeleteAlert(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If you delete this photo, it will no longer be visible in your
              gallery.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDeleteAlert(false)}>Disagree</Button>
            <Button
              onClick={handleDeleteButtonClick}
              autoFocus
              variant="outlined"
              color="error"
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={showEditAlert} onClose={() => setShowEditAlert(false)}>
          <DialogTitle>Edit Tags</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can add, delete or edit the tags.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Tags"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={tags}
              onChange={(e) => {
                setTags(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowEditAlert(false)}>Cancel</Button>
            <Button
              onClick={() =>
                editTags(currUser, props.selectedImgId, tags, setShowEditAlert)
              }
              variant="outlined"
              color="primary"
            >
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="image-swipe-div">
        <IconButton
          className="modal-button"
          onClick={prevImgClick}
          sx={{ height: 20 + "%" }}
        >
          {props.selectedImgId !== 0 && <ArrowBackIosNewIcon />}
        </IconButton>

        <img
          src={props.selectedImg + "?w=248&fit=crop&auto=format"}
          alt="enlarged pic"
        />
        <IconButton
          className="modal-button"
          onClick={nextImgClick}
          sx={{ height: 20 + "%" }}
        >
          {props.selectedImgId !== props.docs.length - 1 && (
            <ArrowForwardIosIcon />
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default Modal;
