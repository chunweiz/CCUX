/*global sap*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var CustomRenderer = {};

        CustomRenderer.render = function (oRm, oCustomControl) {
            oRm.write('<button');
            oRm.writeControlData(oCustomControl);
            oRm.write('>');
            oRm.write('</button>');
        };

        return CustomRenderer;
    },

    true
);
