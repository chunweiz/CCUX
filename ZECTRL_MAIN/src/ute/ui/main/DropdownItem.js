/*global sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.DropdownItem', {
            metadata: {
                library: 'ute.ui.main',

                properties: {
                    key: { type: 'string', defaultValue: null }
                },

                aggregations: {
                    content: { type: 'sap.ui.core.Control', multiple: true, singularName: 'content' }
                },

                defaultAggregation: 'content',

                events: {
                    press: {}
                }
            }
        });

        CustomControl.prototype.onclick = function (oEvent) {
            this.firePress();
        };

        return CustomControl;
    },

    true
);
