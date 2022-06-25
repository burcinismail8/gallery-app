import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavTabs() {
  const [value, setValue] = useState("/my-gallery");
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };
  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        variant="fullWidth"
      >
        <Tab value="/my-gallery" label="My Gallery" />
        <Tab value="/add-image" label="Add Image" />
        <Tab value="/search-image" label="Search Image" />
      </Tabs>
    </Box>
  );
}
