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
                    width: { type: 'int', defaultValue: 800 },
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
        CustomControl.prototype.onAfterRendering = function () { this._createChart(); };
        CustomControl.prototype.onExit = function () { this._oDataModel = null; };
        CustomControl.prototype.refreshChart = function () { this.rerender(); };

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
            var oMargin = { top: 50, right: 50, bottom: 50, left: 50 };
            var iWidth = this.getWidth() - oMargin.left - oMargin.right;
            var iHeight = this.getHeight() - oMargin.top - oMargin.bottom;
            var aDataSet = this._getDataSet();

            var iYStepSize = this.getConsumptionGroup() === 'REBS' ? 1000 : 500;

            // Create a canvas with margin
            var oCanvas = d3.select('#' + this.getId())
                .append('svg')
                    .attr('width', this.getWidth())
                    .attr('height', this.getHeight())
                    .append('g')
                        .attr('transform', 'translate(' + [ oMargin.left, oMargin.top ] + ')');

            // Base X scale - meter reading date
            var aXScaleDomain = d3.extent(aDataSet, function (data) { return data.meterReadDate; });
            aXScaleDomain[0] = aXScaleDomain[0].setMonth(aXScaleDomain[0].getMonth() - 1);
            aXScaleDomain[1] = aXScaleDomain[1].setMonth(aXScaleDomain[1].getMonth() + 1);

            var fnScaleX = d3.time.scale()
                .domain(aXScaleDomain)
                .range([0, iWidth]);

            // Base Y scale - kwh usage
            var fnScaleY = d3.scale.linear()
                .domain([0, d3.max(aDataSet, function (data) { return data.kwhUsage; })])
                .range([iHeight, 0]);

            // Draw X axis
            var fnXAxis = d3.svg.axis()
                .orient('bottom')
                .scale(fnScaleX);

            oCanvas.append('g')
                .attr('class', 'tmUsageHistChart-xAxis')
                .call(fnXAxis);

            // Draw Y axis


            // Draw consumption line
            var oConsumptionLine = d3.svg.line()
                .x(function (data) { return fnScaleX(data.meterReadDate); })
                .y(function (data) { return fnScaleY(data.kwhUsage); });

            oCanvas.append('g').append('path')
                .attr('d', oConsumptionLine(aDataSet))
                .attr('class', 'tmUsageHistChart-consumptionLine');

            // Draw consumption data points
            var oConsumptionDataPoint = oCanvas.append('g').selectAll('circle.tmUsageHistChart-consumptionPoint')
                .data(aDataSet)
                .enter()
                .append('circle')
                    .attr('r', '7')
                    .attr('cx', function (data) { return fnScaleX(data.meterReadDate); })
                    .attr('cy', function (data) { return fnScaleY(data.kwhUsage); })
                    .attr('class', 'tmUsageHistChart-consumptionPoint');

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
