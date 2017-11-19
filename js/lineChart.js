/** Class implementing the line chart view. */
class LineChart {

    constructor(option,allData) {
        this.width = 400;
        this.height = 200;
         this.data = allData
         this.value = option

        //Create SVG element and append map to the SVG
        if(option="unemployement") {
            this.svg = d3.select('#unemployement-line-chart')
                .append('svg')
                .attr('class', 'chart')
                .attr('width', this.width)
                .attr('height', this.height)
                .attr('style', 'padding-left: 8px;')
        }
        if(option="population") {
            this.svg = d3.select('#population-line-chart')
                .append('svg')
                .attr('class', 'chart')
                .attr('width', this.width)
                .attr('height', this.height)
                .attr('style', 'padding-left: 8px;')
        }
        if(option="rental") {
            this.svg = d3.select('#rental-line-chart')
                .append('svg')
                .attr('class', 'chart')
                .attr('width', this.width)
                .attr('height', this.height)
                .attr('style', 'padding-left: 8px;')
        }
        if(option="salary") {
            this.svg = d3.select('#salary-line-chart')
                .append('svg')
                .attr('class', 'chart')
                .attr('width', this.width)
                .attr('height', this.height)
                .attr('style', 'padding-left: 8px;')
        }
        if(option="mortality") {
            this.svg = d3.select('#mortality-line-chart')
                .append('svg')
                .attr('class', 'chart')
                .attr('width', this.width)
                .attr('height', this.height)
                .attr('style', 'padding-left: 8px;')
        }

        //var svg = d3.select("svg")
        this.margin = {top: 20, right: 20, bottom: 30, left: 50}
        this.width = this.svg.attr("width") - this.margin.left - this.margin.right
        this.height = this.svg.attr("height") - this.margin.top - this.margin.bottom
        this.g = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        console.log(this.data)
    }

    update(){

        // var parseTime = d3.timeParse("%d-%b-%y");
        //
        // var x = d3.scaleTime()
        //     .rangeRound([0, this.width]);
        //
        // var y = d3.scaleLinear()
        //     .rangeRound([this.height, 0]);
        //
        // var line = d3.line()
        //     .x(function(d) { return x(d.date); })
        //     .y(function(d) { return y(d.close); });
        //
        // d3.tsv("data.tsv", function(d) {
        //     d.date = parseTime(d.date);
        //     d.close = +d.close;
        //     return d;
        // }, function(error, data) {
        //     if (error) throw error;
        //
        //     x.domain(d3.extent(data, function(d) { return d.date; }));
        //     y.domain(d3.extent(data, function(d) { return d.close; }));
        //
        //     g.append("g")
        //         .attr("transform", "translate(0," + height + ")")
        //         .call(d3.axisBottom(x))
        //         .select(".domain")
        //         .remove();
        //
        //     g.append("g")
        //         .call(d3.axisLeft(y))
        //         .append("text")
        //         .attr("fill", "#000")
        //         .attr("transform", "rotate(-90)")
        //         .attr("y", 6)
        //         .attr("dy", "0.71em")
        //         .attr("text-anchor", "end")
        //         .text("Price ($)");
        //
        //     g.append("path")
        //         .datum(data)
        //         .attr("fill", "none")
        //         .attr("stroke", "steelblue")
        //         .attr("stroke-linejoin", "round")
        //         .attr("stroke-linecap", "round")
        //         .attr("stroke-width", 1.5)
        //         .attr("d", line);
        // });

    }
}
