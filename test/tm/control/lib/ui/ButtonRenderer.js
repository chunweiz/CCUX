/*globals sap*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/Renderer',
        'sap/ui/commons/ButtonRenderer'
    ],

    function (jQuery, Renderer, SAPBtnRenderer) {
        'use strict';

        var ButtonRenderer = Renderer.extend(SAPBtnRenderer);



        return ButtonRenderer;
    },

    true
);
