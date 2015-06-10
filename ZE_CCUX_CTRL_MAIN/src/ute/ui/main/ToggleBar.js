/*global sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.ToggleBar', {
            metadata: {
                library: 'ute.ui.main',

                properties: {
                    design: { type: 'ute.ui.main.ToggleBarDesign', defaultValue: ute.ui.main.ToggleBarDesign.Default },
                    selectedItem: { type: 'string', defaultValue: null }
                },

                aggregations: {
                    items: { multiple: true, singularName: 'item', type: 'ute.ui.main.ToggleBarItem' }
                },

                defaultAggregation: 'items',

                event: {
                    select: {
                        parameters: {
                            oItem: { type: 'ute.ui.main.ToggleBarItem' }
                        }
                    }
                }
            }
        });


        return CustomControl;
    },

    true
);
