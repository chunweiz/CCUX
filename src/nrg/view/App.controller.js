/*globals sap, jQuery, nrg*/

(function () {
    'use strict';
    
    sap.ui.core.mvc.Controller.extend('nrg.view.App', {
        onInit: function () {
            
            
        },
        onBeforeRendering: function () {
            
        },
        
        onAfterRendering: function () {

        }
    });
    
    nrg.view.App.prototype.onChangeLayout = function (oEvent) {
        var oViewDom = this.getView().getDomRef();
    };
    
}());