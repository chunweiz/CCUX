/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/UIComponent',
        './Icon',
        'sap/ui/model/json/JSONModel',
        'sap/ui/core/util/MockServer',
        'sap/ui/model/odata/v2/ODataModel'
    ],

    function (UIComponent, Icon, JSONModel, MockServer, ODataModel) {
        'use strict';

        var CustomComponent = UIComponent.extend('test.tm.ze_ccux_ctrl.Component', {
            metadata: {
                manifest: 'json'
            }
        });

        CustomComponent.prototype.init = function () {
            UIComponent.prototype.init.apply(this, arguments);

            var oModel, oMockServer, oDataModel;

            this.getRouter().initialize();
            Icon.load();

            oModel = new JSONModel({
                data: {
                    title: {
                        nrg: 'NRG Reliant Interaction Center',
                        ute: 'Utegration Inc'
                    }
                }
            });

            this.setModel(oModel, 'comp-test');

            oMockServer = new MockServer({
                rootUri: 'data/'
            });

            oMockServer.simulate('data/metadata.xml', {
                sMockdataBaseUrl: 'data/',
                bGenerateMissingMockData: true
            });

            oMockServer.start();

            oDataModel = new ODataModel(oMockServer.getRootUri(), {
                useBatch: false
            });

            this.setModel(oDataModel, 'comp-odata');
        };

        return CustomComponent;
    }
);
