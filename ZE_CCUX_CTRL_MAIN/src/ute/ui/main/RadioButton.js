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

        var CustomControl = Control.extend('ute.ui.main.RadioButton', {
            metadata: {
                library: 'ute.ui.main',

                properties: {
                    design: { type: 'ute.ui.main.RadioButtonDesign', defaultValue: ute.ui.main.RadioButtonDesign.Default },
                    name: { type: 'string', defaultValue: null },
                    checked: { type: 'boolean', defaultValue: false },
                    disabled: { type: 'boolean', defaultValue: false }
                },

                events: {
                    select: {
                        parameters: {
                            checked: { type: 'boolean' }
                        }
                    }
                }
            }
        });

        EnabledPropagator.call(CustomControl.prototype);

        CustomControl.prototype.exit = function () {
            this.$().unbind('change', jQuery.proxy(this.onchange));
        };

        CustomControl.prototype.onBeforeRendering = function () {
            this.$().unbind('change', jQuery.proxy(this.onchange));
        };

        CustomControl.prototype.onAfterRendering = function () {
            this.$().bind('change', jQuery.proxy(this.onchange, this));
        };

        CustomControl.prototype.onchange = function (oEvent) {
            if (this.getDisabled()) {
                return;
            }

            this.setChecked(!this.getChecked());
            this.fireSelect({
                checked: this.getChecked()
            });
        };

        CustomControl.prototype.setChecked = function (bValue) {
            bValue = !!bValue;

            if (this.getChecked() === bValue) {
                return this;
            }

            this.$('.uteMRb-intRb').prop('checked', bValue);

            this.setProperty('checked', bValue, true);
            return this;
        };

        CustomControl.prototype.setDisabled = function (bValue) {
            bValue = !!bValue;

            if (this.getDisabled() === bValue) {
                return this;
            }

            this.$('.uteMRb-intRb').prop('disabled', bValue);

            this.setProperty('disabled', bValue, true);
            return this;
        };

        return CustomControl;
    },

    true
);
