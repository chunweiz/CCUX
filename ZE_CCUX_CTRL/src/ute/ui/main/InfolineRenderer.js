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

            /*
            ** Header's content
            */
            oRm.write('<section');
            oRm.write('>');
            if (oRm.getHeader()) {
                oCustomControl._addHeader(oRm);
            }
            oRm.write('</section>');

            /*
            ** Header's expander icon
            */
            oRm.write('<aside>');
            oRm.write('</aside>');

            oRm.write('</header>');

            /*
            ** Content of infoline
            */
            oRm.write('<article');
            oRm.addClass('uteMIl-content');
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
