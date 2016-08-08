/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Element'
    ],

    function (CoreElement) {
        'use strict';

        var Element = CoreElement.extend('tm.control.lib.ui.table.Row', {
            metadata: {
                library: 'tm.control.lib.ui',

                defaultAggregation: 'cells',

                aggregations: {
                    cells: {
                        type: 'sap.ui.core.Control',
                        multiple: true,
                        singularName: 'cell'
                    }
                }
            }
        });

        return Element;
    },

    true
);
