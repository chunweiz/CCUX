/*global sap*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var Renderer = {};

        Renderer.render = function (oRm, oControl) {
            oRm.write('<tr');
            oRm.writeControlData(oControl);
            oRm.write('>');

            oControl.getCells().forEach(function (oCell) {
                oRm.write('<th>');
                oRm.renderControl(oCell);
                oRm.write('</th>');
            });

            oRm.write('</tr>');
        };

        return Renderer;
    },

    true
);
