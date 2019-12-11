function metadata_create(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      
      var selection = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = selection[0];
      
      var panel = d3.select("#sample-metadata");
  
      panel.html("");
  
      Object.entries(result).forEach(([key, value]) => {
        panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
  }

function charts_draw(sample) {
    d3.json("samples.json").then((data) => {
      var samples = data.samples;
      var selection = samples.filter(one => one.id == sample);
      var result = selection[0];
  
      var values = result.sample_values;
      var ids = result.otu_ids;
      var labels = result.otu_labels;
      
  
      // Build a Bubble Chart
      var bubble_format = {
        title: "Bacteria Cultures Per Sample",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
      };
      var bubble_data = [
        {
          x: ids,
          y: values,
          text: labels,
          mode: "markers",
          marker: {
            size: values,
            color: ids,
            colorscale: "Earth"
          }
        }
      ];
  
      Plotly.newPlot("bubble", bubble_data, bubble_format);
  
      var yticks = ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      var bar_data = [
        {
          y: yticks,
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];
  
      var bar_format = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
      };
  
      Plotly.newPlot("bar", barData, barLayout);
    });
  }
  


function init() {

  
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
    var names = data.names;

    names.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var first = names[0];
    charts_draw(first);
    metadata_create(first);
  });

}

init();