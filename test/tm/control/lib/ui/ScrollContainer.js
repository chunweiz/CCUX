/*global sap, jQuery*/
/*jslint nomen: true */

sap.ui.define(
    [
        'sap/m/ScrollContainer'
    ],

    function (ScrollContainer) {
        'use strict';

        var Control = ScrollContainer.extend('tm.control.lib.ui.ScrollContainer');

        return Control;
    },

    true
);
