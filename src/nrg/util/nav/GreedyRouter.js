/*globals sap*/
/*jslint nomen: true*/

sap.ui.define(
    [
        'sap/ui/core/routing/Router',
        'sap/m/routing/RouteMatchedHandler'
    ],

    function (Router, RouteMatchedHandler) {
        'use strict';

        var GreedyRouter = Router.extend('nrg.util.nav.GreedyRouter');

        GreedyRouter.prototype.constructor = function () {
            Router.apply(this, arguments);
            this._oRouteMatchedHandler = new RouteMatchedHandler(this);
        };

        GreedyRouter.prototype.destory = function () {
            Router.prototype.destroy.apply(this, arguments);
            this._oRouteMatchedHandler.destroy();
        };

        GreedyRouter.prototype.setGreedy = function (bGreedy) {
            this._oRouter.greedy = bGreedy || false;
        };

        return GreedyRouter;
    },
    
    false
);
