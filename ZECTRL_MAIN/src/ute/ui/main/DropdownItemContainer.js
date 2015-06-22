/*global sap, ute*/
/*jslint nomen: true*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.DropdownItemContainer', {
            metadata: {
                library: 'ute.ui.main',

                properties: {},

                aggregations: {
                    content: { type: 'ute.ui.main.DropdownItem', multiple: true, singularName: 'content' }
                },

                defaultAggregation: 'content'
            }
        });



        return CustomControl;
    },

    true
);
