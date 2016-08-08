/*global sap, tm*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (CoreControl) {
        'use strict';

        var Control = CoreControl.extend('tm.control.lib.ui.Infoline', {
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
                        defaultValue: '20px'
                    },
                    textSize: {
                        type: 'sap.ui.core.CSSSize',
                        defaultValue: null
                    }
                }
            }
        });

        return Control;
    },

    true
);
