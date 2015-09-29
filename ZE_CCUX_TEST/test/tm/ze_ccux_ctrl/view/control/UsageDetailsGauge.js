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

            var oMeter = oCanvas.append('path')
                .attr('d', fnOuterTickArc({
                    startAngle: Math.PI + 0.5,
                    endAngle: Math.PI * 3 - 0.5
                }))
                .style('fill', 'tomato');

            oCanvas.append('path')
                .attr('d', fnInnerTickArc({
                    startAngle: Math.PI + 0.5,
                    endAngle: Math.PI * 3 - 0.5
                }))
                .style('fill', 'gold');

            var aOuterXY = fnOuterTickArc.centroid({
                startAngle: Math.PI + 0.5,
                endAngle: Math.PI * 3 - 0.5
            });

            var aInnerXY = fnInnerTickArc.centroid({
                startAngle: Math.PI + 0.5,
                endAngle: Math.PI * 3 - 0.5
            });

            oCanvas.append('line')
                .attr('x1', aInnerXY[0])
                .attr('y1', aInnerXY[1])
                .attr('x2', aOuterXY[0])
                .attr('y2', aOuterXY[1])
                .style('stroke', 'black')
                .style('stroke-width', 2);

        };

        return CustomControl;
    }
);
