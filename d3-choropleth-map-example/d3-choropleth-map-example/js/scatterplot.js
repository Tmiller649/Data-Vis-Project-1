class Scatterplot {

  /**
   * Class constructor with basic chart configuration
   * @param {Object}
   * @param {Array}
   */
  constructor(_config, _data) {

    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 700,
      containerHeight: _config.containerHeight || 500,
      margin: _config.margin || {top: 25, right: 20, bottom: 20, left: 35},
      generate: _config.generate|| false
    }
    this.data = _data;
    this.initVis();
  }
  

  initVis() {

    let vis = this;
    vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
    vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

    // Initialize scales
    vis.colorScale = d3.scaleOrdinal()
        .range(['#ffe119', '#000075', '#3cb44b', '#e6194B']) 
        .domain(['Rural','Small City','Suburban', 'Urban']);
        


    vis.xScale = d3.scaleLinear()
        .range([0, vis.width]);

    vis.yScale = d3.scaleLinear()
        .range([vis.height, 0]);

    // Initialize axes
    vis.xAxis = d3.axisBottom(vis.xScale)
        .ticks(6)
        .tickSize(-vis.height - 10)
        .tickPadding(5)

    vis.yAxis = d3.axisLeft(vis.yScale)
        .ticks(6)
        .tickSize(-vis.width - 10)
        .tickPadding(5);

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
    vis.updateVis();
  }

  updateVis() {
    let vis = this;
    console.log()
    //Get value from dropdown menu
    let xValueDataString = d3.select("#Xaxis").node().value;
    let yValueDataString = d3.select("#Yaxis").node().value;
    vis.colorValue = d => d.urban_rural_status;
    vis.xValue = d => d[xValueDataString];
    vis.yValue = d => d[yValueDataString];
    let xExtent = d3.extent(vis.data, vis.xValue);
    let yExtent = d3.extent(vis.data, vis.yValue);


    // Set the scale input domains
    vis.xScale.domain(xExtent);
    vis.yScale.domain(yExtent);

    vis.renderVis();
  }

  renderVis() {
    let vis = this;

    // Add circles
    var point = vis.chart.selectAll('.point')
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
        .call(g => g.select('.domain').remove());

        // Add brushing
    d3.select("#scatterplot")
        .data(vis.data)
        .call( d3.brush()                     
        .extent( [ [0,0], [vis.width, vis.height] ] ) 
        .on("start brush", updateChart)    
)
    function updateChart() {
    let extent = d3.brushSelection(this)
    point.classed("selected", function(d){return isBrushed(extent,  vis.xScale(vis.xValue(d)), vis.yScale(vis.yValue(d))) } )
  }

  // A function that return TRUE or FALSE according if a dot is in the selection or not
  function isBrushed(brush_coords, cx, cy) {
    var x0 = brush_coords[0][0],
        x1 = brush_coords[1][0],
        y0 = brush_coords[0][1],
        y1 = brush_coords[1][1];
   return x0 -25 <= cx && cx <= x1 -25 && y0 -25 <= cy && cy <= y1 - 25;    
}

  }
}