/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var CustomRenderer = {};

        CustomRenderer.render = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.writeControlData(oCustomControl);
            oRm.addClass('uteAppHdr');
            oRm.writeClasses();
            oRm.write('>');

            if (oCustomControl.getHeadline()) {
                this._renderHeadline(oRm, oCustomControl);
            }

            if (oCustomControl.getMenu()) {
                this._renderMenu(oRm, oCustomControl);
            }

            oRm.write('</div>');
        };

        CustomRenderer._renderHeadline = function (oRm, oCustomControl) {
            var aHeadline = oCustomControl.getHeadline();

            oRm.write('<div');
            oRm.addClass('uteAppHdr-hline');
            oRm.writeClasses();
            oRm.write('>');

            aHeadline.forEach(function (oHeadline) {
                oRm.renderControl(oHeadline);
            }.bind(this));

            oRm.write('</div>');
        };

        CustomRenderer._renderMenu = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.addClass('uteAppHdr-menu');
            oRm.writeClasses();
            oRm.write('>');

            oRm.renderControl(oCustomControl.getMenu());

            oRm.write('</div>');
        };

        return CustomRenderer;
    },

    true
);
