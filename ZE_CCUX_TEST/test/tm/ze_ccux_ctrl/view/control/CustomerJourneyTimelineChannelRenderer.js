/*global sap*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var CustomRenderer = {};

        CustomRenderer.render = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.writeControlData(oCustomControl);
            oRm.addClass('tmCJTChannel');
            oRm.writeClasses();
            oRm.write('>');

            this._renderLeftLine(oRm, oCustomControl);
            // this._renderTopLabel(oRm, oCustomControl);
            this._renderIcon(oRm, oCustomControl);
            this._renderRightLine(oRm, oCustomControl);

            oRm.write('</div>');
        };

        CustomRenderer._renderTopLabel = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.addClass('tmCJTChannel-topLabel');
            oRm.writeClasses();
            oRm.write('>');

            if (oCustomControl.getTopLabel()) {
                oRm.writeEscaped(oCustomControl.getTopLabel());
            }

            oRm.write('</div>');
        };

        CustomRenderer._renderIcon = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.addClass('tmCJTChannel-icon');
            oRm.writeClasses();
            oRm.write('>');

            oRm.writeIcon(oCustomControl.getChannelIcon());

            oRm.write('</div>');
        };

        CustomRenderer._renderLeftLine = function (oRm, oCustomControl) {

        };

        CustomRenderer._renderRightLine = function (oRm, oCustomControl) {

        };

        return CustomRenderer;
    }
);
