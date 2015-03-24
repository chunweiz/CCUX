/*globals sap, jQuery, nrg*/
/*jslint nomen: true*/

(function () {
    'use strict';
    
    jQuery.sap.declare('nrg.util.nav.GreedyRouter');
    jQuery.sap.require('sap.ui.core.routing.Router');
    jQuery.sap.require('sap.m.routing.RouteMatchedHandler');
    
    sap.ui.core.routing.Router.extend('nrg.util.nav.GreedyRouter', {
        constructor: function () {
            sap.ui.core.routing.Router.apply(this, arguments);
            this._oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this);
        },

        destroy: function () {
            sap.ui.core.routing.Router.prototype.destroy.apply(this, arguments);
            this._oRouteMatchedHandler.destroy();
        }
    });
    
    nrg.util.nav.GreedyRouter.prototype.setGreedy = function (bGreedy) {
        this._oRouter.greedy = bGreedy || false;
    };
    
}());