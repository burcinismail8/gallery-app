import { Grid, ImageList, ImageListItem } from "@mui/material";
import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { IItem } from "../models/IItem";

const NonAuth = () => {
  const defaultImages = useSelector((state: RootStateOrAny) => state.data);

  return (
    <div>
      <Grid container spacing={0.5}>
        {defaultImages &&
          defaultImages.map((item: IItem) => {
            return (
              <Grid
                item
                xl={4}
                lg={4}
                md={6}
                key={item.url}
                className="container"
              >
                <img
                  src={`${item.url}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.url}
                  loading="lazy"
                  style={{ cursor: "pointer" }}
                  className="image"
                />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default NonAuth;
