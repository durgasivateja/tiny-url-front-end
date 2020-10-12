import React, { Component } from "react";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import Title from "./Ttitle";

class CustomizedLabel extends Component {
  render() {
    const { x, y, fill, value } = this.props;
    console.log(x, y, fill, value);
    return (
      <text
        style={{ marginLeft: "50%" }}
        x={x + 80}
        y={y - 20}
        fontSize="16"
        fontFamily="sans-serif"
        fill="white"
        textAnchor="start"
        margin="10"
      >
        {value}
      </text>
    );
  }
}

export default class KeysChart extends Component {
  data = [
    { name: "REMAINING KEYS", value: 30000 },
    { name: "ACTIVE KEYS", value: 20000 },
  ];

  render() {
    return (
      <div>
        <Title>Key Metrics - Active and Remaining</Title>
        <BarChart
          width={600}
          height={400}
          data={this.props.data}
          barCategoryGap={1}
          margin={{ top: 50 }}
          //layout="vertical"
          //margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
        >
          <YAxis type="number" tick={{ fill: "#ffffff" }} />
          <XAxis
            type="category"
            width={60}
            padding={{ left: 50, right: 50 }}
            tick={{ fill: "#ffffff" }}
            dataKey="name"
          />
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="value" fill="#8da832" label={<CustomizedLabel />} />
        </BarChart>
      </div>
    );
  }
}
