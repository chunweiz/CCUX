/*global sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/core/EnabledPropagator'
    ],

    function (Control, EnabledPropagator) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.Checkbox', {
            metadata: {
                library: 'ute.ui.main',

                properties: {
                    design: { type: 'ute.ui.main.CheckboxDesign', defaultValue: ute.ui.main.CheckboxDesign.Default },
                    checked: { type: 'boolean', defaultValue: false },
                    disabled: { type: 'boolean', defaultValue: false }
                },

                events: {
                    select: {
                        parameters : {
                            checked : { type: 'boolean' }
                        }
                    }
                }
            }
        });

        EnabledPropagator.call(CustomControl.prototype);

        CustomControl.prototype.ontap = function (oEvent) {
            if (this.getDisabled()) {
                return;
            }

            alert('ontap');

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

            this.$().prop('checked', bValue);

            this.setProperty('checked', bValue, true);
            return this;
        };

        CustomControl.prototype.onBeforeRendering = function () {
            this.$().unbind('change', jQuery.proxy(this.ontap, this));
        };

        return CustomControl;
    },

    true
);
