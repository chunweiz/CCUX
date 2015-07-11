/*global sap*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var CustomRenderer = {};

        CustomRenderer.render = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.writeControlData(oCustomControl);

            oRm.addClass('uteAppFtr');
            oRm.writeClasses();

            oRm.write('>');


            oRm.write('</div>');
        };

        return CustomRenderer;
    },

    true
);
