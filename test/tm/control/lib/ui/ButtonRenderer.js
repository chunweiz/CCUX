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

            if (oControl.getText()) {
                oRm.write('<span>');
                oRm.writeEscaped(oControl.getText());
                oRm.write('</span>');
            }

            oRm.write('</button>');
        };

        return ButtonRenderer;
    },

    true
);
