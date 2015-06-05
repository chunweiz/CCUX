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
            oRm.addClass('uteMIl');

            if (oCustomControl.getDesign() !== ute.ui.main.InfolineDesign.None) {
                oRm.addClass('uteMIl-design-' + oCustomControl.getDesign().toLowerCase());
            }

            oRm.writeClasses();
            oRm.write('>');

            /*
            ** Header of infoline
            */
            oRm.write('<header');
            oRm.addClass('uteMIl-hdr');
            oRm.writeClasses();
            oRm.write('>');

            if (oRm.getHeader()) {
                oCustomControl._addHeaderContent(oRm);
            }

            oCustomControl._addHeaderExpander(oRm);

            oRm.write('</header>');

            /*
            ** Content of infoline
            */
            oRm.write('<article');
            oRm.addClass('uteMIl-body');
            oRm.writeClasses();
            oRm.write('>');
            if (oRm.getContent()) {
                oCustomControl._addContent(oRm);
            }
            oRm.write('</article>');

            oRm.write('</div>');
        };

        return CustomRenderer;
    },

    true
);
