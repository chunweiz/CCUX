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

        CustomControl.prototype._createChart = function () {
            var iWidth = this.getWidth();
            var iHeight = this.getHeight();
            var iRadius = Math.min(iWidth, iHeight) / 3;
            var aData = this.getDataModel().getData().data;

            // Create a canvas with the center as starting point
            var oCanvas = d3.select('#' + this.getId())
                .append('svg')
                    .attr('width', iWidth)
                    .attr('height', iHeight)
                    .append('g')
                        .attr('transform', 'translate(' + [ iWidth / 2, iHeight / 2 ] + ')');

            function fnLabel(data) { return data.channel; }
            function fnValue(data) { return data.frequency; }

            function fnMidAngle(data) {
                return data.startAngle + (data.endAngle - data.startAngle)/2;
            }

            var fnColor = d3.scale.ordinal()
                .domain(aData, fnLabel)
                .range(['#5092ce', '#5bc2af', '#f2a814', '#c0272d']);

            /* Donut chart */
            var fnPie = d3.layout.pie()
                .sort(null)
                .value(fnValue);

            var fnPieArc = d3.svg.arc()
                .outerRadius(iRadius * 0.6)
                .innerRadius(iRadius * 0.3);

            var oPieSlice = oCanvas.append('g').selectAll('path.tmCustJCChart-slice')
                .data(fnPie(aData))
                .enter()
                .append('path')
                    .attr('d', fnPieArc)
                    .attr('class', 'tmCustJCChart-slice')
                    .style('fill', function (data) {
                        return fnColor(fnLabel(data.data));
                    });

            /* Line between donut chart and label */
            var fnLineInnerArc = d3.svg.arc()
                .outerRadius(iRadius * 0.7)
                .innerRadius(iRadius * 0.7);

            var fnLineOuterArc = d3.svg.arc()
                .outerRadius(iRadius * 0.9)
                .innerRadius(iRadius * 0.9);

            var oLine = oCanvas.append('g').selectAll('path.tmCustJCChart-line')
                .data(fnPie(aData))
                .enter()
                    .append('polyline')
                        .attr('points', function(data) {
                            var aXY = fnLineOuterArc.centroid(data);
                            aXY[0] = iRadius * (fnMidAngle(data) < Math.PI ? 1 : -1 );

                            return [fnLineInnerArc.centroid(data), fnLineOuterArc.centroid(data), aXY];
                        })
                        .attr('stroke', function (data) {
                            return fnColor(fnLabel(data.data));
                        })
                        .attr('class', 'tmCustJCChart-line')
                        .style('fill', 'none');

            /* Label */
            var oLabel = oCanvas.append('g').selectAll('text.tmCustJCChart-label')
                .data(fnPie(aData))
                .enter()
                    .append('text')
                        .attr('dy', '0.35em')
                        .attr('transform', function(data) {
                            var aXY = fnLineOuterArc.centroid(data);
                            aXY[0] = iRadius * 1.1 * (fnMidAngle(data) < Math.PI ? 1 : -1 );
                            return 'translate(' + aXY + ')';
                        })
                        .style('text-anchor', function(data) {
                            return fnMidAngle(data) < Math.PI ? 'start' : 'end';
                        })
                        .text(function (data) { return fnLabel(data.data); });
        };

        return CustomControl;
    }
);
