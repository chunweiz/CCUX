/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.app.Message', {
            metadata: {
                library: 'ute.ui.app',

                properties: {
                    design: { type: 'ute.ui.app.MessageDesign', defaultValue: ute.ui.app.MessageDesign.None },
                    text: { type: 'string', defaultValue: null },
                    icon: { type: 'sap.ui.core.URI', defaultValue: 'sap-icon://nrg-icon/notification' }
                }
            }
        });

        return CustomControl;
    },

    true
);
