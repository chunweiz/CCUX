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

            if (oCustomControl.getSelected()) {
                oRm.addClass('tmCJTChannel-selected');
            }

            oRm.writeClasses();
            oRm.write('>');

            this._renderTopLabel(oRm, oCustomControl);
            this._renderChannelIcon(oRm, oCustomControl);

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

        CustomRenderer._renderChannelIcon = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.addClass('tmCJTChannel-icon');
            oRm.writeClasses();
            oRm.write('>');

            oRm.writeIcon(oCustomControl.getChannelIcon());

            oRm.write('</div>');
        };

        return CustomRenderer;
    }
);
