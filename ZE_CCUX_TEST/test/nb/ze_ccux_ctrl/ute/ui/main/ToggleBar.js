/*global sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('nb.ui.main.ToggleBar', {
            metadata: {
                library: 'nb.ui.main',

                properties: {
                    design: { type: 'nb.ui.main.ToggleBarDesign', defaultValue: nb.ui.main.ToggleBarDesign.Default },
                    selectedItem: { type: 'string', defaultValue: null }
                },

                aggregations: {
                    items: { multiple: true, singularName: 'item', type: 'nb.ui.main.ToggleBarItem' }
                },

                defaultAggregation: 'items',

                event: {
                    select: {
                        parameters: {
                            oItem: { type: 'nb.ui.main.ToggleBarItem' }
                        }
                    }
                }
            }
        });


        return CustomControl;
    },

    true
);
