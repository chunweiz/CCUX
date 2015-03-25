/*globals sap, jQuery*/

(function () {
    'use strict';
    
    jQuery.sap.declare('nrg.controller.Controller');

    sap.ui.core.mvc.Controller.extend('nrg.controller.Controller', {
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
    
}());