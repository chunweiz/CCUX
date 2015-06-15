/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/core/EnabledPropagator'
    ],

    function (Control, EnabledPropagator) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.ToggleBarItem', {
            metadata: {
                library: 'ute.ui.main',

                properties: {
                    key: { type: 'string', defaultValue: null },
                    name: { type: 'string', defaultValue: null },
                    selected: { type: 'boolean', defaultValue: false }
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

        CustomControl.prototype.ontap = function (oEvent) {
            if (!this.getEnabled()) {
                return;
            }

            this.firePress({
                selectedKey: this.getKey()
            });
        };

        return CustomControl;
    },

    true
);
