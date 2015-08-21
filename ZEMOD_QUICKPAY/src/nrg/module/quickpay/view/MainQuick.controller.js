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
                    reliantPress: ".onAcceptReliant"
                });
            this._OwnerComponent = this.getView().getParent().getParent().getController().getOwnerComponent();
            this.getView().setModel(oViewModel, "appView");
            sCurrentPath = "/PayAvailFlagsSet";
            sCurrentPath = sCurrentPath + "(ContractID='0034805112')";
            this.getView().bindElement({
                model : "comp-quickpay",
                path : sCurrentPath
            });
            oMsgArea.addStyleClass("nrgQPPay-hide");
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
                oDropDown = this.getView().byId("idnrgQPCC-DDL"),
                oBindingInfo,
                oDropDownTemplate = this.getView().byId("idnrgQPCC-DDLItem"),
                aFilters,
                dropDownHandler,
                sCurrentPath = "/CreditCardSet",
                aFilterIds,
                aFilterValues,
                oModel;
            oModel = new ODataModel("/sap/opu/odata/sap/ZE_CCUX_SRV");
            this.getView().setModel(oModel, 'comp-creditcard');
            oTBIStopRec.setSelected(true);
            // Handler function for Tab Bar Item.
            aFilterIds = ["PartnerID"];
            aFilterValues = ['0000956003'];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            fnRecievedHandler = function (oEvent) {
                jQuery.sap.log.info("Date Received Succesfully");
            };

            oBindingInfo = {
                model : "comp-creditcard",
                path : sCurrentPath,
                template : oDropDownTemplate,
                filters : aFilters,
                parameters: {countMode : "None", operationMode : "Server"},
                events: {dataReceived : fnRecievedHandler}
            };
            oDropDown.bindAggregation("content", oBindingInfo);

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
                oCloseButton = this.getView().byId("idnrgQPPayBt-close");
            oPopup.removeStyleClass("nrgQPPay-Popup");
            oPopup.addStyleClass("nrgQPPay-PopupWhite");
            oCloseButton.addStyleClass("nrgQPPayBt-closeBG");
            oTBIBD.setSelected(true);
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
                oDropDownTemplate = this.getView().byId("idnrgQPCC-ReceiptItem"),
                sCurrentPath,
                oModel = this.getView().getModel('comp-quickpay');
            oPopup.removeStyleClass("nrgQPPay-Popup");
            oPopup.addStyleClass("nrgQPPay-PopupWhite");
            oCloseButton.addStyleClass("nrgQPPayBt-closeBG");
            oTBIRC.setSelected(true);
            sCurrentPath = "/ReceiptSet" + "(ContractID='0034805112')/WaiveReasonsSet";
            aFilterIds = ["ContractID"];
            aFilterValues = ['0034805112'];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            fnRecievedHandler = function (oEvent) {
                jQuery.sap.log.info("Date Received Succesfully");
            };
            oBindingInfo = {
                model : "comp-quickpay",
                path : sCurrentPath,
                template : oDropDownTemplate,
                filters : aFilters,
                parameters: {countMode : "None", operationMode : "Server"},
                events: {dataReceived : fnRecievedHandler}
            };
            oDropDown.bindAggregation("content", oBindingInfo);
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
        Controller.prototype.onAcceptCredit = function (oEvent) {
            var oTBIPaySucc = this.getView().byId("idnrgQPPay-TBIPaySucc"),
                oPopup = this.getView().byId("idnrgQPPay-Popup"),
                oCloseButton = this.getView().byId("idnrgQPPayBt-close");
            oPopup.removeStyleClass("nrgQPPay-PopupWhite");
            oPopup.addStyleClass("nrgQPPay-Popup");
            oCloseButton.addStyleClass("nrgQPPayBt-closeBG");
            oTBIPaySucc.setSelected(true);
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
            sCurrentPath = sCurrentPath + "(ContractID='0034805112',ReliantCard='" + oReliantCard.getValue() + "')";
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
                },
                error : function (oError) {
                    that.getView().getModel("appView").setProperty("/message", "Error at backend");
                    jQuery.sap.log.info("Create Failure");
                }
            });
        };
        return Controller;
    }


);
