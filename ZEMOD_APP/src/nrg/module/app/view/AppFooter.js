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

        AppFooter.prototype._initFooterOData = function () {
            // oData Model
            this._oController.getView().setModel(this._oController.getOwnerComponent().getModel('comp-app'), 'oODataSvc');
            this._oController.getView().setModel(new sap.ui.model.json.JSONModel(), 'oFooterCampaign');
        };

        AppFooter.prototype.updateFooter = function (oPayload) {
            var bp = '',
                ca = '',
                co = '32253375',
                oFilterTemplate = new Filter({ path: 'Contract', operator: FilterOperator.EQ, value1: co}),
                sPath = '/CpgFtrS',
                aFilters = [];
                aFilters.push(oFilterTemplate);
            var oModel = this._oController.getView().getModel('oODataSvc'),
                oCampaignModel = this._oController.getView().getModel('oFooterCampaign'),
                oParameters;

            oParameters = {
                filters: aFilters,
                success : function (oData) {
                    if (oData) {
                        // oCampaignModel.setData({Current:{OfferTitle: "None"}, Pending:{OfferTitle: "None"}, History:{OfferTitle: "None"}});
                        var oCurrent = {OfferTitle: "None"},
                            oPending = {OfferTitle: "None"},
                            oHistory = {OfferTitle: "None"};
                        
                        for (var i = 0; i < oData.results.length; i++) {
                            if (oData.results[i].Type === 'C') {
                                // oCampaignModel.setProperty('/Current', oData.results[i]);
                                oCurrent = oData.results[i];
                            }
                            if (oData.results[i].Type === 'PE') {
                                // oCampaignModel.setProperty('/Pending', oData.results[i]);
                                oPending = oData.results[i];
                            }
                            if (oData.results[i].Type === 'H') {
                                // oCampaignModel.setProperty('/History', oData.results[i]);
                                oHistory = oData.results[i];
                            }
                        }
                        var oContent = {Current: oCurrent, Pending: oPending, History: oHistory};
                        oCampaignModel.setData(oContent);
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
            }

            return this._oSubmenu;
        };

        return AppFooter;
    }
);
