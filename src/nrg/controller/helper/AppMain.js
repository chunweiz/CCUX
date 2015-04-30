/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/base/Object'
    ],

    function (BaseObject) {
        'use strict';

        var AppMain = BaseObject.extend('nrg.controller.helper.AppMain', {
            constructor: function (idAppMain, controller) {
                BaseObject.apply(this);
                this._oController = controller;
                this._oAppMain = this._oController.getView().byId(idAppMain);
            },

            metadata: {
                publicMethods: [
                    'initialize',
                    'setMainTitle'
                ]
            }
        });

        AppMain.prototype.initialize = function () {
            this._oAppMainElem = this._oAppMain.getDomRef();
            this._oMainTitle = this._oAppMainElem.querySelector('.nrgAppMain-title');
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
