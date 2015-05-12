/*global sap, tm*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (CoreControl) {
        'use strict';

        var Control = CoreControl.extend('tm.control.lib.ui.table.SimpleTable', {
            metadata: {
                library: 'tm.control.lib.ui',

                aggregations: {
                    columns: {
                        type: 'tm.control.lib.ui.table.SimpleColumn',
                        multiple: true,
                        singularName: 'column'
                    },

                    rows: {
                        type: 'tm.control.lib.ui.table.SimpleRow',
                        multiple: true,
                        singularName: 'row'
                    }
                }
            }
        });

        return Control;
    },

    true
);
