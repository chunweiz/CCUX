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

            this._renderBanner(oRm, oCustomControl);
            this._renderBody(oRm, oCustomControl);


            oRm.write('</div>'); // uteAppBody-inner
            oRm.write('</div>'); // uteAppBody
        };

        CustomRenderer._renderBanner = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.addClass('uteAppBody-banner');
            oRm.writeClasses();
            oRm.write('>');

            oCustomControl.getBanner().forEach(function (oBanner) {
                oRm.renderControl(oBanner);
            });

            oRm.write('</div>');
        };

        CustomRenderer._renderNavLeft = function (oRm, oCustomControl) {
            oCustomControl.getNavLeft().forEach(function (oNavLeft) {
                oRm.renderControl(oNavLeft);
            }.bind(this));
        };

        CustomRenderer._renderNavRight = function (oRm, oCustomControl) {
            oCustomControl.getNavLeft().forEach(function (oNavRight) {
                oRm.renderControl(oNavRight);
            }.bind(this));
        };

        CustomRenderer._renderContent = function (oRm, oCustomControl) {
            oCustomControl.getContent().forEach(function (oContent) {
                oRm.renderControl(oContent);
            }.bind(this));
        };

        CustomRenderer._renderBody = function (oRm, oCustomControl) {

        };

        return CustomRenderer;
    },

    true
);
