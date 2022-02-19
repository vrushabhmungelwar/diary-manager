import { isExpired, decodeToken } from "react-jwt";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";
import { Events } from "./events";
export function EventList() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const myDecodedToken = decodeToken(token);
  const isMyTokenExpired = isExpired(token);

  if (isMyTokenExpired) {
    history.push("/login");
  }

  // const [data, setData] = useState({});
  const [events, setEvents] = useState([]);

  const id = myDecodedToken.id;
  const getData = () => {
    fetch(`https://diary-manager-by-vrushabh.herokuapp.com/event/${id}`)
      .then((data) => data.json())
      .then((data) => {
        const array = JSON.stringify(data);
        const array1 = JSON.parse(array);
        // setData(array1);
        setEvents(array1.events);
      });
  };
  useEffect(getData, [id]);

  // console.log(data);
  // console.log(events);
  const [value, setValue] = useState(null);

  async function Save(events) {
    const response = await fetch(`https://diary-manager-by-vrushabh.herokuapp.com/event/save`, {
      method: "POST",
      body: JSON.stringify({
        userId: id,
        events: events,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.success) {
      alert("saved");
    } else {
      alert(json.message);
    }
  }

  return (
    <div className="list-cont">
      <div className="date-save-cont">
        <div className="Date">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat="dd-MM-yyyy"
              label="Select Date"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>

        <div>
          <Button
            color="success"
            variant="outlined"
            sx={{ marginLeft: 50 }}
            onClick={() => Save(events)}
          >
            Save
          </Button>
         
        </div>
      </div>
      {value ? (
        <div className="data-cont">
          {events
            .filter(
              (eve) =>
                eve.fdate ===
                `${value.getDate()}-${
                  value.getMonth() + 1
                }-${value.getFullYear()}`
            )

            .map((eve) => (
              <Events
                key={eve.date}
                eve={eve}
                events={events}
                setEvents={setEvents}
              />
            ))}
        </div>
      ) : (
        <div className="data-cont">
          {events.map((eve) => (
            <Events
              key={eve.date}
              eve={eve}
              events={events}
              setEvents={setEvents}
            />
          ))}
        </div>
      )}
    </div>
  );
}
