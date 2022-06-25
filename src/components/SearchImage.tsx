import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  editButtonClick,
  editTags,
  handleDeleteButtonClick,
} from "../hooks/functions";
import { IItem } from "../models/IItem";
import Modal from "./Modal";

export const SearchImage = () => {
  const navigate = useNavigate();
  const [searchTags, setSearchTags] = useState([] as Array<string>);
  const [options, setOptions] = useState([] as Array<string>);
  const docs = useSelector((state: any) => state.userData);
  const [selectedImg, setSelectedImg] = useState("");
  const [selectedImgId, setSelectedImgId] = useState(0);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [tags, setTags] = useState("");
  const [showDocs, setShowDocs] = useState([] as Array<IItem>);

  useEffect(() => {
    let result = [] as Array<string>;
    docs.photos.map((doc: IItem) => {
      doc.tags.map((tag: string) => {
        if (!result.includes(tag) && tag !== "") {
          result.push(tag);
        }
      });
    });
    setOptions(result);
  }, [docs.photos]);

  useEffect(() => {
    let resultArr = [] as Array<IItem>;
    let add = false;
    docs.photos.map((doc: IItem) => {
      add = false;
      searchTags.map((option: string) => {
        if (doc.tags.includes(option)) {
          add = true;
        }
      });
      if (add) {
        resultArr.push(doc);
      }
    });
    setShowDocs(resultArr);
  }, [searchTags]);
  return (
    <div>
      <form>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={options}
          className="input-field"
          getOptionLabel={(option) => option}
          onChange={(e: any, values: any) => {
            setSearchTags(values);
          }}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              color="secondary"
              focused
              label="Search tags"
              onChange={(e: any) => {
                if (
                  !options.includes(e.target.value) &&
                  e.target.value.length > 1
                ) {
                  setOptions([...options, e.target.value]);
                }
              }}
            />
          )}
        />
      </form>
      {searchTags.length > 0 && (
        <Grid container spacing={0.5}>
          {showDocs.map((item: IItem, index: number) => {
            return (
              <Grid
                item
                key={item.url}
                className="container"
                onMouseEnter={() => setSelectedImgId(index)}
                xl={4}
                lg={4}
                md={6}
              >
                <img
                  src={`${item.url}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.url}
                  loading="lazy"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedImg(`${item.url}?w=248&fit=crop&auto=format`);
                    setSelectedImgId(index);
                  }}
                  className="image"
                />
                <div className="hover-buttons">
                  <IconButton
                    sx={{ fontSize: 35 }}
                    onClick={() =>
                      editButtonClick(
                        setShowEditAlert,
                        showDocs,
                        setTags,
                        selectedImgId
                      )
                    }
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
              <Button onClick={() => setShowDeleteAlert(false)}>
                Disagree
              </Button>
              <Button
                onClick={() => {
                  handleDeleteButtonClick(
                    docs,
                    docs.photos,
                    selectedImgId,
                    setSelectedImg,
                    setShowDeleteAlert
                  );
                  navigate("/my-gallery");
                }}
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
                  editTags(docs, selectedImgId, tags, setShowEditAlert)
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
              docs={showDocs}
              setSelectedImgId={setSelectedImgId}
              tags={tags.split(" ")}
            />
          )}
        </Grid>
      )}
    </div>
  );
};
