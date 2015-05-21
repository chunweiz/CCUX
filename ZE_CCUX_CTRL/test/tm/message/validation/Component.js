/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/UIComponent'
    ],

    function (UIComponent) {
        'use strict';

        var MSGComponent = UIComponent.extend('tm.message.validation.Component', {
            metadata: {
                handleValidation: true,

                dependencies: {
                    libs: [
                        'sap.m',
                        'tm.control.lib.ui'
                    ]
                },

                rootView: {
                    viewName: 'tm.message.validation.view.App',
                    type: 'XML'
                }
            }
        });

        MSGComponent.prototype.init = function () {
            UIComponent.prototype.init.apply(this, arguments);

            this.setModel(sap.ui.getCore().getMessageManager().getMessageModel(), 'comp-message');
        };

        return MSGComponent;
    }
);
