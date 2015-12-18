/*globals sap*/
/*globals ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'nrg/module/nnp/view/NNPPopup'
    ],

    function (CoreController, Filter, FilterOperator, NNPPopup) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.app.view.Footer');

        /*---------------------------------------------- Controller Life Cycle ----------------------------------------------*/

        Controller.prototype.onInit = function () {

        };

        Controller.prototype.onBeforeRendering = function () {
            // Initialize models
            this.getView().setModel(this.getView().getModel('main-app'), 'oMainODataSvc');
            this.getView().setModel(this.getView().getModel('noti-app'), 'oNotiODataSvc');
            this.getView().setModel(this.getView().getModel('rhs-app'), 'oRHSODataSvc');
            this.getView().setModel(this.getView().getModel('comp-app'), 'oCompODataSvc');
            this.getView().setModel(this.getView().getModel('elig-app'), 'oDataEligSvc');

            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oFooterNotification');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oFooterRHS');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oFooterCampaign');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oFooterRouting');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oFooterBpInfo');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oBpInfo');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oEligibility');

            // Get the routing info
            var oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo();
            this._bpNum = oRouteInfo.parameters.bpNum;
            this._caNum = oRouteInfo.parameters.caNum;
            this._coNum = oRouteInfo.parameters.coNum;

            // Subscribe to the update events
            sap.ui.getCore().getEventBus().subscribe("nrg.module.appFooter", "eUpdateFooter", this.updateFooter, this);
            sap.ui.getCore().getEventBus().subscribe("nrg.module.appFooter", "eUpdateNotification", this.updateFooterNotification, this);
            sap.ui.getCore().getEventBus().subscribe("nrg.module.appFooter", "eUpdateRhs", this.updateFooterRhs, this);
            sap.ui.getCore().getEventBus().subscribe("nrg.module.appFooter", "eUpdateCampaign", this.updateFooterCampaign, this);
        };

        Controller.prototype.onAfterRendering = function () {
            // Handle footer caret click event
            this.getView().byId('nrgAppMain-footerCaret').detachBrowserEvent('click', this.footerCaretClick, this);
            this.getView().byId('nrgAppMain-footerCaret').attachBrowserEvent('click', this.footerCaretClick, this);
            
            // Initialize footer UI blocks
            this.initUiBlocks();
        };

        /*-------------------------------------------------- Data Retrieve --------------------------------------------------*/

        Controller.prototype._updateRouting = function (sBpNumber, sCaNumber, sCoNumber) {
            var oRouting = this.getView().getModel('oFooterRouting');
            oRouting.setProperty('/BpNumber', sBpNumber);
            oRouting.setProperty('/CaNumber', sCaNumber);
            oRouting.setProperty('/CoNumber', sCoNumber);
        };

        Controller.prototype._retrieveBpInfo = function (sBpNum, fnCallback) {
            var oModel = this.getView().getModel('oMainODataSvc'),
                oBpInfoModel = this.getView().getModel('oBpInfo'),
                sPath = '/Partners' + '(\'' + sBpNum + '\')',
                oParameters;

            oParameters = {
                success : function (oData) {
                    oBpInfoModel.setData(oData);
                    if (fnCallback) { fnCallback(); }
                }.bind(this),
                error: function (oError) {
                    // Handle error
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        /*--------------------------------------------------- UI Handling ---------------------------------------------------*/

        Controller.prototype.footerCaretClick = function () {
            if (this.getView().byId('nrgAppMain-footerWrap').hasStyleClass('open')) {
                // Hide footer
                this.getView().byId('nrgAppMain-footerWrap').removeStyleClass('open');
                $('.uteAppBodyCnt-footer').css('border-bottom', '6px solid #FFF');
            } else {
                // Show footer
                this.getView().byId('nrgAppMain-footerWrap').addStyleClass('open');
                $('.uteAppBodyCnt-footer').css('border-bottom', 'none');
            }
        };

        Controller.prototype.initUiBlocks = function () {
            this.footerElement = {};

            // Notification
            this.footerElement.notiEmptySec = this.getView().byId('nrgAppFtrDetails-notification-emptySection');
            this.footerElement.notiAlertSec = this.getView().byId('nrgAppFtrDetails-notification-alertSection');
            this.footerElement.notiEmptySec.setVisible(true);
            this.footerElement.notiAlertSec.setVisible(false);

            // RHS
            this.footerElement.rhsEmptySec = this.getView().byId('nrgAppFtrDetails-rhs-emptySection');
            this.footerElement.rhsProdSec = this.getView().byId('nrgAppFtrDetails-rhs-productSection');
            this.footerElement.rhsEmptySec.setVisible(true);
            this.footerElement.rhsProdSec.setVisible(false);

            // Campaign
            this.footerElement.campEmptySec = this.getView().byId('nrgAppFtrDetails-eligibleOffers-emptySection');
            this.footerElement.campOfferSec = this.getView().byId('nrgAppFtrDetails-eligibleOffers');
            this.footerElement.campBtnSec = this.getView().byId('nrgAppFtrDetails-campaignButton');
            this.footerElement.campEmptySec.setVisible(true);
            this.footerElement.campOfferSec.setVisible(false);
            this.footerElement.campBtnSec.setVisible(false);
        };

        /*-------------------------------------------------- Update Footer --------------------------------------------------*/

        Controller.prototype.updateFooter = function (channel, event, data) {
            this.updateFooterNotification(channel, event, data);
            this.updateFooterRhs(channel, event, data);
            this.updateFooterCampaign(channel, event, data);

            // data.bpNum data.caNum data.coNum
        };

        Controller.prototype.updateFooterNotification = function (channel, event, data) {
            var oModel = this.getView().getModel('oNotiODataSvc'),
                oNotificationModel = this.getView().getModel('oFooterNotification'),
                sPath = '/AlertsSet',
                aFilters = [],
                oParameters,
                i;
            
            // Update footer local routing
            this._updateRouting(data.bpNum, data.caNum, data.coNum);

            // Set up filters
            aFilters.push(new Filter({ path: 'BP', operator: FilterOperator.EQ, value1: data.bpNum}));
            aFilters.push(new Filter({ path: 'CA', operator: FilterOperator.EQ, value1: data.caNum}));
            aFilters.push(new Filter({ path: 'Identifier', operator: FilterOperator.EQ, value1: 'FOOTER'}));

            oParameters = {
                filters: aFilters,
                success : function (oData) {
                    if (oData.results.length) {
                        oNotificationModel.setData(oData.results);
                        this.footerElement.notiEmptySec.setVisible(false);
                        this.footerElement.notiAlertSec.setVisible(true);
                        this.notificationLinkPressActions = {};
                        for (i = 0; i < oData.results.length; i++) {
                            if (oData.results[i].FilterType === 'M2M') { this.notificationLinkPressActions[oData.results[i].MessageText] = this._onM2mLinkPress.bind(this); }
                            if (oData.results[i].FilterType === 'SMTP') { this.notificationLinkPressActions[oData.results[i].MessageText] = this._onSmtpLinkPress.bind(this); }
                            if (oData.results[i].FilterType === 'MAIL') { this.notificationLinkPressActions[oData.results[i].MessageText] = this._onMailLinkPress.bind(this); }
                            if (oData.results[i].FilterType === 'SMS') { this.notificationLinkPressActions[oData.results[i].MessageText] = this._onSmsLinkPress.bind(this); }
                            if (oData.results[i].FilterType === 'OAM') { this.notificationLinkPressActions[oData.results[i].MessageText] = this._onOamLinkPress.bind(this); }
                        }
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

        Controller.prototype.updateFooterRhs = function (channel, event, data) {
            console.log('222');
        };

        Controller.prototype.updateFooterCampaign = function (channel, event, data) {
            console.log('333');
        };

        /*---------------------------------------------- Footer Alert Methods -----------------------------------------------*/

        Controller.prototype.onNotiLinkPress = function (oControlEvent, a, b, c) {
            this.notificationLinkPressActions[oControlEvent.getSource().getProperty('text')]();
        };

        Controller.prototype._onM2mLinkPress = function (oControlEvent) {
            if (!this.m2mPopup) {
                this.m2mPopup = ute.ui.main.Popup.create({
                    content: sap.ui.xmlfragment(this.getView().sId, "nrg.module.app.view.AlertM2mPopup", this),
                    title: 'Multi-Month Invoice'
                });
                this.m2mPopup.addStyleClass('nrgApp-m2mPopup');
                this.getView().addDependent(this.m2mPopup);
            }
            // Open the popup
            this.m2mPopup.open();
        };

        Controller.prototype._onSmtpLinkPress = function (oControlEvent) {
            var NNPPopupControl = new NNPPopup(),
                oRouting = this.getView().getModel('oFooterRouting'),
                bpNum = oRouting.oData.BpNumber,
                caNum = oRouting.oData.CaNumber,
                coNum = oRouting.oData.CoNumber,
                oBpInfoModel = this.getView().getModel('oBpInfo'),
                bRetrBpComplete = false,
                checkBpInfoRetrComplete;

            // Retrieve BP info
            this._retrieveBpInfo(bpNum, function () { bRetrBpComplete = true; });
            // Check the completion of BP info retrieval
            checkBpInfoRetrComplete = setInterval(function () {
                if (bRetrBpComplete) {
                    NNPPopupControl.attachEvent("NNPCompleted", function () {
                        // Update Footer
                        this.updateFooter({}, {}, {'bpNum': bpNum, 'caNum': caNum, 'coNum': coNum});
                        // Dismiss the loading spinner
                        this.getOwnerComponent().getCcuxApp().setOccupied(false);
                    }, this);
                    // Open the NNP popup
                    this.getView().addDependent(NNPPopupControl);
                    NNPPopupControl.openNNP(bpNum, oBpInfoModel.oData.Email, oBpInfoModel.oData.EmailConsum);
                    // Clear the interval check
                    clearInterval(checkBpInfoRetrComplete);
                }
            }.bind(this), 100);
        };

        Controller.prototype._onMailLinkPress = function (oControlEvent) {
            if (!this.invalidMailingAddrPopup) {
                this.invalidMailingAddrPopup = ute.ui.main.Popup.create({
                    content: sap.ui.xmlfragment(this.getView().sId, "nrg.module.app.view.AlertInvMailAddrPopup", this),
                    title: 'Invalid Mailing Address'
                });
                this.invalidMailingAddrPopup.addStyleClass('nrgApp-invalidMailingAddrPopup');
                this.getView().addDependent(this.invalidMailingAddrPopup);
            }
            // Open the popup
            this.invalidMailingAddrPopup.open();
        };

        Controller.prototype._onSmsLinkPress = function (oControlEvent) {
            if (!this.invalidSmsPopup) {
                this.invalidSmsPopup = ute.ui.main.Popup.create({
                    content: sap.ui.xmlfragment(this.getView().sId, "nrg.module.app.view.AlertInvSmsPopup", this),
                    title: 'Invalid SMS Number'
                });
                this.invalidSmsPopup.addStyleClass('nrgApp-invalidSmsPopup');
                this.getView().addDependent(this.invalidSmsPopup);
            }
            // Open the popup
            this.invalidSmsPopup.open();
        };

        Controller.prototype._onOamLinkPress = function (oControlEvent) {
            var oNotificationModel = this.getView().getModel('oFooterNotification'),
                i;

            for (i = 0; i < oNotificationModel.oData.length; i = i + 1) {
                if (oNotificationModel.oData[i].FilterType === 'OAM') {
                    oNotificationModel.setProperty('/ErrorMessage', oNotificationModel.oData[i].MessageText);
                }
            }

            if (!this.oamPopup) {
                this.oamPopup = ute.ui.main.Popup.create({
                    content: sap.ui.xmlfragment(this.getView().sId, "nrg.module.app.view.AlertOamPopup", this),
                    title: 'Invalid OAM Email'
                });
                this.oamPopup.addStyleClass('nrgApp-oamPopup');
                this.getView().addDependent(this.oamPopup);
            }
            // Open the popup
            this.oamPopup.open();
        };

        Controller.prototype._onInvMailAddrCloseClick = function (oEvent) {
            this.invalidMailingAddrPopup.close();
        };

        Controller.prototype._onInvSmsCloseClick = function (oEvent) {
            this.invalidSmsPopup.close();
        };

        Controller.prototype._onM2mCloseClick = function (oEvent) {
            this.m2mPopup.close();
        };

        Controller.prototype._onOamCloseClick = function (oEvent) {
            this.oamPopup.close();
        };










        return Controller;
    }
);