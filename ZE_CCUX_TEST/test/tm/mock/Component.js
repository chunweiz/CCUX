/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/UIComponent',
        'sap/ui/core/util/MockServer',
        'sap/ui/model/odata/v2/ODataModel'
    ],

    function (CoreUIComponent, CoreMockServer, ODataModel) {
        'use strict';

        var Component = CoreUIComponent.extend('tm.mock.Component', {
            metadata: {
                name: 'Test',
                rootView: 'tm.mock.view.App'
            },

            init: function () {
                sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

                var oMockServer, oModel;

                oMockServer = new CoreMockServer({
                    rootUri: '/SalesOrderSrv/'
                });

                oMockServer.simulate('data/metadata.xml', 'data/');

                oMockServer.start();

                oModel = new ODataModel('/SalesOrderSrv/', {
                    defaultBindingMode: sap.ui.model.BindingMode.TwoWay
                });
                this.setModel(oModel, 'salesOrder');
                oModel.read('/ProductSet');

            }
        });

    }
);
