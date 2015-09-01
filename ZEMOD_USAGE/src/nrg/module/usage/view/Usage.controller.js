/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController',
        'sap/ui/model/json/JSONModel'
    ],

    function (CoreController, JSONModel) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.usage.view.Usage');


		/* =========================================================== */
		/* lifecycle method- Init                                     */
		/* =========================================================== */
        Controller.prototype.onInit = function () {

        };
        /* =========================================================== */
		/* lifecycle method- Before Rendering                          */
		/* =========================================================== */
        Controller.prototype.onBeforeRendering = function () {
            var oLocalModel = new JSONModel({
                selectedKey: 'key003',
                dropdown: [
                    { key: 'key001', value: 'value001' },
                    { key: 'key002', value: 'value002' },
                    { key: 'key003', value: 'value003' },
                    { key: 'key004', value: 'value004' },
                    { key: 'key005', value: 'value005' }
                ],
                table: [
                    { Date: '01/01/2013', BillingDays: '28', Reading: '10000', kWh: '1172', Actual: 'Actual', Weather: 'High 62F Low 41F', CDI: '-28', $: '70.32' },
                    { Date: 'February 2013', BillingDays: '31', Reading: '11100', kWh: '1100', Actual: 'Actual', Weather: 'High 62F Low 44F', CDI: '-14', $: '67.15' },
                    { Date: 'March 2013', BillingDays: '30', Reading: '12798', kWh: '1698', Actual: 'Actual', Weather: 'High 73F Low 51F', CDI: '-2', $: '101.88' },
                    { Date: 'April 2013', BillingDays: '29', Reading: '13970', kWh: '1172', Actual: 'Actual', Weather: 'High 73F Low 51F', CDI: '3', $: '70.32' },
                    { Date: 'May 2013', BillingDays: '31', Reading: '15070', kWh: '1100', Actual: 'Estimate', Weather: 'High 73F Low 51F', CDI: '4', $: '67.15' },
                    { Date: 'June 2013', BillingDays: '30', Reading: '16768', kWh: '1698', Actual: 'Actual', Weather: 'High 73F Low 51F', CDI: '15', $: '101.88' },
                    { Date: 'July 2013', BillingDays: '31', Reading: '16768', kWh: '1698', Actual: 'Actual', Weather: 'High 73F Low 51F', CDI: '26', $: '70.32' },
                    { Date: 'August 2013', BillingDays: '31', Reading: '19040', kWh: '1100', Actual: 'Estimate', Weather: 'High 73F Low 51F', CDI: '36', $: '67.15' },
                    { Date: 'September 2013', BillingDays: '30', Reading: '20738', kWh: '1698', Actual: 'Actual', Weather: 'High 73F Low 51F', CDI: '23', $: '101.88' },
                    { Date: 'October 2013', BillingDays: '31', Reading: '21910', kWh: '1172', Actual: 'Actual', Weather: 'High 73F Low 51F', CDI: '13', $: '70.32' },
                    { Date: 'November 2013', BillingDays: '30', Reading: '23010', kWh: '1100', Actual: 'Actual', Weather: 'High 73F Low 51F', CDI: '-3', $: '67.15' },
                    { Date: 'December 2013', BillingDays: '31', Reading: '24708', kWh: '1698', Actual: 'Actual', Weather: 'High 73F Low 51F', CDI: '-10', $: '101.88' }
                ],
                tabled: [
                    { PeriodStart: 'Period', PeriodEnd: 'PeriodEnd', NumOfDays: 'NumOfDays', Term: 'Term', KwhUsage: 'KwhUsage', CDI_HDI: 'CDI_HDI', Incentive: 'Incentive', $: '$' },
                    { PeriodStart: 'Period', PeriodEnd: 'PeriodEnd', NumOfDays: 'NumOfDays', Term: 'Term', KwhUsage: 'KwhUsage', CDI_HDI: 'CDI_HDI', Incentive: 'Incentive', $: '$' },
                    { PeriodStart: 'Period', PeriodEnd: 'PeriodEnd', NumOfDays: 'NumOfDays', Term: 'Term', KwhUsage: 'KwhUsage', CDI_HDI: 'CDI_HDI', Incentive: 'Incentive', $: '$' },
                    { PeriodStart: 'Period', PeriodEnd: 'PeriodEnd', NumOfDays: 'NumOfDays', Term: 'Term', KwhUsage: 'KwhUsage', CDI_HDI: 'CDI_HDI', Incentive: 'Incentive', $: '$' },
                    { PeriodStart: 'Period', PeriodEnd: 'PeriodEnd', NumOfDays: 'NumOfDays', Term: 'Term', KwhUsage: 'KwhUsage', CDI_HDI: 'CDI_HDI', Incentive: 'Incentive', $: '$' }
                ]
            });
            this.getOwnerComponent().getCcuxApp().setTitle("HISTORY");
            this.getView().setModel(oLocalModel, "oLocalModel");

        };
        /* =========================================================== */
		/* lifecycle method- Before Rendering                          */
		/* =========================================================== */
        Controller.prototype.expandInfoline = function (oEvent) {
            var oCurrentInfoLine = oEvent.getSource().getParent();
            oCurrentInfoLine.setExpanded(!(oCurrentInfoLine.getExpanded()));
        };

        return Controller;
    }


);
