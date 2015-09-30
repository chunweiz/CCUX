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
            var iNumofTicks = 150;

            // Create a canvas with the center as starting point
            var oCanvas = d3.select('#' + this.getId())
                .append('svg')
                    .attr('width', iWidth)
                    .attr('height', iHeight)
                    .append('g')
                        .attr('transform', 'translate(' + [ iWidth / 2, iHeight / 2 ] + ')');

            // Outer ring
            var fnOuterRing = d3.svg.arc()
                .outerRadius(iRadius * 0.67)
                .innerRadius(iRadius * 0.6);

            oCanvas.append('g').append('path')
                .attr('class', 'tmUDGauge-outerRing')
                .attr('d', fnOuterRing({
                    startAngle: 0,
                    endAngle: Math.PI * 2
                }));

            // Arc ticks
            var oTickArcSize = {
                startAngle: Math.PI - 0.4,
                endAngle: 0.4 - Math.PI
            };

            var fnArcTick = d3.scale.ordinal()
                .domain(d3.range(iNumofTicks))
                .rangePoints([ oTickArcSize.startAngle, oTickArcSize.endAngle ]);

            var oTicks = oCanvas.append('g').selectAll('line.tmUDGauge-tick')
                .data(d3.range(iNumofTicks))
                .enter()
                .append('line')
                    .attr('x1', function(data) { return Math.sin(fnArcTick(data)) * -iRadius * 0.5;})
                    .attr('y1', function(data) { return Math.cos(fnArcTick(data)) * -iRadius * 0.5;})
                    .attr('x2', function(data) { return Math.sin(fnArcTick(data)) * -iRadius * 0.55;})
                    .attr('y2', function(data) { return Math.cos(fnArcTick(data)) * -iRadius * 0.55;})
                    .attr('class', function(data) {
                        if (data < 10)
                            return 'tmUDGauge-tick tmUDGauge-tick-selected';

                        return 'tmUDGauge-tick';
                    });
        };

        return CustomControl;
    }
);
