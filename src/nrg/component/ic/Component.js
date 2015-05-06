/*globals sap, nrg, jQuery*/
/*jslint nomen: true*/

sap.ui.define(
    [
        'sap/ui/core/UIComponent',
        'nrg/util/Icon',

        // Not in function arguments
        'sap/ui/core/Popup'
    ],

    function (Component, IconUtil) {
        'use strict';

        var NRGComponent = Component.extend('nrg.component.ic.Component', {
            metadata: {
                name : 'Reliant Interaction Center for Regular Agent',
                version : '1.0.0',
                includes: ['../../asset/css/nrg.css'],
                dependencies: {
                    ui5version: '1.28.5',
                    libs: ['ute.ui.commons']
                },

                config: {
                    resourceBundle: 'i18n/messageBundle.properties',
                    service: {
                        oData: {
                            crm: 'data/crm.json',
                            ecc: 'data/ecc.json'
                        }
                    }
                },

                rootView: {
                    viewName: 'nrg.view.App',
                    type: sap.ui.core.mvc.ViewType.XML
                },

                routing: {
                    routes: {
                        bpFound: {
                            pattern: 'bp',
                            target: [ 'generalEmpty', 'summaryBp', 'toolsEmpty' ]
                        },

                        notFound: {
                            pattern: '',
                            target: [ 'generalEmpty', 'summaryEmpty', 'toolsEmpty' ],
                            subroutes: [
                                {
                                    pattern: '{all*}',
                                    target: [ 'generalEmpty', 'summaryEmpty', 'toolsEmpty' ]
                                }
                            ]
                        }
                    },

                    config: {
                        routerClass: sap.ui.core.routing.Router,
                        viewType: sap.ui.core.mvc.ViewType.XML,
                        viewPath: 'nrg.view',
                        controlAggregation: 'content',
                        clearControlAggregation: true

                    },

                    targets: {
                        summaryBp: {
                            viewName: 'SummaryBP',
                            controlId: 'idAppSummary'
                        },

                        generalEmpty: {
                            viewName: 'GeneralEmpty',
                            controlId: 'idAppGeneral'
                        },

                        summaryEmpty: {
                            viewName: 'SummaryEmpty',
                            controlId: 'idAppSummary'
                        },

                        toolsEmpty: {
                            viewName: 'ToolsEmpty',
                            controlId: 'idAppTools'
                        }
                    }
                }
            }
        });

        NRGComponent.prototype.init = function () {
            Component.prototype.init.apply(this);
            this.initRouter();
            this.initModels();
            this.initIcons();
            this.initPopup();
        };

        NRGComponent.prototype.destroy = function () {
            Component.prototype.destory.apply(this, arguments);
        };

        NRGComponent.prototype.initIcons = function () {
            IconUtil.load();
        };

        NRGComponent.prototype.initPopup = function () {
            // Set the initial Z-index to 100.
            // Internally, UI5 is doing an increment of 10 for each call.
            // TODO: in 1.30, it is possible to call method setInitialZIndex instead of looping.

            var iIdx;

            for (iIdx = 0; iIdx < 10; iIdx = iIdx + 1) {
                sap.ui.core.Popup.getNextZIndex();
            }
        };

        NRGComponent.prototype.initModels = function () {
            var mConfig, oRootPath, oModel;

            mConfig = this.getMetadata().getConfig();
            oRootPath = jQuery.sap.getModulePath('nrg');

            //Set resource bundle
            oModel = new sap.ui.model.resource.ResourceModel({
                bundleUrl : [oRootPath, mConfig.resourceBundle].join('/')
            });
            this.setModel(oModel, 'i18n');

            //Set CRM and ECC shared data
            oModel = new sap.ui.model.json.JSONModel([oRootPath, mConfig.service.oData.crm].join('/'));
            this.setModel(oModel, 'crm');

            oModel = new sap.ui.model.json.JSONModel([oRootPath, mConfig.service.oData.ecc].join('/'));
            this.setModel(oModel, 'ecc');
        };

        NRGComponent.prototype.initRouter = function () {
            var oRoutes = this.getMetadata().getRoutes(),
                oRouter = this.getRouter(),
                sName;

            //Add a callback to each routes
            for (sName in oRoutes) {
                if (oRoutes.hasOwnProperty(sName)) {
                    oRoutes[sName].callback = this._routeCallback;
                }
            }

            oRouter.initialize();
        };

        NRGComponent.prototype._routeCallback = function (route, args, config, targetControl, view) {

        };

        return NRGComponent;
    },

    false
);
