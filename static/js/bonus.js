function gaugeChart(selectedValue) {
   // Fetch the JSON data and console log it 
   d3.json(url).then((data) => {
      // An array of metadata objects
      let metadata = data.metadata;

      // Filter data where id = selected value after converting their types 
      // (bc meta.id is in integer format and selectValue from is in string format)
      let filteredData = metadata.filter((meta) => meta.id == selectedValue.id);

      // Assign the first object to obj variable
      let obj = filteredData[0]
      // Trace for the data for the gauge chart
         let trace = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: obj.wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: { size: 20 } },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
               axis: { range: [0, 9] },
               bar: { color: "rgb(133,0,0)" },
               steps: [
                  { range: [0, 1], color: "rgb(248,243,236)" },
                  { range: [1, 2], color: "rgb(244,241,228)" },
                  { range: [2, 3], color: "rgb(233,231,201)" },
                  { range: [3, 4], color: "rgb(229,232,176)" },
                  { range: [4, 5], color: "rgb(213,229,153)" },
                  { range: [5, 6], color: "rgb(183,205,143)" },
                  { range: [6, 7], color: "rgb(139,192,134)" },
                  { range: [7, 8], color: "rgb(137,188,141)" },
                  { range: [8, 9], color: "rgb(132,181,137)" }
               ]
            }
         
            }];
            var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
      // Use Plotly to plot the data in a gauge chart
         Plotly.newPlot("gauge", trace,layout);
      
   });

}
