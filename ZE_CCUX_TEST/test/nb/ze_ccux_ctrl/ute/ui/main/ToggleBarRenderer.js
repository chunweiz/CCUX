/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var CustomRenderer = {};

        CustomRenderer.render = function (oRm, oCustomControl) {
            oRm.write('<span');
            oRm.writeControlData(oCustomControl);
            oRm.addClass('uteMTogBar');
            oRm.writeClasses();
            oRm.write('>');
            oRm.write('</span>');
        };

        return CustomRenderer;
    },

    true
);
