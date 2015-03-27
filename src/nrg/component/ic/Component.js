/*globals sap, nrg, jQuery*/
/*jslint nomen: true*/

(function () {
    'use strict';
    
    jQuery.sap.declare('nrg.component.ic.Component');
    jQuery.sap.require('nrg.util.nav.GreedyRouter');
    
    sap.ui.core.UIComponent.extend('nrg.component.ic.Component', {
        metadata: {
            name : 'Reliant Interaction Center for Regular Agent',
            version : '1.0.0.0',
            includes: ['../../asset/css/nrg.css'],
            dependencies: {
                libs: ['sap.m', 'sap.ui.layout', 'ute.ui.commons']
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
                    empty: {
                        pattern: '',
                        view: 'CenterEmpty',
                        targetControl: 'idInnerPageCenterContent',
                        targetAggregation: 'content',
                        clearTarget: true
                    },
                    emptyLeftTop: {
                        pattern: '',
                        view: 'LeftTopEmpty',
                        targetControl: 'idInnerPageLeftTopContent',
                        targetAggregation: 'content',
                        clearTarget: true
                    },
                    emptyLeftBottom: {
                        pattern: '',
                        view: 'LeftBottomEmpty',
                        targetControl: 'idInnerPageLeftBottomContent',
                        targetAggregation: 'content',
                        clearTarget: true
                    }
                }
            }
        }
    });
    
    nrg.component.ic.Component.prototype.init = function () {
        sap.ui.core.UIComponent.prototype.init.apply(this);
        this.initRouter();
        this.initModels();
    };
    
    nrg.component.ic.Component.prototype.destroy = function () {
        sap.ui.core.UIComponent.prototype.destory.apply(this, arguments);
    };
    
    nrg.component.ic.Component.prototype.initModels = function () {
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
    
    nrg.component.ic.Component.prototype.initRouter = function () {
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

    nrg.component.ic.Component.prototype._routeCallback = function (route, args, config, targetControl, view) {
        
    };
    
}());