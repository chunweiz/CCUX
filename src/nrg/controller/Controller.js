/*globals sap, jQuery*/

(function () {
    'use strict';
    
    jQuery.sap.declare('nrg.controller.Controller');

    sap.ui.core.mvc.Controller.extend('nrg.controller.Controller', {
        getEventBus: function () {
            return this.getOwnerComponent().getEventBus();
        },

        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        }
    });
}());