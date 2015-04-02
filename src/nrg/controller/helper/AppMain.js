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
        this._oAppMainElem = this._oAppMain.getDomRef();
        this._oMainTitle = this._oAppMainElem.querySelector('h1');
        this._oRscBundle = this._oController.getView().getModel('i18n').getResourceBundle();
    };

    nrg.controller.helper.AppMain.prototype.setMainTitle = function (rscBundleKey) {
        var sTitle = this._oRscBundle.getText(rscBundleKey) || '';

        if (this._oMainTitle.firstChild) {
            this._oMainTitle.firstChild.remove();
        }
        this._oMainTitle.appendChild(document.createTextNode(sTitle));
    };

}());
