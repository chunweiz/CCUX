/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control',

        'sap/ui/thirdparty/d3'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('test.tm.ze_ccux_ctrl.view.control.AverageBillDetailsChart', {
            metadata: {
                properties: {
                    width: { type: 'int', defaultValue: 600 },
                    height: { type: 'int', defaultValue: 400 },
                    usageTickSize: { type: 'int', defaultValue: 500 }
                }
            },

            renderer: function (oRm, oCustomControl) {
                oRm.write('<div');
                oRm.writeControlData(oCustomControl);
                oRm.addClass('tmAVDChart');
                oRm.writeClasses();
                oRm.write('>');
                oRm.write('</div>');
            }
        });

        CustomControl.prototype.onExit = function () {
            this._oDataModel = null;
        };

        CustomControl.prototype.onAfterRendering = function () {
            this._createChart();
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
                data.usageDate = fnDateParser(data.usageDate);
            }, this);

            return aData;
        };

        CustomControl.prototype._createChart = function () {
            var oCustomControl = this;
            var oMargin = { top: 50, right: 60, bottom: 60, left: 100 };
            var iWidth = 600 - oMargin.left - oMargin.right;
            var iHeight = 400 - oMargin.top - oMargin.bottom - 50;
            var aDataset = oCustomControl._getDataSet();

            // X scale - month
            var fnScaleMonth = d3.scale.linear()
                .domain(d3.extent(aDataset, function (data) { return data.usageDate.getMonth(); }))
                .range([0, iWidth]);

            // Y scale - kwh usage based on usage tick size
            var iMaxUsage = d3.max(aDataset, function (data) { return data.usage; });
            var iUsageTickSize = oCustomControl.getUsageTickSize();

            var fnScaleUsage = d3.scale.linear()
                .domain([0, iMaxUsage + (iUsageTickSize - (iMaxUsage % iUsageTickSize))])
                .range([iHeight, 0]);

            // Create a canvas with margin
            var oCanvas = d3.select('#' + this.getId())
                .append('svg')
                    .attr('width', oCustomControl.getWidth())
                    .attr('height', oCustomControl.getHeight())
                    .attr('viewBox', [0, 0, iWidth + oMargin.left + oMargin.right, iHeight + oMargin.top + oMargin.bottom].join(' '))
                    .append('g')
                        .attr('transform', 'translate(' + [ oMargin.left, oMargin.top ] + ')');

            // Average usage lines
            var aDatasetByYear = d3.nest()
                .key(function (data) { return data.usageDate.getFullYear(); })
                .entries(aDataset);

            var fnLineColor = d3.scale.ordinal()
                .domain(aDatasetByYear, function (data) { return data.key; })
                .range(['#ffffff', '#f2a814', '#000000', '#5092ce']);

            var fnUsageLine = d3.svg.line()
                .x(function (data) { return fnScaleMonth(data.usageDate.getMonth()); })
                .y(function (data) { return fnScaleUsage(data.usage); });

            var oUsageLines = oCanvas.append('g').selectAll('g')
                .data(aDatasetByYear)
                .enter().append('g')
                    .append('path')
                        .attr('class', 'tmAVDChart-usageLine')
                        .attr('d', function (data) { return fnUsageLine(data.values); })
                        .style('stroke', function (data) { return fnLineColor(data.key); })
                        .style('fill', 'none');

            // Average usage data points
            var oUsageDataPoints = oCanvas.append('g').selectAll('circle')
                .data(aDataset)
                .enter().append('circle')
                    .attr('class', 'tmAVDChart-usageDataPoint')
                    .attr('r', '3')
                    .attr('cx', function (data) { return fnScaleMonth(data.usageDate.getMonth()); })
                    .attr('cy', function (data) { return fnScaleUsage(data.usage); })
                    .style('fill', function (data) { return fnLineColor(data.usageDate.getFullYear()); });

        };

        return CustomControl;
    }
);
