/*global sap*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var CustomRenderer = {};

        CustomRenderer.render = function (oRm, oCustomControl) {
            oRm.write('<span');
            oRm.writeControlData(oCustomControl);
            oRm.addClass('uteAppIdxLink');
            oRm.writeClasses();
            oRm.write('>');

            if (oRm.getDescription()) {
                oRm.writeEscaped(oCustomControl.getDescription());
            }

            oRm.write('</span>');
        };

        return CustomRenderer;
    },

    true
);
