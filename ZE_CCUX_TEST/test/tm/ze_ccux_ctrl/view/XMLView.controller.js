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

            oTemplateModel = new JSONModel({
                meta: {
                    showNrg: true
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
