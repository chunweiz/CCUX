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

            oRm.addClass('uteApp');
            oRm.writeClasses();

            oRm.write('>');

            if (oCustomControl.getHeader()) {
                this._renderHeader(oRm, oCustomControl);
            }

            if (oCustomControl.getBody()) {
                this._renderBody(oRm, oCustomControl);
            }

            if (oCustomControl.getFooter()) {
                this._renderFooter(oRm, oCustomControl);
            }

            oRm.write('</div>');
        };

        CustomRenderer._renderHeader = function (oRm, oCustomControl) {
            oRm.write('<header');
            oRm.addClass('uteApp-hdr');
            oRm.writeClasses();
            oRm.write('>');

            oRm.renderControl(oCustomControl.getHeader());

            oRm.write('</header>');
        };

        CustomRenderer._renderBody = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.addClass('uteApp-body');
            oRm.writeClasses();
            oRm.write('</div>');

            oRm.renderControl(oCustomControl.getBody());

            oRm.write('</div>');
        };

        CustomRenderer._renderFooter = function (oRm, oCustomControl) {
            oRm.write('<footer');
            oRm.addClass('uteApp-ftr');
            oRm.writeClasses();
            oRm.write('>');

            oRm.renderControl(oCustomControl.getFooter());

            oRm.write('</footer>');
        };

        return CustomRenderer;
    },

    true
);
