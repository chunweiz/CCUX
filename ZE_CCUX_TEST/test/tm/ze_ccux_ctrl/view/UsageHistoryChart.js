/*global sap*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/Control',
        'sap/ui/thirdparty/d3'
    ],

    function (jQuery, Control) {
        'use strict';

        var CustomControl = Control.extend('test.tm.ze_ccux_ctrl.view.UsageHistoryChart', {
            metadata: {
                properties: {
                    width: { type: 'int', defaultValue: 1000 },
                    height: { type: 'int', defaultValue: 300 },
                    consumptionGroup: { type: 'string', defaultValue: 'RES' }
                }
            },

            renderer: function (oRm, oCustomControl) {
                oRm.write('<div');
                oRm.writeControlData(oCustomControl);
                oRm.addClass('tmUsageHistChart');
                oRm.writeClasses();
                oRm.write('>');
                oRm.write('</div>');
            }
        });

        CustomControl.prototype.onInit = function () {};
        CustomControl.prototype.onBeforeRendering = function () {};

        CustomControl.prototype.onAfterRendering = function () {
            this._createChart();
            this._createTemperatureChart();
        };

        CustomControl.prototype.onExit = function () {
            this._oDataModel = null;
        };

        CustomControl.prototype.refreshChart = function () {
            this.rerender();
        };

        CustomControl.prototype.setDataModel = function (model) {
            this._oDataModel = model;
            return this;
        };

        CustomControl.prototype.getDataModel = function () {
            return this._oDataModel;
        };

        CustomControl.prototype._getDataSet = function () {
            var aData = jQuery.extend(true, [], this.getDataModel().getData().data);
            var fnDateParser = d3.time.format('%x').parse;

            aData.forEach(function (data) {
                data.meterReadDate = fnDateParser(data.meterReadDate);
            }, this);

            return aData;
        };

        CustomControl.prototype._createChart = function () {
            var oMargin = { top: 50, right: 60, bottom: 60, left: 100 };
            var iWidth = this.getWidth() - oMargin.left - oMargin.right;
            var iHeight = this.getHeight() - oMargin.top - oMargin.bottom - 50;
            var aDataSet = this._getDataSet();

            // Create a canvas with margin
            var oCanvas = d3.select('#' + this.getId())
                .append('svg')
                    .attr('width', this.getWidth())
                    .attr('height', this.getHeight() - 50)
                    .append('g')
                        .attr('transform', 'translate(' + [ oMargin.left, oMargin.top ] + ')');

            // Base X scale - meter reading date
            var aXScaleDomain = d3.extent(aDataSet, function (data) { return data.meterReadDate; });
            aXScaleDomain[0] = new Date(aXScaleDomain[0].getFullYear(), aXScaleDomain[0].getMonth(), 1); // Beginning of month of smallest date
            aXScaleDomain[1] = new Date(aXScaleDomain[1].getFullYear(), aXScaleDomain[1].getMonth() + 1, 0); // End of month of biggest date

            var fnScaleX = d3.time.scale()
                .domain(aXScaleDomain)
                .range([0, iWidth]);

            // Base Y scale - kwh usage
            var iYAxisTickSize = this.getConsumptionGroup() === 'REBS' ? 1000 : 500;
            var iMaxKwhUsage = d3.max(aDataSet, function (data) { return data.kwhUsage; });

            var fnScaleY = d3.scale.linear()
                .domain([0, iMaxKwhUsage + (iYAxisTickSize - (iMaxKwhUsage % iYAxisTickSize))])
                .range([iHeight, 0]);

            //Background


            // X axis
            var fnConsumptionXAxis = d3.svg.axis()
                .orient('bottom')
                .scale(fnScaleX)
                .tickValues(aDataSet.map(function (data) { return data.meterReadDate; }))
                .tickFormat(d3.time.format("%d/%m/%y"));

            oCanvas.append('g')
                .attr('class', 'tmUsageHistChart-consumptionXAxis')
                .attr('transform', 'translate(0,' + (iHeight + 20) + ')')
                .call(fnConsumptionXAxis);

            // Y axis
            var fnConsumptionYAxis = d3.svg.axis()
                .orient('left')
                .scale(fnScaleY)
                .ticks(Math.floor(iMaxKwhUsage / iYAxisTickSize) + 1)
                .tickFormat(d3.format('d'));

            oCanvas.append('g')
                .attr('class', 'tmUsageHistChart-consumptionYAxis')
                .call(fnConsumptionYAxis);

            oCanvas.select('g.tmUsageHistChart-consumptionYAxis')
                .append('text')
                    .attr('class', 'tmUsageHistChart-consumptionYAxisLabel')
                    .attr('x', -iHeight / 2)
                    .attr('y', -65)
                    .attr('transform', 'rotate(-90)')
                    .text('kWh');

            // X grid
            var fnConsumptionXGrid = d3.svg.axis()
                .orient('bottom')
                .scale(fnScaleX)
                .ticks(aDataSet.length)
                .tickSize(iHeight, 0, 0)
                .tickFormat('');

            oCanvas.append('g')
                .attr('class', 'tmUsageHistChart-consumptionXGrid')
                .call(fnConsumptionXGrid);

            // Y grid
            var fnConsumptionYGrid = d3.svg.axis()
                .orient('left')
                .scale(fnScaleY)
                .ticks(Math.floor(iMaxKwhUsage / iYAxisTickSize) + 1)
                .tickSize(-iWidth, 0, 0)
                .tickFormat('');

            oCanvas.append('g')
                .attr('class', 'tmUsageHistChart-consumptionYGrid')
                .call(fnConsumptionYGrid);

            // Consumption line
            var oConsumptionLine = d3.svg.line()
                .x(function (data) { return fnScaleX(data.meterReadDate); })
                .y(function (data) { return fnScaleY(data.kwhUsage); });

            oCanvas.append('g').append('path')
                .attr('d', oConsumptionLine(aDataSet))
                .attr('class', 'tmUsageHistChart-consumptionLine');

            // Consumption data points
            var oConsumptionDataPoint = oCanvas.append('g').selectAll('circle.tmUsageHistChart-consumptionPoint')
                .data(aDataSet)
                .enter()
                .append('circle')
                    .attr('r', '7')
                    .attr('cx', function (data) { return fnScaleX(data.meterReadDate); })
                    .attr('cy', function (data) { return fnScaleY(data.kwhUsage); })
                    .attr('class', 'tmUsageHistChart-consumptionPoint');

            // Consumption data point tooltip
            var oConsumptionDataPointTooltip = oCanvas.append('g')
                .attr('class', 'tmUsageHistChart-consumptionPointTooltip')
                .style('display', 'none');

            // Consumption data point tooltip background
            oConsumptionDataPointTooltip.append('path')
                .attr('d', 'M1,16 C1,7.71572875 7.71655983,1 15.9980512,1 L86.0019488,1 C94.2851438,1 101,7.71390727 101,16 L101,16 C101,24.2842712 94.2823898,31 86.0015316,31 L59.3333333,31 L51,41 L42.6666667,31 L15.9984684,31 C7.71504305,31 1,24.2860927 1,16 L1,16 Z');

            // Consumption data point tooltip text
            oConsumptionDataPointTooltip.append('text')
                .attr('dy', '0.35em');

            function fnOnConsumptionDataPointMouseOver(data) {
                var aCircleXY = [fnScaleX(data.meterReadDate), fnScaleY(data.kwhUsage)];

                oConsumptionDataPointTooltip.select('path')
                    .attr('transform', 'translate(' + [ aCircleXY[0] - 52, aCircleXY[1] - 55 ] + ')');

                oConsumptionDataPointTooltip.select('text')
                    .attr('transform', 'translate(' + [ aCircleXY[0], aCircleXY[1] - 40 ] + ')')
                    .text(data.kwhUsage);

                oConsumptionDataPointTooltip.style('display', null);
            }

            function fnOnConsumptionDataPointMouseOut(data) {
                oConsumptionDataPointTooltip.style('display', 'none');
            }

            oConsumptionDataPoint.on('mouseover', fnOnConsumptionDataPointMouseOver);
            oConsumptionDataPoint.on('mouseout', fnOnConsumptionDataPointMouseOut);
        };

        CustomControl.prototype._createTemperatureChart = function () {
            var oMargin = { top: 0, right: 60, bottom: 0, left: 100 };
            var iWidth = this.getWidth() - oMargin.left - oMargin.right;
            var iHeight = 50;
            var aDataSet = this._getDataSet();

            // Create a canvas with margin
            var oCanvas = d3.select('#' + this.getId())
                .append('svg')
                    .attr('width', this.getWidth())
                    .attr('height', iHeight)
                    .append('g')
                        .attr('transform', 'translate(' + [ oMargin.left, oMargin.top ] + ')');

            
        };


        /*
            a.	Y axis – consumption in increments of 500 for RES and 1000 for REBS
            b.	X axis – Billing Period (instead of having month, please put meter reading date (billing period start and billing period end))
            c.	Data – Trending kWh by contract with hover capability to show usage used for billing period
            d.	Temperature – Shows average monthly high temperature
        */

        return CustomControl;
    }
);
