/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.CustomerJourney', {
            metadata: {
                library: 'ute.ui.main',

                properties: {
                    width: { type: 'int', defaultValue: 680 }
                },

                aggregations: {
                    
                },

                defaultAggregation: 'content'
            }
        });

        return CustomControl;
    },

    true
);
