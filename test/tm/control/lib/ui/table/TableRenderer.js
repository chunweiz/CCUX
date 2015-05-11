/*global sap*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var Renderer = {};

        Renderer.render = function (oRm, oControl) {
            oControl._createRows();
        };

        return Renderer;
    },

    true
);
