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
            oRm.addClass('uteAppHMItem');
            oRm.writeClasses();
            oRm.write('>');

            if (oCustomControl.getHeader()) {
                this._renderHeader(oRm, oCustomControl);
            }

            if (oCustomControl.getContent()) {
                this._renderContent(oRm, oCustomControl);
            }

            oRm.write('</div>');
        };

        CustomRenderer._renderHeader = function (oRm, oCustomControl) {
            var aHeader = oCustomControl.getHeader();

            oRm.write('<div');
            oRm.addClass('uteAppHMItem-hdr');
            oRm.writeClasses();
            oRm.write('>');

            aHeader.forEach(function (oHeader) {
                oRm.renderControl(oHeader);
            });

            oRm.write('</div>');
        };

        CustomRenderer._renderContent = function (oRm, oCustomControl) {
            var aContent = oCustomControl.getContent();

            oRm.write('<div');
            oRm.addClass('uteAppHMItem-content');
            oRm.writeClasses();
            oRm.write('>');

            aContent.forEach(function (oContent) {
                oRm.renderControl(oContent);
            });

            oRm.write('</div>');
        };

        return CustomRenderer;
    },

    true
);
