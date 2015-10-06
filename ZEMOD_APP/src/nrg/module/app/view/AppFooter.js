/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/base/EventProvider',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator'
    ],

    function (EventProvider, Filter, FilterOperator) {
        'use strict';

        var AppFooter = EventProvider.extend('nrg.module.app.view.AppFooter', {
            constructor: function (oController, oApp) {
                EventProvider.apply(this);

                this._oController = oController;
                this._oApp = oApp;
            },

            metadata: {
                publicMethods: [
                    'init',
                    'reset',
                    'setExpanded',
                    'isExpanded'
                ]
            }
        });

        AppFooter.prototype.init = function () {
            this._registerEvents();
        };

        /*------------------ Footer Update ----------------*/

        AppFooter.prototype._initFooterOData = function () {
            this._oController.getView().setModel(this._oController.getOwnerComponent().getModel('comp-app'), 'oCompODataSvc');
            this._oController.getView().setModel(this._oController.getOwnerComponent().getModel('rhs-app'), 'oRHSODataSvc');
            this._oController.getView().setModel(new sap.ui.model.json.JSONModel(), 'oFooterCampaign');
            this._oController.getView().setModel(new sap.ui.model.json.JSONModel(), 'oFooterRHS');
        };

        AppFooter.prototype.updateFooterNotification = function (sBpNumber, sCaNumber) {

        };

        AppFooter.prototype.updateFooterRHS = function (sBpNumber, sCaNumber) {
            var bp = '0002473499',
                ca = '000003040103',
                sPath = '/FooterS',
                aFilters = [];
                aFilters.push(new Filter({ path: 'BP', operator: FilterOperator.EQ, value1: bp}));
                aFilters.push(new Filter({ path: 'CA', operator: FilterOperator.EQ, value1: ca}));
            var oModel = this._oController.getView().getModel('oRHSODataSvc'),
                oRHSModel = this._oController.getView().getModel('oFooterRHS'),
                oParameters;

            oParameters = {
                filters: aFilters,
                success : function (oData) {
                    if (oData) {
                        var oCurrent = [];
                        var iCurrentIndex = 0;
                        oRHSModel.setData({Current:{ProdName: "None"}, Pending:{ProdName: "None"}, History:{ProdName: "None"}});
                        for (var i = 0; i < oData.results.length; i++) {
                            // Get all objects for Current
                            if (oData.results[i].Type === 'C') {
                                oCurrent.push(oData.results[i]);
                                oCurrent[iCurrentIndex].Index = iCurrentIndex++;
                            }
                            // Get first object for Pending
                            if (oData.results[i].Type === 'P' && oRHSModel.getProperty('/Pending/ProdName') === "None") {
                                oRHSModel.setProperty('/Pending', oData.results[i]);
                            }
                            // Get first object for History
                            if (oData.results[i].Type === 'H' && oRHSModel.getProperty('/History/ProdName') === "None") {
                                oRHSModel.setProperty('/History', oData.results[i]);
                            }
                        }
                        oRHSModel.setProperty('/Current', oCurrent);
                        oRHSModel.setProperty('/Current/SelectedKey', 0);
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        AppFooter.prototype.updateFooterCampaign = function (sCoNumber) {
            this._updateFooterCampaignContract(sCoNumber);
            this._updateFooterCampaignButton(sCoNumber);
        };

        AppFooter.prototype._updateFooterCampaignContract = function (sCoNumber) {
            // var co = '32253375';
            var sPath = '/CpgFtrS',
                aFilters = [];
                aFilters.push(new Filter({ path: 'Contract', operator: FilterOperator.EQ, value1: sCoNumber}));
            var oModel = this._oController.getView().getModel('oCompODataSvc'),
                oCampaignModel = this._oController.getView().getModel('oFooterCampaign'),
                oParameters;

            oCampaignModel.setProperty('/CampaignAvailable', false);
            oCampaignModel.setProperty('/EmptyAvailable', true);

            oParameters = {
                filters: aFilters,
                success : function (oData) {
                    if (oData.results.length > 0) {
                        oCampaignModel.setData({Current:{OfferTitle: "None"}, Pending:{OfferTitle: "None"}, History:{OfferTitle: "None"}});
                        for (var i = 0; i < oData.results.length; i++) {
                            if (oData.results[i].Type === 'C') {
                                oCampaignModel.setProperty('/Current', oData.results[i]);
                            }
                            if (oData.results[i].Type === 'PE') {
                                oCampaignModel.setProperty('/Pending', oData.results[i]);
                            }
                            if (oData.results[i].Type === 'H') {
                                oCampaignModel.setProperty('/History', oData.results[i]);
                            }
                        }
                        oCampaignModel.setProperty('/CampaignAvailable', true);
                        oCampaignModel.setProperty('/EmptyAvailable', false);
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        AppFooter.prototype._updateFooterCampaignButton = function (sCoNumber) {
            // var co = '32253375';
            var sPath = '/ButtonS(\'' + sCoNumber + '\')';
            var oModel = this._oController.getView().getModel('oCompODataSvc'),
                oCampaignModel = this._oController.getView().getModel('oFooterCampaign'),
                oParameters;

            oParameters = {
                success : function (oData) {
                    if (oData.Contract) {
                        if (oData.FirstBill === 'x' || oData.FirstBill === 'X') {
                            oCampaignModel.setProperty('/CampaignButtonText', 'Eligible offers Available');
                        } else {
                            oCampaignModel.setProperty('/CampaignButtonText', 'No Eligible offers Available');
                        }
                        oCampaignModel.setProperty('/CampaignButtonType', oData.InitTab);
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };


        AppFooter.prototype._formatCampaignTime = function (oDate) {
            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern:"MM/yyyy"});
            var dateStr = dateFormat.format(new Date(oDate.getTime()));
            return dateStr;
        };





        AppFooter.prototype.reset = function () {
            this._getSubmenu().close();
        };

        AppFooter.prototype.setExpanded = function (bExpanded) {
            bExpanded = !!bExpanded;

            if (bExpanded) {
                this._getSubmenu().open();
            } else {
                this._getSubmenu().close();
            }
        };

        AppFooter.prototype.isExpanded = function () {
            return this._getSubmenu().isOpen();
        };

        AppFooter.prototype._registerEvents = function () {
            var oView = this._oController.getView();
            oView.byId('appFtrCaret').attachEvent('click', this._onFooterCaretClick, this);
        };

        AppFooter.prototype._onFooterCaretClick = function (oControlEvent) {
            var oView = this._oController.getView();
            oView.byId('appFtr').toggleStyleClass('uteAppFtr-open');
            this._getSubmenu().open();
        };

        AppFooter.prototype._onFooterSubmenuCaretClick = function (oControlEvent) {
            var oView = this._oController.getView();
            oView.byId('appFtr').toggleStyleClass('uteAppFtr-open');
            this._getSubmenu().close();
        };

        AppFooter.prototype._getSubmenu = function () {
            var oView;

            if (!this._oSubmenu) {
                oView = this._oController.getView();
                this._oSubmenu = sap.ui.xmlfragment(oView.getId(), 'nrg.module.app.view.AppFooterDetails', this._oController);
                this._oSubmenu.setPosition(oView.byId('appFtr'), '0 0');
                oView.addDependent(this._oSubmenu);
                oView.byId('appFtrSMenuCaret').attachEvent('click', this._onFooterSubmenuCaretClick, this);

                // Initialize the oData model in footer
                this._oApp._initFooterOData();
                this._oApp.updateFooterNotification();
                this._oApp.updateFooterRHS();
                this._oApp.updateFooterCampaign();
            }

            return this._oSubmenu;
        };

        return AppFooter;
    }
);
