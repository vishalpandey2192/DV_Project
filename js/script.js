var usaMap;
var data;
var employmentData =[];
var populationData=[];
var mortalityData=[];
var rentalData=[];
var salaryData=[];
var index = 0;
var topStates = []
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

function get2016Data() {
    d3.csv("2016_us_states_data.csv", function(error, allData) {
        allData.forEach(function(d) {
            // Convert numeric values to 'numbers'
            d['POPULATION'] = +d['POPULATION'];
            d['UNEMPLOYMENT_RATE'] = +d['UNEMPLOYMENT_RATE'];
            d['AVERAGE_SALARY/MON'] = +d['AVERAGE_SALARY/MON'];
            d['MORTALITY_RATE'] = +d['MORTALITY_RATE'];
            d['PRICE/SQ. FT.'] = +d['PRICE/SQ. FT.'];
        });

        employmentData[index] = new Object();
        employmentData[index].year= 2016;
        employmentData[index].data= new Array();

        populationData[index]= new Object()
        populationData[index].year = 2016
        populationData[index].data= new Array()

        salaryData[index]= new Object()
        salaryData[index].year = 2016
        salaryData[index].data = new Array()

        mortalityData[index]= new Object()
        mortalityData[index].year=2016
        mortalityData[index].data = new Array()

        rentalData[index]= new Object()
        rentalData[index].year=2016
        rentalData[index].data= new Array()

        for(var j=0;j<topStates.length;j++) {
            for (var i = 0; i < allData.length; i++) {
                if(topStates[j]==allData[i]["RegionName"]) {
                    employmentData[index]['data'][i] = allData[i]['UNEMPLOYMENT_RATE'];
                    populationData[index]['data'][i] = allData[i]['POPULATION']
                    salaryData[index]['data'][i] = allData[i]['AVERAGE_SALARY/MON']
                    mortalityData[index]['data'][i] = allData[i]['MORTALITY_RATE']
                    rentalData[index]['data'][i] = allData[i]['PRICE/SQ. FT.']
                }
            }
        }
        index++;
        get2015Data()
    });

}

function get2015Data() {

    d3.csv("2015_us_states_data.csv", function(error, allData) {
      //  var defer = $.Deferred();
        allData.forEach(function(d) {
            // Convert numeric values to 'numbers'
            d['POPULATION'] = +d['POPULATION'];
            d['UNEMPLOYMENT_RATE'] = +d['UNEMPLOYMENT_RATE'];
            d['AVERAGE_SALARY/MON'] = +d['AVERAGE_SALARY/MON'];
            d['MORTALITY_RATE'] = +d['MORTALITY_RATE'];
            d['PRICE/SQ. FT.'] = +d['PRICE/SQ. FT.'];
        });

        employmentData[index] = new Object();
        employmentData[index].year= 2015;
        employmentData[index].data= new Array();

        populationData[index]= new Object()
        populationData[index].year = 2015
        populationData[index].data= new Array()

        salaryData[index]= new Object()
        salaryData[index].year = 2015
        salaryData[index].data = new Array()

        mortalityData[index]= new Object()
        mortalityData[index].year=2015
        mortalityData[index].data = new Array()

        rentalData[index]= new Object()
        rentalData[index].year=2015
        rentalData[index].data= new Array()

        for(var j=0;j<topStates.length;j++) {
            for (var i = 0; i < allData.length; i++) {
                if(topStates[j]==allData[i]["RegionName"]) {
                    employmentData[index]['data'][j] = allData[i]['UNEMPLOYMENT_RATE'];
                    populationData[index]['data'][j] = allData[i]['POPULATION']
                    salaryData[index]['data'][j] = allData[i]['AVERAGE_SALARY/MON']
                    mortalityData[index]['data'][j] = allData[i]['MORTALITY_RATE']
                    rentalData[index]['data'][j] = allData[i]['PRICE/SQ. FT.']
                }
            }
        }
        index++;
        get2014Data()
        // setTimeout(function () {
        //     defer.resolve();
        // }, 5000);
        //
        // return defer.promise()
    });
}

