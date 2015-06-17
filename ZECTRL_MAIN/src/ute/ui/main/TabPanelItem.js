/*global sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Element'
    ],

    function (Element) {
        'use strict';

        var CustomElement = Element.extend('ute.ui.main.TabPanelItem', {
            metadata: {
                library: 'ute.ui.main',

                properties: {
                    design: { type: 'ute.ui.main.TabPanelItemDesign', defaultValue: ute.ui.main.TabPanelItemDesign.Default },
                    hidden: { type: 'boolean', defaultValue: true }
                },

                aggregations: {
                    content: { type: 'sap.ui.core.Control', multiple: true, singularName: 'content' }
                },

                defaultAggregation: 'content'
            }
        });

        CustomElement.prototype.setHidden = function (bValue) {


            this.setProperty('hidden', bValue);
            return this;
        };

        return CustomElement;
    },

    true
);
