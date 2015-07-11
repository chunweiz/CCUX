/*globals sap, ute*/
/*jslint nomen:true*/
sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'jquery.sap.global',
        "sap/ui/model/json/JSONModel"
    ],

    function (CoreController, jQuery, JSONModel) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.campaign.view.History');


        /* =========================================================== */
		/* lifecycle method- Init                                     */
		/* =========================================================== */
        Controller.prototype.onInit = function () {
            var oViewModel = new JSONModel({
				busy : false,
				delay : 0
			});
            this.getView().setModel(oViewModel, "appView");
        };

         /**
		 * When the user choosed to select a Campaign for comparision
		 *
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event
         * @private
		 */
        Controller.prototype.onPressed = function (oEvent) {
            var aChildren,
                sPath,
                i,
                aContent,
                oPricingTable,
                oPricingRowTemplate,
                oPricingColTemplate,
                oScrollContainer = this.getView().byId("idnrgCamHisScroll"),
                mParameters,
                fnRecieved,
                fnChange;
            aContent = oScrollContainer.getContent();
            aChildren = oEvent.getSource().getParent().findElements();
            for (i = 0; i < aChildren.length; i = i + 1) {
                if (aChildren[i].hasStyleClass("nrgCamHis-but-selected")) {
                    aChildren[i].removeStyleClass("nrgCamHis-but-selected");
                }
            }
            oEvent.getSource().addStyleClass("nrgCamHis-but-selected");
            sPath = oEvent.getSource().getBindingContext("comp-campaign").getPath();
            oPricingTable = this.getView().byId("idnrgCamHis-prcTable");
            oPricingRowTemplate = this.getView().byId("idnrgCamHis-prcRow");
            oPricingColTemplate = this.getView().byId("idnrgCamHis-prcCol");
            this.getView().bindElement({
                model : "comp-campaign",
                path : sPath
            });
            // Development for Pricing Table binding..........................................
            fnRecieved = function (oEvent) {
                jQuery.sap.log.info("oPricingTable fnRecieved Read Successfully:::");
            };
            fnChange = function (oEvent) {
                jQuery.sap.log.info("function change called successfully:::");
            };
            mParameters = {
                model : "comp-campaign",
                path : sPath + "/CpgEFL_N",
                template : oPricingColTemplate,
                events: {dataReceived : fnRecieved, change : fnChange}
            };
            oPricingTable.bindColumns(mParameters);
            mParameters = {
                model : "comp-campaign",
                path : sPath + "/CpgEFL_N",
                template : oPricingRowTemplate,
                events: {dataReceived : fnRecieved, change : fnChange}
            };
            oPricingTable.bindRows(mParameters);
            mParameters = {
                model : "comp-campaign",
                path : sPath + "/CpgEFL_N",
                template : oPricingRowTemplate,
                events: {dataReceived : fnRecieved, change : fnChange}
            };
            oPricingTable.bindRows(mParameters);

            // Development for Pricing Table binding..........................................
        };

         /**
		 * To Format Tile Date Value after binding
		 *
		 * @function
		 * @param {startDate} Start Date value from binding
         * @param {endDate} End Date value from binding
         * @private
		 */
        Controller.prototype.formatTileDate = function (startDate, endDate) {
            return startDate + " - " + endDate;
        };

        /**
		 * To Format EFL Column Name
		 *
		 * @function
		 * @param {String} EFL Interval value
         *
         * @private
		 */
        Controller.prototype.formatEFLType = function (eflLevel) {
            return "EFL@" + eflLevel;
        };
        /**
		 * Converts in to EFL Json format required by Template view.
		 *
		 * @function
		 * @param {String} Type value from the binding
         *
		 *
		 */
        Controller.prototype.convertEFLJson = function (results) {
            var columns = [],
                temp,
                tempColumns = [],
                continueFlag = false,
                oBRRow = [],
                oCERow = [],
                oBRCells = [],
                oCECells = [],
                iCount1,
                iCount2,
                aJsonDataNew;
            for (iCount1 = 0; iCount1 < results.length; iCount1 = iCount1 + 1) {

                temp = results[iCount1];
                if ((temp !== undefined) && (temp.EFLLevel !== undefined)) {

                  // Columns Assignment.
                    if (tempColumns !== undefined) {

                        for (iCount2 = 0; iCount2 < tempColumns.length; iCount2  = iCount2 + 1) {
                            if (temp.EFLLevel === tempColumns[iCount2]) {
                                continueFlag = true;
                                break;
                            }
                        }
                        if (continueFlag) {
                            continueFlag = false;
                        }
                    }
                    tempColumns.push(temp.EFLLevel);
                    columns.push({
                        "EFLLevel": temp.EFLLevel
                    });
                    // Columns Assignment.
                }
            }
            for (iCount1 = 0; iCount1 < results.length; iCount1 = iCount1 + 1) {

                temp = results[iCount1];
                if ((temp !== undefined) && (temp.EFLLevel !== undefined)) {

                    if (temp.EFLType === "BR") {
                        oBRCells.push({
                            "EFLPrice": temp.EFLPrice
                        });
                    }

                    if (temp.EFLType === "CE") {
                        oCECells.push({
                            "EFLPrice": temp.EFLPrice
                        });
                    }
                }
            }
            aJsonDataNew = {};
            aJsonDataNew.results = {};
            aJsonDataNew.results.columns = columns;
            aJsonDataNew.results.rows = [];
            aJsonDataNew.results.rows.push({
                "cells" : oBRCells
            });
            aJsonDataNew.results.rows.push({
                "cells" : oCECells
            });

            return aJsonDataNew;
        };

        return Controller;
    }
);
