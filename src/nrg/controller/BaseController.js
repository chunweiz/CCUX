/*globals sap*/

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

            getComponentModel: function (id) {
                return this.getOwnerComponent().getModel(id);
            }
        });
    },

    false
);
