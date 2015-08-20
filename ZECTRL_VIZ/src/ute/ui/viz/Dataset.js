/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Element'
    ],

    function (Element) {
        'use strict';

        var CustomElement = Element.extend('ute.ui.viz.Dataset', {
            metadata: {
                library: 'ute.ui.viz'
            }
        });

        return CustomElement;
    },

    true
);
