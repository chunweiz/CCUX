/*globals sap, nrg, jQuery*/
/*jslint nomen: true*/

sap.ui.define(
    [
        'sap/ui/core/UIComponent',
        'nrg/util/nav/GreedyRouter'
    ],

    function (Component, GreedyRouter) {
        'use strict';

        var NRGComponent = Component.extend('nrg.component.callernoid.Component', {
            metadata: {
                name : 'Reliant Interaction Center for Regular Agent',
                version : '1.0.0',
                includes: ['../../asset/css/nrg.css'],
                dependencies: {
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
                    config: {
                        routerClass: nrg.util.nav.GreedyRouter,
                        viewType: sap.ui.core.mvc.ViewType.XML,
                        viewPath : 'nrg.view'
                    },

                    routes: {
                        callerNoIDSearch: {
                            pattern: '',
                            view: 'CallerNoIDSearch',
                            targetControl: 'idAppGeneral',
                            targetAggregation: 'content',
                            clearTarget: true
                        },
                        emptySummary: {
                            pattern: '',
                            view: 'CallerNoIDEnrollment',
                            targetControl: 'idAppSummary',
                            targetAggregation: 'content',
                            clearTarget: true
                        }
                    }
                }
            }
        });

        NRGComponent.prototype.init = function () {
            Component.prototype.init.apply(this);
            this.initRouter();
            this.initModels();
        };

        NRGComponent.prototype.destroy = function () {
            Component.prototype.destory.apply(this, arguments);
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

            oRouter.setGreedy(true);
            oRouter.initialize();
        };

        NRGComponent.prototype._routeCallback = function (route, args, config, targetControl, view) {

        };

        return NRGComponent;
    },

    false
);
