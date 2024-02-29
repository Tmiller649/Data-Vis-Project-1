/**
 * Load TopoJSON data of the world and the data of the world wonders
 */


////////////////////////////////////////
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
        d.properties.high_blood_pressure = +countyPopulationData[i].high_blood_pressure;
      }
    }
  });

  choroplethMap1 = new ChoroplethMap({ 
    parentElement: '#choroplethMap1',   
  }, geoData);
  choroplethMap2 = new ChoroplethMap({ 
    parentElement: '#choroplethMap2',   
  }, geoData);

  choroplethMap1.initVis("poverty_perc", ['#cfe2f2', '#0d306b'])
  choroplethMap2.initVis("median_household_income", ['#f29d9d', '#6b0d13'])
})
.catch(error => console.error(error));
///////////////////////////////////////////////
d3.select('#GeneratePlot').on('click', function() {
  d3.selectAll("#scatterplot > *").remove();
  d3.selectAll("#barchart > *").remove();
  let data, scatterplot, barchart;
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
      d.percent_high_blood_pressure = +d.percent_high_blood_pressure;
      d.percent_no_heath_insurance = +d.percent_no_heath_insurance;
      d.number_of_primary_care_physicians = +d.number_of_primary_care_physicians;
      d.number_of_hospitals = +d.number_of_hospitals;
      d.elderly_percentage = +d.elderly_percentage;
      d.percent_inactive = +d.percent_inactive;
      d.park_access = +d.park_access;
      d.education_less_than_high_school_percent = +d.education_less_than_high_school_percent;
    });
    
    scatterplot = new Scatterplot({ parentElement: '#scatterplot'}, data)
    barchart = new Barchart({parentElement: '#barchart'}, data)
  })
  .catch(error => console.error(error));

});


d3.select('#GenerateMap1').on('click', function() {
  d3.selectAll("#choroplethMap1 > *").remove();
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
          d.properties.percent_high_blood_pressure = +countyPopulationData[i].percent_high_blood_pressure;
        }
      }
    });
  
    choroplethMap1 = new ChoroplethMap({ 
      parentElement: '#choroplethMap1',   
    }, geoData);

    choroplethMap1.initVis(d3.select("#MapData1").node().value, ['#cfe2f2', '#0d306b'])

  })
  .catch(error => console.error(error));
})

d3.select('#GenerateMap2').on('click', function() {
  d3.selectAll("#choroplethMap2 > *").remove();
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
          d.properties.percent_high_blood_pressure = +countyPopulationData[i].percent_high_blood_pressure;
        }
      }
    });
  
    choroplethMap2 = new ChoroplethMap({ 
      parentElement: '#choroplethMap2',   
    }, geoData);

    choroplethMap2.initVis(d3.select("#MapData2").node().value, ['#f29d9d', '#6b0d13'])
  })
  .catch(error => console.error(error));
})



