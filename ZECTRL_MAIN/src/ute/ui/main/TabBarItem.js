/*global sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/Control',
        'sap/ui/core/EnabledPropagator'
    ],

    function (jQuery, Control, EnabledPropagator) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.TabBarItem', {
            metadata: {
                library: 'ute.ui.main',

                properties: {
                    design: { type: 'ute.ui.main.TabBarItemDesign', defaultValue: ute.ui.main.TabBarItemDesign.Default },
                    key: { type: 'string', defaultValue: null },
                    group: { type: 'string', defaultValue: null },
                    selected: { type: 'boolean', defaultValue: false },
                    enabled: { type: 'boolean', defaultValue: true }
                },

                aggregations: {
                    content: { type: 'sap.ui.core.Control', multiple: true, singularName: 'content' }
                },

                defaultAggregation: 'content',

                events: {
                    press: {
                        parameters: {
                            selectedKey: { type: 'string' }
                        }
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

            this.setSelected(true);

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

        return CustomControl;
    },

    true
);
