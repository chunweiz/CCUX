/*globals sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global',
        'nrg/base/type/Price',
        "sap/ui/model/json/JSONModel"
    ],

    function (CoreController, Filter, FilterOperator, jQuery, price, JSONModel) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.campaign.view.Offers');


		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */
        Controller.prototype.onInit = function () {

        };
        /* =========================================================== */
		/* lifecycle method- Before Rendering                          */
		/* =========================================================== */
        Controller.prototype.onBeforeRendering = function () {
            var oModel,
                sCurrentPath,
                sEligibilityPath,
                mParameters,
                aFilters,
                oTileContainer,
                oTileTemplate,
                iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
                aFilterIds,
                aFilterValues,
                fnRecievedHandler,
                that = this,
                oProactiveButton = this.getView().byId("idCamToggleBtn-P"),
                oNoDataTag,
                oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo(),
                i18NModel,
                oSelectedButton,
                oSorter = new sap.ui.model.Sorter("Type", false),
                oViewModel = new JSONModel({
                    invoice : true,  // true for invoice & false for consumption
                    invoiceFirstCard : true,  // true for first Card change, false for second card change for Invoice
                    consumptionFirstCard : true // true for first Card change, false for second card change for Consumption
			    });
            this._aSelectedComparisionCards = [];
            this.getView().setModel(oViewModel, "localModel");
            i18NModel = this.getOwnerComponent().getModel("comp-i18n-campaign");
            this.getOwnerComponent().getCcuxApp().setOccupied(true);
            this._sContract = oRouteInfo.parameters.coNum;
            this._sBP = oRouteInfo.parameters.bpNum;
            this._sCA = oRouteInfo.parameters.caNum;
            this._sType = oRouteInfo.parameters.typeV;
            if ((!this._sType) || (this._sType === undefined) || (this._sType === null) || (this._sType === "")) {
                this._sType = "SE";
            }
            oNoDataTag = this.getView().byId("idnrgCamHisNoData");
            oSelectedButton = this.getView().byId("idCamToggleBtn-" + this._sType);
            oTileContainer = this.getView().byId("idnrgCamOffScroll");
            oTileTemplate = this.getView().byId("idnrgCamOffBt").clone();
            this._oTileTemplate = oTileTemplate;
            if (this._sType === "SE") {
                oNoDataTag.removeStyleClass("nrgCamOff-hide");
                oTileContainer.addStyleClass("nrgCamOff-hide");
                oSelectedButton.addStyleClass("nrgCamOff-btn-selected");
                this.getOwnerComponent().getCcuxApp().setOccupied(false);
            } else {
                aFilterIds = ["Contract"];
                aFilterValues = [this._sContract];
                aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
                sCurrentPath = i18NModel.getProperty("nrgCpgChangeOffSet");
                oModel = this.getOwnerComponent().getModel('comp-campaign');
                oSelectedButton.addStyleClass("nrgCamOff-btn-selected");
                // Handler function for tile container
                fnRecievedHandler = function (oEvent) {
                    var aContent = oTileContainer.getContent(),
                        oBinding = oTileContainer.getBinding("content");
                    if ((aContent !== undefined) && (aContent.length > 0)) {
                        oNoDataTag.addStyleClass("nrgCamOff-hide");
                        oTileContainer.removeStyleClass("nrgCamOff-hide");
                        aFilterIds = ["Type", "Type"];
                        aFilterValues = ["C", "P"];
                        aFilters = that._createSearchFilterObject(aFilterIds, aFilterValues);
                        oBinding.sOperationMode = "Client";
                        oBinding.aAllKeys = oEvent.getSource().aKeys;
                        oBinding.filter(aFilters);

                    } else {
                        oNoDataTag.removeStyleClass("nrgCamOff-hide");
                        oTileContainer.addStyleClass("nrgCamOff-hide");
                    }
                    aContent.map(function (oButtonItem) {
                        var oButtonContext = oButtonItem.getBindingContext("comp-campaign"),
                            type;
                        type = oButtonContext.getProperty("Type");
                        oButtonItem.insertCustomData(new sap.ui.core.CustomData({key: "flag", value: type, writeToDom : true}));
                    });
                    that.getOwnerComponent().getCcuxApp().setOccupied(false);
                    oProactiveButton.addStyleClass("nrgCamOff-btn-selected");
                };
                mParameters = {
                    model : "comp-campaign",
                    path : sCurrentPath,
                    template : oTileTemplate,
                    filters : aFilters,
                    sorter: oSorter,
                    parameters : {expand: "EFLs"},
                    events: {dataReceived : fnRecievedHandler}
                };
                oTileContainer.bindAggregation("content", mParameters);
            }
        };
       /**
		 * Assign the filter objects based on the input selection
		 *
		 * @function
		 * @param {Array} aFilterIds to be used as sPath for Filters
         * @param {Array} aFilterValues for each sPath
		 * @private
		 */
        Controller.prototype._createSearchFilterObject = function (aFilterIds, aFilterValues) {
            var aFilters = [],
                iCount;

            for (iCount = 0; iCount < aFilterIds.length; iCount = iCount + 1) {
                aFilters.push(new Filter(aFilterIds[iCount], FilterOperator.EQ, aFilterValues[iCount], ""));
            }
            return aFilters;
        };

         /**
		 * When the user choosed to select a Campaign for comparision
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
         * @private
		 */
        Controller.prototype.onOfferSelected = function (oEvent) {
            var aChildren,
                sPath,
                iCount,
                oContext,
                sOfferCode,
                sStartDate,
                sDate,
                oViewModel = this.getView().getModel("localModel"),
                oFirstCardInvoice,
                oSecondCardInvoice,
                oFirstCardConsumption,
                oSecondCardConsumption,
                oTestModel = new JSONModel({
                    CurrInvAmt : "85$",
                    EstInvoice : "65$",
                    EstDiff : "20$",
                    EstcentsperkWh : "2kWh"
			    }),
                oSelectedObject = oEvent.getSource();
            this.getView().setModel(oTestModel, 'oViewModel');
            if ((oViewModel) && (oViewModel.getProperty("/invoice"))) { // comparision is enabled for Invoice
                if ((oViewModel) && (oViewModel.getProperty("/invoiceFirstCard"))) {
                    oViewModel.setProperty("/invoiceFirstCard", false);  // change it to false to show next product in second card
                    this._changeSelectedObject(oSelectedObject, 0);
                    this._bindCard(oSelectedObject, 1);
                } else {
                    oViewModel.setProperty("/invoiceFirstCard", true);
                    this._changeSelectedObject(oSelectedObject, 1);
                    this._bindCard(oSelectedObject, 2);
                }
            } else { // comparision is enabled for consumption
                if ((oViewModel) && (oViewModel.getProperty("/consumptionFirstCard"))) {
                    this._changeSelectedObject(oSelectedObject, 0);
                    this._bindCard(oSelectedObject, 1);
                    oViewModel.setProperty("/consumptionFirstCard", false);

                } else {
                    this._changeSelectedObject(oSelectedObject, 0);
                    this._bindCard(oSelectedObject, 1);
                    oViewModel.setProperty("/consumptionFirstCard", true);

                }
            }
/*            sPath = oEvent.getSource().getBindingContext("comp-campaign").getPath();
            oContext = this.getView().getModel("comp-campaign").getContext(sPath);
            sOfferCode = oContext.getProperty("OfferCode");
            sStartDate = oContext.getProperty("StartDate");*/
            //sDate = sPath.substring(sPath.lastIndexOf("=") + 1, sPath.lastIndexOf(")"));
            //this.navTo("campaignchg", {bpNum: this._sBP, caNum: this._sCA, coNum: this._sContract, offercodeNum: sOfferCode, sDate : sDate});
        };
        /**
		 * Assign custom data to change the CSS based on that
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
         * @private
		 */
        Controller.prototype._changeSelectedObject = function (item, index) {
            var oSelectedObject,
                aCustomData;
            if ((this._aSelectedComparisionCards) && (this._aSelectedComparisionCards.length === 2)) {// always assuming that selected cards will always be 2
                oSelectedObject = this._aSelectedComparisionCards[index];
                if (oSelectedObject) {
                    aCustomData = oSelectedObject.getCustomData();
                    if ((aCustomData) && (aCustomData.length > 0)) {
                        aCustomData.map(function (item) {

                        });
                    }

                }
                this._aSelectedComparisionCards[index] = item;
                if (this._aSelectedComparisionCards[index]) {
                    oSelectedObject.insertCustomData(new sap.ui.core.CustomData({key: "flag", value: "X", writeToDom : true}));
                }
            }
        };
        /**
		 * Bind the object to selected Card in either Invoice or Consumption
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
         * @private
		 */
        Controller.prototype._bindCard = function (object, iCounter) {
            var oFirstCardInvoice = this.getView().byId("idnrgCamOff-firstCardI"),
                oSecondCardInvoice = this.getView().byId("idnrgCamOff-SecondCardI"),
                oFirstCardConsumption = this.getView().byId("idnrgCamOff-firstCardC"),
                oSecondCardConsumption = this.getView().byId("idnrgCamOff-SecondCardC"),
                oSelectedObject,
                sPath = "/"; // object.getBindingContext().getPath() need to be assigned
            if (iCounter === 1) {
                oSelectedObject = this.getView().byId("idnrgCamOff-firstCardI");
            } else if (iCounter === 2) {
                oSelectedObject = this.getView().byId("idnrgCamOff-SecondCardI");
            } else if (iCounter === 3) {
                oSelectedObject = this.getView().byId("idnrgCamOff-firstCardC");
            } else if (iCounter === 4) {
                oSelectedObject = this.getView().byId("idnrgCamOff-SecondCardC");
            }
            oSelectedObject.bindElement({
                model : "oViewModel",
                path : sPath
            });
        };
        /**
		 * when the user chooses one of the comparision option Invoice/Consumption
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
         * @private
		 */
        Controller.prototype.onPressed = function (oEvent) {
            var aTabBarItems = oEvent.getSource().getContent(),
                oViewModel = this.getView().getModel("localModel");
            aTabBarItems.map(function (item) {
                if ((item.getSelected) && (item.getSelected())) {
                    if ((item.getKey()) && (item.getKey() ===  "Invoice")) {
                        oViewModel.setProperty("/invoice", true);
                    } else {
                        oViewModel.setProperty("/invoice", false);
                    }
                }
            });
        };
        /**
		 * Binds the view based on the Tier selected like Proactive, Reactive, Save and Final Save
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
		 * @private
		 */
        Controller.prototype.toggleTier = function (oEvent) {
            var aChildren,
                sPath,
                i,
                sButtonText,
                aFilters,
                oTileContainer,
                oTileTemplate,
                mParameters,
                sCurrentPath,
                aContent,
                aFilterIds,
                aFilterValues,
                fnRecievedHandler,
                that = this,
                oProactiveButton = this.getView().byId("idCamToggleBtn-P"),
                oReactiveButton = this.getView().byId("idCamToggleBtn-R"),
                oSaveButton = this.getView().byId("idCamToggleBtn-S"),
                oFinalSaveButton = this.getView().byId("idCamToggleBtn-FS"),
                oNoDataTag = this.getView().byId("idnrgCamHisNoData"),
                i18NModel = this.getOwnerComponent().getModel("comp-i18n-campaign");
            oProactiveButton.removeStyleClass("nrgCamOff-btn-selected");
            oReactiveButton.removeStyleClass("nrgCamOff-btn-selected");
            oSaveButton.removeStyleClass("nrgCamOff-btn-selected");
            oFinalSaveButton.removeStyleClass("nrgCamOff-btn-selected");
            sButtonText = oEvent.getSource().getId();
            sButtonText = sButtonText.substring(sButtonText.length - 1, sButtonText.length);
            this.getOwnerComponent().getCcuxApp().setOccupied(true);
            aFilterIds = ["Contract", "Type", "Type"];
            switch (sButtonText) {
            case "P":
                aFilterValues = [this._sContract, "P", "C"];
                break;
            case "R":
                aFilterValues = [this._sContract, "R", "C"];
                break;
            case "S":
                aFilterValues = [this._sContract, "S", "C"];
                break;
            case "F":
                aFilterValues = [this._sContract, "F", "C"];
                break;
            default:
                aFilterValues = [this._sContract, "F", "C"];
            }
            oEvent.getSource().addStyleClass("nrgCamOff-btn-selected");
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            oTileContainer = this.getView().byId("idnrgCamOffScroll");
            aContent = oTileContainer.getContent();
            oTileTemplate = this._oTileTemplate;
            sCurrentPath = i18NModel.getProperty("nrgCpgChangeOffSet");
            oTileContainer.getBinding("content").filter(aFilters);
            this.getOwnerComponent().getCcuxApp().setOccupied(false);
            // Handler function for tile container
/*            fnRecievedHandler = function (oEvent) {
                var aContent = oTileContainer.getContent();
                if ((aContent !== undefined) && (aContent.length > 0)) {
                    oNoDataTag.addStyleClass("nrgCamOff-hide");
                    oTileContainer.removeStyleClass("nrgCamOff-hide");
                } else {
                    oNoDataTag.removeStyleClass("nrgCamOff-hide");
                    oTileContainer.addStyleClass("nrgCamOff-hide");
                }
                aContent.map(function (oButtonItem) {
                    var oButtonContext = oButtonItem.getBindingContext("comp-campaign"),
                        type;
                    type = oButtonContext.getProperty("Type");
                    oButtonItem.insertCustomData(new sap.ui.core.CustomData({key: "flag", value: type, writeToDom : true}));

                });
                that.getOwnerComponent().getCcuxApp().setOccupied(false);
            };*/
/*            mParameters = {
                model : "comp-campaign",
                path : sCurrentPath,
                template : oTileTemplate,
                filters : aFilters,
                parameters : {expand: "EFLs"},
                events: {dataReceived : fnRecievedHandler}
            };
            oTileContainer.bindAggregation("content", mParameters);*/
        };

        /**
		 * Move to Campaign details view when the user selected a particular campaign
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 *
		 */
        Controller.prototype.selectCampaign = function (oEvent) {
            //this.navTo("campaignchg", {coNum: this._sContract, offercodeNum: "50124832"});
            sap.ui.commons.MessageBox.alert("Comparision work is still in progress, please click on any of the offer tiles for SWAP process");
        };

        /**
		 * Formats the Cancellation fee and Incentive values
		 *
		 * @function
		 * @param {sCancellationFee} CancellationFee value from the binding
         * @param {sIncentive} Incentive value from the binding
		 *
		 */
        Controller.prototype.formatCancelFee = function (sCancellationFee, sIncentive) {
            return "Canc: " + sCancellationFee + " / " + "Inc: " + sIncentive;
        };

        /**
		 * Formats the Promo Code binding value
		 *
		 * @function
		 * @param {sPromoCode} Promo Code value from the binding
         *
		 *
		 */
        Controller.prototype.formatPromo = function (sPromoCode) {
            return "Promo: " + sPromoCode;
        };

        /**
		 * Back to Overview page function
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.backToOverview = function (oEvent) {
            this.navTo("campaign", {bpNum: this._sBP, caNum: this._sCA, coNum : this._sContract, typeV : "C"});
        };

        return Controller;
    }
);
