/*globals sap, jQuery, nrg*/
/*jslint nomen:true*/

(function () {
    'use strict';
    
    jQuery.sap.require('nrg.util.formatter.Locale');
    jQuery.sap.require('nrg.controller.BaseController');
    jQuery.sap.require('nrg.controller.helper.AppHeader');
    jQuery.sap.require('nrg.controller.helper.AppFooter');
    jQuery.sap.require('nrg.controller.helper.AppMain');
    
    nrg.controller.BaseController.extend('nrg.controller.App');
    
    nrg.controller.App.prototype.onInit = function () {
    
    };
    
    nrg.controller.App.prototype.onBeforeRendering = function () {
        
    };
    
    nrg.controller.App.prototype.onAfterRendering = function () {
        /*
            Controls' DOM will only be available after the controls are rendered.
            Hence, explicit DOM bindings will take place in this method.
        */

        this._oAppHeader = new nrg.controller.helper.AppHeader('idAppHdrMenu', this);
        this._oAppHeader.initialize();

        this._oAppMain = new nrg.controller.helper.AppMain('idAppMain', this);
        this._oAppMain.initialize();

        this._oAppFooter = new nrg.controller.helper.AppFooter('idAppFooterMenu', this);
        this._oAppFooter.initialize();
    };
    
}());
