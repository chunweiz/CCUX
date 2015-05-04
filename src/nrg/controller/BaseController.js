/*globals sap*/

/*
    AMD contract
    https://openui5beta.hana.ondemand.com/#docs/api/symbols/sap.ui.html#.define
*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller'
    ],

    function (Controller) {
        'use strict';

        return Controller.extend('nrg.controller.BaseController', {
            getComponentEventBus: function () {
                return this.getOwnerComponent().getEventBus();
            },

            getComponentRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },

            getComponentModel: function (sId) {
                return this.getOwnerComponent().getModel(sId);
            }
        });
    }
);
