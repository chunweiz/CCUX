/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.SegmentedButton', {
            metadata: {
                library: 'ute.ui.main',

                properties: {
                    selectedButton: { type: 'string', defaultValue: null },
                    disabled: { type: 'boolean', defaultValue: false }
                },

                aggregations: {
                    content: { multiple: true, singularName: 'content', type: 'ute.ui.main.Button' }
                },

                defaultAggregation: 'content',

                event: {
                    select: {
                        parameters: {
                            oSelectedButton: { type: 'ute.ui.main.Button' }
                        }
                    }
                }
            }
        });


        return CustomControl;
    },

    true
);
