/*global sap, ute */
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/Control'
    ],

    function (jQuery, Control) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.TabBar', {
            metadata: {
                library: 'ute.ui.main',

                properties: {
                    design: { type: 'ute.ui.main.TabBarDesign', defaultValue: ute.ui.main.TabBarDesign.Default }
                },

                aggregations: {
                    content: { type: 'ute.ui.main.TabBarItem', multiple: true, singularName: 'content' }
                },

                defaultAggregation: 'content',

                events: {
                    select: {
                        parameters: {
                            selectedKey: { type: 'string' }
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
                selectedKey: oControlEvent.getSource().getKey()
            });
        };

        return CustomControl;
    },

    true
);