function get2014Data() {
    d3.csv("2014_us_states_data.csv", function(error, allData) {
        //var defer = $.Deferred();
        allData.forEach(function(d) {
            // Convert numeric values to 'numbers'
            d['POPULATION'] = +d['POPULATION'];
            d['UNEMPLOYMENT_RATE'] = +d['UNEMPLOYMENT_RATE'];
            d['AVERAGE_SALARY/MON'] = +d['AVERAGE_SALARY/MON'];
            d['MORTALITY_RATE'] = +d['MORTALITY_RATE'];
            d['PRICE/SQ. FT.'] = +d['PRICE/SQ. FT.'];
        });

        employmentData[index] = new Object();
        employmentData[index].year= 2014;
        employmentData[index].data= new Array();

        populationData[index]= new Object()
        populationData[index].year = 2014
        populationData[index].data= new Array()

        salaryData[index]= new Object()
        salaryData[index].year = 2014
        salaryData[index].data = new Array()

        mortalityData[index]= new Object()
        mortalityData[index].year=2014
        mortalityData[index].data = new Array()

        rentalData[index]= new Object()
        rentalData[index].year=2014
        rentalData[index].data= new Array()
        for(var j=0;j<topStates.length;j++) {
            for (var i = 0; i < allData.length; i++) {
                if(topStates[j]==allData[i]["RegionName"]) {
                    employmentData[index]['data'][j] = allData[i]['UNEMPLOYMENT_RATE'];
                    populationData[index]['data'][j] = allData[i]['POPULATION']
                    salaryData[index]['data'][j] = allData[i]['AVERAGE_SALARY/MON']
                    mortalityData[index]['data'][j] = allData[i]['MORTALITY_RATE']
                    rentalData[index]['data'][j] = allData[i]['PRICE/SQ. FT.']
                }
            }
        }
        index++;
        // setTimeout(function () {
        //     defer.resolve();
        // }, 5000);
        //
        // return defer;
        get2013Data()
    });

}

function get2013Data() {
    d3.csv("2013_us_states_data.csv", function(error, allData) {
       // var defer = $.Deferred();
        allData.forEach(function(d) {
            // Convert numeric values to 'numbers'
            d['POPULATION'] = +d['POPULATION'];
            d['UNEMPLOYMENT_RATE'] = +d['UNEMPLOYMENT_RATE'];
            d['AVERAGE_SALARY/MON'] = +d['AVERAGE_SALARY/MON'];
            d['MORTALITY_RATE'] = +d['MORTALITY_RATE'];
            d['PRICE/SQ. FT.'] = +d['PRICE/SQ. FT.'];
        });

        employmentData[index] = new Object();
        employmentData[index].year= 2013;
        employmentData[index].data= new Array();

        populationData[index]= new Object()
        populationData[index].year = 2013
        populationData[index].data= new Array()

        salaryData[index]= new Object()
        salaryData[index].year = 2013
        salaryData[index].data = new Array()

        mortalityData[index]= new Object()
        mortalityData[index].year=2013
        mortalityData[index].data = new Array()

        rentalData[index]= new Object()
        rentalData[index].year=2013
        rentalData[index].data= new Array()
        for(var j=0;j<topStates.length;j++) {
            for (var i = 0; i < allData.length; i++) {
                if(topStates[j]==allData[i]["RegionName"]) {
                    employmentData[index]['data'][j] = allData[i]['UNEMPLOYMENT_RATE'];
                    populationData[index]['data'][j] = allData[i]['POPULATION']
                    salaryData[index]['data'][j] = allData[i]['AVERAGE_SALARY/MON']
                    mortalityData[index]['data'][j] = allData[i]['MORTALITY_RATE']
                    rentalData[index]['data'][j] = allData[i]['PRICE/SQ. FT.']
                }
            }
        }
        index++;
        // setTimeout(function () {
        //     defer.resolve();
        // }, 5000);
        //
        // return defer;
        get2012Data()
    });

}

function get2012Data() {
    d3.csv("2012_us_states_data.csv", function(error, allData) {
        //var defer = $.Deferred();
        allData.forEach(function(d) {
            // Convert numeric values to 'numbers'
            d['POPULATION'] = +d['POPULATION'];
            d['UNEMPLOYMENT_RATE'] = +d['UNEMPLOYMENT_RATE'];
            d['AVERAGE_SALARY/MON'] = +d['AVERAGE_SALARY/MON'];
            d['MORTALITY_RATE'] = +d['MORTALITY_RATE'];
            d['PRICE/SQ. FT.'] = +d['PRICE/SQ. FT.'];
        });

        employmentData[index] = new Object();
        employmentData[index].year= 2012;
        employmentData[index].data= new Array();

        populationData[index]= new Object()
        populationData[index].year = 2012
        populationData[index].data= new Array()

        salaryData[index]= new Object()
        salaryData[index].year = 2012
        salaryData[index].data = new Array()

        mortalityData[index]= new Object()
        mortalityData[index].year=2012
        mortalityData[index].data = new Array()

        rentalData[index]= new Object()
        rentalData[index].year=2012
        rentalData[index].data= new Array()
        for(var j=0;j<topStates.length;j++) {
            for (var i = 0; i < allData.length; i++) {
                if(topStates[j]==allData[i]["RegionName"]) {
                    employmentData[index]['data'][j] = allData[i]['UNEMPLOYMENT_RATE'];
                    populationData[index]['data'][j] = allData[i]['POPULATION']
                    salaryData[index]['data'][j] = allData[i]['AVERAGE_SALARY/MON']
                    mortalityData[index]['data'][j] = allData[i]['MORTALITY_RATE']
                    rentalData[index]['data'][j] = allData[i]['PRICE/SQ. FT.']
                }
            }
        }
        index++;
        // setTimeout(function () {
        //     defer.resolve();
        // }, 5000);
        //
        // return defer;
        get2011Data()
    });
}

