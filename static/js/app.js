//The Api url that from which data will be taken from
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//Using the d3 library we will extract data 
let extractdata = d3.json(url).then(function(data){
   console.log(data)
});

//declaring 2 variables, to hold samples and metadata of the dataset and that can hold variable data 
var samples;
var meta_data;
d3.json(url).then(function(data){
   let selector = d3.select("#selDataset");
   meta_data = data.metadata;
   samples = data.samples;
   data.names.forEach((id)=>{
      selector.append("option").text(id).property("value",id);
   });
   metaData(meta_data[0]);
   hbarChart(samples[0]);
  bubbleChart(samples[0]);
  gaugeChart(meta_data[0]);
});

function optionChanged(value){
let selectedId = samples.find((item)=>item.id === value);
let demographicData = meta_data.find((item)=> item.id == value);

// Insterting Demographic Data
metaData(demographicData);

// Bar Chart
hbarChart(selectedId);

// Bubble Chart
bubbleChart(selectedId);

//Guage Chart
gaugeChart(demographicData);
};

function metaData(demographicData){
   let demoData = d3.select('#sample-metadata');
   demoData.html(
      `id: ${demographicData.id} <br> 
    ethnicity: ${demographicData.ethnicity} <br>
    gender: ${demographicData.gender} <br>
    age: ${demographicData.age} <br>
    location: ${demographicData.location} <br>
    bbtype: ${demographicData.bbtype} <br>
    wfreq: ${demographicData.wfreq}`
  )
};

function hbarChart(selectedId){
   let x_axis = selectedId.sample_values.slice(0, 10).reverse();
   let y_axis = selectedId.otu_ids
        .slice(0, 10)
        .reverse()
        .map((item) => `OTU ${item}`);
   let text = selectedId.otu_labels.slice(0, 10).reverse();
   let barChart = {
      x: x_axis,
      y: y_axis,
      text: text,
      type: "bar",
      orientation: "h",
   };

  let chart = [barChart];

  let layout = {
      height: 500,
      width: 500,
  };
   Plotly.newPlot("bar",chart,layout);
};

function bubbleChart(selectedId){

   var trace1 = {
      x: selectedId.otu_ids,
      y: selectedId.sample_values,
      mode: 'markers',
      marker: {
        size: selectedId.sample_values,
        color: selectedId.otu_ids,
        colorscale : "Earth"
      }
    };
    
    let layout = {
      title: "Bacteria Per Sample",
      hovermode: "closest",
      xaxis: {title: "OTU ID"},
      height: 500,
      width: 1200
  };
    
    Plotly.newPlot('bubble', [trace1], layout);

}