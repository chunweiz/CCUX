/*globals sap, jQuery, tm*/

(function () {
    'use strict';
    
    sap.ui.core.mvc.Controller.extend('tm.nav.view.MainContent');
    
    tm.nav.view.TopLeft.prototype.onInit = function () {
        jQuery.sap.log.info('[Controller tm.nav.view.MainContent] onInit');
    };
    
    tm.nav.view.TopLeft.prototype.onBeforeRendering = function () {
        jQuery.sap.log.info('[Controller tm.nav.view.MainContent] onBeforeRendering');
    };
    
    tm.nav.view.TopLeft.prototype.onAfterRendering  = function () {
        jQuery.sap.log.info('[Controller tm.nav.view.MainContent] onAfterRendering');
    };
    
    tm.nav.view.TopLeft.prototype.onExit = function () {
        jQuery.sap.log.info('[Controller tm.nav.view.MainContent] onExit');
    };
    
}());