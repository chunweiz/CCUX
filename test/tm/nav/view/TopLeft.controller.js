/*globals sap, jQuery, tm*/
/*jslint nomen: true*/

(function () {
    'use strict';
    
    jQuery.sap.require('sap.ui.core.routing.HashChanger');
    
    sap.ui.core.mvc.Controller.extend('tm.nav.view.TopLeft');
    
    tm.nav.view.TopLeft.prototype.onInit = function () {
        jQuery.sap.log.info('[Controller tm.nav.view.TopLeft] onInit');
        
        sap.ui.core.UIComponent.getRouterFor(this).getRoute('main001').attachPatternMatched(this._routePatternMatched, this);
        sap.ui.core.UIComponent.getRouterFor(this).getRoute('main004').attachPatternMatched(this._routePatternMatched, this);
    };
    
    tm.nav.view.TopLeft.prototype.onBeforeRendering = function () {
        jQuery.sap.log.info('[Controller tm.nav.view.TopLeft] onBeforeRendering');
    };
    
    tm.nav.view.TopLeft.prototype.onAfterRendering  = function () {
        jQuery.sap.log.info('[Controller tm.nav.view.TopLeft] onAfterRendering');
    };
    
    tm.nav.view.TopLeft.prototype.onExit = function () {
        jQuery.sap.log.info('[Controller tm.nav.view.TopLeft] onExit');
    };
    
    tm.nav.view.TopLeft.prototype.pressed = function (oEvent) {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo('main004', {
            bpNum: '123',
            caNum: '567'
        });
    };
    
    tm.nav.view.TopLeft.prototype._routePatternMatched = function (oEvent) {
        console.log(oEvent.getParameters());
    };
    
}());