function get2011Data() {
    d3.csv("2011_us_states_data.csv", function(error, allData) {
       // var defer = $.Deferred();
        allData.forEach(function(d) {
            // Convert numeric values to 'numbers'
            d['POPULATION'] = +d['POPULATION'];
            d['UNEMPLOYMENT_RATE'] = +d['UNEMPLOYMENT_RATE'];
            d['AVERAGE_SALARY/MON'] = +d['AVERAGE_SALARY/MON'];
            d['MORTALITY_RATE'] = +d['MORTALITY_RATE'];
            d['PRICE/SQ. FT.'] = +d['PRICE/SQ. FT.'];
        });

        employmentData[index] = new Object();
        employmentData[index].year= 2011;
        employmentData[index].data= new Array();

        populationData[index]= new Object()
        populationData[index].year = 2011
        populationData[index].data= new Array()

        salaryData[index]= new Object()
        salaryData[index].year = 2011
        salaryData[index].data = new Array()

        mortalityData[index]= new Object()
        mortalityData[index].year=2011
        mortalityData[index].data = new Array()

        rentalData[index]= new Object()
        rentalData[index].year=2011
        rentalData[index].data= new Array()
        for(var j=0;j<topStates.length;j++) {
            for (var i = 0; i < allData.length; i++) {
                if(topStates[j]==allData[i]["RegionName"]) {
                    employmentData[index]['data'][j] = allData[i]['UNEMPLOYMENT_RATE'];
                    populationData[index]['data'][j] = allData[i]['POPULATION']
                    salaryData[index]['data'][j] = allData[i]['AVERAGE_SALARY/MON']
                    mortalityData[index]['data'][j] = allData[i]['MORTALITY_RATE']
                    rentalData[index]['data'][j] = allData[i]['PRICE/SQ. FT.']
                }
            }
        }
        index++;
        // setTimeout(function () {
        //     defer.resolve();
        // }, 5000);
        //
        // return defer;
        get2010Data()
    });
}

