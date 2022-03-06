import Card from "@mui/material/Card";
import React, { useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function TabPanel(props) {
  const { children, value, index, text, ...other } = props;
  return <div>{value === index && <Box>{children}</Box>}</div>;
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function BasicTabs({ answers, data }) {
  const [value, setValue] = React.useState(0);
  const [tabList, setTabList] = React.useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(0);
    setTabList(answers);
  }, [answers]);

  useEffect(() => {
    setTabList(answers);
  }, []);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Toolbar style={{ placeContent: "space-between", paddingLeft: "0px" }}>
          <b>Example Answer:</b>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tabList &&
              tabList.map((t, index) => (
                <Tab key={index} label={`Sample ${index + 1}`} />
              ))}
          </Tabs>
        </Toolbar>
      </Box>
      <Card elevation={3} style={{ minHeight: "140px", padding: "10px" }}>
        {tabList
          ? tabList.map((k, index) => (
              <TabPanel value={value} index={index} key={index}>
                {k.text}
              </TabPanel>
            ))
          : "No Aswer"}
      </Card>
    </>
  );
}
