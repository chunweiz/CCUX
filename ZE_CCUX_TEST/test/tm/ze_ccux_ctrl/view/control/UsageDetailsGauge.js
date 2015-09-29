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

            // Create a canvas with the center as starting point
            var oCanvas = d3.select('#' + this.getId())
                .append('svg')
                    .attr('width', iWidth)
                    .attr('height', iHeight)
                    .append('g')
                        .attr('transform', 'translate(' + [ iWidth / 2, iHeight / 2 ] + ')');

            
        };

        return CustomControl;
    }
);
