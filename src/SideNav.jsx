import Button from "@mui/material/Button";

function SideNav({ toggleQuestion, selectedQuestion, data }) {
  const listItems = data.map(({ id, question }) => (
    <div key={id}>
      {" "}
      <Button
        style={{
          justifyContent: "flex-start",
          width: "95%",
          margin: "3px",
          textTransform: "capitalize",
          textAlign: "-webkit-left",
        }}
        variant={selectedQuestion !== id ? "outlined" : "contained"}
        onClick={() => toggleQuestion(id, question)}
      >
        {id}.{question}
      </Button>
    </div>
  ));
  return <div style={{ marginTop: "39px" }}>{listItems}</div>;
}

export default SideNav;
