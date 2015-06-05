/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('vc.control.Button', {
            metadata: {
                library: 'vc.control',

                properties: {
                    text: { type: 'string', defaultValue: null }
                },

                events: {
                    press: {}
                }
            }
        });

        CustomControl.prototype.ontap = function (oEvent) {
            this.firePress();
        };

        return CustomControl;
    },

    true
);
