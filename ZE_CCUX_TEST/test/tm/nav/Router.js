/*globals sap, jQuery, tm*/
/*jslint nomen: true*/

(function () {
    'use strict';

    jQuery.sap.declare('tm.nav.Router');
    jQuery.sap.require('sap.ui.core.routing.Router');
    jQuery.sap.require('sap.m.routing.RouteMatchedHandler');

    sap.ui.core.routing.Router.extend('tm.nav.Router', {
        constructor: function () {
            sap.ui.core.routing.Router.apply(this, arguments);
            this._oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this);
        },

        destroy: function () {
            sap.ui.core.routing.Router.prototype.destroy.apply(this, arguments);
            this._oRouteMatchedHandler.destroy();
        }
    });

    tm.nav.Router.prototype.setGreedy = function (bGreedy) {
        this._oRouter.greedy = bGreedy || false;
    };

}());
