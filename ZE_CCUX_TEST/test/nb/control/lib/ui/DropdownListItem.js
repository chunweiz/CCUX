/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Element',
        'sap/ui/core/Control'
    ],

    function (CoreElement) {
        'use strict';

        var Element = CoreElement.extend('nb.control.lib.ui.DropdownListItem', {
            metadata: {
                library: 'nb.control.lib.ui',

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

