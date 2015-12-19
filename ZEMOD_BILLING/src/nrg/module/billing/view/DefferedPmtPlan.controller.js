/*globals sap, ute*/
/*jslint nomen:true*/
sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'jquery.sap.global',
        'nrg/base/type/Price',
        'sap/ui/core/routing/HashChanger',
        "sap/ui/model/json/JSONModel",
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator'
    ],

    function (CoreController, jQuery, price, HashChanger, JSONModel, Filter, FilterOperator) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.billing.view.DefferedPmtPlan');

        Controller.prototype.onInit = function () {
        };


        Controller.prototype.onBeforeRendering = function () {
            var oRouteInfo = this.getOwnerComponent().getCcuxContextManager().getContext().oData;
            this._bpNum = oRouteInfo.bpNum;
            this._caNum = oRouteInfo.caNum;
            this._coNum = oRouteInfo.coNum;
            this._isExt = oRouteInfo.isExt;

            this.getView().setModel(this.getOwnerComponent().getModel('comp-dppext'), 'oDataSvc');

            //Model for screen control
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDppScrnControl');

            //Model for DPP eligibility/reason
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDppEligible');

            //Model for DPP denied reasons
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDppDeniedReason');

            //Model for SetUp (DPP Step I)
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDppReasons');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDppSetUps');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDppStepOnePost');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oDppStepOneSelectedData');

            //Model for Ext Function (EXT Step I)
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oExtEligible');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oExtExtensions');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oExtExtReasons');
            this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oExtPostRequest');


            this._initScrnControl();
            this._startScrnControl();
        };

        Controller.prototype.onAfterRendering = function () {
            this.getView().byId('nrgBilling-dpp-ExtNewDate-id').attachBrowserEvent('select', this._handleExtDateChange, this);
        };



        /****************************************************************************************************************/
        //Init Functions
        /****************************************************************************************************************/
        Controller.prototype._initScrnControl = function () {
            var oScrnControl = this.getView().getModel('oDppScrnControl');

            oScrnControl.setProperty('/StepOne', false);
            oScrnControl.setProperty('/StepTwo', false);
            oScrnControl.setProperty('/StepThree', false);
            oScrnControl.setProperty('/DPPDenied', false);
            oScrnControl.setProperty('/EXTGrant', false);
            oScrnControl.setProperty('/EXTDenied', false);
        };

        Controller.prototype._startScrnControl = function () {
            var oScrnControl = this.getView().getModel('oDppScrnControl'),
                oHashChanger = new HashChanger(),
				sUrlHash = oHashChanger.getHash(),
                aSplitHash = sUrlHash.split('/');

            if (aSplitHash[1] === 'defferedpaymentplan') {
                this._isDppElgble();
            } else if (aSplitHash[1] === 'defferedpaymentext') {
                this._isExtElgble();
            }

            //oScrnControl.setProperty('/StepOne', true);
        };

        Controller.prototype._selectScrn = function (sSelectedScrn) {
            var oScrnControl = this.getView().getModel('oDppScrnControl');

            oScrnControl.setProperty('/StepOne', false);
            oScrnControl.setProperty('/StepTwo', false);
            oScrnControl.setProperty('/StepThree', false);
            oScrnControl.setProperty('/DPPDenied', false);
            oScrnControl.setProperty('/EXTGrant', false);
            oScrnControl.setProperty('/EXTDenied', false);
            oScrnControl.setProperty('/' + sSelectedScrn, true);

            if (sSelectedScrn === 'StepOne') {
                this._retrDppSetUp();
                this._retrDppReason();
            } else if (sSelectedScrn === 'StepTwo') {

            } else if (sSelectedScrn === 'StepThree') {

            } else if (sSelectedScrn === 'DPPDenied') {
                this._retrDppDeniedReason();
            } else if (sSelectedScrn === 'EXTGrant') {
                this._retrExtReasons();
                this._retrExtensions();
            } else if (sSelectedScrn === 'EXTDenied') {
                this._retrExtensions();
            } else {
                return;
            }
        };

        /****************************************************************************************************************/
        //Formatter
        /****************************************************************************************************************/
        Controller.prototype._postiveXFormatter = function (cIndicator) {
            if (cIndicator === 'X' || cIndicator === 'x') {
                return true;
            } else {
                return false;
            }
        };

        Controller.prototype._reverseBooleanFormatter = function (bIndicator) {
            return !bIndicator;
        };

        Controller.prototype._formatShowChangeExt = function (sDwnPay, bExtActive) {
            if (sDwnPay === 'X' || sDwnPay === 'x') {
                if (bExtActive) { return true; } else { return false; }
            } else {
                return false;
            }
        };

        Controller.prototype._formatShowChangDwnPmt = function (sDwnPay, bExtActive) {
            if (sDwnPay === 'X' || sDwnPay === 'x') {
                if (!bExtActive) { return true; } else { return false; }
            } else {
                return false;
            }
        };

        Controller.prototype._isOdd = function (iIndex) {
            if (iIndex % 2 === 0) {
                return false;
            } else {
                return true;
            }
        };

        Controller.prototype._isEven = function (iIndex) {
            if (iIndex % 2 === 0) {
                return true;
            } else {
                return false;
            }
        };

        Controller.prototype._formatDate = function (oDate) {
            var sFormattedDate;

            if (!oDate) {
                return null;
            } else {
                sFormattedDate = (oDate.getMonth() + 1).toString() + '/' + oDate.getDate().toString() + '/' + oDate.getFullYear().toString().substring(2, 4);
                return sFormattedDate;
            }
        };

        Controller.prototype._formatInvoiceDate = function (day, month, year) {
            // Pad the date and month
            if (day < 10) {day = '0' + day; }
            if (month < 10) {month = '0' + month; }
            // Format the startDate
            return month + '/' + day + '/' + year;
        };

        Controller.prototype._createSearchFilterObject = function (aFilterIds, aFilterValues, sFilterOperator) {
            var aFilters = [],
                iCount;
            if (!sFilterOperator) {
                sFilterOperator = FilterOperator.EQ;
            }
            if (aFilterIds !== undefined) {
                for (iCount = 0; iCount < aFilterIds.length; iCount = iCount + 1) {
                    aFilters.push(new Filter(aFilterIds[iCount], FilterOperator.EQ, aFilterValues[iCount], ""));
                }
            }
            return aFilters;
        };

        /****************************************************************************************************************/
        //Handler
        /****************************************************************************************************************/
        Controller.prototype._onDppDeniedOkClick = function () {    //Navigate to DPP setup if 'OK' is clicked
            var oRouter = this.getOwnerComponent().getRouter();

            if (this._coNum) {
                oRouter.navTo('dashboard.VerificationWithCaCo', {bpNum: this._bpNum, caNum: this._caNum, coNum: this._coNum});
            } else {
                oRouter.navTo('dashboard.VerificationWithCa', {bpNum: this._bpNum, caNum: this._caNum});
            }
        };

        Controller.prototype._onDppOverrideClick = function () {
            this._selectScrn('StepOne');
        };

        Controller.prototype._onExtOverrideClick = function () {
            this._selectScrn('EXTGrant');
            this._bOverRide = true;
        };

        Controller.prototype._onDppExtChangeClick = function () {
            //Show Ext Edit Screen
            var oExtElgble = this.getView().getModel('oExtEligible');

            oExtElgble.setProperty('/ExtActive', false);
        };

        Controller.prototype._onDppExtConfirmClick = function () {
            //Send the Extension request out.
            this._postExtRequest();
        };

        Controller.prototype._onReasonSelect = function () {
            //this.getView().getModel('oDppReasons').setData(oData);
        };

        Controller.prototype._onExtReasonSelect = function (oEvent) {
            this._extReason = oEvent.mParameters.Reason;
        };

        Controller.prototype._onSelectAllCheck = function (oEvent) {
            var oSetUps = this.getView().getModel('oDppSetUps'),
                i;

            if (oEvent.mParameters.checked) {
                for (i = 0; i < oSetUps.getData().results.length; i = i + 1) {
                    oSetUps.setProperty('/results/' + i + '/OpenItems/bSelected', true);
                }
            } else {
                for (i = 0; i < oSetUps.getData().results.length; i = i + 1) {
                    oSetUps.setProperty('/results/' + i + '/OpenItems/bSelected', false);
                }
            }
        };

        Controller.prototype._onOneItemCheck = function (oEvent) {
            if (!oEvent.mParameters.checked) {
                this.getView().getModel('oDppSetUps').setProperty('/results/bSelectedAll', false);
            }
        };

        Controller.prototype._onDppSetUpOk = function () {
            var oSetUps = this.getView().getModel('oDppSetUps'),
                i,
                oSetUpsPost = this.getView().getModel('oDppStepOnePost'),
                aSelectedInd = [];

            oSetUpsPost.setProperty('/InstlmntNo', oSetUps.getProperty('/results/0/InstlmntNo'));
            for (i = 0; i < oSetUps.getData().results.length; i = i + 1) {
                if (oSetUps.getProperty('/results/' + i + '/OpenItems/bSelected')) {
                    aSelectedInd.push({Ind: oSetUps.getProperty('/results/' + i + '/OpenItems/ItemNumber')});
                }
            }
            oSetUpsPost.setProperty('/SelectedIndices', aSelectedInd);
            this.getView().getModel('oDppStepOneSelectedData').setProperty('/SelectedData', oSetUpsPost.getProperty('/SelectedIndices'));

            this._retrDPPConf();    //Initiating step 2
        };

        Controller.prototype._handleExtDateChange = function (oEvent) {
            var extDate = new Date(this.getView().byId('nrgBilling-dpp-ExtNewDate-id').getValue()),
                oExtensions = this.getView().getModel('oExtExtensions'),
                i;

            for (i = 0; i < oExtensions.oData.results.length; i = i + 1) {
                oExtensions.setProperty('/results/' + i + '/OpenItems/DefferalDate', extDate);
            }
            //this.getView().byId('nrgBilling-dpp-ExtNewDate-id')
        };

        /****************************************************************************************************************/
        //OData Call
        /****************************************************************************************************************/
        Controller.prototype._isDppElgble = function () {
            var oODataSvc = this.getView().getModel('oDataSvc'),
                oParameters,
                sPath;

            sPath = '/DPPElgbles(ContractAccountNumber=\'' + this._caNum + '\',DPPReason=\'\')';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oDppEligible').setData(oData);

                        if (oData.EligibleYes) {
                            this._selectScrn('StepOne');
                        } else {
                            this._selectScrn('DPPDenied');
                        }
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oODataSvc) {
                oODataSvc.read(sPath, oParameters);
            }
        };

        Controller.prototype._isExtElgble = function () {
            var oODataSvc = this.getView().getModel('oDataSvc'),
                oParameters,
                sPath,
                aFilters,
                aFilterValues,
                aFilterIds;

            aFilterIds = ["ContractAccountNumber"];
            aFilterValues = [this._caNum];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);
            sPath = '/ExtElgbles';  //(ContractAccountNumber=\'' + this._caNum + '\',ExtActive=false)';

            oParameters = {
                filters : aFilters,
                success : function (oData) {
                    if (oData.results[0]) {
                        this.getView().getModel('oExtEligible').setData(oData.results[0]);

                        if (this.getView().getModel('oExtEligible').getProperty('/EligibleYes')) {
                            this._selectScrn('EXTGrant');
                        } else {
                            this._selectScrn('EXTDenied');
                        }
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oODataSvc) {
                oODataSvc.read(sPath, oParameters);
            }
        };

        Controller.prototype._retrDppDeniedReason = function () {
            var oODataSvc = this.getView().getModel('oDataSvc'),
                oParameters,
                sPath,
                i;

            sPath = '/DPPElgbles(ContractAccountNumber=\'' + this._caNum + '\',DPPReason=\'\')/DPPDenieds';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        for (i = 0; i < oData.results.length; i = i + 1) {
                            oData.results[i].DPPDenyed.iIndex = i + 1;
                        }
                        this.getView().getModel('oDppDeniedReason').setData(oData);
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oODataSvc) {
                oODataSvc.read(sPath, oParameters);
            }
        };

        Controller.prototype._retrDppReason = function () {
            var oODataSvc = this.getView().getModel('oDataSvc'),
                oParameters,
                sPath;

            sPath = '/DPPReasons';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oDppReasons').setData(oData.results);
                        this.getView().getModel('oDppReasons').setProperty('/selectedKey', '3400');
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oODataSvc) {
                oODataSvc.read(sPath, oParameters);
            }
        };

        Controller.prototype._retrDppSetUp = function () {
            var oODataSvc = this.getView().getModel('oDataSvc'),
                oParameters,
                sPath,
                i;

            //Model created for later posting
            this.getView().getModel('oDppStepOnePost').setData({});


            sPath = '/DPPElgbles(ContractAccountNumber=\'' + this._caNum + '\',DPPReason=\'\')/DPPSetUps';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        for (i = 0; i < oData.results.length; i = i + 1) {
                            //oData.results[i].iIndex = i + 1;
                            oData.results[i].bSelected = false;
                        }
                        this.getView().getModel('oDppSetUps').setData(oData);
                        this.getView().getModel('oDppSetUps').setProperty('/results/bSelectedAll', false);
                        this.getView().getModel('oDppStepOnePost').setProperty('/InstlmntNo', this.getView().getModel('oDppSetUps').getProperty('/results/0/InstlmntNo'));
                        this.getView().getModel('oDppStepOnePost').setProperty('/ZeroDwPay', false);
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oODataSvc) {
                oODataSvc.read(sPath, oParameters);
            }
        };

        Controller.prototype._retrDppConf = function () {

        };

        Controller.prototype._retrExtReasons = function () {
            var oODataSvc = this.getView().getModel('oDataSvc'),
                oParameters,
                sPath,
                i;

            sPath = '/ExtReasons';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oExtExtReasons').setData(oData);
                        this.getView().getModel('oExtExtReasons').setProperty('/selectedKey', '2800');
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oODataSvc) {
                oODataSvc.read(sPath, oParameters);
            }
        };

        Controller.prototype._retrExtensions = function () {
            var oODataSvc = this.getView().getModel('oDataSvc'),
                oParameters,
                sPath,
                i,
                extDate,
                aFilters,
                aFilterValues,
                aFilterIds;

            aFilterIds = ["ContractAccountNumber"];
            aFilterValues = [this._caNum];
            aFilters = this._createSearchFilterObject(aFilterIds, aFilterValues);

            sPath = '/Extensions';//(ContractAccountNumber=\'' + this._caNum + '\',ExtActive=false)/ExtensionSet';

            oParameters = {
                filters: aFilters,
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oExtExtensions').setData(oData);
                        this.getView().getModel('oExtExtensions').setProperty('/results/0/iDwnPay', 0);
                        extDate = this._formatInvoiceDate(oData.results[0].OpenItems.DefferalDate.getDate(), oData.results[0].OpenItems.DefferalDate.getMonth() + 1, oData.results[0].OpenItems.DefferalDate.getFullYear());
                        this.getView().byId('nrgBilling-dpp-ExtNewDate-id').setDefaultDate(extDate);
                    }
                }.bind(this),
                error: function (oError) {
                    //Need to put error message
                }.bind(this)
            };

            if (oODataSvc) {
                oODataSvc.read(sPath, oParameters);
            }
        };

        Controller.prototype._postExtRequest = function () {
            var oODataSvc = this.getView().getModel('oDataSvc'),
                oPost = this.getView().getModel('oExtPostRequest'),
                oExt = this.getView().getModel('oExtExtensions'),
                oEligble = this.getView().getModel('oExtEligible'),
                oReason = this.getView().getModel('oExtExtReasons'),
                sDwnPayDate = this.getView().byId('nrgBilling-dpp-dwnPayDueDate-id').getValue(),
                sPath,
                oParameters;

            oPost.setProperty('/ContractAccountNumber', this._caNum);
            oPost.setProperty('/PartnerID', oExt.getProperty('/results/0/PartnerID'));
            oPost.setProperty('/DefDtNew', oExt.getProperty('/results/0/OpenItems/DefferalDate'));
            oPost.setProperty('/DefDtOld', null);
            oPost.setProperty('/Message', '');
            oPost.setProperty('/Error', '');
            oPost.setProperty('/SelectedData', '');
            if (this._bOverRide) {
                oPost.setProperty('/OverRide', 'X');
            } else {
                oPost.setProperty('/OverRide', '');
            }
            oPost.setProperty('/DwnPay', oExt.getProperty('/results/0/iDwnPay'));
            if (sDwnPayDate) {
                oPost.setProperty('/DwnPayDate', new Date(sDwnPayDate));
            } else {
                oPost.setProperty('/DwnPayDate', null);
            }
            oPost.setProperty('/ExtReason', oReason.getProperty());
            oPost.setProperty('/ExtReason', this._extReason);
            oPost.setProperty('/ExtActive', false);
            oPost.setProperty('/ChgOpt', false);

            sPath = '/ExtConfs';

            oParameters = {
                merge: false,
                success : function (oData) {
                    ute.ui.main.Popup.Alert({
                        title: 'Extension',
                        message: 'Extension request success'
                    });
                    this._selectScrn('EXTGrant');
                }.bind(this),
                error: function (oError) {
                    ute.ui.main.Popup.Alert({
                        title: 'Extension',
                        message: 'Extension request failed'
                    });
                }.bind(this)
            };

            if (oODataSvc) {
                oODataSvc.create(sPath, oPost.oData, oParameters);
            }

        };

        return Controller;
    }
);
