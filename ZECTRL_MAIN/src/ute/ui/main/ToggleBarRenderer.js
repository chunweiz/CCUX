/*global sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var CustomRenderer = {};

        CustomRenderer.render = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.writeControlData(oCustomControl);
            oRm.addClass('uteMTbPn');

            if (oCustomControl.getDesign() !== ute.ui.main.TabPanelDesign.None) {
                oRm.addClass('uteMTbPn-design-' + oCustomControl.getDesign().toLowerCase());
            }

            oRm.writeClasses();
            oRm.write('>');

            /*
            ** Container for tab header
            */
            oRm.write('<div');
            oRm.addClass('uteMTbPn-hdr');
            oRm.writeClasses();
            oRm.write('>');
            this._renderTabHeader(oRm, oCustomControl);
            oRm.write('</div>');

            /*
            ** Container for tab content
            */
            oRm.write('<div');
            oRm.addClass('uteMTbPn-body');
            oRm.writeClasses();
            oRm.write('>');
            this._renderTabHeader(oRm, oCustomControl);
            oRm.write('</div>');

            oRm.write('</div>');
        };

        CustomRenderer._renderTabHeader = function (oRm, oCustomControl) {
            var aHeaderContent = oCustomControl.getHeaderContent() || [];

            aHeaderContent.forEach(function (oHeaderContent) {
                oHeaderContent.attach_press(oCustomControl._handleTabHeader);
                oRm.renderControl(aHeaderContent);
            });
        };

        CustomRenderer._renderTabBody = function (oRm, oCustomControl) {

        };

        return CustomRenderer;
    },

    true
);
