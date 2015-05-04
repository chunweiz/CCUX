/*globals sap*/

sap.ui.define(
    [
        'sap/ui/commons/Button'
    ],

    function (SAPBtn) {
        'use strict';

        var Button = SAPBtn.extend('tm.control.lib.ui.Button', {
            metadata: {
                library: 'tm.control.lib.ui',
                properties: {
                    design: {
                        type: 'string',
                        defaultValue: ''
                    }
                }
            }
        });

        Button.prototype.init = function () {
            this.setStyled(false);
        };

        return Button;
    },

    true
);
