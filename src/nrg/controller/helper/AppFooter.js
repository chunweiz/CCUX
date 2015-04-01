/*globals jQuery, nrg*/
/*jslint nomen:true*/

(function () {
    'use strict';

    jQuery.sap.declare('nrg.controller.helper.AppFooter');

    nrg.controller.helper.AppFooter = function (idAppFooter, controller) {
        this._oController = controller;
        this._oAppFooter = this._oController.getView().byId(idAppFooter);
    };

    nrg.controller.helper.AppFooter.prototype.initialize = function () {

    };

}());
