import React, { useState, useEffect, useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function LineGraph({ lineGraphData, duration }) {
  const [graphDuration, setGraphDuration] = useState("day");
  useEffect(() => {
    switch (duration) {
      case "daily":
        setGraphDuration("day");
        break;
      case "weekly":
        setGraphDuration("week");
        break;
      case "month":
        setGraphDuration("month");
        break;
    }
    console.log(duration);
  }, [duration]);
  useEffect(() => {
    console.log(graphDuration);
  }, [graphDuration]);
  useLayoutEffect(() => {
    var root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: "zoomX",
        layout: root.verticalLayout,
        maxTooltipDistance: 0,
      })
    );
    // Define data
    var data = [
      {
        date: new Date(2021, 0, 1).getTime(),
        value: 100,
      },
    ];

    // Create Y-axis
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraTooltipPrecision: 1,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: graphDuration, count: 1 },
        gridIntervals: [
          { timeUnit: graphDuration, count: 3 },
        ],
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    //xAxis.get("dateFormats")[graphDuration] = "MM/dd";
    //xAxis.get("periodChangeDateFormats")[graphDuration] = "MMMM";

    var series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "작업량",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: series.get("fill"),
        }),
      });
    });

    series.strokes.template.set("strokeWidth", 2);

    series
      .get("tooltip")
      .label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
    series.data.setAll(lineGraphData); // 데이터 적용

    // Add legend
    var legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    // Add cursor
    chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "zoomXY",
        xAxis: xAxis,
      })
    );

    xAxis.set(
      "tooltip",
      am5.Tooltip.new(root, {
        themeTags: ["axis"],
      })
    );

    yAxis.set(
      "tooltip",
      am5.Tooltip.new(root, {
        themeTags: ["axis"],
      })
    );

    return () => {
      root.dispose();
    };
  }, [lineGraphData, graphDuration]);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
}

export default LineGraph;
