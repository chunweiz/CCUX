/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    function () {
        'use strict';

        var AppMain = function (idAppMain, controller) {
            this._oController = controller;
            this._oAppMain = this._oController.getView().byId(idAppMain);
            return this;
        };

        AppMain.prototype.initialize = function () {
            this._oAppMainElem = this._oAppMain.getDomRef();
            this._oMainTitle = this._oAppMainElem.querySelector('h1');
            this._oRscBundle = this._oController.getView().getModel('i18n').getResourceBundle();
            return this;
        };

        AppMain.prototype.setMainTitle = function (rscBundleKey) {
            var sTitle = this._oRscBundle.getText(rscBundleKey) || '';

            if (this._oMainTitle.firstChild) {
                this._oMainTitle.firstChild.remove();
            }
            this._oMainTitle.appendChild(document.createTextNode(sTitle));
            return this;
        };

        return AppMain;
    },

    false
);
