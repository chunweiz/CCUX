/*globals sap, ute*/
/*jslint nomen:true*/
sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'jquery.sap.global'
    ],

    function (CoreController, jQuery) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.campaign.view.History');


        /* =========================================================== */
		/* lifecycle method- Init                                     */
		/* =========================================================== */
        Controller.prototype.onInit = function () {
        };

        /* =========================================================== */
		/* lifecycle method- After Rendering                          */
		/* =========================================================== */
        Controller.prototype.onAfterRendering = function () {
            var aContent, obinding, sPath, that = this,
                oScrollContainer = this.getView().byId("idnrgCamHisScroll"),
                oDataTag = this.getView().byId("idnrgCamHis"),
                oNoDataTag = this.getView().byId("idnrgCamHisNoData"),
                handler = function () {
                    aContent = oScrollContainer.getContent();
                    if ((aContent !== undefined) && (aContent.length > 0)) {
                        sPath = aContent[0].getBindingContext("comp-campaign").getPath();
                        aContent[0].addStyleClass("nrgCamHis-but-selected");
                        that.getView().bindElement({
                            model : "comp-campaign",
                            path : sPath
                        });
                    } else {
                        oDataTag.addStyleClass("nrgCamHis-hide");
                        oNoDataTag.removeStyleClass("nrgCamHis-hide");
                    }

                    obinding.detachDataReceived(handler);
                };
            obinding = oScrollContainer.getBinding("content");
            obinding.attachDataReceived(handler);
        };

         /**
		 * When the user choosed to select a Campaign for comparision
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
         * @private
		 */
        Controller.prototype.onPressed = function (oEvent) {
            var aChildren,
                sPath,
                i,
                aContent,
                oScrollContainer = this.getView().byId("idnrgCamHisScroll");
            aContent = oScrollContainer.getContent();
            aChildren = oEvent.getSource().getParent().findElements();
            for (i = 0; i < aChildren.length; i = i + 1) {
                if (aChildren[i].hasStyleClass("nrgCamHis-but-selected")) {
                    aChildren[i].removeStyleClass("nrgCamHis-but-selected");
                }
            }
            oEvent.getSource().addStyleClass("nrgCamHis-but-selected");
            sPath = oEvent.getSource().getBindingContext("comp-campaign").getPath();
            this.getView().bindElement({
                model : "comp-campaign",
                path : sPath
            });
        };

         /**
		 * To Format Tile Date Value after binding
		 *
		 * @function
		 * @param {startDate} Start Date value from binding
         * @param {endDate} End Date value from binding
         * @private
		 */
        Controller.prototype.formatTileDate = function (startDate, endDate) {
            return startDate + " - " + endDate;
        };

        return Controller;
    }
);
