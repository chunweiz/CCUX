/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller'
    ],

    function (CoreController) {
        'use strict';

        var BaseController = CoreController.extend('nrg.util.view.BaseController', {
            constructor: function (sName) {
                CoreController.prototype.constructor.apply(this, arguments);
            }
        });

        BaseController.prototype.getEventBus = function () {

        };

        BaseController.prototype.navTo = function (sName, oParameters, bReplace) {

        };

        BaseController.prototype.addControlMessage = function () {

        };

        return BaseController;
    }
);
