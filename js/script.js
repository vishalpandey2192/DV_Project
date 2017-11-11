var usaMap;

d3.csv("2016_us_states_data.csv", function(error, allData) {

    allData.forEach(function(d) {
        // Convert numeric values to 'numbers'
        d['POPULATION'] = +d['POPULATION'];
        d['UNEMPLOYMENT_RATE'] = +d['UNEMPLOYMENT_RATE'];
        d['AVERAGE_SALARY/MON'] = +d['AVERAGE_SALARY/MON'];
        d['MORTALITY_RATE'] = +d['MORTALITY_RATE'];
        d['PRICE/SQ. FT.'] = +d['PRICE/SQ. FT.'];
    });

    usaMap = new Map(allData);
    window.barChart = new BarChart(allData);


    d3.json("us-state-centroid.json", function(json) {
        usaMap.drawMap(json, 'unemployement');
        // Draw the Bar chart for the first time
        barChart.updateBarChart('unemployement');
    });

});

function updateMap(value) {
    var map = d3.select("#map-view").selectAll("path");
    map.remove().exit();
    d3.select("#bar-chart").selectAll("rect").classed("highlight-class", false)
    document.getElementById('table').innerHTML = '';
    usaMap.updateMap(value)
    barChart.updateBarChart(value);
}

function createTableForClickedState(selectedState) {
    var body = document.getElementById("table");
    body.innerHTML = '';

    // creates a <table> element and a <tbody> element
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    cell.setAttribute("class", "bold");
    var cellText = document.createTextNode("Parameters");
    cell.appendChild(cellText);
    row.appendChild(cell);

    var cell = document.createElement("td");
    cell.setAttribute("class", "bold");
    var cellText = document.createTextNode(selectedState["RegionName"]);
    cell.appendChild(cellText);
    row.appendChild(cell);

    var cell = document.createElement("td");
    cell.setAttribute("class", "bold");
    var cellText = document.createTextNode("National Average");
    cell.appendChild(cellText);
    row.appendChild(cell);

    tblBody.appendChild(row);

    row = document.createElement("tr");
    cell = document.createElement("td");
    cell.setAttribute("class", "bold");

    cellText = document.createTextNode("Rental Price($/sq. ft.)");
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellText = document.createTextNode(selectedState["PRICE/SQ. FT."]);
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellText = document.createTextNode(selectedState["NA PRICE/SQ. FT."]);
    cell.appendChild(cellText);
    row.appendChild(cell);

    tblBody.appendChild(row);

    row = document.createElement("tr");
    cell = document.createElement("td");
    cell.setAttribute("class", "bold");
    cellText = document.createTextNode("Mortality Rate (%)");
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellText = document.createTextNode(selectedState["MORTALITY_RATE"]);
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellText = document.createTextNode(selectedState["NA MORTALITY_RATE"]);
    cell.appendChild(cellText);
    row.appendChild(cell);

    tblBody.appendChild(row);

    row = document.createElement("tr");
    cell = document.createElement("td");
    cell.setAttribute("class", "bold");
    cellText = document.createTextNode("Population");
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellText = document.createTextNode(selectedState["POPULATION"]);
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellText = document.createTextNode(selectedState["NA POPULATION"]);
    cell.appendChild(cellText);
    row.appendChild(cell);

    tblBody.appendChild(row);

    row = document.createElement("tr");
    cell = document.createElement("td");
    cell.setAttribute("class", "bold");
    cellText = document.createTextNode("Unemployement Rate (%)");

    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellText = document.createTextNode(selectedState["UNEMPLOYMENT_RATE"]);
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellText = document.createTextNode(selectedState["NA UNEMPLOYMENT_RATE"]);
    cell.appendChild(cellText);
    row.appendChild(cell);

    tblBody.appendChild(row);

    row = document.createElement("tr");
    cell = document.createElement("td");
    cell.setAttribute("class", "bold");

    cellText = document.createTextNode("Average Salary ($)");
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellText = document.createTextNode(selectedState["AVERAGE_SALARY/MON"]);
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellText = document.createTextNode(selectedState["NA AVERAGE_SALARY/MON"]);
    cell.appendChild(cellText);
    row.appendChild(cell);

    tblBody.appendChild(row);

    tbl.appendChild(tblBody);
    body.appendChild(tbl);
    tbl.setAttribute("border", "2");
    tbl.setAttribute("class", "table-class table")
}