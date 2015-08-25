// temporarily added by Jerry

/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'nrg/base/view/BaseController'
    ],

    function (jQuery, Controller) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.billing.view.BillingCheckbook');

        CustomController.prototype.onInit = function () {
            var o18n = this.getOwnerComponent().getModel('comp-i18n-billing');

            var oModel = new sap.ui.model.json.JSONModel({
                employees: [
                    { firstName: 'Roger', lastName: 'Cheng' },
                    { firstName: 'Yumi', lastName: 'Yao' },
                    { firstName: 'Yumi', lastName: 'Yao' },
                    { firstName: 'Yumi', lastName: 'Yao' },
                    { firstName: 'Yumi', lastName: 'Yao' },
                    { firstName: 'Taylor', lastName: 'Hsu' }
                ]
            });

            var oModelContent = new sap.ui.model.json.JSONModel({
                employers: [
                    { firstName: 'Kacy', lastName: 'Liao' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Joseph', lastName: 'Lin' }
                ]
            });

            var oModelToolTip = new sap.ui.model.json.JSONModel({
                employers: [
                    { firstName: 'Kacy', lastName: 'Liao' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Frank', lastName: 'Huang' },
                    { firstName: 'Joseph', lastName: 'Lin' }
                ]
            });

            this.getView().setModel(oModel, 'bp');
            this.getView().setModel(oModelContent, 'emp');
            this.getView().setModel(oModelToolTip, 'tip');
        };

        CustomController.prototype.onBeforeRendering = function () {
            this.getOwnerComponent().getCcuxApp().setTitle('BILLING');

            var o18n = this.getOwnerComponent().getModel('comp-i18n-billing');

            this.getView().setModel(this.getOwnerComponent().getModel('comp-billing'), 'oDataSvc');

            //Model to keep checkbook header
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oChkbkHdr');




            //Start of data retriving
            this._initRouitingInfo();
            this._initChkbookHdr();
        };

        CustomController.prototype._initRouitingInfo = function () {
            var oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo();

            this._bpNum = oRouteInfo.parameters.bpNum;
            this._caNum = oRouteInfo.parameters.caNum;
            this._coNum = oRouteInfo.parameters.coNum;
        };

        CustomController.prototype._initChkbookHdr = function () {
            var sPath;

            sPath = '/ChkBookHdrs' + '(PartnerID=\'' + this._bpNum + '\', ContractAccountID=' + this._caNum + '\')';

            this._retrChkbookHdr(sPath);
        };

        CustomController.prototype._retrChkbookHdr = function (sPath) {
            var oChbkOData = this.getView().getModel('oDataSvc'),
                oParameters;

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oChkbkHdr').setData(oData.results);
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oChbkOData) {
                oChbkOData.read(sPath, oParameters);
            }
        };

        CustomController.prototype.onAfterRendering = function () {

        };

        CustomController.prototype.onExit = function () {

        };

        return CustomController;
    }
);
