/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/thirdparty/d3'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.viz.HighBillUsage', {
            metadata: {
                library: 'ute.ui.viz',

                properties: {
                    width: { type: 'int', defaultValue: 800 },
                    height: { type: 'int', defaultValue: 400 }
                },

                aggregations: {
                    usage: { type: 'ute.ui.viz.HighBillUsageData', multiple: false }
                }
            }
        });

        CustomControl.prototype.init = function () {};

        CustomControl.prototype.onBeforeRendering = function () {
            this._cleanupChart();
        };

        CustomControl.prototype.onAfterRendering = function () {
            this._createChart();
        };

        CustomControl.prototype.exit = function () {
            this._cleanupChart();
        };

        CustomControl.prototype._initChartSettings = function () {
            this._oChartSetting = {};

            
        };

        CustomControl.prototype._createChart = function () {
            var oChartMargin, oChartSize, oSvg, oScale, oAxis, oGrid, aData, oLine, oArea;

            // Get usage data
            aData = this.getUsage().getData();

            // Drawing board settings
            oChartMargin = { top: 30, right: 20, bottom: 30, left: 50 };
            oChartSize = {};
            oChartSize.width = this.getWidth() - oChartMargin.left - oChartMargin.right;
            oChartSize.height = this.getHeight() - oChartMargin.top - oChartMargin.bottom;

            // Setting up scales
            oScale = {};
            oScale.x = d3.time.scale().range([0, oChartSize.width]);
            oScale.y = d3.scale.linear().range([oChartSize.height, 0]);

            // Setting up domains
            oScale.x.domain(d3.extent(aData, function (d) { return d.date; }));
            oScale.y.domain([0, d3.max(aData, function (d) { return d.close; })]);

            // Setting up axis
            oAxis = {};
            oAxis.x = d3.svg.axis().scale(oScale.x).orient('bottom').ticks(5);
            oAxis.y = d3.svg.axis().scale(oScale.y).orient('left').ticks(5);

            // Setting up grid
            oGrid = {};
            oGrid.x = d3.svg.axis().scale(oScale.x).orient('bottom').ticks(5).tickSize(-oChartSize.height, 0, 0).tickFormat('');
            oGrid.y = d3.svg.axis().scale(oScale.y).orient('left').ticks(5).tickSize(-oChartSize.width, 0, 0).tickFormat('');

            // Setting up line
            oLine = d3.svg.line()
                .x(function (d) { return oScale.x(d.date); })
                .y(function (d) { return oScale.y(d.close); })
                .interpolate('cardinal');

            // Setting up area
            oArea = d3.svg.area()
                .x(function (d) { return oScale.x(d.date); })
                .y0(oChartSize.height)
                .y1(function (d) { return oScale.y(d.close); })
                .interpolate('cardinal');

            // Create drawing board
            oSvg = d3.select('#' + this.getId())
                .append('svg')
                    .attr('width', this.getWidth())
                    .attr('height', this.getHeight())
                .append('g')
                    .attr('class', 'uteVizHBUsage-board')
                    .attr('transform', 'translate(' + oChartMargin.left + ',' + oChartMargin.top + ')');

            //Draw area
            oSvg.append('path')
                .datum(aData)
                .attr('class', 'uteVizHBUsage-area')
                .attr('d', oArea);

            // Draw line
            oSvg.append('path')
                .attr('class', 'uteVizHBUsage-line')
                .attr('d', oLine(aData));

            // Draw grid
            oSvg.append('g')
                .attr('class', 'uteVizHBUsage-xGrid')
                .attr('transform', 'translate(0,' + oChartSize.height + ')')
                .call(oGrid.x);

            oSvg.append('g')
                .attr('class', 'uteVizHBUsage-yGrid')
                .call(oGrid.y);

            // Draw axis
            oSvg.append('g')
                .attr('class', 'uteVizHBUsage-xAxis')
                .attr('transform', 'translate(0,' + oChartSize.height + ')')
                .call(oAxis.x);

            oSvg.append('g')
                .attr('class', 'uteVizHBUsage-yAxis')
                .call(oAxis.y);

            // Draw data points
            oSvg.append('g')
                .selectAll('.uteVizHBUsage-dataPt')
                .data(aData)
                .enter()
                .append('circle')
                    .attr('class', 'uteVizHBUsage-dataPt')
                    .attr('r', 4)
                    .attr('cx', function (d) { return oScale.x(d.date); })
                    .attr('cy', function (d) { return oScale.y(d.close); });
        };

        CustomControl.prototype._cleanupChart = function () {

        };

        return CustomControl;
    },

    true
);
