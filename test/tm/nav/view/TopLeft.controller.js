/*globals sap*/

(function () {
    'use strict';
    
    sap.ui.core.mvc.Controller.extend('tm.nav.view.TopLeft', {
        onInit: function () {
            
        },
        
        onBeforeShow: function(oEvent) {
            alert('yoyo');
        }
    });
    
}());