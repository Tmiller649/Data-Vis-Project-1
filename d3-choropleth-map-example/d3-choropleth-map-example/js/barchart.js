class Barchart {

  /**
   * Class constructor with basic chart configuration
   * @param {Object}
   * @param {Array}
   */
  constructor(_config, _data) {
    // Configuration object with defaults
    this.config = {
      parentElement: _config.parentElement,
      colorScale: _config.colorScale,
      containerWidth: _config.containerWidth || 600,
      containerHeight: _config.containerHeight || 400,
      margin: _config.margin || {top: 30, right: 30, bottom: 70, left: 60},
    }
    this.data = _data;
    this.initVis();
  }
  
  /**
   * Initialize scales/axes and append static elements, such as axis titles
   */
  initVis() {
    let vis = this;
    let yValueDataString = d3.select("#barchartAxis").node().value;
    
    vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
    vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

  
    // Process the data to calculate average percent_stroke for each urban_rural_status category
    const averages = d3.rollup(this.data, v => d3.mean(v, d => d[yValueDataString]), d => d.urban_rural_status);

    // Convert averages object to array for easier manipulation
    const averageArray = Array.from(averages, ([key, value]) => ({ urban_rural_status: key, yValueDataString: value }));
    
    // Define color scale
    const colorScale = d3.scaleOrdinal()
      .domain(vis.data.map(d => d.urban_rural_status))
      .range(['#ffe119', '#000075', '#3cb44b', '#e6194B'])

    // Create the SVG element
    vis.svg = d3.select(vis.config.parentElement)
      .attr("width", vis.config.containerWidth + vis.config.margin.left + vis.config.margin.right)
      .attr("height", vis.config.containerHeight + vis.config.margin.top + vis.config.margin.bottom)
      .append("g")
      .attr("transform", `translate(${vis.config.margin.left},${vis.config.margin.top})`);
  
    // Set up the scales for x and y axes
    const x = d3.scaleBand()
      .domain(averageArray.map(d => d.urban_rural_status))
      .range([0, vis.width])
      .padding(0.1);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(averageArray, d => d.yValueDataString)])
      .nice()
      .range([vis.height, 0]);
  
    // Add x axis
    vis.svg.append("g")
      .attr("transform", `translate(0,${vis.height})`)
      .call(d3.axisBottom(x))
      .selectAll(".tick text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");
  
    // Add y axis
    vis.svg.append("g")
      .call(d3.axisLeft(y));
  
    // Add bars
    vis.svg.selectAll(".bar")
      .data(averageArray)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.urban_rural_status))
      .attr("y", d => y(d.yValueDataString))
      .attr("width", x.bandwidth())
      .attr("height",  d => vis.height - y(d.yValueDataString))
      .attr('fill', d => colorScale(d.urban_rural_status));

  
    // Add y-axis label
    vis.svg.append("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -vis.height / 2)
      .attr("y", -vis.config.margin.left + 10)
      .style("text-anchor", "middle")
      .text("Average Percent Stroke");
  
    // Add title
    vis.svg.append("text")
      .attr("x", vis.width / 2)
      .attr("y", -vis.config.margin.top + 20)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Average Percent Stroke by Urban/Rural Status");
          // Apply basic styling
    vis.svg.selectAll(".bar")
    .style("opacity", 0.7);
}
}
