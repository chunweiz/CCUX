/*globals sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global',
        "sap/ui/model/json/JSONModel",
        'sap/ui/model/odata/v2/ODataModel'
    ],

    function (CoreController, Filter, FilterOperator, jQuery, JSONModel, ODataModel) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.quickpay.view.MainQuick');
		/* =========================================================== */
		/* lifecycle method- Init                                      */
		/* =========================================================== */
        Controller.prototype.onInit = function () {

        };
        /* =========================================================== */
		/* lifecycle method- Before Rendering                          */
		/* =========================================================== */
        Controller.prototype.onBeforeRendering = function () {
            var oModel = this.getView().getModel('comp-quickpay'),
                mParameters,
                sCurrentPath,
                oMsgArea = this.getView().byId("idnrgQPPay-msgArea"),
                oViewModel = new JSONModel({
                    reliantPay : true,
                    message : "",
                    reliantText : "Verify",
                    reliantPress: ".onAcceptReliant",
                    newBankRouting: "",
                    newBankAccount: ""
                }),
                oContactModel;
            oContactModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(oContactModel, "quickpay-cl");
            this._OwnerComponent = this.getView().getParent().getParent().getController().getOwnerComponent();
            this._OwnerComponent.getCcuxApp().setOccupied(true);
            this.getView().setModel(oViewModel, "appView");
            sCurrentPath = "/PayAvailFlagsSet";
            sCurrentPath = sCurrentPath + "(ContractID='" + this._sContractId + "')";
            this.getView().bindElement({
                model : "comp-quickpay",
                path : sCurrentPath
            });
            oMsgArea.addStyleClass("nrgQPPay-hide");
            this._OwnerComponent.getCcuxApp().setOccupied(false);
        };

        /**
		 * Show Stop Voice Log Recording msg
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onCreditCard = function (oEvent) {
            var oTBIStopRec = this.getView().byId("idnrgQPPay-TBIStopRec"),
                fnRecievedHandler,
                oCreditCardDropDown = this.getView().byId("idnrgQPCC-DDL"),
                oBindingInfo,
                oCreditCardTemplate = this.getView().byId("idnrgQPCC-DDLItem"),
                aFilters,
                dropDownHandler,
                sCurrentPath,
                oWaiveReasonTemplate = this.getView().byId("idnrgQPCC-WaiveReasonItem"),
                oWaiveReasonDropDown = this.getView().byId("idnrgQPCC-WR"),
                WRRecievedHandler,
                oCreditCardDate = this.getView().byId("idnrgQPCC-Date");
            oTBIStopRec.setSelected(true);
            oCreditCardDate.setDefaultDate(new Date().toLocaleDateString("en-US"));
            WRRecievedHandler = function (oEvent) {
                jQuery.sap.log.info("Date Received Succesfully");
                if (oEvent) {
                    if (oEvent.getSource().getLength() === 1) {
                        oWaiveReasonDropDown.setSelectedKey(oEvent.getSource().getContexts()[0].getProperty("ReasonCode"));
                    }
                }
            };
            fnRecievedHandler = function (oEvent) {
                jQuery.sap.log.info("Date Received Succesfully");
            };
            sCurrentPath = "/CreditCardSet" + "(ContractID='" + this._sContractId + "')/CardsSet";
            oBindingInfo = {
                model : "comp-quickpay",
                path : sCurrentPath,
                template : oCreditCardTemplate,
                parameters: {countMode : "None", operationMode : "Server"},
                events: {dataReceived : fnRecievedHandler}
            };
            oCreditCardDropDown.bindAggregation("content", oBindingInfo);
            sCurrentPath = "/CreditCardSet" + "(ContractID='" + this._sContractId + "')/WaiveReasonsSet";
            oBindingInfo = {
                model : "comp-quickpay",
                path : sCurrentPath,
                template : oWaiveReasonTemplate,
                parameters: {countMode : "None"},
                events: {dataReceived : WRRecievedHandler}
            };
            oWaiveReasonDropDown.bindAggregation("content", oBindingInfo);
        };
        /**
		 * When Credit Card is Accepted
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onAcceptCredit = function (oEvent) {
            var oModel = this.getView().getModel('comp-quickpay'),
                mParameters,
                sCurrentPath,
                oMsgArea = this.getView().byId("idnrgQPPay-msgArea"),
                oCreditCardDate = this.getView().byId("idnrgQPCC-Date"),
                oCreditCardDropDown = this.getView().byId("idnrgQPCC-DDL"),
                oCreditCardAmount = this.getView().byId("idnrgQPCC-Amt"),
                oWaiveReasonDropDown = this.getView().byId("idnrgQPBD-WaiveReason"),
                that = this,
                //oReceiptModel = new sap.ui.model.json.JSONModel(),
                oTBICL = this.getView().byId("idnrgQPPay-TBICL"),
                oCreditCardDateValue,
                oContactModel = this.getView().getModel("quickpay-cl"),
                oZipCode = this.getView().byId("idnrgQPCC-cvv"),
                oCVVCode = this.getView().byId("idnrgQPCC-zipcode");
            //this.getView().setModel(oReceiptModel, "quickpay-rc");
            oMsgArea.removeStyleClass("nrgQPPay-hide");
            oMsgArea.addStyleClass("nrgQPPay-black");
            if (!this._ValidateValue(oCreditCardAmount.getValue(), "Enter Amount to be posted")) {
                return false;
            }
            if (!this._ValidateValue(oCreditCardDropDown.getSelectedKey(), "Select Credit Card")) {
                return false;
            }
            if (!this._ValidateValue(oZipCode.getValue(), "Enter Zip Code")) {
                return false;
            }
            if (!this._ValidateValue(oCVVCode.getValue(), "Enter CVV")) {
                return false;
            }
            this._OwnerComponent.getCcuxApp().setOccupied(true);
            sCurrentPath = "/CreditCardSet";
            oCreditCardDateValue = new Date(oCreditCardDate.getValue());
            oModel.create(sCurrentPath, {
                "ContractID" : this._sContractId,
                "CardNumber" : oCreditCardDropDown.getSelectedKey(),
                "PaymentDate" : oCreditCardDateValue,
                "Amount" : oCreditCardAmount.getValue(),
                "WaiveFlag" : oWaiveReasonDropDown.getSelectedKey(),
                "Cvval" : oCVVCode.getValue(),
                "ZipCode" : oZipCode.getValue()
            }, {
                success : function (oData, oResponse) {
                    if (oData.Error === "") {
                        oContactModel.setData(oData);
                        oTBICL.setSelected(true);
                        oMsgArea.addStyleClass("nrgQPPay-hide");
                    } else {
                        that.getView().getModel("appView").setProperty("/message", oData.Message);
                    }
                    that._OwnerComponent.getCcuxApp().setOccupied(false);
                },
                error : function (oError) {
                    that.getView().getModel("appView").setProperty("/message", oError.statusText);
                    that._OwnerComponent.getCcuxApp().setOccupied(false);
                }
            });

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
		 * Credit Card Process initialization
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onStopRec = function (oEvent) {
            var oTBICC = this.getView().byId("idnrgQPPay-TBICC"),
                oPopup = this.getView().byId("idnrgQPPay-Popup"),
                oCloseButton = this.getView().byId("idnrgQPPayBt-close");
            oPopup.removeStyleClass("nrgQPPay-Popup");
            oPopup.addStyleClass("nrgQPPay-PopupWhite");
            oCloseButton.addStyleClass("nrgQPPayBt-closeBG");
            oTBICC.setSelected(true);
        };

        /**
		 * Bank Draft Process initialization
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onBankDraft = function (oEvent) {
            var oTBIBD = this.getView().byId("idnrgQPPay-TBIBD"),
                oPopup = this.getView().byId("idnrgQPPay-Popup"),
                oCloseButton = this.getView().byId("idnrgQPPayBt-close"),
                oBankDraftDate = this.getView().byId("idnrgQPBD-Date"),
                sCurrentPath,
                aFilterIds,
                aFilterValues,
                aFilters,
                fnRecievedHandler,
                that = this,
                oBindingInfo,
                oWaiveReasonTemplate = this.getView().byId("idnrgQPCC-WaiveReasonItem"),
                oBankDraftTemplate = this.getView().byId("idnrgQPCC-BankDraftItem"),
                oBankDraftDropDown = this.getView().byId("idnrgQPBD-BankAccounts"),
                oWaiveReasonDropDown = this.getView().byId("idnrgQPBD-WaiveReason"),
                WRRecievedHandler;
            oBankDraftDate.setDefaultDate(new Date().toLocaleDateString("en-US"));
            oPopup.removeStyleClass("nrgQPPay-Popup");
            oPopup.addStyleClass("nrgQPPay-PopupWhite");
            oCloseButton.addStyleClass("nrgQPPayBt-closeBG");
            oTBIBD.setSelected(true);
            this._OwnerComponent.getCcuxApp().setOccupied(true);
            sCurrentPath = "/BankDraftSet" + "(ContractID='" + this._sContractId + "')/WaiveReasonsSet";
            fnRecievedHandler = function (oEvent) {
                jQuery.sap.log.info("Date Received Succesfully");
                that._OwnerComponent.getCcuxApp().setOccupied(false);
            };
            WRRecievedHandler = function (oEvent) {
                jQuery.sap.log.info("Date Received Succesfully");
                if (oEvent) {
                    if (oEvent.getSource().getLength() === 1) {
                        oWaiveReasonDropDown.setSelectedKey(oEvent.getSource().getContexts()[0].getProperty("ReasonCode"));
                    }
                }
            };
            oBindingInfo = {
                model : "comp-quickpay",
                path : sCurrentPath,
                template : oWaiveReasonTemplate,
                parameters: {countMode : "None"},
                events: {dataReceived : WRRecievedHandler}
            };
            oWaiveReasonDropDown.bindAggregation("content", oBindingInfo);
            sCurrentPath = "/BankDraftSet" + "(ContractID='" + this._sContractId + "')/BankAccountSet";
            oBindingInfo = {
                model : "comp-quickpay",
                path : sCurrentPath,
                template : oBankDraftTemplate,
                //filters : aFilters,
                parameters: {countMode : "None"},
                events: {dataReceived : fnRecievedHandler}
            };
            oBankDraftDropDown.bindAggregation("content", oBindingInfo);
        };
        /**
		 * Bank Draft Posting
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onAcceptBankDraft = function (oEvent) {
            var oModel = this.getView().getModel('comp-quickpay'),
                mParameters,
                sCurrentPath,
                oMsgArea = this.getView().byId("idnrgQPPay-msgArea"),
                oBankDraftDate = this.getView().byId("idnrgQPBD-Date"),
                oBankAccountDropDown = this.getView().byId("idnrgQPBD-BankAccounts"),
                oBankDraftAmount = this.getView().byId("idnrgQPBD-Amt"),
                oWaiveReasonDropDown = this.getView().byId("idnrgQPBD-WaiveReason"),
                that = this,
                //oReceiptModel = new sap.ui.model.json.JSONModel(),
                oTBICL = this.getView().byId("idnrgQPPay-TBICL"),
                oBankDraftDateValue,
                oContactModel = this.getView().getModel("quickpay-cl");
            oMsgArea.removeStyleClass("nrgQPPay-hide");
            oMsgArea.addStyleClass("nrgQPPay-black");
            if (!this._ValidateValue(oBankDraftAmount.getValue(), "Enter Amount to be posted")) {
                return false;
            }
            if (!this._ValidateValue(oBankAccountDropDown.getSelectedKey(), "Select Bank Account")) {
                return false;
            }
            this._OwnerComponent.getCcuxApp().setOccupied(true);
            sCurrentPath = "/BankDraftSet";
            oBankDraftDateValue = new Date(oBankDraftDate.getValue());
            oModel.create(sCurrentPath, {
                "ContractID" : this._sContractId,
                "BankAccNum" : oBankAccountDropDown.getSelectedKey(),
                "PaymentDate" : oBankDraftDateValue,
                "Amount" : oBankDraftAmount.getValue(),
                "WaiveFlag" : oWaiveReasonDropDown.getSelectedKey()
            }, {
                success : function (oData, oResponse) {
                    if (oData.Error === "") {
                        oContactModel.setData(oData);
                        oTBICL.setSelected(true);
                        oMsgArea.addStyleClass("nrgQPPay-hide");
                    } else {
                        that.getView().getModel("appView").setProperty("/message", oData.Message);
                    }
                    that._OwnerComponent.getCcuxApp().setOccupied(false);
                },
                error : function (oError) {
                    that.getView().getModel("appView").setProperty("/message", oError.statusText);
                    that._OwnerComponent.getCcuxApp().setOccupied(false);
                }
            });
        };

        /**
		 * Receipt Process initialization
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onReceipt = function (oEvent) {
            var oTBIRC = this.getView().byId("idnrgQPPay-TBIRC"),
                oPopup = this.getView().byId("idnrgQPPay-Popup"),
                oCloseButton = this.getView().byId("idnrgQPPayBt-close"),
                aFilterIds,
                aFilterValues,
                aFilters,
                WRRecievedHandler,
                oWaiveReasonDropDown = this.getView().byId("idnrgQPCC-ReceiptDD"),
                oBindingInfo,
                oWaiveReasonTemplate = this.getView().byId("idnrgQPCC-WaiveReasonItem"),
                sCurrentPath,
                oModel = this.getView().getModel('comp-quickpay'),
                oReceiptDate = this.getView().byId("idnrgQPRC-RcDate"),
                that = this;
            this._OwnerComponent.getCcuxApp().setOccupied(true);
            oReceiptDate.setValue(new Date().toLocaleDateString("en-US"));
            oPopup.removeStyleClass("nrgQPPay-Popup");
            oPopup.addStyleClass("nrgQPPay-PopupWhite");
            oCloseButton.addStyleClass("nrgQPPayBt-closeBG");
            oTBIRC.setSelected(true);
            sCurrentPath = "/ReceiptSet" + "(ContractID='" + this._sContractId + "')/WaiveReasonsSet";
            WRRecievedHandler = function (oEvent) {
                jQuery.sap.log.info("Date Received Succesfully");
                if (oEvent) {
                    if (oEvent.getSource().getLength() === 1) {
                        oWaiveReasonDropDown.setSelectedKey(oEvent.getSource().getContexts()[0].getProperty("ReasonCode"));
                    }
                }
                that._OwnerComponent.getCcuxApp().setOccupied(false);
            };
            oBindingInfo = {
                model : "comp-quickpay",
                path : sCurrentPath,
                template : oWaiveReasonTemplate,
                parameters: {countMode : "None"},
                events: {dataReceived : WRRecievedHandler}
            };
            oWaiveReasonDropDown.bindAggregation("content", oBindingInfo);
        };

        /**
		 * Receipt Process initialization
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onAcceptReceipt = function (oEvent) {
            var oModel = this.getView().getModel('comp-quickpay'),
                mParameters,
                sCurrentPath,
                oMsgArea = this.getView().byId("idnrgQPPay-msgArea"),
                oReceiptDate = this.getView().byId("idnrgQPRC-RcDate"),
                oReceiptNum = this.getView().byId("idnrgQPRC-RNum"),
                oReceiptAmount = this.getView().byId("idnrgQPRC-Amt"),
                oReceiptDropDown = this.getView().byId("idnrgQPCC-ReceiptDD"),
                that = this,
                oTBICL = this.getView().byId("idnrgQPPay-TBICL"),
                oContactModel = this.getView().getModel("quickpay-cl");
            oMsgArea.removeStyleClass("nrgQPPay-hide");
            oMsgArea.addStyleClass("nrgQPPay-black");
            if (!this._ValidateValue(oReceiptNum.getValue(), "Enter Receipt Number")) {
                return false;
            }
            if (!this._ValidateValue(oReceiptAmount.getValue(), "Enter Amount")) {
                return false;
            }
            this._OwnerComponent.getCcuxApp().setOccupied(true);
            sCurrentPath = "/ReceiptSet";
            oModel.create(sCurrentPath, {
                "ContractID" : this._sContractId,
                "ReceiptNumber" : oReceiptNum.getValue(),
                "Amount" : oReceiptAmount.getValue(),
                "WaiveFlag" : oReceiptDropDown.getSelectedKey()
            }, {
                success : function (oData, oResponse) {
                    if (oData.Error === "") {
                        oContactModel.setData(oData);
                        oTBICL.setSelected(true);
                        oMsgArea.addStyleClass("nrgQPPay-hide");
                    } else {
                        that.getView().getModel("appView").setProperty("/message", oData.Message);
                    }
                    that._OwnerComponent.getCcuxApp().setOccupied(false);
                },
                error : function (oError) {
                    that.getView().getModel("appView").setProperty("/message", oError.statusText);
                    that._OwnerComponent.getCcuxApp().setOccupied(false);
                }
            });
        };

        /**
		 * Reliant Card Process initialization
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onReliantCard = function (oEvent) {
            var oTBIRD = this.getView().byId("idnrgQPPay-TBIRD"),
                oPopup = this.getView().byId("idnrgQPPay-Popup"),
                oCloseButton = this.getView().byId("idnrgQPPayBt-close"),
                oReliantDate = this.getView().byId("idnrgQPCC-RedDate"),
                oReliantRedeem = this.getView().byId("idnrgQPCC-reliantRedeem");
            oPopup.removeStyleClass("nrgQPPay-Popup");
            oPopup.addStyleClass("nrgQPPay-PopupWhite");
            oCloseButton.addStyleClass("nrgQPPayBt-closeBG");
            oReliantRedeem.addStyleClass("nrgQPPay-hide");
            oTBIRD.setSelected(true);
            oReliantDate.setValue(new Date().toLocaleDateString("en-US"));
            oReliantDate.setEditable(false);
        };

        /**
		 * Pending Credit Card Process initialization
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onPendingCreditCard = function (oEvent) {

        };

        /**
		 * Pending Bank Draft Process initialization
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onPendingBankDraft = function (oEvent) {

        };



        /**
		 * When Credit Card is Accepted
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onDeclineCredit = function (oEvent) {
            this.getView().getParent().close();
        };

        /**
		 * When Popup is closed
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onPopupClose = function (oEvent) {
            this.getView().getParent().close();
        };

        /**
         * Handler for Adding new Bank draft
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onAddBD = function (oEvent) {
            var oTBIAddBD = this.getView().byId("idnrgQPPay-TBIAddBD");
            oTBIAddBD.setSelected(true);
        };
        /**
         * Handler for Adding new Bank draft after data
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onAddNewBD = function (oEvent) {
            var oModel = this.getView().getModel('comp-quickpay'),
                oAppViewModel = this.getView().getModel("appView"),
                sCurrentPath = "/BankAccountSet",
                that = this,
                sBankAccount = oAppViewModel.getProperty("/newBankAccount"),
                sBankRouting = oAppViewModel.getProperty("/newBankRouting"),
                oMsgArea = this.getView().byId("idnrgQPPay-msgArea");

            oMsgArea.removeStyleClass("nrgQPPay-hide");
            oMsgArea.addStyleClass("nrgQPPay-black");
            if (!this._ValidateValue(sBankAccount, "Enter Bank Account")) {
                return false;
            }
            if (!this._ValidateValue(sBankRouting, "Enter Routing Number")) {
                return false;
            }
            this._OwnerComponent.getCcuxApp().setOccupied(true);
            oModel.create(sCurrentPath, {
                "ContractID" : this._sContractId,
                "BankAccNum" : sBankAccount,
                "BankRouting" : sBankRouting
            }, {
                success : function (oData, oResponse) {
                    that._OwnerComponent.getCcuxApp().setOccupied(false);
                    that.onBankDraft();
                },
                error : function (oError) {
                    that._OwnerComponent.getCcuxApp().setOccupied(false);
                }
            });
        };
        /**
         * Handler for Accepting Reliant Card Payment
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onAcceptReliant = function (oEvent) {
            var oModel = this.getView().getModel('comp-quickpay'),
                mParameters,
                sCurrentPath,
                oMsgArea = this.getView().byId("idnrgQPPay-msgArea"),
                oReliantButton = this.getView().byId("idnrgQPCC-reliantAccept"),
                oReliantRedeem = this.getView().byId("idnrgQPCC-reliantRedeem"),
                oReliantCard = this.getView().byId("idnrgQPCC-ReliantCard"),
                fnRecievedHandler,
                that = this;
            sCurrentPath = "/ReliantSet";
            oMsgArea.removeStyleClass("nrgQPPay-hide");
            oMsgArea.addStyleClass("nrgQPPay-black");
            if (!this._ValidateValue(oReliantCard.getValue(), "Enter Reliant Card")) {
                return false;
            }
            this._OwnerComponent.getCcuxApp().setOccupied(true);
            sCurrentPath = sCurrentPath + "(ContractID='" + this._sContractId + "',ReliantCard='" + oReliantCard.getValue() + "')";
            fnRecievedHandler = function (oEvent) {
                if (oEvent.mParameters.data.Error !== "") {
                    that.getView().getModel("appView").setProperty("/message", oEvent.mParameters.data.Message);
                } else {
                    that.getView().getModel("appView").setProperty("/message", "Success");
                    oReliantButton.addStyleClass("nrgQPPay-hide");
                    oReliantRedeem.removeStyleClass("nrgQPPay-hide");
                }
                jQuery.sap.log.info("Odata Read Successfully:::");
                that._OwnerComponent.getCcuxApp().setOccupied(false);
            };
            this.getView().byId("idnrgQPCC-Amt2").bindElement({
                model : "comp-quickpay",
                path : sCurrentPath,
                events: {dataReceived : fnRecievedHandler}
            });
        };

        /**
         * Handler for Declining Reliant Card Payment
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onDeclineReliant = function (oEvent) {

        };

        /**
         * handler for Adding Credit card
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onAddCC = function (oEvent) {

        };

        /**
         * handler for Reliant Card change value
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onReliantCardChange = function (oEvent) {
            this.getView().getModel("appView").setProperty("/reliantPay", true);
        };

        /**
         * handler for Reliant Card Redeem
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onReliantRedeem = function (oEvent) {
            var oModel = this.getView().getModel('comp-quickpay'),
                mParameters,
                sCurrentPath,
                oMsgArea = this.getView().byId("idnrgQPPay-msgArea"),
                oContext,
                oReliantCardAmount = this.getView().byId("idnrgQPCC-Amt2"),
                oTBIPaySucc = this.getView().byId("idnrgQPPay-TBIPaySucc"),
                that = this,
                oPopup = this.getView().byId("idnrgQPPay-Popup"),
                oCloseButton = this.getView().byId("idnrgQPPayBt-close");
            this._OwnerComponent.getCcuxApp().setOccupied(true);
            oContext = oReliantCardAmount.getBindingContext("comp-quickpay");
            sCurrentPath = "/ReliantSet";
            oModel.create(sCurrentPath, {
                "ContractID": oContext.getProperty("ContractID"),
                "ReliantCard": oContext.getProperty("ReliantCard"),
                "Amount": oContext.getProperty("Amount")
            }, {
                success : function (oData, oResponse) {
                    oPopup.removeStyleClass("nrgQPPay-PopupWhite");
                    oPopup.addStyleClass("nrgQPPay-Popup");
                    oCloseButton.addStyleClass("nrgQPPayBt-closeBG");
                    oTBIPaySucc.setSelected(true);
                    oMsgArea.addStyleClass("nrgQPPay-hide");
                    jQuery.sap.log.info("Create successfull");
                    that._OwnerComponent.getCcuxApp().setOccupied(false);
                },
                error : function (oError) {
                    that.getView().getModel("appView").setProperty("/message", "Error at backend");
                    jQuery.sap.log.info("Create Failure");
                    that._OwnerComponent.getCcuxApp().setOccupied(false);
                }
            });
        };
        /**
         * handler for contact log maintenance
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onAcceptContactLog = function (oEvent) {
            var oContactLogModel = this.getView().getModel("quickpay-cl"),
                oModel = this.getView().getModel('comp-quickpay'),
                sCurrentPath = "/ContactLogSet",
                oTBIPaySucc = this.getView().byId("idnrgQPPay-TBIPaySucc"),
                oPopup = this.getView().byId("idnrgQPPay-Popup"),
                oCloseButton = this.getView().byId("idnrgQPPayBt-close"),
                that = this;
            this._OwnerComponent.getCcuxApp().setOccupied(true);
            oModel.create(sCurrentPath, {
                "ContractID" : oContactLogModel.getProperty("/ContractID"),
                "Class" : oContactLogModel.getProperty("/Class"),
                "Activit" : oContactLogModel.getProperty("/Activit"),
                "PopMessage" : oContactLogModel.getProperty("/PopMessage")
            }, {
                success : function (oData, oResponse) {
                    if (oData.ContactLogID !== "") {
                        oPopup.removeStyleClass("nrgQPPay-PopupWhite");
                        oPopup.addStyleClass("nrgQPPay-Popup");
                        oCloseButton.addStyleClass("nrgQPPayBt-closeBG");
                        oTBIPaySucc.setSelected(true);
                    }
                    that._OwnerComponent.getCcuxApp().setOccupied(false);
                },
                error : function (oError) {
                    that._OwnerComponent.getCcuxApp().setOccupied(false);
                }
            });
        };

        /**
		 * Formats the Bank Account Number only show last three digits
		 *
		 * @function
		 * @param {String} sAccountNumber value from the binding
         *
		 *
		 */
        Controller.prototype.formatAccountNumber = function (sAccountNumber) {
            if ((sAccountNumber !== undefined) && (sAccountNumber !== null) && (sAccountNumber !== "") && (sAccountNumber.split("-").length > 1)) {
                return sAccountNumber.split("-")[1];
            } else {
                return "";
            }
        };
        /**
		 * Validates User Input values
		 *
		 * @function
		 * @param {String} sValue to validate
         * @param {String} sMsg to display when blank/null/undefined
		 *
		 */
        Controller.prototype._ValidateValue = function (sValue, sMsg) {
            if ((sValue === undefined) || (sValue === null) || (sValue === "")) {
                this.getView().getModel("appView").setProperty("/message", sMsg);
                return false;
            } else {
                return true;
            }

        };
        /**
		 * Formats the Credit Card Icon based on type value
		 *
		 * @function
		 * @param {String} sAccountNumber value from the binding
         *
		 *
		 */
        Controller.prototype.formatCCType = function (sCCType) {
            if ((sCCType !== undefined) && (sCCType !== null) && (sCCType !== "")) {
                if (sCCType === "ZVIS") {
                    return "sap-icon://nrg-icon/cc-visa";
                } else if (sCCType === "ZDSC") {
                    return "sap-icon://nrg-icon/cc-discover";
                } else if (sCCType === "ZMCD") {
                    return "sap-icon://nrg-icon/cc-mastercard";
                } else if (sCCType === "ZATM") {
                    return "sap-icon://nrg-icon/cc-visa";
                }
            } else {
                return "";
            }
        };

        return Controller;
    }
);
