/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'nrg/base/view/BaseController',
        'nrg/base/type/Price'
    ],

    function (jQuery, Controller, Type_Price) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.billing.view.PrePayCheckbook');

        CustomController.prototype.onInit = function () {
            this.getOwnerComponent().getCcuxApp().setTitle('BILLING');
        };

        CustomController.prototype.onBeforeRendering = function () {
            this.getView().setModel(this.getOwnerComponent().getModel('comp-billing'), 'oDataSvc');

            //Model to keep checkbook header
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oPpChkbkHdr');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oPpPmtHdr');

            this._initRoutingInfo();
            this._initPpChkbookHdr();
            this._initPpPmtHdr();
        };

        /**********************************************************************************************************************************************************/
        //Formatters
        /**********************************************************************************************************************************************************/
        CustomController.prototype._formatDate = function (oDate) {
            var sFormattedDate;

            if (!oDate) {
                return null;
            } else {
                sFormattedDate = (oDate.getMonth() + 1).toString() + '/' + oDate.getDate().toString() + '/' + oDate.getFullYear().toString().substring(2, 4);
                return sFormattedDate;
            }
        };

        CustomController.prototype._formatBoolCredit = function (sAccBal) {
            if (parseInt(sAccBal, 10) >= 0) {
                return true;
            } else {
                return false;
            }
        };

        CustomController.prototype._formatBoolDebit = function (sAccBal) {
            if (parseInt(sAccBal, 10) < 0) {
                return true;
            } else {
                return false;
            }
        };


        /**********************************************************************************************************************************************************/
        //Handlers
        /**********************************************************************************************************************************************************/




        /**********************************************************************************************************************************************************/
        //Init functions
        /**********************************************************************************************************************************************************/
        CustomController.prototype._initRoutingInfo = function () {
            var oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo();

            this._bpNum = oRouteInfo.parameters.bpNum;
            this._caNum = oRouteInfo.parameters.caNum;
            this._coNum = oRouteInfo.parameters.coNum;
        };

        CustomController.prototype._initPpChkbookHdr = function () {
            var sPath;

            sPath = '/PrePayHeaders(ContractAccountNumber=\'' + this._caNum + '\',InvNumber=\'\')';
            this._retrPpChkbookHdr(sPath);
        };

        CustomController.prototype._initPpPmtHdr = function () {
            var sPath;

            //sPath = '/ConfBuags(\'' + this._caNum + '\')/PrePayPmtHdrs';
            sPath = '/PrePayPmtHdrs(ContractAccountNumber=\'' + this._caNum + '\',ActKey=\'000001\')';


            this._retrPpPmtHdr(sPath);
        };


        /**********************************************************************************************************************************************************/
        //OData Communication Functions
        /**********************************************************************************************************************************************************/
        CustomController.prototype._retrPpChkbookHdr = function (sPath) {
            var oChbkOData = this.getView().getModel('oDataSvc'),
                oParameters;

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oPpChkbkHdr').setData(oData);
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

        CustomController.prototype._retrPpPmtHdr = function (sPath) {
            var oChbkOData = this.getView().getModel('oDataSvc'),
                oParameters;

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oPpPmtHdr').setData(oData);
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


        return CustomController;
    }
);
