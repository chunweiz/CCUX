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
                    consumptionGroup: { type: 'string', defaultValue: 'RES' } // Change to type later?
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
            var aData = jQuery.extend(true, [], this.getDataModel().getData().data); // Deep clone the dataset
            var fnDateParser = d3.time.format('%x').parse; // date format m/d/yyyy

            aData.forEach(function (data) {
                data.meterReadDate = fnDateParser(data.meterReadDate);
            }, this);

            return aData;
        };

        CustomControl.prototype._createChart = function () {
            var oMargin = { top: 20, right: 30, bottom: 30, left: 20 };
            var iWidth = this.getWidth() - oMargin.left - oMargin.right;
            var iHeight = this.getHeight() - oMargin.top - oMargin.bottom;
            var aDataSet = this._getDataSet();

            var iYStepSize = this.getConsumptionGroup() === 'REBS' ? 1000 : 500;

            // Create a canvas with margin
            var oCanvas = d3.select('#' + this.getId())
                .append('svg')
                    .attr('width', iWidth)
                    .attr('height', iHeight)
                    .append('g')
                        .attr('transform', 'translate(' + [ oMargin.left, oMargin.top ] + ')');

            // Base X scale - meter reading date
            var fnScaleX = d3.time.scale()
                .domain(d3.extent(aDataSet, function (data) { return data.meterReadDate; }))
                .range([0, iWidth])
                .nice();

            // Base Y scale - kwh usage
            var fnScaleY = d3.scale.linear()
                .domain([0, d3.max(aDataSet, function (data) { return data.kwhUsage; })])
                .range([iHeight, 0]);

            // Draw X axis
            

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
