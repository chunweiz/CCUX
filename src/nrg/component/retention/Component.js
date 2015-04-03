/*globals sap, nrg, jQuery*/
/*jslint nomen:true*/

(function () {
    'use strict';
    
    jQuery.sap.declare('nrg.component.retention.Component');
    jQuery.sap.require('nrg.util.nav.GreedyRouter');
    
    sap.ui.core.UIComponent.extend('nrg.component.retention.Component', {
        metadata: {
            name : 'Reliant Interaction Center for Retention Agent',
            version : '1.0.0.0',
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
                    emptyGeneral: {
                        pattern: '',
                        view: 'GeneralEmpty',
                        targetControl: 'idAppGeneral',
                        targetAggregation: 'content',
                        clearTarget: true
                    },
                    emptySummary: {
                        pattern: '',
                        view: 'SummaryEmpty',
                        targetControl: 'idAppSummary',
                        targetAggregation: 'content',
                        clearTarget: true
                    },
                    emptyTools: {
                        pattern: '',
                        view: 'ToolsEmpty',
                        targetControl: 'idAppTools',
                        targetAggregation: 'content',
                        clearTarget: true
                    }
                }
            }
        }
    });
    
    nrg.component.retention.Component.prototype.init = function () {
        sap.ui.core.UIComponent.prototype.init.apply(this);
        this.initRouter();
        this.initModels();
    };
    
    nrg.component.retention.Component.prototype.destroy = function () {
        sap.ui.core.UIComponent.prototype.destory.apply(this, arguments);
    };
    
    nrg.component.retention.Component.prototype.initModels = function () {
        var mConfig, oRootPath, oModel;
        
        mConfig = this.getMetadata().getConfig();
        oRootPath = jQuery.sap.getModulePath('nrg');
        
        //Set resource bundle
        oModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl: [oRootPath, mConfig.resourceBundle].join('/')
		});
		this.setModel(oModel, 'i18n');

        //Set CRM and ECC shared data
        oModel = new sap.ui.model.json.JSONModel([oRootPath, mConfig.service.oData.crm].join('/'));
        this.setModel(oModel, 'crm');
        
        oModel = new sap.ui.model.json.JSONModel([oRootPath, mConfig.service.oData.ecc].join('/'));
        this.setModel(oModel, 'ecc');
    };
    
    nrg.component.retention.Component.prototype.initRouter = function () {
        var oRoutes = this.getMetadata().getRoutes(),
            oRouter = this.getRouter(),
            sName;
        
        /*
            Add a callback to each routes for component to intercept each navigation.
            This allows the component to performs cleanup activities before each navigation.
        */
        for (sName in oRoutes) {
            if (oRoutes.hasOwnProperty(sName)) {
                oRoutes[sName].callback = this._routeCallback;
            }
        }
        
        oRouter.setGreedy(true);
        oRouter.initialize();
    };

    nrg.component.retention.Component.prototype._routeCallback = function (route, args, config, targetControl, view) {
        
    };
    
}());
