class Scatterplot {

  /**
   * Class constructor with basic chart configuration
   * @param {Object}
   * @param {Array}
   */
  constructor(_config, _data) {
    // Configuration object with defaults
    // Important: depending on your vis and the type of interactivity you need
    // you might want to use getter and setter methods for individual attributes
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 600,
      containerHeight: _config.containerHeight || 400,
      margin: _config.margin || {top: 25, right: 20, bottom: 20, left: 35},
      generate: _config.generate|| false
    }
    this.data = _data;
    this.initVis();
  }
  
  /**
   * This function contains all the code that gets excecuted only once at the beginning.
   * (can be also part of the class constructor)
   * We initialize scales/axes and append static elements, such as axis titles.
   * If we want to implement a responsive visualization, we would move the size
   * specifications to the updateVis() function.
   */
  initVis() {
    // We recommend avoiding simply using the this keyword within complex class code
    // involving SVG elements because the scope of this will change and it will cause
    // undesirable side-effects. Instead, we recommend creating another variable at
    // the start of each function to store the this-accessor
    let vis = this;

    // Calculate inner chart size. Margin specifies the space around the actual chart.
    // You need to adjust the margin config depending on the types of axis tick labels
    // and the position of axis titles (margin convetion: https://bl.ocks.org/mbostock/3019563)
    vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
    vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

    // Initialize scales
    vis.colorScale = d3.scaleOrdinal()
        .range(['#FFFF00', '0000FF', '#FF0000', '#7CFC00']) //light blue to dark blue
        .domain(['Rural','Small City','Suburban', 'Urban']);

    vis.xScale = d3.scaleLinear()
        .range([0, vis.width]);

    vis.yScale = d3.scaleLinear()
        .range([vis.height, 0]);

    // Initialize axes
    vis.xAxis = d3.axisBottom(vis.xScale)
        .ticks(6)
        .tickSize(-vis.height - 10)
        .tickPadding(10)
        // .tickFormat(d => d + ' km');

    vis.yAxis = d3.axisLeft(vis.yScale)
        .ticks(6)
        .tickSize(-vis.width - 10)
        .tickPadding(10);

    // Define size of SVG drawing area
    vis.svg = d3.select(vis.config.parentElement)
        .attr('width', vis.config.containerWidth)
        .attr('height', vis.config.containerHeight);

    // Append group element that will contain our actual chart 
    // and position it according to the given margin config
    vis.chart = vis.svg.append('g')
        .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);

    // Append empty x-axis group and move it to the bottom of the chart
    vis.xAxisG = vis.chart.append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', `translate(0,${vis.height})`);
    
    // Append y-axis group
    vis.yAxisG = vis.chart.append('g')
        .attr('class', 'axis y-axis');

    // Append both axis titles
    vis.chart.append('text')
        .attr('class', 'axis-title')
        .attr('y', vis.height - 15)
        .attr('x', vis.width + 10)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        // .text('Distance');

    vis.svg.append('text')
        .attr('class', 'axis-title')
        .attr('x', 0)
        .attr('y', 0)
        .attr('dy', '.71em')
        // .text('Hours');
    vis.updateVis();
  }

  /**
   * This function contains all the code to prepare the data before we render it.
   * In some cases, you may not need this function but when you create more complex visualizations
   * you will probably want to organize your code in multiple functions.
   */
  updateVis() {
    let vis = this;
    
    // Specificy accessor functions
    vis.colorValue = d => d.urban_rural_status;
    var q = d3.select("#Xaxis").property("value")
    if(d3.select("#Xaxis").node().value == "poverty_perc"){
        vis.xValue = d => d.poverty_perc;
    }
    else if(d3.select("#Xaxis").node().value == "median_household_income"){
        vis.xValue = d => d.median_household_income;
    }
    else if(d3.select("#Xaxis").node().value == "median_household_income"){
        vis.xValue = d => d.median_household_income;
    }
    else if(d3.select("#Xaxis").node().value == "education_less_than_high_school_percent"){
        vis.xValue = d => d.education_less_than_high_school_percent;
    }
    else if(d3.select("#Xaxis").node().value == "park_access"){
        vis.xValue = d => d.park_access;
    }
    else if(d3.select("#Xaxis").node().value == "percent_inactive"){
        vis.xValue = d => d.percent_inactive;
    }
    else if(d3.select("#Xaxis").node().value == "percent_smoking"){
        vis.xValue = d => d.percent_smoking;
    }
    else if(d3.select("#Xaxis").node().value == "elderly_percentage"){
        vis.xValue = d => d.elderly_percentage;
    }
    else if(d3.select("#Xaxis").node().value == "number_of_hospitals"){
        vis.xValue = d => d.number_of_hospitals;
    }
    else if(d3.select("#Xaxis").node().value == "number_of_primary_care_physicians"){
        vis.xValue = d => d.median_household_income;
    }
    else if(d3.select("#Xaxis").node().value == "percent_no_heath_insurance"){
        vis.xValue = d => d.percent_heath_insurance;
    }
    else if(d3.select("#Xaxis").node().value == "percent_high_blood_pressure"){
        vis.xValue = d => d.percent_high_blood_pressure;
    }
    else if(d3.select("#Xaxis").node().value == "percent_stroke"){
        vis.xValue = d => d.percent_stroke;
    }
    else if(d3.select("#Xaxis").node().value == "percent_high_cholesterol"){
        vis.xValue = d => d.percent_high_cholesterol;
    }
///Y VALUE
if(d3.select("#Yaxis").node().value == "poverty_perc"){
    vis.yValue = d => d.poverty_perc;
}
else if(d3.select("#Yaxis").node().value == "median_household_income"){
    vis.yValue = d => d.median_household_income;
}
else if(d3.select("#Yaxis").node().value == "median_household_income"){
    vis.yValue = d => d.median_household_income;
}
else if(d3.select("#Yaxis").node().value == "education_less_than_high_school_percent"){
    vis.yValue = d => d.education_less_than_high_school_percent;
}
else if(d3.select("#Yaxis").node().value == "park_access"){
    vis.yValue = d => d.park_access;
}
else if(d3.select("#Yaxis").node().value == "percent_inactive"){
    vis.yValue = d => d.percent_inactive;
}
else if(d3.select("#Yaxis").node().value == "percent_smoking"){
    vis.yValue = d => d.percent_smoking;
}
else if(d3.select("#Yaxis").node().value == "elderly_percentage"){
    vis.yValue = d => d.elderly_percentage;
}
else if(d3.select("#Yaxis").node().value == "number_of_hospitals"){
    vis.yValue = d => d.number_of_hospitals;
}
else if(d3.select("#Yaxis").node().value == "number_of_primary_care_physicians"){
    vis.yValue = d => d.median_household_income;
}
else if(d3.select("#Yaxis").node().value == "percent_no_heath_insurance"){
    vis.yValue = d => d.percent_heath_insurance;
}
else if(d3.select("#Yaxis").node().value == "percent_high_blood_pressure"){
    vis.yValue = d => d.percent_high_blood_pressure;
}
else if(d3.select("#Yaxis").node().value == "percent_stroke"){
    vis.yValue = d => d.percent_stroke;
}
else if(d3.select("#Yaxis").node().value == "percent_high_cholesterol"){
    vis.yValue = d => d.percent_high_cholesterol;
}


    // Set the scale input domains
    vis.xScale.domain([0, d3.max(vis.data, vis.xValue)]);
    vis.yScale.domain([0, d3.max(vis.data, vis.yValue)]);

    vis.renderVis();
  }

  /**
   * This function contains the D3 code for binding data to visual elements.
   * We call this function every time the data or configurations change.
   */
  renderVis() {
    let vis = this;

    // Add circles
    vis.chart.selectAll('.point')
        .data(vis.data)
        .enter()
      .append('circle')
        .attr('class', 'point')
        .attr('r', 4)
        .attr('cy', d => vis.yScale(vis.yValue(d)))
        .attr('cx', d => vis.xScale(vis.xValue(d)))
        .attr('fill', d => vis.colorScale(vis.colorValue(d)));
    
    // Update the axes/gridlines
    // We use the second .call() to remove the axis and just show gridlines
    vis.xAxisG
        .call(vis.xAxis)
        .call(g => g.select('.domain').remove());

    vis.yAxisG
        .call(vis.yAxis)
        .call(g => g.select('.domain').remove())
  }
}