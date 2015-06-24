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
                    design: { type: 'ute.ui.main.DropdownItemDesign', defaultValue: ute.ui.main.DropdownItemDesign.Default },
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

        CustomControl.prototype.ontap = function (oEvent) {
            this.setSelected(true);
            this.firePress();
        };

        CustomControl.prototype.setSelected = function (bSelected) {

        };

        return CustomControl;
    },

    true
);
