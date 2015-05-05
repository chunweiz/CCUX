/*globals sap, tm*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var ButtonRenderer = {};

        ButtonRenderer.render = function (oRm, oControl) {
            oRm.write('<button');

            oRm.writeControlData(oControl);
            oRm.writeAttribute('type', 'button');

            if (oControl.getTooltip_AsString()) {
                oRm.writeAttributeEscaped('title', oControl.getTooltip_AsString());
            }

            oRm.addClass('uteBtn');
            oRm.writeClasses();
            oRm.write('>');

            //Begin - body of the button
            oRm.write('<span>' + tm.control.lib.ui.ButtonDesign.Alert + '</span>');

            //End - body of the button

            oRm.write('</button>');
        };

        return ButtonRenderer;
    },

    true
);
