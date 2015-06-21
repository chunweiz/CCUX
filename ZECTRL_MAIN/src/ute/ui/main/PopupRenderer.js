/*global sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global'
    ],

    function (jQuery) {
        'use strict';

        var CustomRenderer = {};

        CustomRenderer.render = function (oRm, oCustomControl) {
            this._renderContent(oRm, oCustomControl);
        };

        CustomRenderer._renderContent = function (oRm, oCustomControl) {
            var aContent = oCustomControl.getContent() || [];

            aContent.forEach(function (oContent) {
                oRm.renderControl(oContent);
            });
        };

        return CustomRenderer;
    },

    true
);
