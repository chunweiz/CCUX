/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/base/Object'
    ],

    function (BaseObject) {
        'use strict';

        var AppFooter = BaseObject.extend('nrg.mod.app.view.AppFooter', {
            constructor: function (idAppFooter, controller) {
                BaseObject.apply(this);
                this._oController = controller;
                this._oAppFooter = this._oController.getView().byId(idAppFooter);
            },

            metadata: {
                publicMethods: [
                    'initialize'
                ]
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
            //IE9 doesn't support classList.toggle, fallback to jQuery toggle class
            this._oAppFooterContent = this._oAppFooter.$().find('.nrgAppFtr-content');

            //Register to label click event
            oBtn.addEventListener('click', function (oEvent) {
                this._oAppFooterContent.toggleClass('nrgU-displayNone');
            }.bind(this));

            return this;
        };

        return AppFooter;
    }
);
