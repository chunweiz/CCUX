/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Element'
    ],

    function (Element) {
        'use strict';

        var CustomElement = Element.extend('nb.ui.main.ToggleBarItem', {
            metadata: {
                library: 'nb.ui.main',

                properties: {
                    key: { type: 'string', defaultValue: null },
                    selected: { type: 'boolean', defaultValue: false }
                },

                aggregations: {
                    content: { multiple: true, singularName: 'content', type: 'sap.ui.core.Control' }
                },

                defaultAggregation: 'content'
            }
        });

        CustomElement.prototype._addContent = function (oRm) {
            this.getContent().forEach(function (oContent) {
                oRm.renderControl(oContent);
            }.bind(this));
        };

        CustomElement.prototype.setSelected = function (oValue) {
            if (oValue) {
                this.data('selected', 'true', true);
            } else {
                this.data('selected', null);
            }

            this.setProperty('selected', oValue);
            return this;
        };

        return CustomElement;
    },

    true
);