function get2010Data() {
    d3.csv("2010_us_states_data.csv", function (error, allData) {
        //var defer = $.Deferred();

        // console.log('c() called');


        allData.forEach(function (d) {
            // Convert numeric values to 'numbers'
            d['POPULATION'] = +d['POPULATION'];
            d['UNEMPLOYMENT_RATE'] = +d['UNEMPLOYMENT_RATE'];
            d['AVERAGE_SALARY/MON'] = +d['AVERAGE_SALARY/MON'];
            d['MORTALITY_RATE'] = +d['MORTALITY_RATE'];
            d['PRICE/SQ. FT.'] = +d['PRICE/SQ. FT.'];
        });

        employmentData[index] = new Object();
        employmentData[index].year = 2010;
        employmentData[index].data = new Array();

        populationData[index] = new Object()
        populationData[index].year = 2010
        populationData[index].data = new Array()

        salaryData[index] = new Object()
        salaryData[index].year = 2010
        salaryData[index].data = new Array()

        mortalityData[index] = new Object()
        mortalityData[index].year = 2010
        mortalityData[index].data = new Array()

        rentalData[index] = new Object()
        rentalData[index].year = 2010
        rentalData[index].data = new Array()
        for (var j = 0; j < topStates.length; j++) {
            for (var i = 0; i < allData.length; i++) {
                if (topStates[j] == allData[i]["RegionName"]) {
                    employmentData[index]['data'][j] = allData[i]['UNEMPLOYMENT_RATE'];
                    populationData[index]['data'][j] = allData[i]['POPULATION']
                    salaryData[index]['data'][j] = allData[i]['AVERAGE_SALARY/MON']
                    mortalityData[index]['data'][j] = allData[i]['MORTALITY_RATE']
                    rentalData[index]['data'][j] = allData[i]['PRICE/SQ. FT.']
                }
            }
        }
        index++;
        console.log(employmentData)
        drawLineChart();
        // setTimeout(function () {
        //     defer.resolve();
        // }, 5000);
        //
        // return defer;

    });
}




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
                    // data[i]["POPULATION"]=1
                    var calculatedVal= (parseFloat(data[i]["UNEMPLOYMENT_RATE"]*unemployement.value))+
                        parseFloat((data[i]["POPULATION"]*population.value))+
                        parseFloat((data[i]["AVERAGE_SALARY/MON"]*rental.value))+
                        parseFloat((data[i]["PRICE/SQ. FT."]*salary.value))+
                        parseFloat((data[i]["MORTALITY_RATE"]*mortality.value))
                    statesDataArr[i][1] = calculatedVal
                    statesDataArr[i][2] = parseFloat(data[i]["UNEMPLOYMENT_RATE"]*unemployement.value)
                    statesDataArr[i][3] = parseFloat((data[i]["POPULATION"]*population.value))
                    statesDataArr[i][4] = parseFloat((data[i]["AVERAGE_SALARY/MON"]*rental.value))
                    statesDataArr[i][5] = parseFloat((data[i]["PRICE/SQ. FT."]*salary.value))
                    statesDataArr[i][6] = parseFloat((data[i]["MORTALITY_RATE"]*mortality.value))

                }
                statesDataArr.sort(function(a, b){return b[1] - a[1]});

                for(i=0;i<statesDataArr.length;i++){
                    statesDataArr[i][1] =  statesDataArr[i][1]/statesDataArr[statesDataArr.length-1][1]
                }
                topStates=[statesDataArr[0][0],statesDataArr[1][0],statesDataArr[2][0]]
                var arr_state1=[ statesDataArr[0][1],statesDataArr[0][2],statesDataArr[0][3],statesDataArr[0][4],statesDataArr[0][5]
                    ,statesDataArr[0][6] ]
                var arr_state2=[statesDataArr[1][1],statesDataArr[1][2],statesDataArr[1][3],statesDataArr[1][4],statesDataArr[1][5]
                    ,statesDataArr[1][6]]
                var arr_state3=[statesDataArr[2][1],statesDataArr[2][2],statesDataArr[2][3],statesDataArr[2][4],statesDataArr[2][5]
                    ,statesDataArr[2][6] ]


                document.getElementById("state1").innerHTML="1. "+statesDataArr[0][0]
                document.getElementById("state2").innerHTML="2. "+statesDataArr[1][0]
                document.getElementById("state3").innerHTML="3. "+statesDataArr[2][0]
                usaMap.displayWeights(arr_state1,'weight1')
                usaMap.displayWeights(arr_state2,'weight2')
                usaMap.displayWeights(arr_state3,'weight3')

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

var option
function plotLineChart(parameter){
    option = parameter
     employmentData =[];
     populationData=[];
     mortalityData=[];
     rentalData=[];
     salaryData=[];
     index=0;
    get2016Data()

   // }
}

function drawLineChart() {
    var unemp_arr = new Array();

    for(var i=0;i<topStates.length;i++){
        unemp_arr[i] = new Array()
        unemp_arr[i].state=topStates[i];
        unemp_arr[i].values = new Array();
        for(var j=0;j<employmentData.length;j++){
            unemp_arr[i]['values'][j]=employmentData[j]['data'][i]
        }
    }

    var pop_arr = new Array();

    for(var i=0;i<topStates.length;i++){
        pop_arr[i] = new Array()
        pop_arr[i].state=topStates[i];
        pop_arr[i].values = new Array();
        for(var j=0;j<populationData.length;j++){
            pop_arr[i]['values'][j]=populationData[j]['data'][i]
        }
    }

    var sal_arr = new Array();

    for(var i=0;i<topStates.length;i++){
        sal_arr[i] = new Array()
        sal_arr[i].state=topStates[i];
        sal_arr[i].values = new Array();
        for(var j=0;j<salaryData.length;j++){
            sal_arr[i]['values'][j]=salaryData[j]['data'][i]
        }
    }

    var rent_arr = new Array();

    for(var i=0;i<topStates.length;i++){
        rent_arr[i] = new Array()
        rent_arr[i].state=topStates[i];
        rent_arr[i].values = new Array();
        for(var j=0;j<rentalData.length;j++){
            rent_arr[i]['values'][j]=rentalData[j]['data'][i]
        }
    }

    var mor_arr = new Array();

    for(var i=0;i<topStates.length;i++){
        mor_arr[i] = new Array()
        mor_arr[i].state=topStates[i];
        mor_arr[i].values = new Array();
        for(var j=0;j<mortalityData.length;j++){
            mor_arr[i]['values'][j]=mortalityData[j]['data'][i]
        }
    }

    var line
    if(option=="unemployement") {
        line = new LineChart(option, unemp_arr);
    }else if(option=="population"){
        line = new LineChart(option, pop_arr);
    }else if(option=="salary"){
        line = new LineChart(option, sal_arr);
    }else if(option=="rental"){
        line = new LineChart(option, rent_arr);
    }else{
        line = new LineChart(option, mor_arr);
    }
    line.update()
}