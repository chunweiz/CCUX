/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(['sap/ui/core/Control'],
    function (Control) {
        'use strict';

        var Badge = Control.extend('ute.ui.commons.Badge', {
            metadata: {
                library: 'ute.ui.commons',
                properties: {
                    text: {
                        type: 'string',
                        defaultValue: ''
                    },
                    height: {
                        type: 'sap.ui.core.CSSSize',
                        defaultValue: '2rem'
                    },
                    width: {
                        type: 'sap.ui.core.CSSSize',
                        defaultValue: '2rem'
                    },
                    /*Type vluae can be 'Alert', 'Attention', and 'Regular'*/
                    type: {
                        type: 'ute.ui.commons.BadgeType',
                        defaultValue: 'ute.ui.commons.BadgeType.Regular'
                    }
                }
            }
        });

        return Badge;

    }, true);
