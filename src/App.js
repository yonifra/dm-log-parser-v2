import "./styles.css";
import { useState } from "react";
const _ = require("lodash");

export default function App() {
  const [methods, setMethods] = useState("");
  const [methodsArr, setMethodsArray] = useState([]);

  const parseMethods = () => {
    try {
      const arr = _.filter(
        JSON.parse(methods),
        (l) => !_.includes(l.methodName, "bi.")
      ).map(
        (item) =>
          `documentServices.${item.methodName}(${_.reduce(
            Object.values(item.args),
            (acc, v) =>
              `${acc.length > 0 ? acc + ", " : acc}${JSON.stringify(v)}`,
            ""
          )})`
      );
      console.log(arr);
      setMethodsArray(arr);
    } catch (err) {
      console.error(err);
      setMethodsArray([]);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    parseMethods();
  };

  return (
    <div className="App">
      <h1>DM Trace Parser</h1>
      <h4>Paste the trace here to get a human-readable trace</h4>

      <form onSubmit={handleSubmit}>
        <label>
          <textarea
            type="text"
            value={methods}
            onChange={(e) => setMethods(e.target.value)}
          />
        </label>
        <input type="submit" value="Parse!" />
      </form>
      <table bordered>
        <thead>
          <tr>
            <th>Called Method</th>
          </tr>
        </thead>
        {methodsArr.map((method) => (
          <tbody align="left">{method}</tbody>
        ))}
      </table>
    </div>
  );
}
