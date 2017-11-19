/** Class implementing the map view. */
class Map {
    /**
     * Creates a Map Object
     */
    constructor(allData) {
        //Width and height of map
        this.width = 760;
        this.height = 500;
        this.data = allData


        //Create SVG element and append map to the SVG
        this.svg = d3.select("#map-view")
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height);

    }

    updateMap(option) {

        var value = this.getCSVPropertyName(option)
        var col = "rgb(217,91,67)"
        var yMin = d3.min(this.data, function(d) {
            return d[value];
        })
        var yMax = d3.max(this.data, function(d) {
            return d[value];
        })

        var color = d3.scaleLinear()
            .domain([yMin, yMax])
            .range([d3.rgb(col).brighter(), d3.rgb(col).darker()]);

        //adding tooltip
        var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip-title")
            .style("opacity", 0);

        for (var i = 0; i < this.data.length; i++) {

            // Grab State Name
            var dataState = this.data[i].RegionName;

            // Grab data value
            var dataValue = this.data[i][value];

            // Find the corresponding state inside the GeoJSON
            for (var j = 0; j < this.statesJson.features.length; j++) {
                var jsonState = this.statesJson.features[j].properties.name;

                if (dataState == jsonState) {

                    // Copy the data value into the JSON
                    this.statesJson.features[j].properties[value] = dataValue;

                    // Stop looking through the JSON
                    break;
                }
            }
        }

        // Bind the data to the SVG and create one path per GeoJSON feature
        var self = this;
        this.svg.selectAll("path")
            .data(this.statesJson.features)
            .enter()
            .append("path")
            .attr("id",function(d){
                return "id_"+d.properties.name
            })
            .attr("d", this.path)
            .style("stroke", "#fff")
            .style("stroke-width", "1")
            .style("fill", function(d) {

                // Get data value
                var val = d.properties[value];

                if (val) {
                    return color(val);
                } else {
                    return "rgb(213,222,217)";
                }
            })
            .on("click", function(d) {

                for (i = 0; i < self.data.length; i++) {
                    if (self.data[i]['RegionName'].toLowerCase() === d.properties["name"].toLowerCase()) {
                        var stateData = self.data[i]
                        createTableForClickedState(stateData)
                    }
                }

            })
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0);
            })
            .on("mouseover", function(d) {

                for (i = 0; i < self.data.length; i++) {
                    if (self.data[i]['RegionName'].toLowerCase() === d.properties["name"].toLowerCase()) {
                        var stateData = self.data[i]
                        var tooltip_data = {
                            "state": stateData["RegionName"],
                            "price": stateData["PRICE/SQ. FT."],
                            "population": stateData["POPULATION"],
                            "unemployement": stateData["UNEMPLOYMENT_RATE"],
                            "salary": stateData["AVERAGE_SALARY/MON"],
                            "mortality": stateData["MORTALITY_RATE"]
                        }
                        var body = self.tooltip_render(tooltip_data)
                        tooltip.transition()
                            .duration(200)
                            .style("opacity", .9);
                        tooltip.html(
                            body
                        )
                        tooltip.style("left", (d3.event.pageX) + "px")
                        tooltip.style("top", (d3.event.pageY) + "px");
                        window.barChart.highlightState(self.data[i]['RegionName'])
                    }
                }
            })



        var labels = this.svg.append('g').attr('class', 'labels');
        var path = this.path
        labels.selectAll('.label').data(this.statesJson.features).enter().append('text')
            .attr("class", "label")
            .attr("x", function(d) {
                return path.centroid(d)[0];
            })
            .attr("y", function(d) {
                return path.centroid(d)[1];
            })
            .style('text-anchor', 'middle')
            .text(function(d) {
                return d.properties.name
            })


    }

    /**
     * Renders the actual map
     * @param the json data with the shape of all countries
     */
    drawMap(json, value) {

        this.statesJson = json;
        // D3 Projection
        this.projection = d3.geoAlbersUsa()
            .translate([this.width / 2, this.height / 2]) // translate to center of screen
            .scale([1000]); // scale things down so see entire US

        // Define path generator
        this.path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
            .projection(this.projection); // tell path generator to use albersUsa projection
        this.updateMap(value)
    }

    getCSVPropertyName(value) {
        if (value == 'unemployement') {
            return 'UNEMPLOYMENT_RATE'
        }
        if (value == 'salary') {
            return 'AVERAGE_SALARY/MON'
        }
        if (value == 'population') {
            return 'POPULATION'
        }
        if (value == 'price') {
            return 'PRICE/SQ. FT.'
        }
        if (value == 'mortality') {
            return 'MORTALITY_RATE'
        }

    }

    tooltip_render(tooltip_data) {

        var text = "<h5>" + tooltip_data.state + "</h5>";
        text += "<ul>"
        text += "<li> <strong>Population:</strong> " + tooltip_data.population + "</li>"
        text += "<li> <strong>Rental Cost ($/sq. ft.) :</strong> " + tooltip_data.price + "</li>"
        text += "<li> <strong>Mortality Rate (%) : </strong> " + tooltip_data.mortality + "</li>"
        text += "<li> <strong>Average Salary ($) :</strong> " + tooltip_data.salary + "</li>"
        text += "<li> <strong>Unemployement Rate (%) :</strong> " + tooltip_data.unemployement + "</li>"
        text += "</ul>";

        return text;
    }

    highlightMap(arr){
        for(i=0;i<arr.length;i++) {
            d3.select("#map-view").classed("highlight-class", false)
            var element = d3.select("#id_" + arr[i])
            element.classed("highlight-class", true)
            console.log(arr[i])
        }
    }

    displayWeights(val,obj){
        var element = d3.select("#"+obj)
        // val[0]= val[0]*10
        val[1]= val[1]*2
        val[2] = val[2]/1000000
        val[3]=val[3]/5000
        val[4]=val[4]*5
        val[5]=val[5]*5
        var chart = element.selectAll("rect")
            .data(val);

        var col = "rgb(217,91,67)"
        var yMin = d3.min(this.data, function(d) {
            return val[1];
        })
        var yMax = d3.max(this.data, function(d) {
            return val[val.length-1];
        })

        var color = d3.scaleLinear()
            .domain([yMin, yMax])
            .range([d3.rgb(col).brighter(), d3.rgb(col).darker()]);

        chart.exit().attr("opacity", 0.5)
            .transition()
            .duration(1000)
            .attr("opacity", 0)
            .remove();

        chart = chart.enter().append("rect")
            .merge(chart);

        chart.transition()
            .duration(2000)
            .attr("x", function (d,i) {

                if(i==0){
                    return 5;
                }else{
                    var v=5
                    for( var j=0;j<i;j++){
                        v= v+ val[j]
                    }
                    return v
                }

            })
            .attr("width", function(d,i){
                    return d;
            })
            .attr("y", 5)
            .attr("height", 15)
            .attr("fill", function(d) {
                    return color(d)
            })

    }
}