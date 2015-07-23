/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'nrg/module/app/ccux/view/App'
    ],

    function (Controller, App) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.app.ccux.view.App');

        CustomController.prototype.onInit = function () {
            this._oApp = new App(this);
        };

        CustomController.prototype.getApp = function () {
            return this._oApp;
        };

        return CustomController;
    }
);
