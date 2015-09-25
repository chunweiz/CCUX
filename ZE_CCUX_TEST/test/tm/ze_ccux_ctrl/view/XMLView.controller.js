/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel'
    ],

    function (Controller, JSONModel) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.XMLView');

        CustomController.prototype.onInit = function () {

        };

        CustomController.prototype.onBeforeRendering = function () {
            var oDataModel, mParams;

            mParams = {};
            mParams.success = function (oData) {
                var oJsonData, oTemplateModel, oViewTemplate;

                oTemplateModel = new JSONModel({
                    meta: {
                        showNrg: true,
                        testRepeat: [
                            { value: 'value001' },
                            { value: 'value002' },
                            { value: 'value003' }
                        ]
                    },
                    results: oData.results
                });

                oViewTemplate = sap.ui.view({
                    preprocessors: {
                        xml: {
                            models: {
                                tmpl: oTemplateModel
                            }
                        }
                    },
                    type: sap.ui.core.mvc.ViewType.XML,
                    viewName: 'test.tm.ze_ccux_ctrl.view.XMLTemplate'
                });

                this.getView().byId('viewContent').addContent(oViewTemplate);
            }.bind(this);

            oDataModel = this.getOwnerComponent().getModel('comp-odata');
            oDataModel.read('/BusinessPartnerSet', mParams);
        };

        return CustomController;
    }
);
