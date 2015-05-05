/*globals sap*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var Button = Control.extend('tm.control.lib.ui.Button', {
            metadata: {
                library: 'tm.control.lib.ui',
                properties: {
                    design: {
                        type: 'string',
                        defaultValue: ''
                    }
                },
                events: {
                    press: {}
                }
            }
        });

        return Button;
    },

    true
);
