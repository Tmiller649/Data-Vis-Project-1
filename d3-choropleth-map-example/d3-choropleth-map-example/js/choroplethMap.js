class ChoroplethMap {

  /**
   * Class constructor with basic configuration
   * @param {Object}
   * @param {Array}
   */
  constructor(_config, _data) {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 1000,
      containerHeight: _config.containerHeight || 500,
      margin: _config.margin || {top: 10, right: 10, bottom: 10, left: 10},
      tooltipPadding: 10,
      legendBottom: 50,
      legendLeft: 50,
      legendRectHeight: 12, 
      legendRectWidth: 150
    }
    this.data = _data;
    // this.config = _config;

    this.us = _data;

    this.active = d3.select(null);

    this.initVis();
  }
  
  /**
   * We initialize scales/axes and append static elements, such as axis titles.
   */
  initVis() {
    let vis = this;
    //let mapData = d => d.properties.poverty_perc;
    let mapDataString = "poverty_perc";


  if(d3.select("#MapData").node().value == "poverty_perc"){
    vis.colorScale = d3.scaleLinear()
    .domain(d3.extent(vis.data.objects.counties.geometries, d => d.properties.poverty_perc))
      .range(['#cfe2f2', '#0d306b'])
      .interpolate(d3.interpolateHcl);
      mapDataString = "poverty_perc";
  }
  else if(d3.select("#MapData").node().value == "median_household_income"){
    vis.colorScale = d3.scaleLinear()
    .domain(d3.extent(vis.data.objects.counties.geometries, d => d.properties.median_household_income))
      .range(['#cfe2f2', '#0d306b'])
      .interpolate(d3.interpolateHcl);
      mapDataString = "median_household_income";
  }
  else if(d3.select("#MapData").node().value == "education_less_than_high_school_percentage"){
    vis.colorScale = d3.scaleLinear()
    .domain(d3.extent(vis.data.objects.counties.geometries, d => d.properties.education_less_than_high_school_percentage))
      .range(['#cfe2f2', '#0d306b'])
      .interpolate(d3.interpolateHcl);
      mapDataString = "education_less_than_high_school_percentage";
  }
  else if(d3.select("#MapData").node().value == "air_quality"){
    vis.colorScale = d3.scaleLinear()
    .domain(d3.extent(vis.data.objects.counties.geometries, d => d.properties.air_quality))
      .range(['#cfe2f2', '#0d306b'])
      .interpolate(d3.interpolateHcl);
      mapDataString = "air_quality";
  }
  else if(d3.select("#MapData").node().value == "park_access"){
    vis.colorScale = d3.scaleLinear()
    .domain(d3.extent(vis.data.objects.counties.geometries, d => d.properties.park_access))
      .range(['#cfe2f2', '#0d306b'])
      .interpolate(d3.interpolateHcl);
      mapDataString = "park_access";
  }
  else if(d3.select("#MapData").node().value == "percent_inactive"){
    vis.colorScale = d3.scaleLinear()
    .domain(d3.extent(vis.data.objects.counties.geometries, d => d.properties.percent_inactive))
      .range(['#cfe2f2', '#0d306b'])
      .interpolate(d3.interpolateHcl);
      mapDataString = "percent_inactive";
  }
  else if(d3.select("#MapData").node().value == "percent_smoking"){
    vis.colorScale = d3.scaleLinear()
    .domain(d3.extent(vis.data.objects.counties.geometries, d => d.properties.percent_smoking))
      .range(['#cfe2f2', '#0d306b'])
      .interpolate(d3.interpolateHcl);
      mapDataString = "percent_smoking";
  }
  else if(d3.select("#MapData").node().value == "elderly_percentage"){
    vis.colorScale = d3.scaleLinear()
    .domain(d3.extent(vis.data.objects.counties.geometries, d => d.properties.elderly_percentage))
      .range(['#cfe2f2', '#0d306b'])
      .interpolate(d3.interpolateHcl);
      mapDataString = "elderly_percentage";
  }
  else if(d3.select("#MapData").node().value == "number_of_hospitals"){
    vis.colorScale = d3.scaleLinear()
    .domain(d3.extent(vis.data.objects.counties.geometries, d => d.properties.number_of_hospitals))
      .range(['#cfe2f2', '#0d306b'])
      .interpolate(d3.interpolateHcl);
      mapDataString = "number_of_hospitals";
  }
  else if(d3.select("#MapData").node().value == "percent_no_heath_insurance"){
    vis.colorScale = d3.scaleLinear()
    .domain(d3.extent(vis.data.objects.counties.geometries, d => d.properties.percent_no_heath_insurance))
      .range(['#cfe2f2', '#0d306b'])
      .interpolate(d3.interpolateHcl);
      mapDataString = "percent_no_heath_insurance";
  }
  else if(d3.select("#MapData").node().value == "percent_high_blood_pressure"){
    vis.colorScale = d3.scaleLinear()
    .domain(d3.extent(vis.data.objects.counties.geometries, d => d.properties.percent_high_blood_pressure))
      .range(['#cfe2f2', '#0d306b'])
      .interpolate(d3.interpolateHcl);
      mapDataString = "percent_high_blood_pressure";
  }
  else if(d3.select("#MapData").node().value == "percent_coronary_heart_disease"){
    vis.colorScale = d3.scaleLinear()
    .domain(d3.extent(vis.data.objects.counties.geometries, d => d.properties.percent_coronary_heart_disease))
      .range(['#cfe2f2', '#0d306b'])
      .interpolate(d3.interpolateHcl);
      mapDataString = "percent_coronary_heart_disease";
  }
  else if(d3.select("#MapData").node().value == "percent_stroke"){
    vis.colorScale = d3.scaleLinear()
    .domain(d3.extent(vis.data.objects.counties.geometries, d => d.properties.percent_stroke))
      .range(['#cfe2f2', '#0d306b'])
      .interpolate(d3.interpolateHcl);
      mapDataString = "percent_stroke";
  }
  else if(d3.select("#MapData").node().value == "percent_high_cholesterol"){
    vis.colorScale = d3.scaleLinear()
    .domain(d3.extent(vis.data.objects.counties.geometries, d => d.properties.percent_high_cholesterol))
      .range(['#cfe2f2', '#0d306b'])
      .interpolate(d3.interpolateHcl);
      mapDataString = "percent_high_cholesterol";
  }
  else if(d3.select("#MapData").node().value == "number_of_primary_care_physicians"){
    vis.colorScale = d3.scaleLinear()
    .domain(d3.extent(vis.data.objects.counties.geometries, d => d.properties.number_of_primary_care_physicians))
      .range(['#cfe2f2', '#0d306b'])
      .interpolate(d3.interpolateHcl);
      mapDataString = "number_of_primary_care_physicians";
  }
    // Calculate inner chart size. Margin specifies the space around the actual chart.
    vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
    vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

    // Define size of SVG drawing area
    vis.svg = d3.select(vis.config.parentElement).append('svg')
        .attr('class', 'center-container')
        .attr('width', vis.config.containerWidth)
        .attr('height', vis.config.containerHeight);

    vis.svg.append('rect')
            .attr('class', 'background center-container')
            .attr('height', vis.config.containerWidth ) //height + margin.top + margin.bottom)
            .attr('width', vis.config.containerHeight) //width + margin.left + margin.right)
            .on('click', vis.clicked);

  
    vis.projection = d3.geoAlbersUsa()
            .translate([vis.width /2 , vis.height / 2])
            .scale(vis.width);

    // vis.colorScale = d3.scaleLinear()
    //   .domain(d3.extent(vis.data.objects.counties.geometries, d => d.properties.poverty_perc))
    //     .range(['#cfe2f2', '#0d306b'])
    //     .interpolate(d3.interpolateHcl);

    vis.path = d3.geoPath()
            .projection(vis.projection);

    vis.g = vis.svg.append("g")
            .attr('class', 'center-container center-items us-state')
            .attr('transform', 'translate('+vis.config.margin.left+','+vis.config.margin.top+')')
            .attr('width', vis.width + vis.config.margin.left + vis.config.margin.right)
            .attr('height', vis.height + vis.config.margin.top + vis.config.margin.bottom)

    vis.counties = vis.g.append("g")
                .attr("id", "counties")
                .selectAll("path")
                .data(topojson.feature(vis.us, vis.us.objects.counties).features)
                .enter().append("path")
                .attr("d", vis.path)
                // .attr("class", "county-boundary")
                .attr('fill', d => {
                      if (mapDataString == "poverty_perc") {
                        const datastring = d.properties.poverty_perc;
                        if(datastring){
                          return vis.colorScale(datastring);
                        }
                        else{
                          return 'url(#lightstripe)';
                        }
                      }
                      else if(mapDataString == "median_household_income"){
                        if(d.properties.poverty_perc){
                          return vis.colorScale(d.properties.median_household_income);
                        }
                        else{
                          return 'url(#lightstripe)';
                        }
                      }
                      else if(mapDataString == "percent_smoking"){
                        if(d.properties.percent_smoking){
                          return vis.colorScale(d.properties.percent_smoking);
                        }
                        else{
                          return 'url(#lightstripe)';
                        }
                      }
                      else if(mapDataString == "park_access"){
                        if(d.properties.park_access){
                          return vis.colorScale(d.properties.park_access);
                        }
                        else{
                          return 'url(#lightstripe)';
                        }
                      }
                      else if(mapDataString == "percent_coronary_heart_disease"){
                        if(d.properties.percent_coronary_heart_disease){
                          return vis.colorScale(d.properties.percent_coronary_heart_disease);
                        }
                        else{
                          return 'url(#lightstripe)';
                        }
                      }
                      else if(mapDataString == "percent_high_blood_pressure"){
                        if(d.properties.percent_high_blood_pressure){
                          return vis.colorScale(d.properties.percent_high_blood_pressure);
                        }
                        else{
                          return 'url(#lightstripe)';
                        }
                      }
                      else if(mapDataString == "percent_inactive"){
                        if(d.properties.percent_inactive){
                          return vis.colorScale(d.properties.percent_inactive);
                        }
                        else{
                          return 'url(#lightstripe)';
                        }
                      }
                      else if(mapDataString == "percent_no_heath_insurance"){
                        if(d.properties.percent_no_heath_insurance){
                          return vis.colorScale(d.properties.percent_no_heath_insurance);
                        }
                        else{
                          return 'url(#lightstripe)';
                        }
                      }
                      else if(mapDataString == "number_of_hospitals"){
                        if(d.properties.number_of_hospitals){
                          return vis.colorScale(d.properties.number_of_hospitals);
                        }
                        else{
                          return 'url(#lightstripe)';
                        }
                      }
                      else if(mapDataString == "percent_high_cholesterol"){
                        if(d.properties.percent_high_cholesterol){
                          return vis.colorScale(d.properties.percent_high_cholesterol);
                        }
                        else{
                          return 'url(#lightstripe)';
                        }
                      }
                      else if(mapDataString == "number_of_primary_care_physicians"){
                        if(d.properties.number_of_primary_care_physicians){
                          return vis.colorScale(d.number_of_primary_care_physicians);
                        }
                        else{
                          return 'url(#lightstripe)';
                        }
                      }
                      else if(mapDataString == "air_quality"){
                        if(d.properties.air_quality){
                          return vis.colorScale(d.air_quality);
                        }
                        else{
                          return 'url(#lightstripe)';
                        }
                      }
                      else if(mapDataString == "elderly_percentage"){
                        if(d.properties.elderly_percentage){
                          return vis.colorScale(d.elderly_percentage);
                        }
                        else{
                          return 'url(#lightstripe)';
                        }
                      }
                      else if(mapDataString == "education_less_than_high_school_percentage"){
                        if(d.properties.education_less_than_high_school_percentage){
                          return vis.colorScale(d.education_less_than_high_school_percentage);
                        }
                        else{
                          return 'url(#lightstripe)';
                        }
                      }
                      else if(mapDataString == "percent_stroke"){
                        if(d.properties.percent_stroke){
                          return vis.colorScale(d.percent_stroke);
                        }
                        else{
                          return 'url(#lightstripe)';
                        }
                      }
                    });

      vis.counties
                .on('mousemove', (event, d) => {
                    const popDensity = d.properties.percent_smoking ? `<strong>${d.properties.percent_smoking}</strong> pop. density per km<sup>2</sup>` : 'No data available'; 
                    d3.select('#tooltip')
                      .style('display', 'block')
                      .style('left', (event.pageX + vis.config.tooltipPadding) + 'px')   
                      .style('top', (event.pageY + vis.config.tooltipPadding) + 'px')
                      .html(`
                        <div class="tooltip-title">${d.properties.name}</div>
                        <div>${popDensity}</div>
                      `);
                  })
                  .on('mouseleave', () => {
                    d3.select('#tooltip').style('display', 'none');
                  });



    vis.g.append("path")
                .datum(topojson.mesh(vis.us, vis.us.objects.states, function(a, b) { return a !== b; }))
                .attr("id", "state-borders")
                .attr("d", vis.path);

  }

  
}