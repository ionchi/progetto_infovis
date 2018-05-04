/*
[INFOVIS] Progetto individuale [Ion Chiriac]
=======================================================
Disegna 30 ragni (è sufficiente la silhouette).
Le sovrapposizioni sono permesse.
Facendo click su un ragno questo scompare ma ne appaiono due più piccoli
in posizione randomica nell'area di disegno.
=======================================================
*/

var margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  width = 1200 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// number of data elements
var n = 30
var nodes = [];

const root = d3.select('#root');


 // Returns a random integer between min (inclusive) and max (inclusive)

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (i in d3.range(n)) {
  var newNumber = getRandomInt(0, width / 2);
  nodes.push(newNumber);
}

// Draw the initial SVG
var svg = root.append("svg")
  .attr("width", width)
  .attr("height", height)
  .style('margin-top', '80px')


// Spider svg path
var spider = {
  fill: "#000000",
  stroke: "rgba(0,0,0,.4)",
  d: "M306,595.5c-2.5,0-4-0.5-4-0.5c-78.5-8-70-94-70-94l-28.5,32.5L204,660c23.5,17,61.5,80,61.5,80l-78-76c4-26.5-0.5-137-0.5-137l67-71.5l-67.5,7c-38,34-54,69.5-54,69.5l-1,91.5c-17-51-15.5-96-15.5-96l63-80.3 c44.5-2.3,86.5-15.2,86.5-15.2c-18.5-9.5-88-15.5-88-15.5L116,337c4-67.5,17.5-100,17.5-100v96c16,37,53,68.5,53,68.5l69.5,8	l-69.5-74v-136l79-74.5c0,0-31,52-61.5,79v127.5c0,0,41.5,49,64.5,61.5c0,0,7-8,11.5-8.5c0,0-0.5-19.5,10.5-32.5	c0,0,12,6.5,15.5,18.5 M306,595.3c2.5,0,4-0.5,4-0.5c78.5-8.1,69.8-94.1,69.8-94.1l28.6,32.4l-0.3,126.5 c-23.5,17-61.4,80.1-61.4,80.1l77.9-76.1c-4-26.5,0.2-137,0.2-137l-67.1-71.4l67.5,6.9c38.1,33.9,54.1,69.4,54.1,69.4l1.2,91.5 c16.9-51,15.3-96,15.3-96l-63.1-80.2c-44.5-2.2-86.5-15-86.5-15c18.5-9.5,88-15.7,88-15.7l61.4-79.6c-4.1-67.5-17.7-100-17.7-100 l0.2,96c-15.9,37-52.9,68.6-52.9,68.6l-69.5,8.1L425,335l-0.3-136l-79.1-74.4c0,0,31.1,51.9,61.6,78.9l0.2,127.5 c0,0-41.4,49.1-64.4,61.6c0,0-7-8-11.5-8.5c0,0,0.5-19.5-10.6-32.5c0,0-12,6.5-15.5,18.5",
};

var svgPaths = svg.selectAll(".spider")
  .data(nodes)
  .enter()
  .append('path')
  .attr("class", ".spider")
  .attr("id", "spider")
  .attr("d", spider.d)
  .style("stroke", spider.stroke)
  .style("fill", spider.fill)
  .style('stroke-width', '1')
  .style("transform", function(d) {
    return '' + "scale(.18) rotate(" + getRandomInt(0, 180) + "deg)" + ''
  })
  //moving the svgs
  .style("transform-origin", function(d) {
    return '' + (d + getRandomInt(150, width / 2 - 250)) + 'px' + ' ' + (getRandomInt(150, height - 150)) + 'px' + ''
  })
  .on('click', function() {
    d3.select(this)
      .remove();
    svg.selectAll(".spider")
      .data([1,2])
      .enter()
      .append('path')
      .attr("class", ".spider")
      .attr("id", "spider")
      .attr("d", spider.d)
      .style("stroke", spider.stroke)
      .style("fill", spider.fill)
      .style('stroke-width', '1')
      .style("transform", function(d) {
        return '' + "scale(.05) rotate(" + getRandomInt(0, 180) + "deg)" + ''
      })
      //moving the onclick generated svgs
      .style("transform-origin", function(d) {
        return '' + (getRandomInt(150, width - 150)) + 'px' + ' ' + (getRandomInt(150, height - 150)) + 'px' + ''
      })
      .on('mouseover', function(d) {
        d3.select(this)
          .transition().duration(200) //Set transition
          .style('stroke', 'rgb(222, 255, 0)')
          .style('fill', 'rgb(255, 0, 0)')
          .style('stroke-width', '5')
      })
      .on('mouseout', function(d) {
        d3.select(this)
          .transition().duration(200)
          .style('stroke', spider.stroke)
          .style("fill", spider.fill)
          .style('stroke-width', '1')
      })
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
  })
  .on('mouseover', function(d) {
    d3.select(this)
      .transition().duration(200) //Set transition
      .style('stroke', 'rgb(222, 255, 0)')
      .style('fill', 'rgb(255, 0, 0)')
      .style('stroke-width', '5')
  })
  .on('mouseout', function(d) {
    d3.select(this)
      .transition().duration(200)
      .style('stroke', spider.stroke)
      .style("fill", spider.fill)
      .style('stroke-width', '1')
  })
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));

function dragstarted(d) {
  d3.select(this).raise().classed("active", true);
}

function dragged(d) {
  d3.select(this).style("transform-origin", function(d) {
    return '' + (d3.event.x) + 'px' + ' ' + (d3.event.y + 50) + 'px' + ''
  })
}

function dragended(d) {
  d3.select(this).classed("active", false);
}

const instructions = root.append('div').attr('id', 'instructions').append('div');
instructions.append('p').text('Cliccare sui ragni per farli sparire e generarne due nuovi, piu\' piccoli, in posizione casuale.');
instructions.append('p').text("E\' anche possibile spostare i ragni trascinandoli.");
