/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.app.FooterNotificationItem', {
            metadata: {
                library: 'ute.ui.app',

                properties: {
                    design: { type: 'ute.ui.app.FooterNotificationItemDesign', defaultValue: ute.ui.app.FooterNotificationItemDesign.Information },
                    customIcon: { type: 'sap.ui.core.Icon', defaultValue: 'sap-icon://nrg-icon/notification' },
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
