/*globals sap*/
/*jslint nomen:true*/


sap.ui.define(
    function () {
        'use strict';

        var AppFooter = function (idAppFooter, controller) {
            this._oController = controller;
            this._oAppFooter = this._oController.getView().byId(idAppFooter);

            return this;
        };

        AppFooter.prototype.initialize = function () {
            var oCheckbox, oLabel;

            this._oAppFooterElem = this._oAppFooter.getDomRef();

            //Bind label to checkbox
            oCheckbox = this._oAppFooterElem.querySelector('div > input');
            oLabel = this._oAppFooterElem.querySelector('div > label');
            oLabel.htmlFor = oCheckbox.id;

            //Get footer content
            this._oAppFooterContentElem = this._oAppFooterElem.querySelector('section');

            //Register to label click event
            oLabel.addEventListener('click', function (oEvent) {
                this._oAppFooterContentElem.classList.toggle('nrgAppFooterMenuShow');
            }.bind(this));

            return this;
        };

        return AppFooter;
    },

    false
);
