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
        var NNPPopup = Control.extend('nrg.module.nnp.view.NNPPopup', {
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
        NNPPopup.prototype.init = function () {
            this._oNNPPopup = ute.ui.main.Popup.create({
                title: 'Email Address and Preferences'
            });

        };

		/* ========================================================================*/
		/* Method to be used to open the Quick Pay popup                           */
		/* ======================================================================= */

        NNPPopup.prototype.openNNP = function (that) {
            var oQuickPayView = sap.ui.view({
                type: sap.ui.core.mvc.ViewType.XML,
                viewName: "nrg.module.nnp.view.NNP"
            });
            this.addContent(oQuickPayView);
            oQuickPayView.addStyleClass("nrgQPPay-View");
            that.getView().addDependent(this);
            if (this._oNNPPopup.isOpen()) {
                //this._oPaymentPopup.setContent(oQuickPayView);
                return this;
            }
            this._oNNPPopup.addContent(this);
            this._oNNPPopup.open();
            return this;
        };

        /* ========================================================================*/
		/* Method to close the popup                                               */
		/* ======================================================================= */
        NNPPopup.prototype.close = function () {
            var sOpenState = this._oPaymentPopup.getOpenState();

            if (!(sOpenState === sap.ui.core.OpenState.CLOSED || sOpenState === sap.ui.core.OpenState.CLOSING)) {
                this._oNNPPopup.close();
            }

            return this;
        };
        return NNPPopup;
    },

    true
);
