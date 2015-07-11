/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.app.Header', {
            metadata: {
                library: 'ute.ui.app'
            },

            aggregations: {
                headline: { type: 'sap.ui.core.Control', multiple: true, singularName: 'headline' },
                menu: { type: 'sap.ui.core.Control', multiple: false }
            },

            defaultAggregation: 'menu'
        });

        return CustomControl;
    },

    true
);
