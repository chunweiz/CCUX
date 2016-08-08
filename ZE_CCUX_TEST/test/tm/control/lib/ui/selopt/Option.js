/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Element'
    ],

    function (CoreElement) {
        'use strict';

        var Element = CoreElement.extend('tm.control.lib.ui.selopt.Option', {
            metadata: {
                library: 'test.control.lib.ui',

                properties: {
                    key: {
                        type: 'string',
                        defaultValue: null
                    }
                },

                defaultAggregation: 'content',

                aggregations: {
                    content: {
                        type: 'sap.ui.core.Control',
                        multiple: true,
                        singularName: 'content'
                    }
                }
            }
        });

        return Element;
    },

    true
);

