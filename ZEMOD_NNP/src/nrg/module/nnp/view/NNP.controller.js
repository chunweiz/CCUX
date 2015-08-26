/*globals sap, ute*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
        'jquery.sap.global',
        "sap/ui/model/json/JSONModel"
    ],

    function (CoreController, Filter, FilterOperator, jQuery, JSONModel) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.nnp.view.NNP');


        /* =========================================================== */
		/* lifecycle method- Init                                     */
		/* =========================================================== */
        Controller.prototype.onInit = function () {
        };
        /* =========================================================== */
		/* lifecycle method- Before Rendering                          */
		/* =========================================================== */
        Controller.prototype.onBeforeRendering = function () {
            var sPath = "/EmailNNPs(PartnerID='2473499',Email='nrg@nrg.com',EmailConsum='019')",
                oParameters,
                oModel = this.getView().getModel('comp-dashboard'),
                oEditEmailNNP = new sap.ui.model.json.JSONModel();
            //Start loading NNP logics and settings
            this.getView().setModel(oEditEmailNNP, 'oEditEmailNNP');
            oParameters = {

                success : function (oData) {
                    if (oData) {
                        this._beforeOpenEditAddrDialogue = true;
                        oEditEmailNNP.setData(oData);
                    }
                }.bind(this),
                error: function (oError) {
                    this._oEmailEditPopup.close();
                    ute.ui.main.Popup.Alert({
                        title: 'Email edit',
                        message: 'NNP Entity Service Error'
                    });
                }.bind(this)
            };

   /*         if (oModel) {
                oModel.read(sPath, oParameters);
            }*/
        };
        Controller.prototype._formatEmailMkt = function (sIndicator) {
            if (sIndicator === 'y' || sIndicator === 'Y') {
                return true;
            } else {
                return false;
            }
        };

        Controller.prototype._formatPositiveX = function (sIndicator) {
            if (sIndicator === 'x' || sIndicator === 'X') {
                return true;
            } else {
                return false;
            }
        };

        Controller.prototype._formatNegativeX = function (sIndicator) {
            if (sIndicator === 'x' || sIndicator === 'X') {
                return false;
            } else {
                return true;
            }
        };
        Controller.prototype._handleEmailEdit = function (oEvent) {
            var oModel = this.getView().getModel('oODataSvc'),
                oParameters,
                sBpNum = this.getView().getModel('oDtaVrfyBP').getProperty('/PartnerID'),
                sBpEmail = this.getView().getModel('oDtaVrfyBP').getProperty('/Email'),
                sBpEmailConsum = this.getView().getModel('oDtaVrfyBP').getProperty('/EmailConsum'),
                sPath,
                oEmailBox,
                oDelEmailBox;

            //Preapre Popup for Email Edit to show
            if (!this._oPopupContent) {
                this._oPopupContent = sap.ui.xmlfragment("EmailEditPopup", "nrg.module.dashboard.view.CustomerVerificationPopup", this);
            }
            oEmailBox = sap.ui.core.Fragment.byId("EmailEditPopup", "idnrgDB-EmailBox");
            oDelEmailBox = sap.ui.core.Fragment.byId("EmailEditPopup", "idnrgDB-DelEmailBox");
            oEmailBox.setVisible(true);
            oDelEmailBox.setVisible(false);
            this._oEmailEditPopup = ute.ui.main.Popup.create({
                //close: this._handleEditMailPopupClose,
                content: this._oPopupContent,
                title: 'Email Address and Preferences'
            });
            this._oEmailEditPopup.setShowCloseButton(false);
            this.getView().addDependent(this._oEmailEditPopup);
            this._oEmailEditPopup.open();
            this.getOwnerComponent().getCcuxApp().setOccupied(true);

            //Start loading NNP logics and settings
            sPath = '/EmailNNPs' + '(' + 'PartnerID=\'' + sBpNum + '\'' + ',Email=\'' + sBpEmail + '\'' + ',EmailConsum=\'' + sBpEmailConsum + '\')';
            oParameters = {
                /*urlParameters: {"$expand": "Buags"},*/
                success : function (oData) {
                    if (oData) {
                        this._beforeOpenEditAddrDialogue = true;
                        this.getView().getModel('oEditEmailNNP').setData(oData);
                        this.getOwnerComponent().getCcuxApp().setOccupied(false);
                    }
                }.bind(this),
                error: function (oError) {
                    this.getOwnerComponent().getCcuxApp().setOccupied(false);
                    this._oEmailEditPopup.close();
                    ute.ui.main.Popup.Alert({
                        title: 'Email edit',
                        message: 'NNP Entity Service Error'
                    });
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
        };

        Controller.prototype._onValidateEmailAddress = function (oEvent) {
            var oEmailValidate = this.getView().getModel('oEditEmailValidate'),
                oModel = this.getView().getModel('oODataSvc'),
                oParameters,
                sPath,
                sEmailAddr,
                oEditEmailNNP = this.getView().getModel('oEditEmailNNP');
            this.getOwnerComponent().getCcuxApp().setOccupied(true);
            oEditEmailNNP.refresh(true);
            sEmailAddr = oEditEmailNNP.getProperty('/Email');

            sPath = '/EmailVerifys' + '(\'' + sEmailAddr + '\')';

            oParameters = {
                success : function (oData) {
                    if (oData) {
                        oEmailValidate.setData(oData);
                    }
                    this.getOwnerComponent().getCcuxApp().setOccupied(false);
                }.bind(this),
                error: function (oError) {
                    sap.ui.commons.MessageBox.alert("Email Validate Service Error");
                    ute.ui.main.Popup.Alert({
                        title: 'Email address validation',
                        message: 'Email Validate Service Error'
                    });
                    this.getOwnerComponent().getCcuxApp().setOccupied(false);
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }

        };

        Controller.prototype._onEditEmailSave = function (oEvent) {
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters,
                sBpNum = this.getView().getModel('oEditEmailNNP').getProperty('/PartnerID'),
                sBpEmail = this.getView().getModel('oEditEmailNNP').getProperty('/Email'),
                sBpEmailConsum = this.getView().getModel('oEditEmailNNP').getProperty('/EmailConsum'),
                oNNP = this.getView().getModel('oEditEmailNNP'),
                bEmailChanged = true;
            this.getOwnerComponent().getCcuxApp().setOccupied(true);
            if (sBpEmail === this.getView().getModel('oDtaVrfyBP').getProperty('/Email')) {
                bEmailChanged = false;
            } else {
                bEmailChanged = true;
            }


            if (sBpEmailConsum === '000') {   //If it is 'CREATE'
                sPath = '/EmailNNPs' + '(' + 'PartnerID=\'' + sBpNum + '\'' + ',Email=\'' + sBpEmail + '\'' + ',EmailConsum=\'\')';
                oNNP.setProperty('/EmailConsum', '');
            } else {    //If it is 'UPDATE'
                sPath = '/EmailNNPs' + '(' + 'PartnerID=\'' + sBpNum + '\'' + ',Email=\'' + sBpEmail + '\'' + ',EmailConsum=\'' + sBpEmailConsum + '\')';
            }


            oParameters = {
                merge: false,
                success : function (oData) {
                    if (bEmailChanged) {
                        ute.ui.main.Popup.Alert({
                            title: 'Email save ',
                            message: oNNP.getProperty('/LdapMessage')
                        });
                    } else {
                        ute.ui.main.Popup.Alert({
                            title: 'Email save',
                            message: 'Marketing Preference Updated Successfully'
                        });
                    }
                    this._oEmailEditPopup.close();
                    this._initDtaVrfRetr();
                    this.getOwnerComponent().getCcuxApp().setOccupied(false);
                }.bind(this),
                error: function (oError) {
                    ute.ui.main.Popup.Alert({
                        title: 'Email save',
                        message: 'Update Failed'
                    });
                    this.getOwnerComponent().getCcuxApp().setOccupied(false);
                }.bind(this)
            };

            if (oModel) {
                oModel.update(sPath, oNNP.oData, oParameters);
            }
        };

        Controller.prototype._onEditEmailDelete = function (oEvent) {
            var oModel = this.getView().getModel('oODataSvc'),
                sPath,
                oParameters,
                sBpNum = this.getView().getModel('oEditEmailNNP').getProperty('/PartnerID'),
                //sBpEmailConsum = this.getView().getModel('oDtaVrfyBP').getProperty('/EmailConsum');
                oNNP = this.getView().getModel('oEditEmailNNP');

            this.getOwnerComponent().getCcuxApp().setOccupied(true);
            //oNNP.setProperty('/Email', '');
            sPath = '/EmailNNPs' + '(' + 'PartnerID=\'' + sBpNum + '\'' + ',Email=\'\'' + ',EmailConsum=\'\')';


            oParameters = {
                success : function (oData) {
                    // The following msg need to pull from the backend instead of hardcoding.
/*                    sap.ui.commons.MessageBox.alert("CONFIRMATION NEEDED: I just want to make sure you're aware that deleting email address will remove you from any Internet-based services we offer, including Online Account Management, online bill payment and Paperless Billing, and that all your bills and accounts notices will be sent via regular mail. Are you sure you want to do this? ");*/
                    this._oEmailEditPopup.close();
                    this._initDtaVrfRetr();
                    this.getOwnerComponent().getCcuxApp().setOccupied(false);
                }.bind(this),
                error: function (oError) {
                    this.getOwnerComponent().getCcuxApp().setOccupied(false);
                    this._oEmailEditPopup.close();
                    ute.ui.main.Popup.Alert({
                        title: 'Email delete',
                        message: 'Update Failed'
                    });
                }.bind(this)
            };

            if ((oNNP.getProperty('/Ecd') === 'Y') || (oNNP.getProperty('/Mkt') === 'Y') || (oNNP.getProperty('/Offer') === 'Y') || (oNNP.getProperty('/Ee') === 'Y')) {
                this.getOwnerComponent().getCcuxApp().setOccupied(false);
                ute.ui.main.Popup.Alert({
                    title: 'Email delete',
                    message: 'Cannot delete email when preferences set to YES.'
                });
                return;
            } else {
                if (oModel) {
                    oModel.remove(sPath, oParameters);
                }
            }
        };
        Controller.prototype._formatEmailAddressText = function (sEmail) {
            if ((sEmail === '') || (sEmail === undefined)) {
                return 'CLICK to ADD';
            } else {
                return sEmail;
            }
        };
        /**
		 * Handler for first cancel of the email, show additional message and request for cancel or delete email.
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype._onShowDelEmailBox = function (oEventoEvent) {
            var oEmailBox = sap.ui.core.Fragment.byId("EmailEditPopup", "idnrgDB-EmailBox"),
                oDelEmailBox = sap.ui.core.Fragment.byId("EmailEditPopup", "idnrgDB-DelEmailBox"),
                oNNP = this.getView().getModel('oEditEmailNNP');
            if ((oNNP.getProperty('/Ecd') === 'Y') || (oNNP.getProperty('/Mkt') === 'Y') || (oNNP.getProperty('/Offer') === 'Y') || (oNNP.getProperty('/Ee') === 'Y')) {
                this.getOwnerComponent().getCcuxApp().setOccupied(false);
                ute.ui.main.Popup.Alert({
                    title: 'Email delete',
                    message: 'Cannot delete email when preferences set to YES.'
                });
                return;
            } else {
                oEmailBox.setVisible(false);
                oDelEmailBox.setVisible(true);
            }
        };
        /**
		 * Handler for Email Cancel, so refresh the data from backend for complete popup
		 *
		 * @function
         * @param {sap.ui.base.Event} oEvent pattern match event
		 */
        Controller.prototype._onEmailCancel = function (oEvent) {
            var oEmailBox = sap.ui.core.Fragment.byId("EmailEditPopup", "idnrgDB-EmailBox"),
                oDelEmailBox = sap.ui.core.Fragment.byId("EmailEditPopup", "idnrgDB-DelEmailBox"),
                sPath,
                oModel = this.getView().getModel('oODataSvc'),
                oParameters,
                sBpNum = this.getView().getModel('oDtaVrfyBP').getProperty('/PartnerID'),
                sBpEmail = this.getView().getModel('oDtaVrfyBP').getProperty('/Email'),
                sBpEmailConsum = this.getView().getModel('oDtaVrfyBP').getProperty('/EmailConsum');
            this.getOwnerComponent().getCcuxApp().setOccupied(true);
            //Start loading NNP logics and settings
            sPath = '/EmailNNPs' + '(' + 'PartnerID=\'' + sBpNum + '\'' + ',Email=\'' + sBpEmail + '\'' + ',EmailConsum=\'' + sBpEmailConsum + '\')';
            oParameters = {
                /*urlParameters: {"$expand": "Buags"},*/
                success : function (oData) {
                    if (oData) {
                        this.getView().getModel('oEditEmailNNP').setData(oData);
                        this.getOwnerComponent().getCcuxApp().setOccupied(false);
                    }
                }.bind(this),
                error: function (oError) {
                    ute.ui.main.Popup.Alert({
                        title: 'Email cancel',
                        message: 'NNP Entity Service Error'
                    });
                    this.getOwnerComponent().getCcuxApp().setOccupied(false);
                }.bind(this)
            };

            if (oModel) {
                oModel.read(sPath, oParameters);
            }
            oEmailBox.setVisible(true);
            oDelEmailBox.setVisible(false);
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
