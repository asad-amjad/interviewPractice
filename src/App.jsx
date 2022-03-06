import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { jsonData } from "./data";
import SideNav from "./SideNav.jsx";
import TabPanel from "./TabPanel";
import AddNew from "./AddNew";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [chipDetail, SetChipDetail] = useState(null);

  useEffect(() => {
    setData(jsonData.dataList);
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function toggleQuestion(qId) {
    const selectedQuestion = data.find(({ id }) => id == qId);
    setSelectedQuestion(selectedQuestion);
  }

  const getChipQuestion = (value) => {
    SetChipDetail(value);
  };

  const addNewChip = (chip) => {
    const addChip = { id: chipDetail.answers.length + 1, text: chip };
    chipDetail.answers.push(addChip);
    console.log(chipDetail);
  };

  const { question, id: questionId, answers } = selectedQuestion;
  return (
    <Grid container>
      <Grid
        item
        md={12}
        style={{
          textAlignLast: "center",
          background: "#346b78",
          color: "white",
          padding: "8px",
          marginBottom: "4px",
        }}
      >
        <b>Interview Practice</b>
      </Grid>

      <Grid container spacing={1}>
        <Grid item md={3} p={1}>
          <SideNav
            toggleQuestion={(id, q) => toggleQuestion(id, q)}
            selectedQuestion={questionId}
            data={data}
          />
        </Grid>

        <Grid item md={9} pr={2}>
          <Grid container spacing={1}>
            <Grid item md={6}>
              <b>Question:</b>
            </Grid>
            <Grid item md={6}>
              <Button
                onClick={() => handleExpandClick(!expanded)}
                style={{ float: "right", height: "30px" }}
                variant="contained"
              >
                {expanded ? "Cancel" : "Add New"}
              </Button>{" "}
            </Grid>
            <Grid item md={12}>
              <Card
                elevation={3}
                style={{
                  minHeight: "53px",
                  marginTop: "10px",
                  paddingLeft: "10px",
                }}
              >
                <p>{question}</p>
              </Card>
            </Grid>
          </Grid>
          <br />
          <TabPanel data={data} answers={answers} />
          <br />
          {expanded && (
            <AddNew
              data={data}
              getChipQuestion={(d) => getChipQuestion(d)}
              addNewChip={addNewChip}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
