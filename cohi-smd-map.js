var width = 960;
var height = 500;

var svg = d3.select("body").append("svg")
  .attr("width",width)
  .attr("height",height)

var projection = d3.geoAlbers();

var path = d3.geoPath()
  .projection(projection);

var dc = 0;
var url = "https://opendata.dc.gov/datasets/890415458c4c40c3ada2a3c48e3d9e59_21.geojson";

d3.json(url, function(err, dc) {
  var cohi_feature_array = _.filter(dc.features,function(f) { return _.includes(f.properties.ANC_ID, "1") });
  projection.scale(1).translate([0,0]);

  var cohi_feature_collection = dc
  cohi_feature_collection.features = cohi_feature_array

  // from stackoverflow http://stackoverflow.com/questions/14492284/center-a-map-in-d3-given-a-geojson-object
  var b = path.bounds(cohi_feature_collection),
      s = 0.9 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
      t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

  projection.scale(s).translate(t);

  svg.selectAll("path")
    .data(cohi_feature_array)
    .enter().append("path")
    .attr("class", function(d) { return "smd" })
    .attr("id", function(d) { return d.properties.SMD_ID })
    .attr("d", path);
})


