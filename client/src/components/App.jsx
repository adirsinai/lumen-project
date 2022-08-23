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

  const DateRow = (props) => {
    return <td>{moment(props.d).format("MMM YYYY")}</td>;
  };
  const SubRow = (props) => {
    return <td>{props.sub}</td>;
  };
  const ChangeMonth = (props) => {
    return <td>{props.changeMonth + "%"}</td>;
  };
  const ChangeYear = (props) => {
    return <td>{props.changeYear + "%"}</td>;
  };

  return (
    <div className="app-container">
      <table>
        <tbody>
          {newData.map((data, i) => (
            <>
              <tr key={i}>
                <th scope="row">Month</th>
                {data.date.map((d) => (
                  <DateRow date={d} />
                ))}
              </tr>

              <tr>
                <th scope="row">New Subscriptions</th>
                {data.subs.map((sub) => (
                  <SubRow sub={sub} />
                ))}
              </tr>

              <tr>
                <th scope="row">Change from last month(%)</th>
                {data.changeMonth.map((m) => (
                  <ChangeMonth changeMonth={m} />
                ))}
              </tr>

              <tr>
                <th scope="row">Change from last year (%)</th>
                {data.changeYear.map((y) => (
                  <ChangeYear changeYear={y} />
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
