/*globals sap, jQuery, tm*/
/*jslint nomen:true*/

(function () {
    'use strict';

    jQuery.sap.declare('tm.nav.Component');
    jQuery.sap.require('tm.nav.Router');

    sap.ui.core.UIComponent.extend('tm.nav.Component', {
        metadata: {
            dependencies: {
                libs: ['sap.m', 'ute.ui.commons']
            },

            rootView: {
                viewName: 'tm.nav.view.App',
				type: sap.ui.core.mvc.ViewType.XML
            },

            routing: {
                config: {
                    routerClass: tm.nav.Router,
                    viewType: sap.ui.core.mvc.ViewType.HTML,
                    viewPath : 'tm.nav.view'
                },

                routes: {
                    main001: {
                        pattern: '',
                        view: 'TopLeftDefault',
                        targetControl: 'TopLeftNav',
                        targetAggregation: 'content',
                        clearTarget: true
                    },
                    main002: {
                        pattern: '',
                        view: 'BottomLeftDefault',
                        targetControl: 'BottomLeftNav',
                        targetAggregation: 'content',
                        clearTarget: true
                    },
                    main003: {
                        pattern: '',
                        view: 'MainContentDefault',
                        targetControl: 'MainContentNav',
                        targetAggregation: 'content',
                        clearTarget: true
                    },
                    main005: {
                        pattern: '/bp/{bpNum}/ca/{caNum}',
                        view: 'BottomLeft',
                        targetControl: 'BottomLeftNav',
                        targetAggregation: 'content',
                        clearTarget: true
                    },
                    main006: {
                        pattern: '/bp/{bpNum}/ca/{caNum}',
                        view: 'MainContent',
                        targetControl: 'MainContentNav',
                        targetAggregation: 'content',
                        clearTarget: true
                    },
                    main004: {
                        pattern: '/bp/{bpNum}/ca/{caNum}',
                        view: 'TopLeft',
                        targetControl: 'TopLeftNav',
                        targetAggregation: 'content',
                        clearTarget: true
                    }
                }
            }
        }
    });

    tm.nav.Component.prototype.init = function () {
        sap.ui.core.UIComponent.prototype.init.apply(this);

        var oRoutes = this.getMetadata().getRoutes(),
            sName,
            oRouter = this.getRouter();

        //Add a callback to each routes
        for (sName in oRoutes) {
            if (oRoutes.hasOwnProperty(sName)) {
                oRoutes[sName].callback = this._routeCallback;
            }
        }

        oRouter.setGreedy(true);
        oRouter.initialize();
    };

    tm.nav.Component.prototype.destroy = function () {
        sap.ui.core.UIComponent.prototype.destory.apply(this, arguments);
    };

    tm.nav.Component.prototype._routeCallback = function (oRoute, oArguments, oConfig, oTargetControl, oView) {
        switch (oConfig.name) {
        case 'main001':
            jQuery.sap.log.info('[Component tm.nav.Component] _routeCallback');
            break;
        case 'main004':
            jQuery.sap.log.info('[Component tm.nav.Component] _routeCallback');
            break;
        }
    };

}());

































































