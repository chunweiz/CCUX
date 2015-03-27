/*globals sap, jQuery, nrg*/
/*jslint nomen:true*/

(function () {
    'use strict';
    
    jQuery.sap.require('nrg.util.formatter.Locale');
    jQuery.sap.require('nrg.controller.Controller');
    jQuery.sap.require('nrg.controller.helper.AppHeader');
    
    nrg.controller.Controller.extend('nrg.controller.App');
    
    nrg.controller.App.prototype.onInit = function () {
    
    };
    
    nrg.controller.App.prototype.onBeforeRendering = function () {
        
    };
    
    nrg.controller.App.prototype.onAfterRendering = function () {
        this._oAppHeader = new nrg.controller.helper.AppHeader('idAppHdrMenu', this);
        this._oAppHeader.initialize();
    };
    
}());