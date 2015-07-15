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
                    expanded: { type: 'boolean', defaultValue: false }
                },

                aggregations: {
                    header: { type: 'sap.ui.core.Control', multiple: true, singularName: 'header' },
                    content: { type: 'sap.ui.core.Control', multiple: true, singularName: 'content' }
                },

                defaultAggregation: 'content'
            }
        });

        return CustomControl;
    },

    true
);
