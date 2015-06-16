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
            oRm.addClass('uteMTab');

            if (oCustomControl.getDesign() !== ute.ui.main.TabBar.None) {
                oRm.addClass('uteMTab-design-' + oCustomControl.getDesign().toLowerCase());
            }

            oRm.writeClasses();
            oRm.write('>');

            /*
            ** Tab bar item
            */
            oRm.write('<div');
            oRm.addClass('uteMTab-content');
            oRm.writeClasses();
            oRm.write('>');
            this._renderContent(oRm, oCustomControl);
            oRm.write('</div>');

            oRm.write('</div>');
        };

        CustomRenderer._renderContent = function (oRm, oCustomControl) {
            var aContent;

            aContent = oCustomControl.getContent() || [];

            aContent.forEach(function (oContent) {
                oContent.setName(oCustomControl.getId() + '--grp');
                oContent.setDesign(oCustomControl.getDesign());

                oRm.write('<span');
                oRm.addClass('uteMTab-contentItem');
                oRm.writeClasses();
                oRm.write('>');
                oRm.renderControl(oContent);
                oRm.write('</span>');
            });
        };

        return CustomRenderer;
    },

    true
);
