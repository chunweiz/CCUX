/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/thirdparty/d3'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('test.tm.ze_ccux_ctrl.view.CustJourneyChannelChart', {
            metadata: {
                properties: {
                    width: { type: 'int', defaultValue: 500 },
                    height: { type: 'int', defaultValue: 300 }
                }
            },

            renderer: function (oRm, oCustomControl) {
                oRm.write('<div');
                oRm.writeControlData(oCustomControl);
                oRm.addClass('tmCustJCChart');
                oRm.writeClasses();
                oRm.write('>');
                oRm.write('</div>');
            }
        });

        CustomControl.prototype.onInit = function () {

        };

        CustomControl.prototype.onBeforeRendering = function () {

        };

        CustomControl.prototype.onAfterRendering = function () {
            this._createChart();
        };

        CustomControl.prototype.onExit = function () {

        };

        CustomControl.prototype.setDataModel = function (model) {
            this._oDataModel = model;
            return this;
        };

        CustomControl.prototype.getDataModel = function () {
            return this._oDataModel;
        };

        CustomControl.prototype._createChart = function () {
            // http://jsfiddle.net/thudfactor/HdwTH/
            // http://bl.ocks.org/dbuezas/9306799

            var iWidth = this.getWidth();
            var iHeight = this.getHeight();
            var iRadius = Math.min(iWidth, iHeight) / 4;
            var aData = this.getDataModel().getData().data;

            // Create a canvas with the center as starting point
            var oCanvas = d3.select('#' + this.getId())
                .append('svg')
                    .attr('width', iWidth)
                    .attr('height', iHeight)
                    .append('g')
                        .attr('transform', 'translate(' + [ iWidth / 2, iHeight / 2 ] + ')');

            var fnPie = d3.layout.pie()
                .sort(null)
                .value(function (data) { return data.frequency; });

            var fnArc = d3.svg.arc()
                .outerRadius(iRadius * 0.92)
                .innerRadius(iRadius * 0.52);

            var fnColor = d3.scale.ordinal()
                .domain(aData, function (data) { return data.channel; })
                .range([ '#5092ce', '#5bc2af', '#f2a814', '#c0272d' ]);

            oCanvas.append('circle')
                .attr('r', iRadius * 1.48)
                .attr('class', 'tmCustJCChart-outerBg');

            oCanvas.append('circle')
                .attr('r', iRadius * 1.24)
                .attr('class', 'tmCustJCChart-bg');

            var oChart = oCanvas.selectAll('.tmCustJCChart-arc')
                .data(fnPie(aData))
                .enter().append('g')
                  .attr('class', 'tmCustJCChart-arc');

            oChart.append('path')
                .attr('d', fnArc)
                .style('fill', function (data) {
                    return fnColor(data.data.channel);
                });

            oChart.append('text')
                .attr('transform', function (data) {
                    return 'translate(' + fnArc.centroid(data) + ')';
                })
                .attr('dy', '0.35em')
                .attr('class', 'tmCustJCChart-freqText')
                .text(function (data) { return data.data.frequency; });

            oCanvas.append('circle')
                .attr('r', iRadius * 0.52)
                .attr('class', 'tmCustJCChart-totalBg');

            oCanvas.append('circle')
                .attr('r', iRadius * 0.36)
                .attr('class', 'tmCustJCChart-total');

            oCanvas.append('text')
                .attr('dy', '0.35em')
                .attr('class', 'tmCustJCChart-totalText')
                .text(
                    d3.sum(aData, function(data) {
                      return data.frequency;
                    })
                );


        };

        return CustomControl;
    }
);
