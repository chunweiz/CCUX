/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Element',
        'sap/ui/core/Control'
    ],

    function (jQuery, Control, EnabledPropagator) {
        'use strict';

        var Element = CoreElement.extend('nb.ui.main.DropdownListItem', {
            metadata: {
                library: 'nb.ui.main',

                properties: {
                  /*  key: {
                        type: 'string',
                        defaultValue: null
                    }*/
                    design: { type: 'nb.ui.main.DropdownListItemDesign', defaultValue: nb.ui.main.DropdownListItemDesign.Default },
                    key: { type: 'string', defaultValue: null },
                    group: { type: 'string', defaultValue: null },
                    selected: { type: 'boolean', defaultValue: false },
                    enabled: { type: 'boolean', defaultValue: true }

                },

                defaultAggregation: 'content',

                aggregations: {
                    content: {
                        type: 'sap.ui.core.Control',
                        multiple: true,
                        singularName: 'content'
                    }
                }
            }
        });

        EnabledPropagator.call(CustomControl.prototype);

        CustomControl.prototype.exit = function () {
            this.$().unbind('change', jQuery.proxy(this._onchange));
        };

        CustomControl.prototype.onBeforeRendering = function () {
            this.$().unbind('change', jQuery.proxy(this._onchange));
        };

        CustomControl.prototype.onAfterRendering = function () {
            this.$().bind('change', jQuery.proxy(this._onchange, this));
        };

        CustomControl.prototype._onchange = function (oEvent) {
            if (!this.getEnabled()) {
                return;
            }

            this.setSelected(!this.getSelected());
            this.firePress({
                selectedKey: this.getKey()
            });
        };

        CustomControl.prototype.setSelected = function (bSelected) {
            bSelected = !!bSelected;

            if (this.getSelected() === bSelected) {
                return this;
            }

            this.$('.uteMTabBarItem-int').prop('checked', bSelected);

            this.setProperty('selected', bSelected);
            return this;
        };

        CustomControl.prototype.setEnabled = function (bEnabled) {
            this.$('.uteMTabBarItem-int').prop('disabled', bEnabled);
            this.setProperty('enabled', bEnabled);
            return this;
        };

        return Element;
    },

    true
);

