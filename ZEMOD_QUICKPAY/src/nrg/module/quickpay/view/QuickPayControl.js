/*global sap, ute, jQuery*/
/*jslint nomen:true*/
sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/core/Popup'
    ],

    function (Control, Popup) {
        'use strict';

		/* ========================================================================*/
		/* Creating a New Control to manage Quick Pay  Pop-up                      */
		/* ======================================================================= */
        var QuickPayControl = Control.extend('nrg.module.quickpay.view.QuickPayControl', {
            metadata: {
                defaultAggregation: "content",
                aggregations: {
                    content: { type: 'sap.ui.core.Control', multiple: true, singularName: 'content' }
                }
            },
            renderer: function (oRm, oCustomControl) {
                var i,
                    aChildren;
                oRm.write('<div');
                oRm.writeControlData(oCustomControl);
               // oRm.addClass('uteAppHdrSMenu');
                oRm.writeClasses();
                oRm.write('>');

                aChildren = oCustomControl.getContent();
                for (i = 0; i < aChildren.length; i = i + 1) {
                    oRm.renderControl(aChildren[i]);
                }

                oRm.write('</div>');
            }
        });

		/* ========================================================================*/
		/* Quick Pay Pop-up to initialize basic popup configurations               */
		/* ======================================================================= */
        QuickPayControl.prototype.init = function () {
            this._oPaymentPopup = new Popup(this, true, true);
			var eDock = Popup.Dock;
			//this._oPaymentPopup.setPosition("center center", "center center", window, "0 0", "fit");
            this._oPaymentPopup.setShadow(false);
            this._oPaymentPopup.setModal(true);
            this._oPaymentPopup.setAutoClose(false);
            this._oPaymentPopup.setDurations(0, 0);
            this._oPaymentPopup.setFollowOf(true);

        };

		/* ========================================================================*/
		/* Method to be used to open the Quick Pay popup                           */
		/* ======================================================================= */

        QuickPayControl.prototype.openQuickPay = function (that) {
            var oQuickPayView = sap.ui.view({
                type: sap.ui.core.mvc.ViewType.XML,
                viewName: "nrg.module.quickpay.view.MainQuick"
            });
            this.addContent(oQuickPayView);
            oQuickPayView.addStyleClass("nrgQPPay-View");
            this._oPaymentPopup.setInitialFocusId(this.getId());
            that.getView().addDependent(this);
            if (this._oPaymentPopup.isOpen()) {
                //this._oPaymentPopup.setContent(oQuickPayView);
                return this;
            }
            this._oPaymentPopup.setContent(this);
            this._oPaymentPopup.open();
            return this;
        };

        /* ========================================================================*/
		/* Method to close the popup                                               */
		/* ======================================================================= */
        QuickPayControl.prototype.close = function () {
            var sOpenState = this._oPaymentPopup.getOpenState();

            if (!(sOpenState === sap.ui.core.OpenState.CLOSED || sOpenState === sap.ui.core.OpenState.CLOSING)) {
                this._oPaymentPopup.close();
            }

            return this;
        };
        return QuickPayControl;
    },

    true
);
