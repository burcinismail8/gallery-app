import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { editTags, handleDeleteButtonClick } from "../hooks/functions";
import { IItem } from "../models/IItem";
import Modal from "./Modal";
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const UserGallery = () => {
  const [selectedImg, setSelectedImg] = useState("");
  const [selectedImgId, setSelectedImgId] = useState(0);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [tags, setTags] = useState("");
  const imageList = useSelector((state: any) => state.data);

  const [showDocs, setShowDocs] = useState([] as Array<IItem>);
  const [lastImgIndex, setLastImgIndex] = useState(3);
  const currUser = useSelector((state: any) => state.userData);
  useEffect(() => {
    if (!localStorage.email || currUser.photos === undefined) {
      setShowDocs(imageList.slice(0, 3));
    } else if (currUser.photos.length > 0) {
      setShowDocs(currUser.photos);
    }
  }, [currUser]);

  return (
    <div>
      <Grid container spacing={0.5}>
        {showDocs &&
          showDocs.map((item: IItem, index: number) => {
            return (
              <Grid
                key={item.url}
                className="container"
                lg={4}
                xl={4}
                md={6}
                item
              >
                <img
                  src={`${item.url}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.url}
                  loading="lazy"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedImg(item.url);
                    setSelectedImgId(index);
                  }}
                  className="image"
                  onMouseOver={() => setTags(item.tags.join(" "))}
                />
                <div className="hover-buttons">
                  <IconButton
                    sx={{ fontSize: 35 }}
                    onClick={() => setShowEditAlert(true)}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    sx={{ fontSize: 35 }}
                    onClick={() => setShowDeleteAlert(true)}
                  >
                    <Delete fontSize="inherit" />
                  </IconButton>
                </div>
              </Grid>
            );
          })}
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
              onClick={() =>
                handleDeleteButtonClick(
                  currUser,
                  currUser.photos,
                  selectedImgId,
                  setSelectedImg,
                  setShowDeleteAlert
                )
              }
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
                editTags(currUser, selectedImgId, tags, setShowEditAlert)
              }
              variant="outlined"
              color="primary"
            >
              Edit
            </Button>
          </DialogActions>
        </Dialog>
        {selectedImg !== "" && (
          <Modal
            selectedImgId={selectedImgId}
            setSelectedImg={setSelectedImg}
            selectedImg={selectedImg}
            docs={currUser.photos}
            setSelectedImgId={setSelectedImgId}
            tags={tags.split(" ")}
          />
        )}
      </Grid>
      {lastImgIndex < imageList.length && (
        <div className="load-more-button">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setLastImgIndex(lastImgIndex + 3)}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};
