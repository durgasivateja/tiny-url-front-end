import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Title from "./Ttitle";

class PieRechartComponent extends React.Component {
  COLORS = ["rgb(60, 179, 113)", "#FF0000"];

  pieData = [
    {
      name: "Success",
      value: 68.85,
    },
    {
      name: "Failed",
      value: 31.15,
    },
  ];

  CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
        </div>
      );
    }

    return null;
  };

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
        <Title>Requests - success and failure %</Title>
        <PieChart width={730} height={300}>
          <Pie
            data={this.props.data}
            color="#000000"
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
          >
            {this.pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={this.COLORS[index % this.COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<this.CustomTooltip />} />
          <Legend formatter={this.renderColorfulLegendText} />
        </PieChart>
      </div>
    );
  }
}

export default PieRechartComponent;
