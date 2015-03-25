/*globals sap, jQuery, nrg*/

(function () {
    'use strict';
    
    jQuery.sap.require('nrg.controller.Controller');
    
    nrg.controller.Controller.extend('nrg.controller.App');
    
    nrg.controller.App.prototype.onInit = function () {
        sap.ui.template();
    };
    
    nrg.controller.App.prototype.onBeforeRendering = function () {
        
    };
    
    nrg.controller.App.prototype.onAfterRendering = function () {
        
    };
    
    nrg.controller.App.prototype.onChangeLayout = function (oEvent) {
        var oViewDom = this.getView().getDomRef();
    };
    
}());