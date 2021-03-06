import React, { useEffect, useState } from "react";

//components
import Nav from "./components/Nav";
import Header from "./components/Header";
import FormsApi from "../../api/api";
import dept from "../../app_config";
import TimeTable from "../../components/tt";

//styles
import "../../components/tt.css";
import "../../design/forms.css";

//mui
import {
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  MenuItem,
} from "@material-ui/core";

export default function Dashboard() {
  const [state, setState] = useState({
    generating: "false",
    clearing: "false",
    numbers: {},
    mui: {},
    tt: [],
  });

  useEffect(() => {
    (async () => {
      const api = new FormsApi();
      const res = await api.get(`/users/admin/numbers`);
      if (res !== "Error") {
        setState({
          ...state,
          numbers: (res.status === false ? {} : res.result) || {},
          tt: res.result.tt.length === 0 ? [] : JSON.parse(res.result.tt[0].tt),
        });
      }
    })();
  }, []);

  const handleClear = async () => {
    setState({
      ...state,
      clearing: "true",
    });
    let api = new FormsApi();
    let clear = await api.put("/users/admin/clear");
    if (clear !== "Error") {
      if (clear.status) {
        setState({
          ...state,
          clearing: "false",
        });
        window.location.reload();
      }
    } else {
      setState({
        ...state,
        clearing: "Error",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      generating: "true",
    });
    const form_data = new FormData(e.target);
    const form_contents = {};
    form_data.forEach((v, i) => {
      form_contents[i] = v;
    });
    const api = new FormsApi();
    const res = await api.post("/users/admin/generate", form_contents);
    if (res === "Error") {
      setState({
        ...state,
        generating: "Error",
      });
    } else {
      if (res.status === false) {
        setState({
          ...state,
          generating: "Error",
        });
      } else {
        setState({
          ...state,
          generating: "false",
        });
        window.location.reload();
      }
    }
  };

  return (
    <>
      <input type="checkbox" id="nav-toggle" defaultChecked />
      <Nav active="dashboard" />
      <div className="main-content">
        <Header />
        <main>
          <div className="cards">
            <div className="card-single">
              <div className="">
                <h3>
                  {state.numbers.teachers
                    ? state.numbers.teachers.length
                    : "..."}
                </h3>
                <span>
                  Teachers <br />
                  <span style={{ fontSize: "13px" }}>Registered in System</span>
                </span>
              </div>
              <div className="">
                <span className="las la-users"> </span>
              </div>
            </div>
            <div className="card-single">
              <div className="">
                <h3>
                  {state.numbers.course_units
                    ? state.numbers.course_units.length
                    : "..."}
                </h3>
                <span>Course Units</span>
                <br />
                <span style={{ fontSize: "13px" }}>Being Taught</span>
              </div>
              <div className="">
                <span className="las la-users"></span>
              </div>
            </div>
            <div className="card-single">
              <div className="">
                <h3>
                  {state.numbers.rooms ? state.numbers.rooms.length : "..."}
                </h3>
                <span>Rooms</span>
                <br />
                <span style={{ fontSize: "13px" }}>For Lectures</span>
              </div>
              <div className="">
                <span className="las la-users"> </span>
              </div>
            </div>
            <div className="card-single">
              <div className="">
                <h3>
                  {state.numbers.classes ? state.numbers.classes.length : "..."}
                </h3>
                <span>Classes</span>
                <br />
                <span style={{ fontSize: "13px" }}>In the System</span>
              </div>
              <div className="">
                <span className="las la-users"> </span>
              </div>
            </div>
          </div>
          <div className="fullwidth-ctr">
            <div className="card">
              <div className="admin-tt-config">
                <div>
                  <div>TimeTable Configuration</div>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      variant="outlined"
                      color="primary"
                      label="Academic Year"
                      name="academic_year"
                      helperText="Like: 2021/2022"
                      style={{ width: "200px", margin: "5px 10px 5px 0px" }}
                    />
                    <FormControl
                      variant="outlined"
                      label="semester"
                      style={{ width: "200px", margin: "5px 10px" }}
                    >
                      <InputLabel id="semester">Select Semester</InputLabel>
                      <Select
                        inputProps={{
                          name: "semester",
                        }}
                        label="Select Semester"
                        id="semester"
                        value={state.active_semester || ""}
                        onChange={async (e, v) => {
                          setState({
                            ...state,
                            active_semester: e.target.value,
                          });
                        }}
                      >
                        <MenuItem value="1">Semester 1</MenuItem>
                        <MenuItem value="2">Semester 2</MenuItem>
                        <MenuItem value="3">Recess Term</MenuItem>
                      </Select>
                    </FormControl>
                    <br />
                    <Button
                      type="submit"
                      disabled={state.tt.length > 0}
                      variant={
                        state.generating === "false" ? "contained" : "outlined"
                      }
                      color={
                        state.generating === "Error" ? "secondary" : "primary"
                      }
                      size="large"
                      style={{
                        width: "200px",
                        margin: "5px 10px 5px 0px",
                      }}
                    >
                      <CircularProgress
                        size={14}
                        color={
                          state.generating === "Error" ? "secondary" : "primary"
                        }
                        style={
                          state.generating === "true"
                            ? { display: "inline-block" }
                            : { display: "none" }
                        }
                      />
                      <span style={{ marginLeft: "10px" }}>
                        {state.generating === "true"
                          ? "Please Wait..."
                          : state.generating === "Error"
                          ? "Failed"
                          : "Generate"}
                      </span>
                    </Button>
                  </form>
                </div>
                <div>
                  <div>Clear Timetable</div>
                  <div>
                    <Button
                      variant={
                        state.clearing === "false" ? "contained" : "outlined"
                      }
                      color={
                        state.clearing === "Error" ? "secondary" : "primary"
                      }
                      disabled={state.tt.length < 1}
                      size="large"
                      onClick={handleClear}
                      style={{
                        width: "200px",
                        margin: "5px 10px 5px 0px",
                      }}
                    >
                      <CircularProgress
                        size={14}
                        color={
                          state.clearing === "Error" ? "secondary" : "primary"
                        }
                        style={
                          state.clearing === "true"
                            ? { display: "inline-block" }
                            : { display: "none" }
                        }
                      />
                      <span style={{ marginLeft: "10px" }}>
                        {state.clearing === "true"
                          ? "Please Wait..."
                          : state.clearing === "Error"
                          ? "Failed to Clear"
                          : "Clear"}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="tt-ctr">
                <TimeTable
                  tt={state.tt}
                  user={dept}
                  filter_level="Admin"
                  teachers={state.numbers.teachers}
                  rooms={state.numbers.rooms}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
