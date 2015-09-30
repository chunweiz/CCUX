/*global sap*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/Control',

        'sap/ui/thirdparty/d3'
    ],

    function (jQuery, Control) {
        'use strict';

        var CustomControl = Control.extend('test.tm.ze_ccux_ctrl.view.control.UsageDetailsGauge', {
            metadata: {
                properties: {
                    width: { type: 'int', defaultValue: 500 },
                    height: { type: 'int', defaultValue: 300 },
                    usage: { type: 'float', defaultValue: 0.0 },
                    consumptionGroup: { type: 'string', defaultValue: 'RES' }
                }
            },

            renderer: function (oRm, oCustomControl) {
                oRm.write('<div');
                oRm.writeControlData(oCustomControl);
                oRm.addClass('tmUDGauge');
                oRm.writeClasses();
                oRm.write('>');
                oRm.write('</div>');
            }
        });

        CustomControl.prototype.exit = function () {

        };

        CustomControl.prototype.onBeforeRendering = function () {

        };

        CustomControl.prototype.onAfterRendering = function () {
            this._createGauge();
        };

        CustomControl.prototype.refreshChart = function () {
            this.rerender();
        };

        CustomControl.prototype._createGauge = function () {
            var oCustomControl = this;
            var iWidth = this.getWidth();
            var iHeight = this.getHeight();
            var iRadius = Math.min(iWidth, iHeight) / 2;

            // Create a canvas with the center as starting point
            var oCanvas = d3.select('#' + this.getId())
                .append('svg')
                    .attr('width', iWidth)
                    .attr('height', iHeight)
                    .append('g')
                        .attr('transform', 'translate(' + [ iWidth / 2, iHeight / 2 ] + ')');

            // Arc function for ticks
            var fnOuterTickArc = d3.svg.arc()
                .outerRadius(iRadius * 0.7)
                .innerRadius(iRadius * 0.69);

            var fnInnerTickArc = d3.svg.arc()
                .outerRadius(iRadius * 0.6)
                .innerRadius(iRadius * 0.59);

            var oTickArcSize = {
                startAngle: Math.PI - 0.5,
                endAngle: 0.5 - Math.PI
            };

            oCanvas.append('path')
                .attr('d', fnOuterTickArc(oTickArcSize))
                .style('fill', 'tomato');

            oCanvas.append('path')
                .attr('d', fnInnerTickArc(oTickArcSize))
                .style('fill', 'gold');

            var fnTick = d3.scale.ordinal()
                .domain(d3.range(150))
                .rangePoints([ oTickArcSize.startAngle, oTickArcSize.endAngle ]);

            oCanvas.append('g').selectAll('line')
                .data(d3.range(150))
                .enter()
                .append('line')
                    .attr('x1', function(data) { return Math.sin(fnTick(data)) * iRadius * -0.5;})
                    .attr('y1', function(data) { return Math.cos(fnTick(data)) * iRadius * -0.5;})
                    .attr('x2', function(data) { return Math.sin(fnTick(data)) * iRadius * -0.4;})
                    .attr('y2', function(data) { return Math.cos(fnTick(data)) * iRadius * -0.4;})
                    .style('stroke', 'black')
                    .style('stroke-width', 2);
        };

        return CustomControl;
    }
);
