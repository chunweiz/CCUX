/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.viz.CustomerJourneyChannel', {
            metadata: {
                library: 'ute.ui.viz',

                properties: {
                    width: { type: 'int', defaultValue: 800 },
                    height: { type: 'int', defaultValue: 400 }
                },

                aggregations: {
                    usage: { type: 'ute.ui.viz.CustomerJourneyChannelData', multiple: false }
                }
            }
        });

        CustomControl.prototype.init = function () {};

        CustomControl.prototype.onBeforeRendering = function () {
            this._cleanupChart();
        };

        CustomControl.prototype.onAfterRendering = function () {
            this._createChart();
        };

        CustomControl.prototype.exit = function () {
            this._cleanupChart();
        };

        CustomControl.prototype._createChart = function () {
            // http://jsfiddle.net/thudfactor/HdwTH/
            // http://bl.ocks.org/dbuezas/9306799

            var iWidth = this.getWidth();
            var iHeight = this.getHeight();
            var iRadius = Math.min(iWidth, iHeight) / 2;

            var oSvg = d3.select('#' + this.getId())
              .append('svg')
                .attr('width', iWidth)
                .attr('height', iHeight)
                .append('g')
                  .attr('transform', 'translate(' + iWidth / 2 + ',' + iHeight / 2 + ')');

            var fnColor = d3.scale.category10();

            var fnPie = d3.layout.pie()
              .sort(null)
              .value(function(data) { return data.population; });

            var fnArc = d3.svg.arc()
              .outerRadius(iRadius - 10)
              .innerRadius(iRadius - 70);

            var oChart = oSvg.selectAll('.arc')
              .data(fnPie(aData))
              .enter().append('g')
                .attr('class', 'arc');

            oChart.append('path')
              .attr('d', fnArc)
              .style('fill', function (d) {
                return fnColor(d.data.age);
              });

            oChart.append('text')
              .attr('transform', function (d) {
                return 'translate(' + fnArc.centroid(d) + ')';
              })
              .attr('dy', '0.35em')
              .style('text-anchor', 'middle')
              .style('font-size', '0.75em')
              .text(function (d) { return d.data.age; });

            var oCircle = oSvg.append('circle')
              .attr('r', iRadius - 70);

            oSvg.append('text')
              .text(
                d3.sum(aData, function(d) {
                  return d.population;
                })
              )
              .style('fill', 'white')
              .style('text-anchor', 'middle');

        };

        CustomControl.prototype._cleanupChart = function () {

        };

        return CustomControl;
    },

    true
);
