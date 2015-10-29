/*global sap*/
/*globals ute*/
/*globals $*/
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

        AppFooter.prototype._initFooterContent = function () {
            this._oController.getView().setModel(this._oController.getView().getModel('noti-app'), 'oNotiODataSvc');
            this._oController.getView().setModel(this._oController.getView().getModel('rhs-app'), 'oRHSODataSvc');
            this._oController.getView().setModel(this._oController.getView().getModel('comp-app'), 'oCompODataSvc');
            this._oController.getView().setModel(new sap.ui.model.json.JSONModel(), 'oFooterNotification');
            this._oController.getView().setModel(new sap.ui.model.json.JSONModel(), 'oFooterRHS');
            this._oController.getView().setModel(new sap.ui.model.json.JSONModel(), 'oFooterCampaign');
            this._oController.getView().setModel(new sap.ui.model.json.JSONModel(), 'oFooterRouting');

            this.footerElement = {};

            // Notification
            this.footerElement.notiEmptySec = this._oController.getView().byId('nrgAppFtrDetails-notification-emptySection');
            this.footerElement.notiAlertSec = this._oController.getView().byId('nrgAppFtrDetails-notification-alertSection');
            this.footerElement.notiEmptySec.setVisible(true);
            this.footerElement.notiAlertSec.setVisible(false);

            // RHS
            this.footerElement.rhsEmptySec = this._oController.getView().byId('nrgAppFtrDetails-rhs-emptySection');
            this.footerElement.rhsProdSec = this._oController.getView().byId('nrgAppFtrDetails-rhs-productSection');
            this.footerElement.rhsEmptySec.setVisible(true);
            this.footerElement.rhsProdSec.setVisible(false);

            // Campaign
            this.footerElement.campEmptySec = this._oController.getView().byId('nrgAppFtrDetails-eligibleOffers-emptySection');
            this.footerElement.campOfferSec = this._oController.getView().byId('nrgAppFtrDetails-eligibleOffers');
            this.footerElement.campBtnSec = this._oController.getView().byId('nrgAppFtrDetails-campaignButton');
            this.footerElement.campEmptySec.setVisible(true);
            this.footerElement.campOfferSec.setVisible(false);
            this.footerElement.campBtnSec.setVisible(false);

        };

        AppFooter.prototype._onFooterNotificationLinkPress = function (oControlEvent) {
        };

        AppFooter.prototype._onM2mLinkPress = function (oControlEvent) {
        };

        AppFooter.prototype._onSmtpLinkPress = function (oControlEvent) {
        };

        AppFooter.prototype._onMailLinkPress = function (oControlEvent) {
        };

        AppFooter.prototype._onSmsLinkPress = function (oControlEvent) {
        };

        AppFooter.prototype._onOamLinkPress = function (oControlEvent) {
        };

        AppFooter.prototype.updateFooterNotification = function (sBpNumber, sCaNumber, sCoNumber) {

                // var notificationContainer = this._oController.getView().byId("nrgAppFtrDetails-notification-scrollContent");


                // if (!this.notificationCenter) {
                //     // First time render goes here
                //     this.notificationCenter = new ute.ui.app.FooterNotificationCenter("nrgAppFtrDetails-notification-notificationCenter");


                //     this.notificationCenter.addContent(new ute.ui.app.FooterNotificationItem({
                //         link: true, 
                //         design: 'Error', 
                //         text: message
                //     }));
                //     this.notificationCenter.placeAt(notificationContainer);
                // } else {
                //     // Second time render goes here
                //     // this.notificationCenter.destroy();
                //     // this.notificationCenter = new ute.ui.app.FooterNotificationCenter("nrgAppFtrDetails-notification-notificationCenter", {content: notification});
                //     // this.notificationCenter.placeAt(notificationContainer);
                //     this.notificationCenter.destroyAggregation('content', true);
                //     this.notificationCenter.addAggregation('content', new ute.ui.app.FooterNotificationItem({
                //         link: true, 
                //         design: 'Error', 
                //         text: message
                //     }), true);
                //     // console.log('tears');
                // }

                // this.footerElement.notiEmptySec.setVisible(false);
                // this.footerElement.notiAlertSec.setVisible(true);





            this._updateRouting(sBpNumber, sCaNumber, sCoNumber);

            var sPath = '/AlertsSet',
                aFilters = [];
                aFilters.push(new Filter({ path: 'BP', operator: FilterOperator.EQ, value1: sBpNumber}));
                aFilters.push(new Filter({ path: 'CA', operator: FilterOperator.EQ, value1: sCaNumber}));
                aFilters.push(new Filter({ path: 'Identifier', operator: FilterOperator.EQ, value1: 'FOOTER'}));

            var oModel = this._oController.getView().getModel('oNotiODataSvc'),
                oNotificationModel = this._oController.getView().getModel('oFooterNotification'),
                oParameters;

            oParameters = {
                filters: aFilters,
                success : function (oData) {
                    if (oData.results.length) {
                        oNotificationModel.setData(oData.results);
                        
                        var notification = [],
                            notificationLinkPressActions = {
                                'M2M': this._onM2mLinkPress, 
                                'SMTP': this._onSmtpLinkPress, 
                                'MAIL': this._onMailLinkPress, 
                                'SMS': this._onSmsLinkPress, 
                                'OAM': this._onOamLinkPress
                            },
                            notificationContainer = this._oController.getView().byId("nrgAppFtrDetails-notification-scrollContent");

                        for (var i = 0; i < oNotificationModel.oData.length; i++) {
                            notification.push(
                                new ute.ui.app.FooterNotificationItem({
                                    link: true, 
                                    design: 'Error', 
                                    text: oNotificationModel.oData[i].MessageText, 
                                    linkPress: notificationLinkPressActions[oNotificationModel.oData[i].FilterType]
                                })
                            );
                        }

                        if (!this.notificationCenter) {
                            // First time render goes here
                            this.notificationCenter = new ute.ui.app.FooterNotificationCenter("nrgAppFtrDetails-notification-notificationCenter", {content: notification});
                            this.notificationCenter.placeAt(notificationContainer);
                        } else {
                            // Second time render goes here
                            this.notificationCenter.destroyAggregation('content', true);
                            for (var j = 0; j < notification.length; j++) {
                                this.notificationCenter.addAggregation('content', notification[j], true);
                            }
                        }
                        
                        this.footerElement.notiEmptySec.setVisible(false);
                        this.footerElement.notiAlertSec.setVisible(true);
                    } else {
                        this.footerElement.notiEmptySec.setVisible(true);
                        this.footerElement.notiAlertSec.setVisible(false);
                    }
                }.bind(this),
                error: function (oError) {
                    this.footerElement.notiEmptySec.setVisible(true);
                    this.footerElement.notiAlertSec.setVisible(false);
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        AppFooter.prototype._onRhsCurrenItemSelect = function (oControlEvent) {

        }.bind(this);

        AppFooter.prototype._onRhsCurrenDropdownClick = function (oControlEvent) {
            var rhsSection = this._oController.getView().byId("nrgAppFtrDetails-rhs");
            if ($('#nrgAppFtrDetails-rhs-currentDropdown-picker').height() > 200) {
                if (rhsSection.hasStyleClass('scrollBarAppear')) {
                    rhsSection.removeStyleClass('scrollBarAppear');
                } else {
                    rhsSection.addStyleClass('scrollBarAppear');
                }
            }
        };

        AppFooter.prototype.updateFooterRHS = function (sBpNumber, sCaNumber, sCoNumber) {
            this._updateRouting(sBpNumber, sCaNumber, sCoNumber);

            var sPath = '/FooterS',
                aFilters = [];
                aFilters.push(new Filter({ path: 'BP', operator: FilterOperator.EQ, value1: sBpNumber}));
                aFilters.push(new Filter({ path: 'CA', operator: FilterOperator.EQ, value1: sCaNumber}));
            var oModel = this._oController.getView().getModel('oRHSODataSvc'),
                oRHSModel = this._oController.getView().getModel('oFooterRHS'),
                oParameters;

            oParameters = {
                filters: aFilters,
                success : function (oData) {
                    if (oData.results.length > 0) {
                        // Generate a dropdwon for RHS current products
                        if (!this.rhsDropdown) {
                            var iCurrentIndex = 0;
                            var aCurrent = [];
                            var dropdownContainer = this._oController.getView().byId("nrgAppFtrDetails-rhs-currentItem");
                            // Get all objects for Current
                            for (var i = 0; i < oData.results.length; i++) {
                                if (oData.results[i].Type === 'C') {
                                    var oTag = new ute.ui.commons.Tag({elem: 'span', text: oData.results[i].ProdName});
                                    aCurrent.push(new ute.ui.main.DropdownItem({key: iCurrentIndex++, content: oTag}).addStyleClass("nrgAppFtrDetails-rhs-currentDropdownItem"));
                                }
                            }
                            this.rhsDropdown = new ute.ui.main.Dropdown("nrgAppFtrDetails-rhs-currentDropdown", {content: aCurrent, selectedKey: 0, select: this._onRhsCurrenItemSelect}).addStyleClass("nrgAppFtrDetails-rhs-itemContent");
                            this.rhsDropdown.attachBrowserEvent("click", this._onRhsCurrenDropdownClick.bind(this));
                            this.rhsDropdown.placeAt(dropdownContainer);
                        }

                        for (var j = 0; j < oData.results.length; j++) {
                            // Get first object for Pending
                            if (oData.results[j].Type === 'P') {
                                this._oController.getView().byId("nrgAppFtrDetails-rhs-pendingItemContent").setText(oData.results[j].ProdName);
                            }
                            // Get first object for History
                            if (oData.results[j].Type === 'H' ) {
                                this._oController.getView().byId("nrgAppFtrDetails-rhs-historyItemContent").setText(oData.results[j].ProdName);
                            }
                        }
                        this.footerElement.rhsEmptySec.setVisible(false);
                        this.footerElement.rhsProdSec.setVisible(true);
                    } else {
                        this.footerElement.rhsEmptySec.setVisible(true);
                        this.footerElement.rhsProdSec.setVisible(false);
                    }
                }.bind(this),
                error: function (oError) {
                    this.footerElement.rhsEmptySec.setVisible(true);
                    this.footerElement.rhsProdSec.setVisible(false);
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        AppFooter.prototype.updateFooterCampaign = function (sBpNumber, sCaNumber, sCoNumber) {
            this._updateRouting(sBpNumber, sCaNumber, sCoNumber);

            this._updateFooterCampaignContract(sCoNumber);
            this._updateFooterCampaignButton(sCoNumber);
        };

        AppFooter.prototype._updateRouting = function (sBpNumber, sCaNumber, sCoNumber) {
            var oRouting = this._oController.getView().getModel('oFooterRouting');
            oRouting.setProperty('/BpNumber', sBpNumber);
            oRouting.setProperty('/CaNumber', sCaNumber);
            oRouting.setProperty('/CoNumber', sCoNumber);
        };

        AppFooter.prototype._updateFooterCampaignContract = function (sCoNumber) {
            var sPath = '/CpgFtrS',
                aFilters = [];
                aFilters.push(new Filter({ path: 'Contract', operator: FilterOperator.EQ, value1: sCoNumber}));

            var oModel = this._oController.getView().getModel('oCompODataSvc'),
                oCampaignModel = this._oController.getView().getModel('oFooterCampaign'),
                oParameters;

            oParameters = {
                filters: aFilters,
                success : function (oData) {
                    if (oData.results.length > 0) {
                        for (var i = 0; i < oData.results.length; i++) {
                            if (oData.results[i].Type === 'C') {
                                oCampaignModel.setProperty('/Current', oData.results[i]);

                                if (oCampaignModel.oData.Current.OfferTitle !== 'None' && oCampaignModel.oData.Current.OfferTitle !== '') {
                                    this._oController.getView().byId('nrgAppFtrDetails-eligibleOffers-currentItem').addStyleClass('hasValue');
                                }
                                this._oController.getView().byId('nrgAppFtrDetails-eligibleOffers-currentItem').setText(oCampaignModel.oData.Current.OfferTitle);
                                this._oController.getView().byId('nrgAppFtrDetails-eligibleOffers-startDateValue').setText(this._formatCampaignTime(oCampaignModel.oData.Current.StartDate));
                                this._oController.getView().byId('nrgAppFtrDetails-eligibleOffers-endDateValue').setText(this._formatCampaignTime(oCampaignModel.oData.Current.EndDate));
                            }
                            if (oData.results[i].Type === 'PE') {
                                oCampaignModel.setProperty('/Pending', oData.results[i]);

                                if (oCampaignModel.oData.Pending.OfferTitle !== 'None' && oCampaignModel.oData.Pending.OfferTitle !== '') {
                                    this._oController.getView().byId('nrgAppFtrDetails-eligibleOffers-pendingItem').addStyleClass('hasValue');
                                }
                                this._oController.getView().byId('nrgAppFtrDetails-eligibleOffers-pendingItem').setText(oCampaignModel.oData.Pending.OfferTitle);
                            }
                            if (oData.results[i].Type === 'H') {
                                oCampaignModel.setProperty('/History', oData.results[i]);

                                if (oCampaignModel.oData.History.OfferTitle !== 'None' && oCampaignModel.oData.History.OfferTitle !== '') {
                                    this._oController.getView().byId('nrgAppFtrDetails-eligibleOffers-historyItem').addStyleClass('hasValue');
                                }
                                this._oController.getView().byId('nrgAppFtrDetails-eligibleOffers-historyItem').setText(oCampaignModel.oData.History.OfferTitle);
                            }
                        }
                        this.footerElement.campEmptySec.setVisible(false);
                        this.footerElement.campOfferSec.setVisible(true);
                        this.footerElement.campBtnSec.setVisible(true);
                    } else {
                        this.footerElement.campEmptySec.setVisible(true);
                        this.footerElement.campOfferSec.setVisible(false);
                        this.footerElement.campBtnSec.setVisible(false);
                    }
                }.bind(this),
                error: function (oError) {
                    this.footerElement.campEmptySec.setVisible(true);
                    this.footerElement.campOfferSec.setVisible(false);
                    this.footerElement.campBtnSec.setVisible(false);
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        AppFooter.prototype._updateFooterCampaignButton = function (sCoNumber) {
            var sPath = '/ButtonS(\'' + sCoNumber + '\')';

            var oModel = this._oController.getView().getModel('oCompODataSvc'),
                oCampaignModel = this._oController.getView().getModel('oFooterCampaign'),
                oParameters;

            oParameters = {
                success : function (oData) {
                    if (oData.Contract) {
                        if (oData.FirstBill === 'x' || oData.FirstBill === 'X') {
                            oCampaignModel.setProperty('/CampaignButtonText', 'Eligible offers Available');
                            oCampaignModel.setProperty('/CampaignFirstBill', true);
                        } else {
                            oCampaignModel.setProperty('/CampaignButtonText', 'No Eligible offers Available');
                            oCampaignModel.setProperty('/CampaignFirstBill', false);
                        }
                        this._oController.getView().byId('nrgAppFtrDetails-campaignButton-itemTitle').setText(oCampaignModel.oData.CampaignButtonText);
                        oCampaignModel.setProperty('/CampaignButtonType', oData.InitTab);
                    }
                }.bind(this),
                error: function (oError) {

                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        AppFooter.prototype._formatCampaignTime = function (oDate) {
            if (oDate) {
                var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern:"MM/yyyy"});
                var dateStr = dateFormat.format(new Date(oDate.getTime()));
                return dateStr;
            }
        };

        AppFooter.prototype.onCampaignBtnClick = function () {
            var oCampaignModel = this._oController.getView().getModel('oFooterCampaign'),
                oRouter = this._oController.getOwnerComponent().getRouter(),
                oRouting = this._oController.getView().getModel('oFooterRouting');

            if (oCampaignModel.getProperty('/CampaignFirstBill')) {
                oRouter.navTo('campaignoffers', {bpNum: oRouting.oData.BpNumber, caNum: oRouting.oData.CaNumber, coNum: oRouting.oData.CoNumber, typeV: oCampaignModel.getProperty('/CampaignButtonType')});
            } else {
                ute.ui.main.Popup.Alert({
                    title: 'No First Bill',
                    message: 'Customer has to completed at least One Month Invoice'
                });
            }
        };

        AppFooter.prototype.onCampaignItemClick = function (oControlEvent) {
            var oRouter = this._oController.getOwnerComponent().getRouter(),
                oRouting = this._oController.getView().getModel('oFooterRouting'),
                item = oControlEvent.getSource().getDomRef().childNodes[0];

            if ($(item).hasClass('currentItem') && $(item).hasClass('hasValue')) {
                oRouter.navTo('campaign', {bpNum: oRouting.oData.BpNumber, caNum: oRouting.oData.CaNumber, coNum: oRouting.oData.CoNumber, typeV: 'C'});
            }

            if ($(item).hasClass('pendingItem') && $(item).hasClass('hasValue')) {
                oRouter.navTo('campaign', {bpNum: oRouting.oData.BpNumber, caNum: oRouting.oData.CaNumber, coNum: oRouting.oData.CoNumber, typeV: 'PE'});
            }

            if ($(item).hasClass('historyItem') && $(item).hasClass('hasValue')) {
                oRouter.navTo('campaignhistory', {bpNum: oRouting.oData.BpNumber, caNum: oRouting.oData.CaNumber, coNum: oRouting.oData.CoNumber});
            }

        };

































        AppFooter.prototype.reset = function () {
            var oView = this._oController.getView();
            oView.byId('appFtr').removeStyleClass('uteAppFtr-open');
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
                this._oApp._initFooterContent();
            }

            return this._oSubmenu;
        };

        return AppFooter;
    }
);
