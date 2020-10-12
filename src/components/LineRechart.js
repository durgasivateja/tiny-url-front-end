import React from "react";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Title from "./Ttitle";

class LineRechartComponent extends React.Component {
  data = [
    {
      date: "Jan 2019",
      Success: 7000,
      Failed: 2342,
    },
    {
      name: "Feb 2019",
      Success: 5000,
      Failed: 3246,
    },
    {
      name: "Mar 2019",
      Success: 6000,
      Failed: 4556,
    },
    {
      name: "Apr 2019",
      Success: 6654,
      Failed: 4465,
    },
    {
      name: "May 2019",
      Success: 8765,
      Failed: 4553,
    },
  ];

  renderColorfulLegendText(value, entry) {
    const { color } = entry;

    return (
      <span style={{ color: color, fontSize: "150%", margin: "20%" }}>
        {value}
      </span>
    );
  }

  render() {
    return (
      <div>
        <Title>Requests Success/Failure - Last 5 days - Line Chart</Title>
        <LineChart
          width={750}
          height={250}
          data={this.props.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: "#ffffff" }} />
          <YAxis tick={{ fill: "#ffffff" }} />
          <Tooltip />
          <Legend formatter={this.renderColorfulLegendText} />
          <Line
            type="monotone"
            dataKey="success"
            stroke="rgb(60, 179, 113)"
            style={{ color: "white" }}
          />
          <Line type="monotone" dataKey="fail" stroke="#FF0000" />
        </LineChart>
      </div>
    );
  }
}

export default LineRechartComponent;
