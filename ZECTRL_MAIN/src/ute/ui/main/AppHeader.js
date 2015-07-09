/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.AppHeader', {
            metadata: {
                properties: {

                },

                aggregations: {
                    logo: { type: 'sap.ui.core.Control', multiple: false },
                    title: { type: 'sap.ui.core.Control', multiple: false },
                    menu: { type: 'sap.ui.core.Control', multiple: true, singularName: 'content' }
                },

                defaultAggregation: 'menu',

                events: {

                }
            }
        });
    },

    true
);
