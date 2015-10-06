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
                    usage: { type: 'float', defaultValue: 0.0 }
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
            var iNumOfTicks = 151;
            var aKwhDomain = [0, 3.6];
            var iCurrentKwh = this.getUsage();

            // Create a canvas with the center as starting point
            var oCanvas = d3.select('#' + this.getId())
                .append('svg')
                    .attr('viewBox', '0 0 600 400')
                    .attr('width', iWidth)
                    .attr('height', iHeight)
                    .append('g')
                        .attr('transform', 'translate(' + [ 600 / 2, 400 / 2 ] + ')');

            // Outer ring
            var fnOuterRing = d3.svg.arc()
                .outerRadius(iRadius * 1)
                .innerRadius(iRadius * 0.9);

            oCanvas.append('g').append('path')
                .attr('class', 'tmUDGauge-outerRing')
                .attr('d', fnOuterRing({
                    startAngle: 0,
                    endAngle: Math.PI * 2
                }));

            var oUsageInfo = oCanvas.append('g');

            // Usage value
            oUsageInfo.append('text')
                .attr('class', 'tmUDGauge-usage')
                .attr('text-anchor', 'middle')
                .attr('dy', '0.35em')
                .attr('transform', 'translate(' + [0, -40] + ')')
                .text(iCurrentKwh);

            // Usage unit
            oUsageInfo.append('text')
                .attr('class', 'tmUDGauge-usageUnit')
                .attr('text-anchor', 'middle')
                .attr('dy', '0.35em')
                .attr('transform', 'translate(' + [0, 10] + ')')
                .text('kWh');

            // Usage divider
            oUsageInfo.append('line')
                .attr('class', 'tmUDGauge-usageDivider')
                .attr('x1', '-70').attr('y1', '25')
                .attr('x2', '70').attr('y2', '25');

            // kwh usage to usage indicator text mapping
            var fnKwhToUsageIndicator = d3.scale.quantize()
                .domain(aKwhDomain)
                .range(['LOW', 'MEDIUM', 'HIGH']);

            var oUsageInfoIndicator = oUsageInfo.append('g');

            oUsageInfoIndicator.append('rect')
                .attr('class', 'tmUDGauge-usageIndicatorBg')
                .attr('rx', 5).attr('ry', 5)
                .attr('width', 80).attr('height', 30)
                .attr('x', function() { return -80 / 2; })
                .attr('y', function() { return 40; });

            oUsageInfoIndicator.append('text')
                .attr('class', 'tmUDGauge-usageIndicatorText')
                .attr('text-anchor', 'middle')
                .attr('dy', '0.35em')
                .attr('transform', 'translate(' + [0, 55] + ')')
                .text(fnKwhToUsageIndicator(iCurrentKwh));

            // Meter arc sizing
            var oTickArcSize = {
                startAngle: Math.PI - 0.4,
                endAngle: 0.4 - Math.PI
            };

            // Number of  meter ticks
            var aNumOfTicksDomain = d3.range(iNumOfTicks);

            // Number of selected meter ticks based on kwh
            var fnKwh2Tick = d3.scale.linear()
                .domain(aKwhDomain)
                .range([0, iNumOfTicks - 1])
                .clamp(true)
                .nice();

            var iNumOfSelectedTicks = Math.floor(fnKwh2Tick(iCurrentKwh));
            if (iNumOfSelectedTicks === 0 && iCurrentKwh <= aKwhDomain[0]) {
                iNumOfSelectedTicks = -1;
            }

            // Tick distribution around meter arc
            var fnArcTick = d3.scale.ordinal()
                .domain(aNumOfTicksDomain)
                .rangePoints([ oTickArcSize.startAngle, oTickArcSize.endAngle ]);

            // Meter ticks
            var oTicks = oCanvas.append('g').selectAll('line.tmUDGauge-tick')
                .data(aNumOfTicksDomain)
                .enter()
                .append('line')
                    .attr('x1', function(data) {
                        var iLength = data === iNumOfSelectedTicks ? 0.78 : 0.8;
                        return Math.sin(fnArcTick(data)) * -iRadius * iLength;
                    })
                    .attr('y1', function(data) {
                        var iLength = data === iNumOfSelectedTicks ? 0.78 : 0.8;
                        return Math.cos(fnArcTick(data)) * -iRadius * iLength;
                    })
                    .attr('x2', function(data) {
                        var iLength = data === iNumOfSelectedTicks ? 0.87 : 0.85;
                        return Math.sin(fnArcTick(data)) * -iRadius * iLength;
                    })
                    .attr('y2', function(data) {
                        var iLength = data === iNumOfSelectedTicks ? 0.87 : 0.85;
                        return Math.cos(fnArcTick(data)) * -iRadius * iLength;
                    })
                    .attr('class', function(data) {
                        var aTickClass = ['tmUDGauge-tick'];

                        if (data <= iNumOfSelectedTicks) {
                            aTickClass.push('tmUDGauge-tick-selected');
                        }

                        return aTickClass.join(' ');
                    });

            // Meter arc label text path
            var fnMeterArcLabel = d3.svg.arc()
                .outerRadius(iRadius * 0.85)
                .innerRadius(iRadius * 0.85);

            oCanvas.append('defs').append('path')
                .attr('id', oCustomControl.getId() + '-meterArcLabelTextPath')
                .attr('d', fnMeterArcLabel({
                    startAngle: Math.PI - 0.35,
                    endAngle: Math.PI + 0.35
                }));

            // Meter arc label text
            oCanvas.append('text').append('textPath')
                .attr('class', 'tmUDGauge-meterArcLabel')
                .attr('startOffset', '59%')
                .attr('xlink:href', '#' + oCustomControl.getId() + '-meterArcLabelTextPath')
                .attr('dy', '0.35em')
                .text('TODAYS USAGE');

        };

        return CustomControl;
    }
);
