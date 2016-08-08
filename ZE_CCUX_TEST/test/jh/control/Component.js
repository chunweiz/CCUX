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

        // Load from the manifest file
        var CustomComponent = UIComponent.extend('test.jh.control.Component', {
            metadata: {
                manifest: 'json'
            }
        });

        CustomComponent.prototype.init = function () {
            var oModel, oMockServer, oDataModel;

            // Initiate UIComponent
            UIComponent.prototype.init.apply(this, arguments);

            this.getRouter().initialize();
            Icon.load();

            // Create a model with JSON data
            oModel = new JSONModel({
                data: {
                    title: {
                        nrg: 'NRG Reliant Interaction Center',
                        ute: 'Utegration Inc'
                    }
                }
            });

            // Define a name for the model
            this.setModel(oModel, 'comp-test');


            // Set up mock server
            oMockServer = new MockServer({
                rootUri: 'data/'
            });

            // Let the service url that the mock sever simulates lies in the same folder as mock data
            oMockServer.simulate('data/metadata.xml', {
                sMockdataBaseUrl: 'data/',  // Base url which contains the mockdata
                bGenerateMissingMockData: true  // Generate data for the rest of the service entities
            });

            oMockServer.start();

            // Create the domain model to the component
            oDataModel = new ODataModel(oMockServer.getRootUri(), {
                useBatch: false
            });

            // Define a name for the model
            this.setModel(oDataModel, 'comp-odata');
        };

        return CustomComponent;
    }
);
