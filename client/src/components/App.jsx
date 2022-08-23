import React from "react";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import "../App.css";

const App = () => {
  const [newData, setNewData] = useState([
    { date: [], subs: [], changeMonth: [], changeYear: [] },
  ]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        let date = data.data.map((d) => d.date);
        let subs = data.data.map((e) => e.new_subscriptions);

        let newMonth = [0];
        let newYear = [0];
        for (var i = 0; i < subs.length - 1; i++) {
          const month = (subs[i + 1] * 100) / subs[i] - 100;
          newMonth.push(+month.toFixed(2));
          const years = (subs[i + 12] * 100) / subs[i] - 100;
          newYear.push(+years.toFixed(2) || 0);
        }

        setNewData([
          {
            date: date,
            subs: subs,
            changeMonth: newMonth,
            changeYear: newYear,
          },
        ]);
      });
  }, []);

  return (
    <div className="app-container">
      <table>
        <tbody>
          {newData.map((data, i) => (
            <>
              <tr key={i}>
                <th scope="row">Month</th>
                {data.date.map((d) => (
                  <td>{moment(d).format("MMM YYYY")}</td>
                ))}
              </tr>

              <tr>
                <th scope="row">New Subscriptions</th>
                {data.subs.map((sub) => (
                  <td>{sub}</td>
                ))}
              </tr>

              <tr>
                <th scope="row">Change from last month(%)</th>
                {data.changeMonth.map((m) => (
                  <td>{m + "%"}</td>
                ))}
              </tr>

              <tr>
                <th scope="row">Change from last year (%)</th>
                {data.changeYear.map((y) => (
                  <td>{y + "%"}</td>
                ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
