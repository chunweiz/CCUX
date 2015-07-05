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
            var oCompModel, oTemplateModel, oViewTemplate;

            //Simulate model at component level
            oCompModel = new JSONModel({
                data: {
                    title: {
                        nrg: 'NRG Reliant Interaction Center',
                        ute: 'Utegration Inc'
                    }
                }
            });

            this.getView().setModel(oCompModel, 'comp-test');

            oTemplateModel = new JSONModel({
                meta: {
                    showNrg: false
                }
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
        };

        return CustomController;
    }
);
