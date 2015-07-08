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

        var Controller = CoreController.extend('nrg.module.campaign.view.Tools');
        /* =========================================================== */
		/* lifecycle method- Init                                     */
		/* =========================================================== */
        Controller.prototype.onInit = function () {
            this.getOwnerComponent().getRouter().attachRoutePatternMatched(this._onObjectMatched, this);
            this._i18NModel = this.getOwnerComponent().getModel("comp-i18n-campaign");
        };

		/**
		 * Binds the view to the object path
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
		 * @private
		 */
        Controller.prototype._onObjectMatched = function (oEvent) {
            var oViewModel,
                iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
                mParameters,
                aFilters,
                i,
                oModel,
                sCurrentPath,
                aFilterIds,
                aFilterValues;
            oViewModel = new JSONModel({
				busy : true,
				delay : 0,
                selected : 0,
                history : false,
                cancel : false
			});
            aFilterIds = ["Contract", "Type"];
            aFilterValues = ["32253375", "H"];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            this.getView().setModel(oViewModel, "appView");
            sCurrentPath = this._i18NModel.getProperty("nrgHistorySet");
            this.getView().getModel("appView").setProperty("/busy", false);
            Controller.sContract = oEvent.getParameter("arguments").coNum;
            sCurrentPath = sCurrentPath + "/$count";
            mParameters = {
                batchGroupId : "myId3",
                filters : aFilters,
                success : function (oData) {
                    if (oData) {
                        jQuery.sap.log.info("Odata Read Successfully:::");
                        if ((parseInt(oData, 10)) > 0) {
                            this.getView().getModel("appView").setProperty("/history", true);
                        }
                    }
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Odata Failed:::" + oError);
                }.bind(this)
            };
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            if (oModel) {
                oModel.read(sCurrentPath, mParameters);
            }
            sCurrentPath = this._i18NModel.getProperty("nrgPendingSwapsSet");
            sCurrentPath = sCurrentPath + "/$count";
            aFilterIds = ["Contract"];
            aFilterValues = ['34805112'];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            mParameters = {
                batchGroupId : "myId4",
                filters : aFilters,
                success : function (oData) {
                    if (oData) {
                        jQuery.sap.log.info("Odata Read Successfully:::");
                        if ((parseInt(oData, 10)) > 0) {
                            this.getView().getModel("appView").setProperty("/cancel", true);
                        }
                    }
                }.bind(this),
                error: function (oError) {
                    jQuery.sap.log.info("Odata Failed:::" + oError);
                }.bind(this)
            };
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            if (oModel) {
                oModel.read(sCurrentPath, mParameters);
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
		 * Display History View when user clicked on Campaign History Button
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onHistoryPress = function (oEvent) {
            var oModel,
                sPath,
                mParameters,
                oHistoryView,
                oScrollContainer,
                oScrollTemplate,
                aFilters,
                aFilterIds,
                aFilterValues,
                oDataTag,
                oNoDataTag,
                fnRecievedHandler,
                aContent,
                oPricingTable,
                oPricingRowTemplate,
                oPricingColTemplate,
                that = this,
                fnRecieved,
                fnChange,
                oTemplateView,
                oMetaModel;
            aFilterIds = ["Contract", "Type"];
            aFilterValues = ["32253375", "H"];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            sPath = this._i18NModel.getProperty("nrgHistorySet");
            oHistoryView = sap.ui.view({
                type: sap.ui.core.mvc.ViewType.XML,
                viewName: "nrg.module.campaign.view.History"
            });
            oModel = this.getOwnerComponent().getModel('comp-campaign');
            oScrollContainer = oHistoryView.byId("idnrgCamHisScroll");
            oScrollTemplate = oHistoryView.byId("idnrgCamHisBut").clone();
            oDataTag = this.getView().byId("idnrgCamHisData");
            oNoDataTag = this.getView().byId("idnrgCamHisNoData");
            oPricingTable = oHistoryView.byId("idnrgCamHis-prcTable");
            oPricingColTemplate = oHistoryView.byId("idnrgCamHis-prcCol");
            oPricingRowTemplate = oHistoryView.byId("idnrgCamHis-prcRow");
            fnRecievedHandler = function () {
                var oBinding;
                aContent = oScrollContainer.getContent();
                if ((aContent !== undefined) && (aContent.length > 0)) {
                    sPath = aContent[0].getBindingContext("comp-campaign").getPath();
                    // Development for Pricing Table binding..........................................
                    fnRecieved = function (oEvent) {
                        jQuery.sap.log.info("oPricingTable fnRecieved Read Successfully:::");
                    };
                    fnChange = function (oEvent) {
                        jQuery.sap.log.info("function change called successfully:::");
                    };
                    oMetaModel = oModel.getMetaModel();
                    mParameters = {
                        model : "comp-campaign",
                        path : sPath + "/CpgEFL_N",
                        template : oPricingColTemplate,
                        events: {dataReceived : fnRecieved, change : fnChange}
                    };
                    oPricingTable.bindColumns(mParameters);

                    // Development for Pricing Table binding..........................................
                    aContent[0].addStyleClass("nrgCamHis-but-selected");
                    that.getView().bindElement({
                        model : "comp-campaign",
                        path : sPath
                    });
                } else {
                    oDataTag.addStyleClass("nrgCamHis-hide");
                    oNoDataTag.removeStyleClass("nrgCamHis-hide");
                }
                that.getView().getModel("appView").setProperty("/busy", false);
                oBinding = oScrollContainer.getBinding("content");
                oBinding.detachDataReceived(fnRecievedHandler);
            };
            mParameters = {
                parameters : {expand: "CpgEFL_N"},
                model : "comp-campaign",
                path : sPath,
                template : oScrollTemplate,
                filters : aFilters,
                events: {dataReceived : fnRecievedHandler}
            };
            oScrollContainer.bindAggregation("content", mParameters);
            this._oHistoryDialog = new ute.ui.main.Popup.create({
                title: 'Campaign History',
                close: this._handleDialogClosed,
                content: oHistoryView
            });
            this._oHistoryDialog.addStyleClass("nrgCamHis-dialog");
            //to get access to the global model
            this.getView().addDependent(this._oHistoryDialog);
            this._oHistoryDialog.open();

        };

        /**
		 * Display History View when user clicked on Campaign History Button
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onCancelPress = function (oEvent) {
            var oModel,
                sPath,
                mParameters,
                oHistoryView,
                oPendingSwapsTable,
                oScrollTemplate,
                aFilters,
                aFilterIds,
                aFilterValues,
                oPendingSwapsTemplate;
            aFilterIds = ["Contract"];
            aFilterValues = ['34805112'];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            if (!this._oDialogFragment) {
                this._oDialogFragment = sap.ui.xmlfragment("PendingSwaps", "nrg.module.campaign.view.PendingSwaps", this);
            }
            if (this._oCancelDialog === undefined) {
                this._oCancelDialog = new ute.ui.main.Popup.create({
                    title: 'Change Campaign - Cancel',
                    close: this._handleDialogClosed,
                    content: this._oDialogFragment
                });
            }
            sPath = this._i18NModel.getProperty("nrgPendingSwapsSet");
            oPendingSwapsTable = sap.ui.core.Fragment.byId("PendingSwaps", "idnrgCamPds-pendTable");
            oPendingSwapsTemplate = sap.ui.core.Fragment.byId("PendingSwaps", "idnrgCamPds-pendRow");
            mParameters = {
                model : "comp-campaign",
                path : sPath,
                filters : aFilters,
                template : oPendingSwapsTemplate
            };
            this.getView().addDependent(this._oCancelDialog);
            //to get access to the global model
            this._oCancelDialog.addStyleClass("nrgCamHis-dialog");
            oPendingSwapsTable.bindRows(mParameters);
            this._oCancelDialog.open();
        };

        /**
		 * Handler Function for the History Popup close
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype._handleDialogClosed = function (oControlEvent) {

        };

        /**
		 * Handler Function for the History Popup close
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onPendingSwapsSelected = function (oEvent) {
            var iSelected = this.getView().getModel("appView").getProperty("/selected");
            if (oEvent.getSource().getChecked()) {
                iSelected = iSelected + 1;
            } else {
                iSelected = iSelected - 1;
            }
            this.getView().getModel("appView").setProperty("/selected", iSelected);

        };

        /**
		 * Handler Function for the History Popup close
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype.onSelected = function (oEvent) {
            var iSelected = this.getView().getModel("appView").getProperty("/selected");
            if (oEvent.getSource().getChecked()) {
                iSelected = iSelected + 1;
            } else {
                iSelected = iSelected - 1;
            }

        };

        return Controller;
    }

);
