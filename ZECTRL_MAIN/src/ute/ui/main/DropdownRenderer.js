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

            oRm.write('</div>');
        };

        CustomRenderer._renderHeader = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.addClass('uteMDd-hdr');
            oRm.writeClasses();
            oRm.write('>');

            this._renderHeaderContent(oRm, oCustomControl);
            this._renderHeaderExpander(oRm, oCustomControl);

            oRm.write('</div>');
        };

        CustomRenderer._renderHeaderContent = function (oRm, oCustomControl) {
            var aContent = oCustomControl.getAggregation('_headerContent') || [];

            oRm.write('<label');
            oRm.addClass('uteMDd-hdrContent');
            oRm.writeClasses();
            oRm.write('>');

            aContent.forEach(function (oContent) {
                oRm.renderControl(oContent);
            });

            oRm.write('</label>');
        };

        CustomRenderer._renderHeaderExpander = function (oRm, oCustomControl) {
            var oHdrExpander;

            oHdrExpander = oCustomControl._getHeaderExpander();

            oRm.write('<div');
            oRm.addClass('uteMDd-hdrExpander');

            if (oCustomControl.getDesign() !== ute.ui.main.DropdownDesign.None) {
                oHdrExpander.addStyleClass('uteMDd-hdrExpanderDesign-' + oCustomControl.getDesign().toLowerCase());
            }

            oRm.writeClasses();
            oRm.write('>');

            oRm.renderControl(oHdrExpander);

            oRm.write('</div>');
        };

        return CustomRenderer;
    },

    true
);
