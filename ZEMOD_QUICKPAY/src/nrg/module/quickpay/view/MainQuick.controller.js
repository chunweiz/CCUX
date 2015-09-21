/*globals sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global',
        "sap/ui/model/json/JSONModel",
        'sap/ui/core/format/DateFormat'
    ],

    function (CoreController, Filter, FilterOperator, jQuery, JSONModel, DateFormat) {
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
                    newBankAccount: "",
                    selected : 0
                }),
                oContactModel,
                fnRecievedHandler,
                that = this;
            this._oFormatYyyymmdd = DateFormat.getInstance({
                pattern: 'MM/dd/yyyy'
            });
            this._OwnerComponent = this.getView().getParent().getParent().getController().getOwnerComponent();
            this._OwnerComponent.getCcuxApp().setOccupied(true);
            oContactModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(oContactModel, "quickpay-cl");
            this.getView().setModel(oViewModel, "appView");
            sCurrentPath = "/PayAvailFlagsSet";
            sCurrentPath = sCurrentPath + "(ContractID='" + this._sContractId + "')";
            fnRecievedHandler = function (oEvent) {
                jQuery.sap.log.info("Date Received Succesfully");
                that._OwnerComponent.getCcuxApp().setOccupied(false);
            };
            this.getView().bindElement({
                model : "comp-quickpay",
                path : sCurrentPath,
                events: {dataReceived : fnRecievedHandler}
            });
            oMsgArea.addStyleClass("nrgQPPay-hide");
        };
/********************************  Credit card Related functionality Start ***********************************/
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
                sCurrentPath,
                oWaiveReasonTemplate = this.getView().byId("idnrgQPCC-WaiveReasonItem"),
                oWaiveReasonDropDown = this.getView().byId("idnrgQPCC-WR"),
                WRRecievedHandler,
                oCreditCardDate = this.getView().byId("idnrgQPCC-Date"),
                that = this;
            oTBIStopRec.setSelected(true);
            oCreditCardDate.setDefaultDate(this._oFormatYyyymmdd.format(new Date(), true));
            this._OwnerComponent.getCcuxApp().setOccupied(true);
            //oCreditCardDate.setMinDate(new Date());
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
                that._OwnerComponent.getCcuxApp().setOccupied(false);
            };
            sCurrentPath = "/CreditCardSet" + "(ContractID='" + this._sContractId + "')/CardsSet";
            //sCurrentPath = "/CardsSet";
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
                oCreditCardDateValue,
                oContactModel = this.getView().getModel("quickpay-cl"),
                oZipCode = this.getView().byId("idnrgQPCC-zipcode"),
                oCVVCode = this.getView().byId("idnrgQPCC-cvv");
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
                        that.onContactLog();
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
		 * Pending Credit Card Process initialization
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onPendingCreditCard = function (oEvent) {
            var oTBIPCC = this.getView().byId("idnrgQPPay-TBIPCC"),
                oPopup = this.getView().byId("idnrgQPPay-Popup"),
                oCloseButton = this.getView().byId("idnrgQPPayBt-close"),
                oTableRow = this.getView().byId("idnrgQPTable-Row"),
                oTableRowTemplate = this.getView().byId("idnrgQPTable-Rows"),
                oBindingInfo,
                sPath = "/CreditCardPPSet",
                oModel = this.getView().getModel('comp-quickpay'),
                aFilterIds,
                aFilterValues,
                aFilters,
                fnRecievedHandler,
                oPendingPaymentsModel = new JSONModel(),
                that = this;
            this._OwnerComponent.getCcuxApp().setOccupied(true);
            oTBIPCC.setSelected(true);
            this._aPendingSelPaths = [];
            //this.getView().getParent().setPosition("begin bottom", "begin bottom");
            this.setPosition(0);
            oPopup.removeStyleClass("nrgQPPay-Popup");
            oPopup.addStyleClass("nrgQPPay-PopupPayment");
            oCloseButton.addStyleClass("nrgQPPayBt-closeBG");
            this.getView().setModel(oPendingPaymentsModel, "QP-quickpay");
            aFilterIds = ["ContractID"];
            aFilterValues = [this._sContractId];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            oBindingInfo = {
                filters : aFilters,
                success : function (oData) {
                    oPendingPaymentsModel.setData(oData);
                    oTableRow.setModel(oPendingPaymentsModel);
                    jQuery.sap.log.info("Odata Read Successfully:::");
                    that._OwnerComponent.getCcuxApp().setOccupied(false);
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Error occured");
                    that._OwnerComponent.getCcuxApp().setOccupied(false);
                }.bind(this)
            };
            if (oModel) {
                oModel.read(sPath, oBindingInfo);
            }
        };
        /**
		 * Pending Credit Card Process initialization
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onPendingCCSave = function (oEvent) {
            var oModel = this.getView().getModel('comp-quickpay'),
                oPCCModel = this.getView().getModel('QP-quickpay'),
                mParameters,
                that = this;
            that._OwnerComponent.getCcuxApp().setOccupied(true);
            this._aPendingSelPaths.map(function (sCurrentPath) {
                var oContext = oPCCModel.getContext(sCurrentPath),
                    sPath = "/CreditCardPPSet";
                sPath = "/CreditCardPPSet('" + oContext.getProperty("ContractID") + "')";
                mParameters = {
                    success : function (oData, oResponse) {
                        var aFilterIds = ["ContractID"],
                            aFilterValues = [that._sContractId],
                            aFilters,
                            oBindingInfo,
                            oPendingPaymentsModel = that.getView().getModel("QP-quickpay"),
                            oTableRow = that.getView().byId("idnrgQPTable-Row");
                        aFilters = that._createSearchFilterObject(aFilterIds, aFilterValues);
                        oBindingInfo = {
                            filters : aFilters,
                            success : function (oData) {
                                that._OwnerComponent.getCcuxApp().setOccupied(false);
                                ute.ui.main.Popup.Alert({
                                    title: 'Information',
                                    message: 'Update Successfull'
                                });
                                oPendingPaymentsModel.setData(oData);
                                oTableRow.setModel(oPendingPaymentsModel);
                                jQuery.sap.log.info("Odata Read Successfully:::");

                            }.bind(this),
                            error: function (oError) {
                                jQuery.sap.log.info("Error occured");
                                that._OwnerComponent.getCcuxApp().setOccupied(false);
                                ute.ui.main.Popup.Alert({
                                    title: 'Information',
                                    message: 'Update failed'
                                });
                            }.bind(this)
                        };
                        if (oModel) {
                            oModel.read(sPath, oBindingInfo);
                        }
                        that._OwnerComponent.getCcuxApp().setOccupied(false);
                        jQuery.sap.log.info("Odata Read Successfully:::");
                    }.bind(this),
                    error: function (oError) {
                        that._OwnerComponent.getCcuxApp().setOccupied(false);
                        jQuery.sap.log.info("Eligibility Error occured");
                    }.bind(this)
                };
                oModel.update(sPath, {"CardID" : oContext.getProperty("CardID"),
                                     "CardNumber" : oContext.getProperty("CardNumber"),
                                     "ScheduledDate" : oContext.getProperty("ScheduledDate"),
                                     "Amount" : oContext.getProperty("Amount"),
                                     "ContractID" : oContext.getProperty("ContractID"),
                                     "CurrentStatus" : oContext.getProperty("CurrentStatus")}, mParameters);
            });

        };

        /**
		 * Handler when Pending payment record is selected, make fields editable
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
         *
		 *
		 */
        Controller.prototype.onPendingCCSelected = function (oEvent) {
            var oRow = oEvent.getSource().getParent(),
                iSelected = this.getView().getModel("appView").getProperty("/selected"),
                sPath,
                iIndex,
                sTemp,
                oModel;
            oModel = oEvent.getSource().getBindingContext("QP-quickpay").getModel();
            sPath = oEvent.getSource().getParent().getBindingContext("QP-quickpay").getPath();
            if (oEvent.getSource().getChecked()) {
                if ((iSelected) && (iSelected === 1)) {
                    ute.ui.main.Popup.Alert({
                        title: 'Information',
                        message: 'Only one Record editable'
                    });
                    oEvent.getSource().setChecked(false);
                } else {
                    iIndex = this._aPendingSelPaths.indexOf(sPath);
                    sTemp = iIndex < 0 && this._aPendingSelPaths.push(sPath);
                    iSelected = 1;
                    this.getView().getModel("appView").setProperty("/selected", iSelected);
                    oModel.setProperty(oEvent.getSource().getBindingContext("QP-quickpay").getPath() + "/Editable", true);
                    oRow.addStyleClass("nrgQPTable-RowsSelected");
                }
            } else {
                iIndex = this._aPendingSelPaths.indexOf(sPath);
                sTemp = iIndex > -1 && this._aPendingSelPaths.splice(iIndex, 1);
                iSelected = 0;
                this.getView().getModel("appView").setProperty("/selected", iSelected);
                oRow.removeStyleClass("nrgQPTable-RowsSelected");
            }
        };
        /**
         * handler for Adding Credit card
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onAddCC = function (oEvent) {
            var oModel = this.getView().getModel('comp-quickpay'),
                oBindingInfo,
                sPath,
                fnRecievedHandler,
                that = this;
            fnRecievedHandler = function (oEvent) {
                jQuery.sap.log.info("Date Received Succesfully");
            };
            sPath = "/CCCreateURLSet(ContractID='" + this._sContractId + "')";
            oBindingInfo = {
                success : function (oData) {
                    var paymentWindow = window.open(oData.URL);
                    //paymentWindow.addEventListener("onbeforeunload", fnRecievedHandler);
                    paymentWindow.onbeforeunload = function (oEvent) {
                        that.onRefreshCC();
                    };
                    jQuery.sap.log.info("Odata Read Successfully:::");
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Eligibility Error occured");

                }.bind(this)
            };
            if (oModel) {
                oModel.read(sPath, oBindingInfo);
            }
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
		 * When New Credit Card is added and Refresh list for new credit card.
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onRefreshCC = function (oEvent) {
            var fnRecievedHandler,
                oCreditCardDropDown = this.getView().byId("idnrgQPCC-DDL"),
                oBindingInfo,
                oCreditCardTemplate = this.getView().byId("idnrgQPCC-DDLItem"),
                sCurrentPath,
                that = this;
            that._OwnerComponent.getCcuxApp().setOccupied(true);
            fnRecievedHandler = function (oEvent) {
                jQuery.sap.log.info("Date Received Succesfully");
                that._OwnerComponent.getCcuxApp().setOccupied(false);
            };
            sCurrentPath = "/CreditCardSet" + "(ContractID='" + this._sContractId + "')/CardsSet";
            //sCurrentPath = "/CardsSet";
            oBindingInfo = {
                model : "comp-quickpay",
                path : sCurrentPath,
                template : oCreditCardTemplate,
                parameters: {countMode : "None", operationMode : "Server"},
                events: {dataReceived : fnRecievedHandler}
            };
            oCreditCardDropDown.bindAggregation("content", oBindingInfo);
        };

/********************************  Credit card Related functionality stop ***********************************/

