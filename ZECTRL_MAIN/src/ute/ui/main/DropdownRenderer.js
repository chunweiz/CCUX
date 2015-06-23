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
            oRm.addClass('uteMDd');

            if (oCustomControl.getDesign() !== ute.ui.main.DropdownDesign.None) {
                oRm.addClass('uteMDd-design-' + oCustomControl.getDesign().toLowerCase());
            }

            oRm.writeClasses();
            oRm.write('>');

            this._renderHeader(oRm, oCustomControl);
            this._renderExpander(oRm, oCustomControl);

            oRm.write('</div>');
        };

        CustomRenderer._renderHeader = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.addClass('uteMDd-hdr');
            oRm.writeClasses();
            oRm.write('>');



            oRm.write('</div>');
        };

        CustomRenderer._renderExpander = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.addClass('uteMDd-expander');
            oRm.writeClasses();
            oRm.write('>');



            oRm.write('</div>');
        };

        return CustomRenderer;
    },

    true
);
