var usaMap;
var data;
d3.csv("2016_us_states_data.csv", function(error, allData) {

    allData.forEach(function(d) {
        // Convert numeric values to 'numbers'
        d['POPULATION'] = +d['POPULATION'];
        d['UNEMPLOYMENT_RATE'] = +d['UNEMPLOYMENT_RATE'];
        d['AVERAGE_SALARY/MON'] = +d['AVERAGE_SALARY/MON'];
        d['MORTALITY_RATE'] = +d['MORTALITY_RATE'];
        d['PRICE/SQ. FT.'] = +d['PRICE/SQ. FT.'];
    });

    data=allData;
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
    barChart.updateBarChart(value)
    clearFields()
    document.getElementById("infoPanel").style.display="none"
}

function clearFields() {
    document.getElementById('population').value=''
    document.getElementById('population').innerHTML=''
    document.getElementById('unemployement').value=''
    document.getElementById('unemployement').innerHTML=''
    document.getElementById('mortality').value=''
    document.getElementById('mortality').innerHTML=''
    document.getElementById('salary').value=''
    document.getElementById('salary').innerHTML=''
    document.getElementById('rental').value=''
    document.getElementById('rental').innerHTML=''
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

function getTopStates(){
    document.getElementById("infoPanel").style.display="block"
    var unemployement=document.getElementById('unemployement')
    var mortality=document.getElementById('mortality')
    var salary=document.getElementById('salary')
    var rental=document.getElementById('rental')
    var population=document.getElementById('population')
    if(unemployement && mortality && salary && rental && population) {
        if (unemployement.value != '' && mortality.value != '' && salary.value != '' &&
            rental.value != '' && population.value != '') {
            if(checkRange(unemployement.value)&&checkRange(mortality.value)&&checkRange(salary.value)
                &&checkRange(rental.value)&&checkRange(population.value)){

                var statesDataArr= new Array()
                for(i=0;i<data.length;i++){
                    statesDataArr[i]=new Array();
                    statesDataArr[i][0]=data[i]["RegionName"]
                    var calculatedVal= (parseFloat(data[i]["UNEMPLOYMENT_RATE"]*unemployement.value))+
                        parseFloat((data[i]["POPULATION"]*population.value))+
                        parseFloat((data[i]["AVERAGE_SALARY/MON"]*rental.value))+
                        parseFloat((data[i]["PRICE/SQ. FT."]*salary.value))+
                        parseFloat((data[i]["MORTALITY_RATE"]*mortality.value))
                    statesDataArr[i][1] = calculatedVal

                }
                statesDataArr.sort(function(a, b){return b[1] - a[1]});

                for(i=0;i<statesDataArr.length;i++){
                    statesDataArr[i][1] =  statesDataArr[i][1]/statesDataArr[statesDataArr.length-1][1]
                }
                var topStates=[statesDataArr[0][0],statesDataArr[1][0],statesDataArr[2][0]]
                document.getElementById("state1").innerHTML=statesDataArr[0][0]
                document.getElementById("state2").innerHTML=statesDataArr[1][0]
                document.getElementById("state3").innerHTML=statesDataArr[2][0]
                usaMap.highlightMap(topStates)

            }
        }
    }
    clearFields()
}

function checkRange(value){
    if(value>=1 && value <= 5){
        return true;
    }else{
        return false;
    }
}