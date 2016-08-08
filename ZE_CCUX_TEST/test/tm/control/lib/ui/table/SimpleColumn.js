/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (CoreControl) {
        'use strict';

        var Control = CoreControl.extend('tm.control.lib.ui.table.SimpleColumn', {
            metadata: {
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

        return Control;
    },

    true
);
