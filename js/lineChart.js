/** Class implementing the line chart view. */
class LineChart {

    constructor(option,allData) {
        this.width = 500;
        this.height = 500;
         this.data = allData
         this.value = option
        this.colors_arr=["green","blue","red"]
        this.radius = 3.5

        //Create SVG element and append map to the SVG
        document.getElementById('line-chart').innerHTML = ''
            this.svg = d3.select('#line-chart')
                .append('svg')
                .attr('class', 'chart')
                .attr('width', this.width)
                .attr('height', this.height)
                .attr('style', 'padding-left: 8px;')
        this.margin = {top: 30, right: 30, bottom: 30, left: 60}
    }

    update(topStates){
        var years_arr = [2010,2011,2012,2013,2014,2015,2016]
        // set the ranges
        var xScale = d3.scaleLinear().range([this.margin.left, (this.width - this.margin.right)]).domain([2010,2016])
        var data_values = new Array()
        var index =0 ;
        for(var i=0;i<this.data.length;i++){
            for(var j=0;j<this.data[i]['values'].length;j++){
                data_values[index]=this.data[i]['values'][j]
                index++;
            }
        }

        var yMax = d3.max(data_values, function(d) {
            return d
        });
        var yMin = d3.min(data_values, function(d) {
            return d
        });
        var yScale = d3.scaleLinear().range([this.height - this.margin.top, this.margin.bottom]).domain([yMin,yMax])

        var xAxis = d3.axisBottom(xScale).tickFormat(function(d){ return d;});
        var yAxis = d3.axisLeft(yScale).tickFormat(function(d){ return d;});
        this.svg.append("svg:g")
            .attr("transform", "translate(0," + (this.height - this.margin.bottom +1) + ")")
            .attr("class","axis")
            .call(xAxis.ticks(7))
        this.svg.append("svg:g")
            .attr("class","axis")
            .attr("transform", "translate(" + (this.margin.left) + ",0)")
            .call(yAxis.ticks(15));

        var lineGen = d3.line()
            .x(function(d,i) {
                return xScale(d.year);
            })
            .y(function(d) {
                return yScale(d.value);
            })
            .curve(d3.curveMonotoneX)

        for(var i=0;i<topStates.length;i++) {
            this.plotData(i,years_arr,lineGen,xScale,yScale)
        }

        this.drawLegends(topStates)
    }

    tooltip_render(tooltip_data) {
        var text = "<h5>Year:" + tooltip_data.year+ "</h5>";
        text += "<h5>Value:" + tooltip_data.value + "</h5>";
        return text;
    }

    drawLegends(topStates){
        var self = this
        d3.select('#legend-line-chart').selectAll('svg').remove();

        var legend = d3.select("#legend-line-chart").append("svg")
            .attr("width", 100)
            .attr("height", 50)
            .selectAll("g")
            .data(topStates)
            .enter()
            .append("g")
            .attr("transform", function(d, i) {
                return "translate(0," + i * 20 + ")";
            });

        legend.append("rect")
            .style("stroke-dasharray", ("1, 5"))
            .attr("width", 18)
            .attr("height", 3)
            .style("fill", function(d,i){
                return self.colors_arr[i]
            });


        legend.append("text")
            .attr("x", 24)
            .attr("y", 4)
            .attr("dy", ".35em")
            .text(function (d,i) {
                return topStates[i]
            });
    }

    plotData(index,years_arr,lineGen,xScale,yScale){
        var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip-title")
            .style("opacity", 0);
        var final_data = new Array()
        var self=this
        for(var i =0;i<this.data[index].values.length;i++){
            final_data[i] = new Object()
            final_data[i].year=years_arr[years_arr.length-i-1]
            final_data[i].value=this.data[index].values[i]
        }
        var path = this.svg.append('svg:path')
            .attr('d', lineGen(final_data))
            .attr('stroke', self.colors_arr[index])
            .attr('stroke-width', 2)
            .attr('fill', 'none')

        var totalLength = path.node().getTotalLength();

        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(2000)
            .attr("stroke-dashoffset", 0);


        this.svg.selectAll("dot")
            .data(final_data)
            .enter().append("circle")
            .attr("r", self.radius)
            .attr("cx", function(d) { return xScale(d.year); })
            .attr("cy", function(d) { return yScale(d.value); })
            .style("fill",self.colors_arr[index])
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0);
                d3.select(this)
                    .style("fill",self.colors_arr[index])
                    .attr("r",self.radius)
            })
            .on("mouseover", function(d) {
                d3.select(this)
                    .style("fill","orange")
                    .attr("r",self.radius*2)
                var coordinates = [0, 0];
                coordinates = d3.mouse(this);
                var x = coordinates[0];
                var y = coordinates[1];
                var tooltip_data = {
                    "year": d["year"],
                    "value": d["value"]
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
            })
    }
}
