/*global sap*/
/*globals ute*/
/*globals $*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'jquery.sap.global'
    ],

    function (CoreController, jQuery) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.dashboard.view.ServiceOrder');

        Controller.prototype.onInit = function () {
            var oWebUiManager = this.getOwnerComponent().getCcuxWebUiManager();

            if (oWebUiManager) {
                oWebUiManager.notifyWebUi('getBusinessRole', null, this._handleBsnsRlCallback, this);
            } else {
                return;
            }
        };

        Controller.prototype._handleBsnsRlCallback = function (oEvent) {
            var oTemp = oEvent;
            return;
        };

		return Controller;
	}
);
