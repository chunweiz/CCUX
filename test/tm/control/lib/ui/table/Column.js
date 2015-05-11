/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Element'
    ],

    function (CoreElement) {
        'use strict';

        var Element = CoreElement.extend('tm.control.lib.ui.table.Column', {
            metadata: {
                library: 'test.control.lib.ui',

                defaultAggregation: 'label',

                aggregations: {
                    label: {
                        type: 'sap.ui.core.Control',
                        multiple: false
                    },

                    template: {
                        type: 'sap.ui.core.Control',
                        multiple: false
                    }
                }
            }
        });

        return Element;
    },

    true
);
