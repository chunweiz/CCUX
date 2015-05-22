/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var ControlRenderer = {};

        ControlRenderer.render = function (oRm, oControl) {
            oRm.write('<div');
            oRm.writeControlData(oControl);
            oRm.write('>');

            if (oControl.getIcon()) {
                this.writeImgHtml(oRm, oControl);
            }

            oRm.write('<span>');
            oRm.writeEscaped(oControl.getText());
            oRm.write('</span>');

            oRm.write('</div>');
        };

        ControlRenderer.writeImgHtml = function (oRm, oControl) {
            oRm.renderControl(oControl._getImage(oControl.getIcon()));
        };

        return ControlRenderer;
    },

    true
);
