	/*globals sap*/
	/*globals ute*/
	/*jslint nomen:true*/

	sap.ui.define(
		[
			'nrg/base/view/BaseController',
			'sap/ui/core/routing/HashChanger',
			'sap/ui/model/json/JSONModel',
			'sap/ui/model/Filter',
			'sap/ui/model/FilterOperator'
		],

		function (CoreController, HashChanger, JSONModel, Filter, FilterOperator) {
			'use strict';

			var Controller = CoreController.extend('nrg.module.dashboard.view.CustomerDataSummary');

			Controller.prototype._formatBadge = function (cIndicator) {
				if (cIndicator === 'x' || cIndicator === 'X') {
					return true;
				} else {
					return false;
				}
			};

			Controller.prototype._formatSiebel = function (cIndicator) {
				if (cIndicator === 'x' || cIndicator === 'X') {
					return true;
				} else {
					return false;
				}
			};

			Controller.prototype.onInit = function(){

			};

			Controller.prototype.onBeforeRendering = function () {
				this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard'), 'oODataSvc');
				this.getView().setModel(this.getOwnerComponent().getModel('comp-dashboard-AcctAccessPty'),'oDataASvc');


				//Model to keep information to show
				this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oSmryBpInf');

				this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oSmryBuagInf');

				this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oSmryAllBuags');

				//Model to keep segmentation information
				this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oSmryBpSegInf');

				//Model to keep Segmentation Info if it's more than 3 segmentations
				this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oSmryBpAllSegInf');

				//Model to keep Assainged Accounts
				this.getView().setModel(new sap.ui.model.json.JSONModel(), 'oSmryAssignedAccounts');

				//Model to Keep Account Access Authorizations
				this.getView().setModel(new sap.ui.model.json.JSONModel(),'oSmryAccessAuth');

				// Retrieve routing parameters
				var oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo();

				this._bpNum = oRouteInfo.parameters.bpNum;
				this._caNum = oRouteInfo.parameters.caNum;
				this._coNum = oRouteInfo.parameters.coNum;

				this._initRetrBpInf();
				//this._initRetrBpSegInf();

				//retrieve the table data
				this._retrieveTableInfo(this._caNum);

			};

			Controller.prototype.onAfterRendering = function () {
				var oEventBus = sap.ui.getCore().getEventBus();
				oEventBus.subscribe("nrg.module.dashoard", "eBuagChanged", this._handleBuagChanged, this);
				oEventBus.subscribe("nrg.module.dashoard", "eBuagChangedFromCaInfo", this._handleCaInfoContractChanged, this);
			};

			Controller.prototype._handleCaInfoContractChanged = function (channel, event, data) {
				var i,
					oAllBuags = this.getView().getModel('oSmryAllBuags');

				for (i = 0; i < oAllBuags.getProperty('/results').length; i = i + 1) {
					if (oAllBuags.getProperty('/results')[i].ContractAccountID === data.caNum) {
						this._selectBuag(i);
						return;
					}
				}

			};

			Controller.prototype._handleBuagChanged = function (channel, event, data) {
				this._selectBuag(data.iIndex);
			};
			Controller.prototype._initRetrBpInf = function () {
				var oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo(),
					//sBpNum,
					sPath;
					//oComponentContextModel = this.getOwnerComponent().getCcuxContextManager().getContext();

				/*
				if (oComponentContextModel.getProperty('/dashboard/bpNum')) {
					sBpNum = oComponentContextModel.getProperty('/dashboard/bpNum');
				} else {
					sBpNum = oRouteInfo.parameters.bpNum;
				}*/

				sPath = '/Partners' + '(\'' + this._bpNum + '\')';

				this._retrBpInf(sPath);
				this._initRetrCaInf(this._bpNum);  //Should be triggered in Success call back of BP retriev
				this._initRetrBpSegInf(this._bpNum);
			};

			Controller.prototype._initRetrBpSegInf = function (BpNum) {
				var sPath;

				//aSplitHash = (this._retrUrlHash()).split('/');
				//iSplitHashL = aSplitHash.length;
				sPath = '/Partners' + '(\'' + BpNum + '\')/BpSegs';

				this._retrBpSegInf(sPath);
			};

			Controller.prototype._initRetrCaInf = function (BpNum) {
				var oRouteInfo = this.getOwnerComponent().getCcuxRouteManager().getCurrentRouteInfo(),
					sCaNum,
					sPath;

				/*if (oRouteInfo.parameters.caNum && oRouteInfo.parameters.caNum !== 0) {
					sCaNum = oRouteInfo.parameters.caNum;
					sPath = '/Buags' + '(\'' + sCaNum + '\')';
					this._bCaNumKnown = true;
				} else {
					this._bCaNumKnown = false;
				}*/
				sPath = '/Partners' + '(\'' + BpNum + '\')/Buags';
				this._retrCaInf(sPath);
			};

			Controller.prototype._initRetrAssignedAccount = function (CaNum) {
				var sPath;

				sPath = '/Buags' + '(\'' + CaNum + '\')/BpAssigns';
				this._retrAssignedAccount(sPath);
			};

			Controller.prototype._retrAssignedAccount = function (sPath) {
				var oModel = this.getView().getModel('oODataSvc'),
					oParameters;

				oParameters = {
					success : function (oData) {
						if (oData.results) {
							if (oData.results.length === 0) {
								this.getView().byId('id_AssignedAccBtn').setVisible(false);
							} else {
								this.getView().byId('id_AssignedAccBtn').setVisible(true);
								this.getView().getModel('oSmryAssignedAccounts').setData(oData.results);
							}
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


			Controller.prototype._retrUrlHash = function () {
				//Get the hash to retrieve bp #
				var oHashChanger = new HashChanger(),
					sUrlHash = oHashChanger.getHash();

				return sUrlHash;
			};

			Controller.prototype._retrCaInf = function (sPath) {
				var oModel = this.getView().getModel('oODataSvc'),
					oParameters,
					i;

				oParameters = {
					success : function (oData) {
						if (oData) {

							if (this._caNum) {
								for (i = 0; i < oData.results.length; i = i + 1) {
									if (oData.results[i].ContractAccountID === this._caNum) {
										this.getView().getModel('oSmryBuagInf').setData(oData.results[i]);
									}
								}
							} else {
								this.getView().getModel('oSmryBuagInf').setData(oData.results[0]);
							}

							this._initRetrAssignedAccount(this.getView().getModel('oSmryBuagInf').getProperty('/ContractAccountID'));
							this._caNum = this.getView().getModel('oSmryBuagInf').getProperty('/ContractAccountID');
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

			Controller.prototype._selectBuag = function (iIndex) {
				if (this.getView().getModel('oSmryAllBuags').getProperty('/results').length >= iIndex) {
					this.getView().getModel('oSmryBuagInf').setData(this.getView().getModel('oSmryAllBuags').getProperty('/results')[iIndex]);
					this.getView().getModel('oSmryAllBuags').setProperty('/selectedIndex', iIndex);
					this._initRetrAssignedAccount(this.getView().getModel('oSmryBuagInf').getProperty('/ContractAccountID'));
					this._caNum = this.getView().getModel('oSmryBuagInf').getProperty('/ContractAccountID');
				}
			};

			Controller.prototype._retrBpInf = function (sPath) {
				var oModel = this.getView().getModel('oODataSvc'),
					oParameters,
					i;

				oParameters = {
					urlParameters: {"$expand": "Buags"},
					success : function (oData) {
						if (oData) {
							this.getView().getModel('oSmryBpInf').setData(oData);

							var caIndex = 0;

							if (this._caNum) {
								for (i = 0; i < oData.Buags.results.length; i = i + 1) {
									if (oData.Buags.results[i].ContractAccountID === this._caNum) {
										caIndex = i;
									}
								}
							}

							if (oData.Buags.results[caIndex]) {
								this.getView().getModel('oSmryBuagInf').setData(oData.Buags.results[caIndex]);
								this.getView().getModel('oSmryAllBuags').setData(oData.Buags);
								this.getView().getModel('oSmryAllBuags').setProperty('/selectedIndex', caIndex);
							}
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

			Controller.prototype._retrBpSegInf = function (sPath) {
				var oModel = this.getView().getModel('oODataSvc'),
					oParameters,
					oData_ThreeOnly = {results: [] },
					i;

				oParameters = {
					success : function (oData) {
						if (oData) {
							if (oData.results.length <= 3) {
								for (i = 0; i < oData.results.length; i = i + 1) {
									oData.results[i].moreThanThree = false;
								}
								this.getView().getModel('oSmryBpSegInf').setData(oData.results);
							} else {
								for (i = 0; i < 3; i = i + 1) {
									if (i < 2) {
										oData.results[i].moreThanThree = false;
									} else {
										oData.results[i].moreThanThree = true;
									}
									oData_ThreeOnly.results.push(oData.results[i]);
								}
								this.getView().getModel('oSmryBpSegInf').setData(oData_ThreeOnly.results);
								this.getView().getModel('oSmryBpAllSegInf').setData(oData.results);
							}
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

			Controller.prototype._onAssignedAccountClick = function () {
				//sap.ui.commons.MessageBox.alert("Assigned Account Link Clicked");
				this._oAssignedPopup = ute.ui.main.Popup.create({
					content: this.getView().byId("idAssignedAccs"),
					title: 'ASSIGNED ACCOUNTS'
				});

				this._oAssignedPopup.open();
			};

			Controller.prototype._onExpandSegInfoClick = function () {
				//pop up start
				this._oSegPopup = ute.ui.main.Popup.create({
					content: this.getView().byId("idThreeSegs"),
					title: 'SEGMENTATION'
				});
				this._oSegPopup.open();
			};

			Controller.prototype._onBpNumClicked = function () {
				var oRouter = this.getOwnerComponent().getRouter();
					//sSelectedBpNum = this.getView().getModel('oSmryBpInf').getProperty('/PartnerID');

				if (this._caNum) {
					if (this._coNum) {
						oRouter.navTo('bupa.bpInfo', {bpNum: this._bpNum, caNum: this._caNum, coNum: this._coNum});
					} else {
						oRouter.navTo('bupa.bpInfoNoCo', {bpNum: this._bpNum, caNum: this._caNum});
					}
				} else {
					oRouter.navTo('bupa.bpInfoNoCoNoCa', {bpNum: this._bpNum});
				}
			};

			Controller.prototype._onCaNumClicked = function () {
				var oRouter = this.getOwnerComponent().getRouter();
					//sSelectedBpNum = this.getView().getModel('oSmryBpInf').getProperty('/PartnerID'),
					//sSelectedCaNum = this.getView().getModel('oSmryBuagInf').getProperty('/ContractAccountID');
				if (this._coNum) {
					oRouter.navTo('bupa.caInfo', {bpNum: this._bpNum, caNum: this._caNum, coNum: this._coNum});
				} else {
					oRouter.navTo('bupa.caInfoNoCo', {bpNum: this._bpNum, caNum: this._caNum});
				}
			};

			/***********************************************************************************************************************/
			//Functions for AccAccessAuthPty.fragment.xml
			/***********************************************************************************************************************/
			Controller.prototype._onAuthPtyClicked = function () {
				if (!this._oAccAuthPtyPopup) {
					this._oAccAuthPtyPopup = ute.ui.main.Popup.create({
						content: sap.ui.xmlfragment(this.getView().sId, "nrg.module.dashboard.view.AcctAccessAuthPty", this),
						title: 'ACCOUNT ACCESS AUTHORIZATION'
					});
					this.getView().addDependent(this._oAccAuthPtyPopup);
				}

				this._oAccAuthPtyPopup.open();

				return;
			};

			//method to retrieve the data for the table

			 Controller.prototype._retrieveTableInfo = function (sCANumber) {


				 var sPath = '/Buags' + '(\'' + sCANumber + '\')',
					 ThirdPrtyAuthFlag;

				 var oModel = this.getView().getModel('oODataSvc'),
					 oThrdPrtyModel = this.getView().getModel('oSmryBuagInf'),
					 oParameters;

					  oParameters = {
						  success : function (oData) {

								var data = oData.ThirdPrtyAuth;
								if(data === 'X')
									ThirdPrtyAuthFlag = 1;
								else
									ThirdPrtyAuthFlag = 0;

								if(ThirdPrtyAuthFlag == 1){

									this.getView().byId("idBtnAuth").setVisible(true);/*
									this.getView().byId("idBpName").removeStyleClass("nrgDashboard-cusDataSum-bpName");*/
									this.getView().byId("idBpName").addStyleClass("nrgDashboard-cusDataSum-bpName-AcctAccessPty");


									var sPathTp = '/Buags' + '(\'' + sCANumber + '\')/ThirdPartyAuth';
									var oModelTp = this.getView().getModel('oODataSvc'),
										oAcctAccessModel = this.getView().getModel('oSmryAccessAuth'),
										oAcctAccessData = [],
										oParametersTp;

									oParametersTp = {
												success : function (oData) {
												if (oData.results) {
													for (var i = 0; i < oData.results.length; i++) {
														var dataEntry = {};
														var data = oData.results[i];
														dataEntry.AuthPrtyName = data.AuthPrtyName;
														dataEntry.LegalDoc = data.LegalDoc;
														dataEntry.ReceiveDate = data.ReceiveDate;
														dataEntry.EffDate = data.EffDate;
														dataEntry.EndDate = data.EndDate;
														dataEntry.Status = data.Status;
														oAcctAccessData.push(dataEntry);
													}
													oAcctAccessModel.setData(oAcctAccessData);
												} else {
											}
										}.bind(this),
										error: function (oError) {

										}.bind(this)
									};

								if (oModelTp) {
									oModelTp.read(sPathTp, oParametersTp);
								}
							}
							else
							{
								this.getView().byId("idBtnAuth").setVisible(false);
								this.getView().byId("idBpName").addStyleClass("nrgDashboard-cusDataSum-bpName");
								/*this.getView().byId("idBpName").removeStyleClass("nrgDashboard-cusDataSum-bpName-AcctAccessPty");*/

							}
					}.bind(this),
					error: function (oError) {

					}.bind(this)
				};
				if (oModel) {
					oModel.read(sPath, oParameters);
				}
			};

			return Controller;
		}
	);
