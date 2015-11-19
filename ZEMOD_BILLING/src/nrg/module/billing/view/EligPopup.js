/*global sap, ute, jQuery*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/core/Popup'
    ],

    function (Control, Popup) {
        'use strict';

        /*------------------------------------------ Control for Eligibility Popup ------------------------------------------*/

        var EligPopup = Control.extend('nrg.module.billing.view.EligPopup', {
            metadata: {
                properties: {
                    title: { type: 'string', defaultValue: null },
                    type: { type: 'string', defaultValue: false }
                }
            }
        });

        /*-------------------------------------------- Basic Popup Configuration --------------------------------------------*/

        EligPopup.prototype.init = function () {
            this._oEligPopup = ute.ui.main.Popup.create('nrgBilling-eligPopup', {
                title: "ELIGIBILITY",
                close: this._onPopupClosed
            });
            this._oEligPopup.addStyleClass('nrgBilling-eligPopup');
            this._oEligPopup.setShowCloseButton(true);
            this.addDependent(this._oEligPopup);
        };

        /*----------------------------------------------------- Methods -----------------------------------------------------*/

        EligPopup.prototype.prepare = function () {
            if (!this._oEligPopup.getContent().length) {
                var oABPView = sap.ui.view({
                    type: sap.ui.core.mvc.ViewType.XML,
                    viewName: "nrg.module.billing.view.ABP"
                });
                // Set a variable to flag if it's retro or not
                oABPView.getController().isRetro = this.getIsRetro();
                if (this._oEligPopup.isOpen()) { return this;}
                this._oEligPopup.addContent(oABPView);
            }
            this._oEligPopup.open();
            return this;
        };

        EligPopup.prototype._onPopupClosed = function (oEvent) {
            this.getParent().fireEvent("ABPCompleted");
        };

        return EligPopup;
    },

    true
);
