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
            var iWidth = this.getWidth() - oMargin.left - oMargin.right;
            var iHeight = this.getHeight() - oMargin.top - oMargin.bottom - 50;
            var aDataSet = oCustomControl._getDataSet();

            // X scale
            var fnScaleMonth = d3.scale.linear()
                .domain(d3.extent(aDataSet, function(data) { return data.usageDate.getMonth(); }))
                .range([0, iWidth]);

            // Y scale


            var fnScaleUsage = d3.scale.linear()
                .domain([
                    0,
                ])
                .range([iHeight, 0]);

            // Create a canvas with margin
            var oCanvas = d3.select('#' + this.getId())
                .append('svg')
                    .attr('width', this.getWidth())
                    .attr('height', this.getHeight())
                    .append('g')
                        .attr('transform', 'translate(' + [ oMargin.left, oMargin.top ] + ')');




        };

        return CustomControl;
    }
);
