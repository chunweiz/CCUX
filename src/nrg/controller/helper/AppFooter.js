/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/base/Object'
    ],

    function (BaseObject) {
        'use strict';

        var AppFooter = BaseObject.extend('nrg.controller.helper.AppFooter', {
            constructor: function (idAppFooter, controller) {
                BaseObject.apply(this);
                this._oController = controller;
                this._oAppFooter = this._oController.getView().byId(idAppFooter);
            }
        });

        AppFooter.prototype.initialize = function () {
            var oCheckbox, oBtn;

            this._oAppFooterElem = this._oAppFooter.getDomRef();

            //Bind label to checkbox
            oCheckbox = this._oAppFooterElem.querySelector('.nrgAppFtr-toggleChk');
            oBtn = this._oAppFooterElem.querySelector('.nrgAppFtr-toggleBtn');
            oBtn.htmlFor = oCheckbox.id;

            //Get footer content
            this._oAppFooterContentElem = this._oAppFooterElem.querySelector('.nrgAppFtr-content');

            //Register to label click event
            oBtn.addEventListener('click', function (oEvent) {
                this._oAppFooterContentElem.classList.toggle('nrgU-displayNone');
            }.bind(this));

            return this;
        };

        return AppFooter;
    },

    false
);
