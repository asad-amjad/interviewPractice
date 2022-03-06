import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CreatableSelect from "react-select/creatable";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const options = (array) =>
  Array.isArray(array)
    ? array.map((value) => ({
        answers: value.answers,
        value: value.question,
        id: value.id,
        label: value.question,
      }))
    : [];

export default function AddNew({ data, getChipQuestion, addNewChip, newSelected }) {
  const [value, setValue] = useState("");
  const [chip, setChip] = useState(null);
  const [answers, setAnwsers] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setChip(null);
    setValue("");
  }, [answers]);

  const handleSelect = (newValue) => {
    if (newValue) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    getChipQuestion(newValue);
    setAnwsers(newValue && newValue.answers);
  };

  const handleClick = (id) => {
    const filteredAnswer = answers.find((k) => id === k.id) || [];
    setChip(id);
    setValue(filteredAnswer.text);
  };

  const submit = () => {
    if (chip) {
      //update
      console.log("update");
    } else {
      addNewChip(value);
    }
  };

  const createOptions = options;

  return (
    <Grid container>
      <Grid item md={12}>
        <b>Select/Create a new question</b>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item md={4}>
          <CreatableSelect
            isClearable
            onChange={handleSelect}
            options={createOptions(data)}
          />
          <br />
          <Button onClick={() => submit()} variant="contained">
            {chip ? "Update" : "Add"}
          </Button>
        </Grid>
        <Grid item md={8}>
          <Card elevation={3} style={{ minHeight: "140px", padding: "10px" }}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <b>Add New/Select to Update</b>
              </Grid>
              <Grid
                item
                md={6}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Stack direction="row" spacing={1}>
                  {answers &&
                    answers.map((k, i) => (
                      <Chip
                        color="primary"
                        key={i}
                        label={`Sample ${k.id}`}
                        variant={chip === k.id ? "outlined" : "contained"}
                        onClick={() => handleClick(k.id)}
                      />
                    ))}
                </Stack>
              </Grid>
            </Grid>
            <br />
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              value={value}
              disabled={isDisabled}
              onChange={handleChange}
              placeholder="Add/Edit Answer"
              style={{ width: "100%", fontFamily: "initial", fontSize: "16px" }}
            />
          </Card>
          <br />
        </Grid>
      </Grid>
      <br />
      <br />
    </Grid>
  );
}
