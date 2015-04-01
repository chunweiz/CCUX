/*globals jQuery, nrg*/
/*jslint nomen:true*/

(function () {
    'use strict';

    jQuery.sap.declare('nrg.controller.helper.AppMain');

    nrg.controller.helper.AppMain = function (idAppMain, controller) {
        this._oController = controller;
        this._oAppMain = this._oController.getView().byId(idAppMain);
    };

    nrg.controller.helper.AppMain.prototype.initialize = function () {

    };

}());
