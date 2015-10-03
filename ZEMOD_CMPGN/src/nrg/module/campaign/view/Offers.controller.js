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
                    consumptionFirstCard : true, // true for first Card change, false for second card change for Consumption
                    pinFirstCardInvoice : false,
                    pinFirstCardConsumption : false,
                    pin: false
			    }),
                bInvoiceFirstCard = true;
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
                        if ((oTileContainer.getContent()) && (oTileContainer.getContent().length > 0)) {
                            oTileContainer.getContent().map(function (item) {
                                if (item) {
                                    if (item.getBindingContext("comp-campaign").getProperty("Type") !== "C") {
                                        if (bInvoiceFirstCard) {
                                            that._changeSelectedObject(item, 0, true);
                                            that._bindCard(item, 1);
                                            bInvoiceFirstCard = false;
                                            oViewModel.setProperty("/invoiceFirstCard", false); // enable false to make sure next turn is second card in invoice
                                        } else {
                                            that._changeSelectedObject(item, 1, true);
                                            that._bindCard(item, 2);
                                            oViewModel.setProperty("/invoiceFirstCard", true); // enable false to make sure next turn is first card in invoice
                                        }
                                    }
                                }
                            });
                        }
                    } else {
                        oNoDataTag.removeStyleClass("nrgCamOff-hide");
                        oTileContainer.addStyleClass("nrgCamOff-hide");
                    }
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
                oSelectedObject = oEvent.getSource();
            if ((oEvent.getSource()) && (oEvent.getSource().hasStyleClass("nrgCamOff-btnSelected"))) { // checking whether tile is already selected or not
                jQuery.sap.log.info("Already selected so just ignore");
            } else {
                if ((oViewModel) && (oViewModel.getProperty("/invoice"))) { // comparision is enabled for Invoice
                    if (oViewModel.getProperty("/pin")) {
                        if (oViewModel.getProperty("/pinFirstCardInvoice")) {
                            oViewModel.setProperty("/invoiceFirstCard", false); // Dont change first card if pin is set
                        } else {
                            oViewModel.setProperty("/invoiceFirstCard", true);// Dont change second card if pin is set
                        }
                    }
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
                    if (oViewModel.getProperty("/pin")) {
                        if (oViewModel.getProperty("/pinFirstCardConsumption")) {
                            oViewModel.setProperty("/consumptionFirstCard", false); // Dont change first card if pin is set
                        } else {
                            oViewModel.setProperty("/consumptionFirstCard", true);// Dont change second card if pin is set
                        }
                    }
                    if ((oViewModel) && (oViewModel.getProperty("/consumptionFirstCard"))) {
                        this._changeSelectedObject(oSelectedObject, 0);
                        this._bindCard(oSelectedObject, 3);
                        oViewModel.setProperty("/consumptionFirstCard", false);

                    } else {
                        this._changeSelectedObject(oSelectedObject, 0);
                        this._bindCard(oSelectedObject, 4);
                        oViewModel.setProperty("/consumptionFirstCard", true);
                    }
                }
            }

        };
        /**
		 * Assign custom data to change the CSS based on that
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
         * @private
		 */
        Controller.prototype._changeSelectedObject = function (item, index, bFirstTime) {
            var oSelectedObject,
                aCustomData;
            if (!bFirstTime) {
                if ((this._aSelectedComparisionCards) && (this._aSelectedComparisionCards.length >= 1)) {// always assuming that selected cards will always be 2
                    oSelectedObject = this._aSelectedComparisionCards[index];
                    if (oSelectedObject) {
                        oSelectedObject.removeStyleClass("nrgCamOff-btnSelected");
                        item.removeStyleClass("nrgCamOff-btnSelected");
                    }
                    this._aSelectedComparisionCards[index] = item;
                    if (this._aSelectedComparisionCards[index]) {
                        item.addStyleClass("nrgCamOff-btnSelected");
                    }
                }
            } else {
                if (!this._aSelectedComparisionCards) {
                    this._aSelectedComparisionCards = [];
                }
                this._aSelectedComparisionCards[index] = item;
                if (this._aSelectedComparisionCards[index]) {
                    item.addStyleClass("nrgCamOff-btnSelected");
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
                sPath = object.getBindingContext("comp-campaign").getPath();// need to be assigned
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
                model : "comp-campaign",
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
        Controller.prototype.onComparisionChanged = function (oEvent) {
            var aTabBarItems = oEvent.getSource().getContent(),
                oViewModel = this.getView().getModel("localModel"),
                bSelectedType = true,
                that = this,
                oIcon,
                oCheckBox;
            //myControl = this.byId(sap.ui.core.Fragment.createId("part1", "nrgCamOff-PinId"))
            aTabBarItems.map(function (item) {
                if ((item.getSelected) && (item.getSelected())) {
                    if ((item.getKey()) && (item.getKey() ===  "Invoice")) {
                        bSelectedType = true;
                        oViewModel.setProperty("/invoice", true);
                    } else {
                        bSelectedType = false;
                        oViewModel.setProperty("/invoice", false);
                    }
                }
            });
            if (bSelectedType) {
                this._aSelectedComparisionCards.map(function (item, index) {
                    if (index === 0) {
                        that._bindCard(item, 1);
                        oViewModel.setProperty("/invoiceFirstCard", false);
                    } else {
                        that._bindCard(item, 2);
                        oViewModel.setProperty("/invoiceFirstCard", true);
                    }
                });
                // Convert pinning of cards also if needed
                if (oViewModel.getProperty("/pin")) {
                    if (oViewModel.getProperty("/pinFirstCardConsumption")) {
                        oIcon = that.byId(sap.ui.core.Fragment.createId("Invoice1", "nrgCamOff-PinId"));
                        oCheckBox = that.byId(sap.ui.core.Fragment.createId("Invoice1", "idnrgCamOffpin"));
                        oIcon.setSrc("sap-icon://pushpin-on");
                        oCheckBox.setChecked(true);
                        oViewModel.setProperty("/pinFirstCardInvoice", true);
                    } else {
                        oIcon = that.byId(sap.ui.core.Fragment.createId("Invoice2", "nrgCamOff-PinId"));
                        oCheckBox = that.byId(sap.ui.core.Fragment.createId("Invoice2", "idnrgCamOffpin"));
                        oIcon.setSrc("sap-icon://pushpin-on");
                        oCheckBox.setChecked(true);
                        oViewModel.setProperty("/pinFirstCardInvoice", false);
                    }
                }
            } else {
                this._aSelectedComparisionCards.map(function (item, index) {
                    if (index === 0) {
                        that._bindCard(item, 3);
                        oViewModel.setProperty("/consumptionFirstCard", false);
                    } else {
                        that._bindCard(item, 4);
                        oViewModel.setProperty("/consumptionFirstCard", true);
                    }
                });
                // Convert pinning of cards also if needed
                if (oViewModel.getProperty("/pin")) {
                    if (oViewModel.getProperty("/pinFirstCardInvoice")) {
                        oIcon = that.byId(sap.ui.core.Fragment.createId("Cons1", "nrgCamOff-PinId"));
                        oCheckBox = that.byId(sap.ui.core.Fragment.createId("Cons1", "idnrgCamOffpin"));
                        oIcon.setSrc("sap-icon://pushpin-on");
                        oCheckBox.setChecked(true);
                        oViewModel.setProperty("/pinFirstCardConsumption", true);
                    } else {
                        oIcon = that.byId(sap.ui.core.Fragment.createId("Cons2", "nrgCamOff-PinId"));
                        oCheckBox = that.byId(sap.ui.core.Fragment.createId("Cons2", "idnrgCamOffpin"));
                        oIcon.setSrc("sap-icon://pushpin-on");
                        oCheckBox.setChecked(true);
                        oViewModel.setProperty("/pinFirstCardConsumption", false);
                    }
                }
            }

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
            if ((oTileContainer.getContent()) && (oTileContainer.getContent().length > 0)) {
                oTileContainer.getContent().map(function (oItem) {
                    if (oItem) {
                        that._aSelectedComparisionCards.map(function (oSelectedContent) {
                            var sofferCode1,
                                sofferCode2;
                            if (oSelectedContent) {
                                sofferCode1 = oSelectedContent.getBindingContext("comp-campaign").getProperty("OfferCode") || "";
                                sofferCode2 = oItem.getBindingContext("comp-campaign").getProperty("OfferCode") || "";
                                if (sofferCode1 === sofferCode2) {
                                    oItem.addStyleClass("nrgCamOff-btnSelected");
                                    oSelectedContent = oItem;
                                }
                            }
                        });
                    }
                });
            }
            this.getOwnerComponent().getCcuxApp().setOccupied(false);
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
		 * Pin the comparision cards
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern
		 *
		 */
        Controller.prototype.pinComparisionCard = function (oEvent) {
            var oSelectedCheckBox = oEvent.getSource(),
                oIcon,
                that = this,
                oSelectedCardContext,
                sSelectedOfferCode,
                oViewModel = this.getView().getModel("localModel"),
                bPinSelected = oViewModel.getProperty("/pin");
            if ((oSelectedCheckBox) && (oSelectedCheckBox.getChecked())) { // check box is selected
                if (bPinSelected) { // if Pin is already selected for other card
                    oSelectedCheckBox.setChecked(false);
                    ute.ui.main.Popup.Alert({
                        title: 'Information',
                        message: 'Only one Pin at a time'
                    });
                } else { // if pin is not already selected
                    oViewModel.setProperty("/pin", true);
                    oSelectedCardContext = oSelectedCheckBox.getBindingContext("comp-campaign");
                    sSelectedOfferCode = oSelectedCardContext.getProperty("OfferCode");
                    that._aSelectedComparisionCards.map(function (oSelectedContent, index) {
                        var oContext,
                            sOfferCode;
                        if (oSelectedContent) {
                            oContext = oSelectedContent.getBindingContext("comp-campaign");
                            if (oContext) {
                                sOfferCode = oContext.getProperty("OfferCode");
                                if (sSelectedOfferCode === sOfferCode) {
                                    if (oViewModel.getProperty("/invoice")) {
                                        if (index === 0) { //if First Card and Invoice
                                            oViewModel.setProperty("/pinFirstCardInvoice", true);
                                            oIcon = that.byId(sap.ui.core.Fragment.createId("Invoice1", "nrgCamOff-PinId"));
                                            oIcon.setSrc("sap-icon://pushpin-on");
                                        } else { //if Second Card and invoice
                                            oViewModel.setProperty("/pinFirstCardInvoice", false);
                                            oIcon = that.byId(sap.ui.core.Fragment.createId("Invoice2", "nrgCamOff-PinId"));
                                            oIcon.setSrc("sap-icon://pushpin-on");
                                        }
                                    } else {
                                        if (index === 0) {
                                            oViewModel.setProperty("/pinFirstCardConsumption", true);
                                            oIcon = that.byId(sap.ui.core.Fragment.createId("Cons1", "nrgCamOff-PinId"));
                                            oIcon.setSrc("sap-icon://pushpin-on");
                                        } else { //if Second Card and invoice
                                            oViewModel.setProperty("/pinFirstCardConsumption", false);
                                            oIcon = that.byId(sap.ui.core.Fragment.createId("Cons2", "nrgCamOff-PinId"));
                                            oIcon.setSrc("sap-icon://pushpin-on");
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            } else if ((oSelectedCheckBox) && (!oSelectedCheckBox.getChecked())) { // check box is de-selected
                oViewModel.setProperty("/pin", false);
                oSelectedCardContext = oSelectedCheckBox.getBindingContext("comp-campaign");
                sSelectedOfferCode = oSelectedCardContext.getProperty("OfferCode");
                that._aSelectedComparisionCards.map(function (oSelectedContent, index) {
                    var oContext,
                        sOfferCode;
                    if (oSelectedContent) {
                        oContext = oSelectedContent.getBindingContext("comp-campaign");
                        if (oContext) {
                            sOfferCode = oContext.getProperty("OfferCode");
                            if (sSelectedOfferCode === sOfferCode) {
                                if (oViewModel.getProperty("/invoice")) {
                                    if (index === 0) { //if First Card and Invoice
                                        oIcon = that.byId(sap.ui.core.Fragment.createId("Invoice1", "nrgCamOff-PinId"));
                                        oIcon.setSrc("sap-icon://pushpin-off");
                                    } else { //if Second Card and invoice
                                        oIcon = that.byId(sap.ui.core.Fragment.createId("Invoice2", "nrgCamOff-PinId"));
                                        oIcon.setSrc("sap-icon://pushpin-off");
                                    }
                                } else {
                                    if (index === 0) {
                                        oIcon = that.byId(sap.ui.core.Fragment.createId("Cons1", "nrgCamOff-PinId"));
                                        oIcon.setSrc("sap-icon://pushpin-off");
                                    } else { //if Second Card and invoice
                                        oIcon = that.byId(sap.ui.core.Fragment.createId("Cons2", "nrgCamOff-PinId"));
                                        oIcon.setSrc("sap-icon://pushpin-off");
                                    }
                                }
                            }
                        }
                    }
                });
            }
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
		 * Formats the Invoice Amount in Campaign consumption
		 *
		 * @function
		 * @param {sPromoCode} Promo Code value from the binding
         *
		 *
		 */
        Controller.prototype.formatCurrentConsAmount = function (sCurInvoiceAmount, sSimulateInvoiceAmount) {
            return sSimulateInvoiceAmount || sCurInvoiceAmount;
        };
        /**
		 * Calculate the difference Amount
		 *
		 * @function
		 * @param {sPromoCode} Promo Code value from the binding
         *
		 *
		 */
        Controller.prototype.formatDifference = function (sCurInvoiceAmount, sEstimateInvoiceAmount) {
            if ((sCurInvoiceAmount) && (sEstimateInvoiceAmount)) {
                if ((parseFloat(sCurInvoiceAmount)) && (parseFloat(sEstimateInvoiceAmount))) {
                    return parseFloat(sCurInvoiceAmount) - parseFloat(sEstimateInvoiceAmount);
                }
            }
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
