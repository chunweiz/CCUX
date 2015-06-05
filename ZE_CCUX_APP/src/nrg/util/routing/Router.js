/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/routing/Router'
    ],

    function (CoreRouter) {
        'use strict';

        var Router = CoreRouter.extend('nrg.util.routing.Router');

        Router.prototype.navTo = function (sName, oParameters, bReplace) {
            alert('intercepting standard router');

            CoreRouter.prototype.navTo.apply(this, arguments);
        };

        return Router;
    }
);
