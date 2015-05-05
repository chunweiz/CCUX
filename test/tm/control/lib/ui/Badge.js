/*globals sap, tm*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var Badge = Control.extend('tm.control.lib.ui.Badge', {
            metadata: {
                library: 'tm.control.lib.ui',

                properties: {
                    design: {
                        type: 'tm.control.lib.ui.BadgeDesign',
                        defaultValue: tm.control.lib.ui.BadgeDesign.Regular
                    },
                    text: {
                        type: 'string',
                        defaultValue: ''
                    },
                    size: {
                        type: 'sap.ui.core.CSSSize',
                        defaultValue: '2rem'
                    },
                    textSize: {
                        type: 'sap.ui.core.CSSSize',
                        defaultValue: null
                    }
                }
            }
        });

        return Badge;
    },

    true
);
