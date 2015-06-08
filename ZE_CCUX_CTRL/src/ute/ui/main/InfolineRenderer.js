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

            oCustomControl._addHeaderExpander(oRm);

//            if (oCustomControl.getHeader()) {
//                oCustomControl._addHeader(oRm);
//            }

            oRm.write('</header>');

            /*
            ** Content of infoline
            */
            oRm.write('<section');
            oRm.addClass('uteMIl-body');
            oRm.writeClasses();
            oRm.write('>');
            oCustomControl._addContent(oRm);
            oRm.write('</section>');

            oRm.write('</div>');
        };

        return CustomRenderer;
    },

    true
);
