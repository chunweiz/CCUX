/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/UIComponent',
        './Icon',
        'sap/ui/model/json/JSONModel'
    ],

    function (UIComponent, Icon, JSONModel) {
        'use strict';

        var CustomComponent = UIComponent.extend('test.tm.ze_ccux_ctrl.Component', {
            metadata: {
                manifest: 'json'
            }
        });

        CustomComponent.prototype.init = function () {
            UIComponent.prototype.init.apply(this, arguments);

            this.getRouter().initialize();
            Icon.load();

            var oModel = new JSONModel({
                data: {
                    title: {
                        nrg: 'NRG Reliant Interaction Center',
                        ute: 'Utegration Inc'
                    }
                }
            });

            this.setModel(oModel, 'comp-test');
        };

        return CustomComponent;
    }
);
