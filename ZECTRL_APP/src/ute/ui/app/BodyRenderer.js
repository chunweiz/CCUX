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
            oRm.addClass('uteAppBody');
            oRm.writeClasses();
            oRm.write('>');

            oRm.write('<div');
            oRm.addClass('uteAppBody-wrap');
            oRm.addClass('uteAppBody-inner');
            oRm.writeClasses();
            oRm.write('>');

            this._renderContent(oRm, oCustomControl);

            oRm.write('</div>'); // uteAppBody-inner
            oRm.write('</div>'); // uteAppBody
        };

        CustomRenderer._renderContent = function (oRm, oCustomControl) {

            oCustomControl.getContent().forEach(function (oContent) {
                oRm.renderControl(oContent);
            });
        };

        return CustomRenderer;
    },

    true
);
