/*global sap, ute */
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/Control'
    ],

    function (jQuery, Control) {
        'use strict';

        var CustomControl = Control.extend('nb.control.lib.ui.Dropdown', {
            metadata: {
                library: 'nb.control.lib.ui',

                properties: {
                    design: { type: 'nb.control.lib.ui.DropdownDesign', defaultValue: nb.control.lib.ui.DropdownDesign.Default}
                },

                aggregations: {
                    content: { type: 'sap.ui.core.Control', multiple: true, singularName: 'content' }
                },

                defaultAggregation: 'content',

                events: {
                    select: {
                        parameters: {
                            selectedItem: { type: 'nb.control.lib.ui.DropdownListItem' }
                        }
                    }
                }
            }
        });

        CustomControl.prototype._attachItemPress = function (oItem) {
            oItem.attachPress(jQuery.proxy(this._onItemPress, this));
        };

        CustomControl.prototype._onItemPress = function (oControlEvent) {
            this.fireSelect({
                selectedItem: oControlEvent.getSource()
            });
        };

        return CustomControl;
    },

    true
);
