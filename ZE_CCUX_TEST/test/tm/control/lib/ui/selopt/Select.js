/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (CoreControl) {
        'use strict';

        var Control = CoreControl.extend('tm.control.lib.ui.selopt.Select', {
            metadata: {
                library: 'tm.control.lib.ui',

                defaultAggregation: 'options',

                aggregations: {
                    options: {
                        type: 'tm.control.lib.ui.selopt.Option',
                        multiple: true,
                        singularName: 'option'
                    }
                }
            }
        });

        return Control;
    },

    true
);
