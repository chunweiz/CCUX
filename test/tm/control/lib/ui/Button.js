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
                        type: 'tm.control.lib.ui.ButtonDesign',
                        defaultValue: null
                    },
                    text: {
                        type: 'string',
                        defaultValue: ''
                    },
                    width: {
                        type: 'sap.ui.core.CSSSize',
                        defaultValue: null
                    },
                    enabled: {
                        type: 'boolean',
                        defaultValue: true
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
