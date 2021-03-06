let drawParallelPlotChart = function(data){
  console.log(data);
  //create svg
  let margin = {
    top:20,
    right: 10,
    bottom: 10,
    left: 20
  };
  let svg = d3.select("body").select(".parallel");
  //plots for svg
  let bounds = svg.node().getBoundingClientRect();
  let width = bounds.width - margin.left - margin.right;
  let height = bounds.height - margin.top - margin.bottom;

  // append the svg object to the body of the page
    svg.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", translate(margin.left, margin.top));

  //get data from csv file
  dimensions = d3.keys(data[0]).filter(function(d) { return d != "region" })
  console.log(dimensions);

  var y = {}
  for (i in dimensions) {
    name = dimensions[i]
    y[name] = d3.scaleLinear()
      .domain( d3.extent(data, function(d) { return +d[name]; }) )
      .range([height, 0])
  }

  // Build the X scale -> it find the best position for each Y axis
  x = d3.scalePoint()
    .range([0, width])
    .padding(0.35)
    .domain(dimensions)

  // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
    function path(d) {
        return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p]) + margin.top ]; }));
    }
//region -> colors
// Color scale: give me a region name, I return a color
  var color = d3.scaleOrdinal()
  .domain(["1", "2", "3", "4"])
  .range(["red", "blue", "green", "yellow"]);
  //add color legend
  //legends
      svg.append("text")
        .attr("class", "text")
        .attr("x", width - 60)
        .attr("y", margin.top)
        .text("Region")
        .attr("alignment-baseline","middle")
      svg.append("rect")
        .attr("x", width - 60)
        .attr("y", margin.top /2 + 20)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", "red")
      svg.append("rect")
          .attr("x", width - 60)
          .attr("y", margin.top + margin.right + 20)
          .attr("width", 15)
          .attr("height", 15)
          .style("fill", "blue")
      svg.append("rect")
          .attr("x", width - 60)
          .attr("y", margin.top + margin.right + 40)
          .attr("width", 15)
          .attr("height", 15)
          .style("fill", "green")
      svg.append("rect")
          .attr("x", width - 60)
          .attr("y", margin.top + margin.right + 60)
          .attr("width", 15)
          .attr("height", 15)
          .style("fill", "yellow")

          //text for legend
      svg.append("text")
      .attr("class", "legend-text")
      .attr("x", width - 40)
      .attr("y", margin.top/2 + 30)
      .text("1-Northeast")
      .attr("alignment-baseline","middle")
      svg
      .append("text")
      .attr("class", "legend-text")
      .attr("x", width - 40)
      .attr("y", margin.top + margin.right + 30)
      .text("2-Midwest")
      .attr("alignment-baseline","middle")
      svg
      .append("text")
      .attr("class", "legend-text")
      .attr("x", width - 40)
      .attr("y", margin.top + margin.right + 50)
      .text("3-South")
      .attr("alignment-baseline","middle")
      svg
      .append("text")
      .attr("class", "legend-text")
      .attr("x", width - 40)
      .attr("y", margin.top + margin.right + 70)
      .text("4-West")
      .attr("alignment-baseline","middle")

    // Draw the lines
  svg
    .selectAll("myPath")
    .data(data)
    .enter().append("path")
    .attr("d",  path)
    .style("fill", "none")
    .style("stroke", function(d){ return( color(d.region))})
    .style("opacity", 0.5)


    // Draw the axis:
  svg.selectAll("myAxis")
    // For each dimension of the dataset I add a 'g' element:
    .data(dimensions).enter()
    .append("g")
    // I translate this element to its right position on the x axis
    .attr("transform", function(d) { return translate(x(d), margin.top); })
    // And I build the axis with the call function
    .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
    // Add axis title
    .append("text")
      .attr("class", "text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .text(function(d) { return d; })
      .style("fill", "black")
};

function translate(x,y)
{
  return "translate (" + x + "," + y + ")";
}
