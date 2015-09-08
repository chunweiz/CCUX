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
                oWaiveReasonDropDown = this.getView().byId("idnrgQPCC-WR");
            oTBIStopRec.setSelected(true);
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
                events: {dataReceived : fnRecievedHandler}
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
                oContactModel = this.getView().getModel("quickpay-cl");
            //this.getView().setModel(oReceiptModel, "quickpay-rc");
            this._OwnerComponent.getCcuxApp().setOccupied(true);
            sCurrentPath = "/CreditCardSet";
            oMsgArea.removeStyleClass("nrgQPPay-hide");
            oMsgArea.addStyleClass("nrgQPPay-black");
            oCreditCardDateValue = new Date(oCreditCardDate.getValue());
            oModel.create(sCurrentPath, {
                "ContractID" : this._sContractId,
                "CardNumber" : oCreditCardDropDown.getSelectedKey(),
                "PaymentDate" : oCreditCardDateValue,
                "Amount" : oCreditCardAmount.getValue(),
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
                    that.getView().getModel("appView").setProperty("/message", oError);
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
                oWaiveReasonDropDown = this.getView().byId("idnrgQPBD-WaiveReason");
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
            oBindingInfo = {
                model : "comp-quickpay",
                path : sCurrentPath,
                template : oWaiveReasonTemplate,
                parameters: {countMode : "None"},
                events: {dataReceived : fnRecievedHandler}
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
            //this.getView().setModel(oReceiptModel, "quickpay-rc");
            this._OwnerComponent.getCcuxApp().setOccupied(true);
            sCurrentPath = "/BankDraftSet";
            oMsgArea.removeStyleClass("nrgQPPay-hide");
            oMsgArea.addStyleClass("nrgQPPay-black");
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
                    that.getView().getModel("appView").setProperty("/message", oError);
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
                fnRecievedHandler,
                oDropDown = this.getView().byId("idnrgQPCC-ReceiptDD"),
                oBindingInfo,
                oDropDownTemplate = this.getView().byId("idnrgQPCC-WaiveReasonItem"),
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
            aFilterIds = ["ContractID"];
            aFilterValues = [" + this._sContractId + "];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            fnRecievedHandler = function (oEvent) {
                jQuery.sap.log.info("Date Received Succesfully");
                that._OwnerComponent.getCcuxApp().setOccupied(false);
            };
            oBindingInfo = {
                model : "comp-quickpay",
                path : sCurrentPath,
                template : oDropDownTemplate,
                filters : aFilters,
                parameters: {countMode : "None"},
                events: {dataReceived : fnRecievedHandler}
            };
            oDropDown.bindAggregation("content", oBindingInfo);
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

            this._OwnerComponent.getCcuxApp().setOccupied(true);
            sCurrentPath = "/ReceiptSet";
            oMsgArea.removeStyleClass("nrgQPPay-hide");
            oMsgArea.addStyleClass("nrgQPPay-black");
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
                    that.getView().getModel("appView").setProperty("/message", oError);
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
                that = this;
            this._OwnerComponent.getCcuxApp().setOccupied(true);

            oModel.create(sCurrentPath, {
                "ContractID" : this._sContractId,
                "BankAccNum" : oAppViewModel.getProperty("/newBankAccount"),
                "BankRouting" : oAppViewModel.getProperty("/newBankRouting")
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
            this._OwnerComponent.getCcuxApp().setOccupied(true);
            sCurrentPath = sCurrentPath + "(ContractID='" + this._sContractId + "',ReliantCard='" + oReliantCard.getValue() + "')";
            oMsgArea.removeStyleClass("nrgQPPay-hide");
            oMsgArea.addStyleClass("nrgQPPay-black");
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
            var oReceiptModel = this.getView().getModel("quickpay-rc"),
                oModel = this.getView().getModel('comp-quickpay'),
                sCurrentPath = "/ContactLogSet",
                oTBIPaySucc = this.getView().byId("idnrgQPPay-TBIPaySucc"),
                oPopup = this.getView().byId("idnrgQPPay-Popup"),
                oCloseButton = this.getView().byId("idnrgQPPayBt-close"),
                that = this;
            this._OwnerComponent.getCcuxApp().setOccupied(true);
            oModel.create(sCurrentPath, {
                "ContractID" : oReceiptModel.getProperty("/ContractID"),
                "Class" : oReceiptModel.getProperty("/Class"),
                "Activit" : oReceiptModel.getProperty("/Activit"),
                "PopMessage" : oReceiptModel.getProperty("/PopMessage")
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
        return Controller;
    }
);
