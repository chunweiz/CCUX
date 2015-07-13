/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.app.HeaderMenuItem', {
            metadata: {
                library: 'ute.ui.app',

                properties: {

                },

                aggregations: {

                },

                defaultAggregation: ''
            }
        });

        return CustomControl;
    },

    true
);
