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
                    width: { type: 'int', defaultValue: 900 },
                    height: { type: 'int', defaultValue: 600 },
                    usageTickSize: { type: 'int', defaultValue: 100 }
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
            this._oCanvas = null;
        };

        CustomControl.prototype.onAfterRendering = function () {
            this._createChart();
        };

        CustomControl.prototype.hideUsage = function (sYear, bHide) {
            if(this._oCanvas) {
                this._oCanvas.selectAll('.tmAVDChart-usage').each(function (oData) {
                    if (oData.key === sYear) {
                        if (bHide) {
                            d3.select(this).style('display', 'none');
                        } else {
                            d3.select(this).style('display', null);
                        }
                    }
                });
            }

            return this;
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
            var oMargin = { top: 0, right: 60, bottom: 60, left: 100 };
            var iWidth = 900 - oMargin.left - oMargin.right;
            var iHeight = 600 - oMargin.top - oMargin.bottom - 50;
            var aDataset = oCustomControl._getDataSet();

            // X scale - month
            var aMinMaxMonth = d3.extent(aDataset, function (data) { return data.usageDate.getMonth(); });

            var fnScaleMonth = d3.scale.linear()
                .domain(aMinMaxMonth)
                .range([0, iWidth]);

            // Y scale - kwh usage
            var iMaxUsage = d3.max(aDataset, function (data) { return data.usage; });
            var iUsageTickSize = oCustomControl.getUsageTickSize();

            var fnScaleUsage = d3.scale.linear()
                .domain([0, iMaxUsage + (iUsageTickSize - (iMaxUsage % iUsageTickSize))])
                .range([iHeight, 0]);

            // Create a canvas with margin
            this._oCanvas = d3.select('#' + this.getId())
                .append('svg')
                    .attr('class', 'tmAVDChart')
                    .attr('width', oCustomControl.getWidth())
                    .attr('height', oCustomControl.getHeight())
                    .attr('viewBox', [0, 0, iWidth + oMargin.left + oMargin.right, iHeight + oMargin.top + oMargin.bottom].join(' '))
                    .append('g')
                        .attr('transform', 'translate(' + [ oMargin.left, oMargin.top ] + ')');

            // X axis - month
            var fnXAxisLabel = d3.scale.ordinal()
                .domain(d3.range(12))
                .range(['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']);

            var fnXAxisMonth = d3.svg.axis()
                .scale(fnScaleMonth)
                .orient('bottom')
                .tickValues(d3.range(aMinMaxMonth[0], aMinMaxMonth[1] + 1))
                .tickFormat(function (data) { return fnXAxisLabel(data); });

            this._oCanvas.append('g')
                .attr('class', 'tmAVDChart-XAxis')
                .attr('transform', 'translate(' + [0, iHeight + 30] + ')')
                .call(fnXAxisMonth);

            // Y axis - kwh usage based on usage tick size
            var fnYAxisUsage = d3.svg.axis()
                .scale(fnScaleUsage)
                .orient('left')
                .ticks(Math.floor(iMaxUsage / iUsageTickSize) + 1)
                .tickFormat(d3.format('d'));

            this._oCanvas.append('g')
                .attr('class', 'tmAVDChart-YAxis')
                .attr('transform', 'translate(' + [-30, 0] + ')')
                .call(fnYAxisUsage);

            // X grid
            this._oCanvas.append('g')
                .selectAll('line')
                .data(d3.range(aMinMaxMonth[0], aMinMaxMonth[1] + 1))
                .enter()
                .append('line')
                    .attr('class', 'tmAVDChart-XGrid')
                    .attr('x1', function (data) { return fnScaleMonth(data); })
                    .attr('y1', 0)
                    .attr('x2', function (data) { return fnScaleMonth(data); })
                    .attr('y2', iHeight);

            // Y grid
            this._oCanvas.append('g')
                .selectAll('line')
                .data(d3.range(0, iMaxUsage + (iUsageTickSize - (iMaxUsage % iUsageTickSize)), iUsageTickSize))
                .enter()
                .append('line')
                    .attr('class', 'tmAVDChart-YGrid')
                    .attr('x1', 0)
                    .attr('y1', function (data) { return fnScaleUsage(data); })
                    .attr('x2', iWidth + 30)
                    .attr('y2', function (data) { return fnScaleUsage(data); });

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

            var oUsageLines = this._oCanvas.append('g').selectAll('g')
                .data(aDatasetByYear)
                .enter().append('g')
                    .attr('class', 'tmAVDChart-usage');

            oUsageLines.append('path')
                .attr('class', 'tmAVDChart-usageLine')
                .attr('d', function (data) { return fnUsageLine(data.values); })
                .style('stroke', function (data) { return fnLineColor(data.key); })
                .style('fill', 'none');

            // Average usage data points
            oUsageLines.selectAll('g')
                .data(function (data) { return data.values; })
                .enter()
                .append('circle')
                    .attr('class', 'tmAVDChart-usageDataPoint')
                    .attr('r', '4')
                    .attr('cx', function (data) { return fnScaleMonth(data.usageDate.getMonth()); })
                    .attr('cy', function (data) { return fnScaleUsage(data.usage); })
                    .style('fill', function (data) { return fnLineColor(data.usageDate.getFullYear()); });
        };

        return CustomControl;
    }
);
