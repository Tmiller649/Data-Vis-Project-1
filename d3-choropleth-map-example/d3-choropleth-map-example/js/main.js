/**
 * Load TopoJSON data of the world and the data of the world wonders
 */

Promise.all([
  d3.json('data/counties-10m.json'),
  d3.csv('data/national_health_data.csv')
]).then(data => {
  const geoData = data[0];
  const countyPopulationData = data[1];

  // Combine both datasets by adding the population density to the TopoJSON file
  console.log(geoData);
  geoData.objects.counties.geometries.forEach(d => {
    console.log(d);  
    for (let i = 0; i < countyPopulationData.length; i++) {
      if (d.id === countyPopulationData[i].cnty_fips) {
        d.properties.percent_smoking = +countyPopulationData[i].percent_smoking;
        d.properties.median_household_income = +countyPopulationData[i].median_household_income;
        d.properties.poverty_perc = +countyPopulationData[i].poverty_perc;
        d.properties.percent_coronary_heart_disease = +countyPopulationData[i].percent_coronary_heart_disease;
        d.properties.percent_inactive = +countyPopulationData[i].percent_inactive;
        d.properties.percent_no_heath_insurance = +countyPopulationData[i].percent_no_heath_insurance;
        d.properties.percent_high_cholesterol = +countyPopulationData[i].percent_high_cholesterol;
        d.properties.percent_stroke = +countyPopulationData[i].percent_stroke;
        d.properties.elderly_percentage= +countyPopulationData[i].elderly_percentage;
        d.properties.education_less_than_high_school_percent = +countyPopulationData[i].education_less_than_high_school_percent;
        d.properties.number_of_hospitals = +countyPopulationData[i].number_of_hospitals;
        d.properties.number_of_primary_care_physicians = +countyPopulationData[i].number_of_primary_care_physicians;
        d.properties.park_access = +countyPopulationData[i].park_access;
        d.properties.air_quality = +countyPopulationData[i].air_quality;
      }
    }
  });

  const choroplethMap = new ChoroplethMap({ 
    parentElement: '.viz',   
  }, geoData);
})
.catch(error => console.error(error));

d3.select('#Generate').on('click', function() {

});
////////////////////////////////////////
let data, scatterplot;
d3.csv('data/national_health_data.csv')
  .then(_data => {
    data = _data;
    data.forEach(d => {
      d.median_household_income = +d.median_household_income;
      d.percent_smoking = +d.percent_smoking;
      d.poverty_perc = +d.poverty_perc;
      d.percent_high_cholesterol = +d.percent_high_cholesterol;
      d.percent_coronary_heart_disease = +d.percent_coronary_heart_disease;
      d.percent_stroke = +d.percent_stroke;
      d.high_blood_pressure = +d.high_blood_pressure;
      d.percent_no_heath_insurance = +d.percent_no_heath_insurance;
      d.number_of_primary_care_physicians = +d.number_of_primary_care_physicians;
      d.number_of_hospitals = +d.number_of_hospitals;
      d.elderly_percentage = +d.elderly_percentage;
      d.percent_inactive = +d.percent_inactive;
      d.park_access = +d.park_access;
      d.education_less_than_high_school_percent = +d.education_less_than_high_school_percent;
    });
    
    scatterplot = new Scatterplot({ parentElement: '#scatterplot'}, data);
    scatterplot.updateVis();
    ///////////////////////////////
    const colorScale = d3.scaleOrdinal()
        .range(['#D6EAF8', '#3498DB', '#1B4F72', '#7bc77e']) // light green to dark green
        .domain(['Rural','Small City','Suburban', 'Urban']);
    barchart = new Barchart({
      parentElement: '#barchart',
      colorScale: colorScale
    }, data);
    barchart.updateVis();
  })
  .catch(error => console.error(error));

///////////////////////////////////////////////
d3.select('#Generate').on('click', function() {
  d3.selectAll("#scatterplot > *").remove();
  let data, scatterplot;
  d3.csv('data/national_health_data.csv')
  .then(_data => {
    data = _data;
    data.forEach(d => {
      d.median_household_income = +d.median_household_income;
      d.percent_smoking = +d.percent_smoking;
      d.poverty_perc = +d.poverty_perc;
      d.percent_high_cholesterol = +d.percent_high_cholesterol;
      d.percent_coronary_heart_disease = +d.percent_coronary_heart_disease;
      d.percent_stroke = +d.percent_stroke;
      d.high_blood_pressure = +d.high_blood_pressure;
      d.percent_no_heath_insurance = +d.percent_no_heath_insurance;
      d.number_of_primary_care_physicians = +d.number_of_primary_care_physicians;
      d.number_of_hospitals = +d.number_of_hospitals;
      d.elderly_percentage = +d.elderly_percentage;
      d.percent_inactive = +d.percent_inactive;
      d.park_access = +d.park_access;
      d.education_less_than_high_school_percent = +d.education_less_than_high_school_percent;
    });
    
    scatterplot = new Scatterplot({ parentElement: '#scatterplot'}, data);
    scatterplot.updateVis();
  })
  .catch(error => console.error(error));

});
d3.select('#MapData').on('change', function(){
  d3.selectAll("#choroplethMap > *").remove();
  Promise.all([
    d3.json('data/counties-10m.json'),
    d3.csv('data/national_health_data.csv')
  ]).then(data => {
    const geoData = data[0];
    const countyPopulationData = data[1];
  
    // Combine both datasets by adding the population density to the TopoJSON file
    console.log(geoData);
    geoData.objects.counties.geometries.forEach(d => {
      console.log(d);  
      for (let i = 0; i < countyPopulationData.length; i++) {
        if (d.id === countyPopulationData[i].cnty_fips) {
          d.properties.percent_smoking = +countyPopulationData[i].percent_smoking;
          d.properties.median_household_income = +countyPopulationData[i].median_household_income;
          d.properties.poverty_perc = +countyPopulationData[i].poverty_perc;
          d.properties.percent_coronary_heart_disease = +countyPopulationData[i].percent_coronary_heart_disease;
          d.properties.percent_inactive = +countyPopulationData[i].percent_inactive;
          d.properties.percent_no_heath_insurance = +countyPopulationData[i].percent_no_heath_insurance;
          d.properties.percent_high_cholesterol = +countyPopulationData[i].percent_high_cholesterol;
          d.properties.percent_stroke = +countyPopulationData[i].percent_stroke;
          d.properties.elderly_percentage= +countyPopulationData[i].elderly_percentage;
          d.properties.education_less_than_high_school_percent = +countyPopulationData[i].education_less_than_high_school_percent;
          d.properties.number_of_hospitals = +countyPopulationData[i].number_of_hospitals;
          d.properties.number_of_primary_care_physicians = +countyPopulationData[i].number_of_primary_care_physicians;
          d.properties.park_access = +countyPopulationData[i].park_access;
          d.properties.air_quality = +countyPopulationData[i].air_quality;
          d.properties.display_name = +countyPopulationData[i].display_name;
        }
      }
    });
  
    const choroplethMap = new ChoroplethMap({ 
      parentElement: '.viz',   
    }, geoData);
  })
  .catch(error => console.error(error));
})

// d3.select('#Xaxis').on('change', function() {
//   scatterplot.updateVis();
// });
// d3.select('#Yaxis').on('change', function() {
//   scatterplot.updateVis();
// });