/********************************  Bank Draft Related functionality start ***********************************/
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
                WRRecievedHandler,
                oSorter = new sap.ui.model.Sorter("LastUsed", true); // sort descending;
            oBankDraftDate.setDefaultDate(this._oFormatYyyymmdd.format(new Date(), true));
            //oBankDraftDate.setMinDate(new Date());
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
                parameters: {countMode : "None"},
                sorter: oSorter,
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
                oBankDraftDateValue,
                oContactModel = this.getView().getModel("quickpay-cl"),
                sBankKey,
                sBankRouting,
                sBankAccount;
            oMsgArea.removeStyleClass("nrgQPPay-hide");
            oMsgArea.addStyleClass("nrgQPPay-black");
            if (!this._ValidateValue(oBankDraftAmount.getValue(), "Enter Amount to be posted")) {
                return false;
            }
            if (!this._ValidateValue(oBankAccountDropDown.getSelectedKey(), "Select Bank Account")) {
                return false;
            }
            sCurrentPath = "/BankDraftSet";
            sBankKey = oBankAccountDropDown.getSelectedKey();
            sBankAccount = oModel.getProperty("/BankAccountSet(ContractID='" + this._sContractId + "',BankKey='" + sBankKey + "')/BankAccNum");
            sBankRouting = oModel.getProperty("/BankAccountSet(ContractID='" + this._sContractId + "',BankKey='" + sBankKey + "')/BankRouting");
            this._OwnerComponent.getCcuxApp().setOccupied(true);
            oBankDraftDateValue = new Date(oBankDraftDate.getValue());
            oModel.create(sCurrentPath, {
                "ContractID" : this._sContractId,
                "BankAccNum" : sBankAccount,
                "PaymentDate" : oBankDraftDateValue,
                "Amount" : oBankDraftAmount.getValue(),
                "WaiveFlag" : oWaiveReasonDropDown.getSelectedKey(),
                "BankKey" : sBankKey,
                "BankRouting" : sBankRouting
            }, {
                success : function (oData, oResponse) {
                    if (oData.Error === "") {
                        oContactModel.setData(oData);
                        that.onContactLog();
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
		 * Pending Bank Draft Process initialization
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onPendingBankDraft = function (oEvent) {
            var oTBIPBD = this.getView().byId("idnrgQPPay-TBIPBD"),
                oPopup = this.getView().byId("idnrgQPPay-Popup"),
                oCloseButton = this.getView().byId("idnrgQPPayBt-close"),
                oTableRow = this.getView().byId("idnrgQPTable-BDRow"),
                oTableRowTemplate = this.getView().byId("idnrgQPTable-BDRows"),
                oBindingInfo,
                sPath = "/BankDraftPPSet",
                oModel = this.getView().getModel('comp-quickpay'),
                aFilterIds,
                aFilterValues,
                aFilters,
                fnRecievedHandler,
                oPendingPaymentsModel = new JSONModel(),
                that = this;
            that._OwnerComponent.getCcuxApp().setOccupied(true);
            oTBIPBD.setSelected(true);
            this._aPendingSelPaths = [];
            oPopup.removeStyleClass("nrgQPPay-Popup");
            oPopup.addStyleClass("nrgQPPay-PopupPayment");
            oCloseButton.addStyleClass("nrgQPPayBt-closeBG");
            //this.getView().getParent().setPosition();
            this.getView().setModel(oPendingPaymentsModel, "QP-quickpay");
            aFilterIds = ["ContractID"];
            aFilterValues = [this._sContractId];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            oBindingInfo = {
                filters : aFilters,
                success : function (oData) {
                    oPendingPaymentsModel.setData(oData);
                    oTableRow.setModel(oPendingPaymentsModel);
                    jQuery.sap.log.info("Odata Read Successfully:::");
                    that._OwnerComponent.getCcuxApp().setOccupied(false);
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Eligibility Error occured");
                    that._OwnerComponent.getCcuxApp().setOccupied(false);
                }.bind(this)
            };
            if (oModel) {
                oModel.read(sPath, oBindingInfo);
            }
        };
        /**
		 * Handler when Pending payment record is selected, make fields editable
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
         *
		 *
		 */
        Controller.prototype.onPendingBDSelected = function (oEvent) {
            var oRow = oEvent.getSource().getParent(),
                iSelected = this.getView().getModel("appView").getProperty("/selected"),
                sPath,
                iIndex,
                sTemp,
                oModel;
            oModel = oEvent.getSource().getBindingContext("QP-quickpay").getModel();
            sPath = oEvent.getSource().getParent().getBindingContext("QP-quickpay").getPath();
            if (oEvent.getSource().getChecked()) {
                if ((iSelected) && (iSelected === 1)) {
                    ute.ui.main.Popup.Alert({
                        title: 'Information',
                        message: 'Only one Record editable'
                    });
                    oEvent.getSource().setChecked(false);
                } else {
                    iIndex = this._aPendingSelPaths.indexOf(sPath);
                    sTemp = iIndex < 0 && this._aPendingSelPaths.push(sPath);
                    iSelected = 1;
                    this.getView().getModel("appView").setProperty("/selected", iSelected);
                    oModel.setProperty(oEvent.getSource().getBindingContext("QP-quickpay").getPath() + "/Editable", true);
                    oRow.addStyleClass("nrgQPTable-RowsSelected");
                }
            } else {
                iIndex = this._aPendingSelPaths.indexOf(sPath);
                sTemp = iIndex > -1 && this._aPendingSelPaths.splice(iIndex, 1);
                iSelected = 0;
                this.getView().getModel("appView").setProperty("/selected", iSelected);
                oRow.removeStyleClass("nrgQPTable-RowsSelected");
            }
        };
        /**
		 * Pending Credit Card Process initialization
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onPendingBDSave = function (oEvent) {
            var oModel = this.getView().getModel('comp-quickpay'),
                oPCCModel = this.getView().getModel('QP-quickpay'),
                mParameters,
                that = this;

            that._OwnerComponent.getCcuxApp().setOccupied(true);
            this._aPendingSelPaths.map(function (sCurrentPath) {
                var oContext = oPCCModel.getContext(sCurrentPath),
                    aFilterIds = ["ContractID"],
                    aFilterValues = [oContext.getProperty("ContractID")],
                    aFilters,
                    oBindingInfo,
                    oTableRow = that.getView().byId("idnrgQPTable-BDRow"),
                    sPath = "/BankDraftPPSet";
                that.getView().getModel("appView").setProperty("/selected", 0);
                mParameters = {
                    method : "POST",
                    urlParameters : {"RoutingNumber" : oContext.getProperty("RoutingNumber"),
                                     "AccountNumber" : oContext.getProperty("AccountNumber"),
                                     "ScheduledDate" : oContext.getProperty("ScheduledDate"),
                                     "PaymentAmount" : oContext.getProperty("PaymentAmount"),
                                     "TrackingID" : oContext.getProperty("TrackingID"),
                                     "ContractID" : oContext.getProperty("ContractID"),
                                     "CurrentStatus" : oContext.getProperty("CurrentStatus")},
                    success : function (oData, oResponse) {
                        jQuery.sap.log.info("Odata Read Successfully:::");
                        aFilters = that._createSearchFilterObject(aFilterIds, aFilterValues);
                        oBindingInfo = {
                            filters : aFilters,
                            success : function (oData) {
                                oPCCModel.setData(oData);
                                oTableRow.setModel(oPCCModel);
                                jQuery.sap.log.info("Odata Read Successfully:::");
                                that._OwnerComponent.getCcuxApp().setOccupied(false);
                                ute.ui.main.Popup.Alert({
                                    title: 'Information',
                                    message: 'Update Successfull'
                                });
                            }.bind(this),
                            error: function (oError) {
                                jQuery.sap.log.info("Error occured");
                                that._OwnerComponent.getCcuxApp().setOccupied(false);
                                ute.ui.main.Popup.Alert({
                                    title: 'Information',
                                    message: 'Update Successfull'
                                });
                            }.bind(this)
                        };
                        if (oModel) {
                            oModel.read(sPath, oBindingInfo);
                        }
                    }.bind(this),
                    error: function (oError) {
                        jQuery.sap.log.info("Eligibility Error occured");
                        that._OwnerComponent.getCcuxApp().setOccupied(false);
                        ute.ui.main.Popup.Alert({
                            title: 'Information',
                            message: 'Update failed'
                        });
                    }.bind(this)
                };
                oModel.callFunction("/BankDraftUpdate", mParameters);
            });

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
/********************************  Bank Draft Related functionality stop ************************************/

/********************************  Reliant Card Related functionality start *********************************/
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
            oReliantDate.setValue(this._oFormatYyyymmdd.format(new Date(), true));
            oReliantDate.setEditable(false);
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
            this.getView().getParent().close();
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
/********************************  Reliant Card Related functionality stop **********************************/
/********************************  Receipt  Related functionality start *************************************/
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
            oReceiptDate.setValue(this._oFormatYyyymmdd.format(new Date(), true));
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
                        that.onContactLog();
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
/********************************  Receipt  Related functionality stop **************************************/
/********************************  Formatter function start            **************************************/
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
		 * Formats the Bank Account Number only show last three digits
		 *
		 * @function
		 * @param {String} sAccountNumber value from the binding
         *
		 *
		 */
        Controller.prototype.formatCardNumber = function (sCardNumber) {
            if ((sCardNumber !== undefined) && (sCardNumber !== null) && (sCardNumber !== "") && (sCardNumber.split("-").length > 1)) {
                return sCardNumber.split("-")[2];
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
/********************************  Formatter function stop             **************************************/
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
		 * When Popup is closed
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onPopupClose = function (oEvent) {
            this.getView().getParent().close();
        };
        /**
		 * Enable Contact Log
		 *
		 * @function onQuickPay
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onContactLog = function () {
            var oTBICL = this.getView().byId("idnrgQPPay-TBICL"),
                oPopup = this.getView().byId("idnrgQPPay-Popup");
            oTBICL.setSelected(true);
            oPopup.removeStyleClass("nrgQPPay-Popup");
            oPopup.addStyleClass("nrgQPPay-PopupPayment");
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
                        oPopup.removeStyleClass("nrgQPPay-PopupPayment");
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
         * handler for contact log maintenance
		 *
		 * @function onQuickPay
         * @param {interger} iType = 0 is small, 1 is large
		 */
        Controller.prototype.setPosition = function (iType) {
            if (iType === 0) {
                this.getView().getParent().setPosition("begin bottom", "begin bottom");
            } else {
                this.getView().getParent().setPosition("begin bottom", "begin bottom");
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
        return Controller;
    }
);
