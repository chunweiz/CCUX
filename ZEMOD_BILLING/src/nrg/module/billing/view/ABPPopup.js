/*global sap, ute, jQuery*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/core/Popup'
    ],

    function (Control, Popup) {
        'use strict';

        /*------------------------------------- Control for Average Billing Plan Popup --------------------------------------*/

        var ABPPopup = Control.extend('nrg.module.billing.view.ABPPopup', {

        });

        /*-------------------------------------------- Basic Popup Configuration --------------------------------------------*/

        ABPPopup.prototype.init = function (sTitle) {
            this._oABPPopup = ute.ui.main.Popup.create('test-hahaha', {
                title: sTitle,
                close: this._onPopupClosed
            });
            this._oABPPopup.addStyleClass('nrgBilling-avgBillingPopup');
            this._oABPPopup.setShowCloseButton(true);
            this.addDependent(this._oABPPopup);
        };

        /*----------------------------------------------------- Methods -----------------------------------------------------*/

        ABPPopup.prototype.prepareABP = function () {
            if (!this._oABPPopup.getContent().length) {
                var oABPView = sap.ui.view({
                    type: sap.ui.core.mvc.ViewType.XML,
                    viewName: "nrg.module.billing.view.ABP"
                });
                if (this._oABPPopup.isOpen()) { return this;}    
                this._oABPPopup.addContent(oABPView);
            }

            this._oABPPopup.open();
            return this;
        };

        ABPPopup.prototype._onPopupClosed = function (oEvent) {
            this.getParent().fireEvent("ABPCompleted");
        };

        return ABPPopup;
    },

    true
);
