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
                oRm.write('<td>');
                oRm.renderControl(oCell);
                oRm.write('</td>');
            });


            oRm.write('</tr>');
        };

        return Renderer;
    },

    true
);
