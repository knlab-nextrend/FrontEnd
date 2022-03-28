import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
function Map(props) {
    useLayoutEffect(() => {
      let root = am5.Root.new("chartdiv");
  
      root.setThemes([am5themes_Animated.new(root)]);
  
      let chart = root.container.children.push(
        am5map.MapChart.new(root, {
          //panX: "rotateX",
          projection: am5map.geoEquirectangular(),
        })
      );
      let polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_worldLow,
          exclude: ["AQ"],
        })
      );
  
      polygonSeries.mapPolygons.template.setAll({
        tooltipText: "{name}",
        interactive: true,
      });
      polygonSeries.mapPolygons.template.states.create("hover", {
        fill: am5.color(0x677935),
      });
      chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
      return () => {
        root.dispose();
      };
    }, []);
  
    return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
  }

  export default Map;