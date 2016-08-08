/*global sap, vc*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var CustomRenderer = {};

        CustomRenderer.render = function (oRm, oCustomControl) {
            oRm.write('<button');
            oRm.writeControlData(oCustomControl);
            oRm.addClass('vcBtn');

            if (oCustomControl.getDesign() !== vc.control.ButtonDesign.None) {
                oRm.addClass('vcBtn-design-' + oCustomControl.getDesign().toLowerCase());
            }

            oRm.writeClasses();
            oRm.write('>');

            if (oCustomControl.getText()) {
                oRm.writeEscaped(oCustomControl.getText());
            }

            oRm.write('</button>');
        };

        return CustomRenderer;
    },

    true
);
