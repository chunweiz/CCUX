# Component #
Component serves as an entry point to the CCUX application. We will be using component to adapt, to control and to determine the type of content that are accessible by different groups of users.

How to create a new component:

1. [Pick a UI5 namespace](#markdown-header-ui5-namespace-for-component).
1. [Create the component folder](#markdown-header-component-folder).
1. [Add in documentation](#markdown-header-documentation).
1. [Create the component](#markdown-header-create-component).
1. [Add in component descriptor](#markdown-header-component-descriptor).
1. [Setup CCUX global settings](#markdown-header-global-settings).

***
## UI5 namespace for component ##
Everything that falls under a particular component will be namespaced after that component. The UI5 namespace for a component starts with the keyword `nrg.component.` follows by a `component identifier`.

##

```
nrg.component.<component identifier>
```

> where
>
> `component identifier` is a unique keyword that identifies the component such as ic. The format requirement for a component identifier is `[a-z]+`. Please make sure that you pick a unique component identifier by cross checking it against [existing components](../README.md#markdown-header-component).

***
## Component folder ##

### Component folder name ###
Component folder is the place where you are going to keep the content for your component. The folder name starts with `ZECMP_` follows by a `component initial`. The component folder name needs to be consistent across the Git repository, Eclipse project and SAPUI5 ABAP repository.

##

```
ZECMP_<component initial>
```

> where
>
> `component initial` is a unique initial that identifies the component such as IC. The format requirement for a component initial is `[A-Z0-9]{1-9}`. The limitation imposed on the total length of a component folder name is because SAP BSP application name supports up to 15 characters only.

### Component folder structure ###
Each component has their own [Grunt build](build.md#markdown-header-component) but try to keep the folder structure of components as consistent as possible so that most of the build code can be reuse.

```
<component folder name>/
└── src/
    └── nrg/
        └── component/
            └── <component identifier>/
                └── doc/
```

> where
>
> `component folder name` refers to the [folder described here](#markdown-header-component-folder-name).
>
> `component identifier` refers to the [keyword described here](#markdown-header-ui5-namespace-for-component).

***
## Documentation ##
Documentations that are specific to a particular component are stored within the component itself. The documentation is to be written in [Markdown](https://bitbucket.org/tutorials/markdowndemo/src) format. This gives us the ability to integrate the documentations to the Git repository in a Wiki-like fashion.

##

The minimum requirement is to create the `README.md` and `doc/CHANGELOG.md` files. Git repositories such as Bitbucket and Github renders the content of `README.md` automatically when it sees one. There is no hard rules on what to put in `README.md`. A general rule of thumb is to focus on the quirks of the component. As for `CHANGELOG.md`, please follow the guidelines provided by [Keep a CHANGELOG](http://keepachangelog.com/) to determine what to put in `CHANGELOG.md`. You can use `doc/` to keep additional assets such as images that are relevant to the documentation of the component.

##

```
<component folder name>/
└── src/
    └── nrg/
        └── component/
            └── <component identifier>/
                ├── doc/
                |   └── CHANGELOG.md
                └── README.md
```

***
## Create component ##

You need to create `index.html` and `Component.js` files as follows:

```
<component folder name>/
└── src/
    └── nrg/
        └── component/
            └── <component identifier>/
                ├── Component.js
                └── index.html
```

##

**index.html**

Below are the ingredients for `index.html`:

* Add CSS style `height:100%` to the `<html>`.
* Add CSS class `nrgUiBody` to the `<body>`.
* Set the `data-sap-ui-bindingSyntax` to `complex`.
* Declare the libraries that will be used at `data-sap-ui-libs`.
* Declare the modules, control libraries, baselines and component that will be used at `data-sap-ui-resourceroots`.
* Create the component container.

> Please refer to [OpenUI5 Runtime Configuration Options](https://openui5.hana.ondemand.com/#docs/guide/91f2d03b6f4d1014b6dd926db0e91070.html) for more information.

```
<!DOCTYPE html>
<html style="height:100%">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>NRG Reliant Interaction Center</title>
		<script id="sap-ui-bootstrap"
		    src="../../../../../ZELIB/openui5/resources/sap-ui-core.js"
            data-sap-ui-theme="sap_bluecrystal"
            data-sap-ui-bindingSyntax="complex"
            data-sap-ui-animation="false"
            data-sap-ui-preload="async"
			data-sap-ui-libs="sap.ui.commons, sap.m, ute.ui.commons, ute.ui.main, ute.ui.app"
            data-sap-ui-resourceroots='{
                "ute.ui.commons": "../../../../../ZECTRL_COMMONS/build/ute/ui/commons",
                "ute.ui.main": "../../../../../ZECTRL_MAIN/build/ute/ui/main",
                "ute.ui.app": "../../../../../ZECTRL_APP/build/ute/ui/app",
                "nrg.component.ic": "./",
                "nrg.base": "../../../../../ZEBASE/build/nrg/base",
                "nrg.module.app": "../../../../../ZEMOD_APP/build/nrg/module/app",
                "nrg.module.others": "../../../../../ZEMOD_OTHERS/build/nrg/module/others",
                "nrg.module.dashboard": "../../../../../ZEMOD_DSHB/build/nrg/module/dashboard",
                "nrg.module.campaign": "../../../../../ZEMOD_CMPGN/build/nrg/module/campaign",
                "nrg.module.quickpay": "../../../../../ZEMOD_QUICKPAY/build/nrg/module/quickpay",
                "nrg.module.billing": "../../../../../ZEMOD_BILLING/build/nrg/module/billing",
                "nrg.module.bupa": "../../../../../ZEMOD_BUPA/build/nrg/module/bupa",
                "nrg.module.search": "../../../../../ZEMOD_SEARCH/build/nrg/module/search",
                "nrg.module.usage": "../../../../../ZEMOD_USAGE/build/nrg/module/usage",
                "nrg.module.nnp": "../../../../../ZEMOD_NNP/build/nrg/module/nnp"
            }'>
		</script>
        <script>
            sap.ui.getCore().attachInit(function () {
                new sap.ui.core.ComponentContainer({
                    height: '100%',
                    width: '100%',
                    name: 'nrg.component.ic'
                }).placeAt('content');
            });
		</script>
	</head>
	<body role="application" class="nrgUiBody" id="content">
	</body>
</html>
```

##

**Component.js**

The `Component.js` is divided into three main sections:

* Letting the component knows that we are using `manifest.json`.
* Setting up managers.
* Adding in getter methods for selected managers and application so that modules will be able to reference them in their implementations.

Always strive to implement new features in the component through composition because there is a high chance that the new feature will be reusable across other components.

> Please refer to [nrg.base](ZEBASE/src/nrg/base/README.md) for more information about Managers.

```
/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/UIComponent',
        'nrg/base/component/ResourceBundleManager',
        'nrg/base/component/StylesheetManager',
        'nrg/base/component/IconManager',
        'nrg/base/component/MockDataManager',
        'nrg/base/component/RealDataManager',
        'nrg/base/component/WebUiManager',
        'nrg/base/component/RouteManager',
        'nrg/base/component/ContextManager',
        'nrg/base/component/NotificationManager',

        'nrg/base/component/Router'
    ],

    function (Component, ResourceBundleManager, StylesheetManager, IconManager,
        MockDataManager, RealDataManager, WebUiManager, RouteManager, ContextManager, NotificationManager) {
        'use strict';

        var CustomComponent = Component.extend('nrg.component.ic.Component', {
            metadata: {
                manifest: 'json'
            }
        });

        CustomComponent.prototype.getCcuxNotificationManager = function () {
            return this._oNotificationManager;
        };

        CustomComponent.prototype.getCcuxContextManager = function () {
            return this._oContextManager;
        };

        CustomComponent.prototype.getCcuxWebUiManager = function () {
            return this._oWebUiManager;
        };

        CustomComponent.prototype.getCcuxRouteManager = function () {
            return this._oRouteManager;
        };

        CustomComponent.prototype.getCcuxApp = function () {
            var oRootViewController = this.getAggregation('rootControl').getController();

            if (oRootViewController) {
                return oRootViewController.getApp();
            }

            return null;
        };

        CustomComponent.prototype.init = function () {
            Component.prototype.init.apply(this);

            this._oWebUiManager = new WebUiManager(this);
            this._oContextManager = new ContextManager(this);
            this._oStylesheetManager = new StylesheetManager(this);
            this._oResourceBundleManager = new ResourceBundleManager(this);
            this._oIconManager = new IconManager(this);
            this._oRealDataManager = new RealDataManager(this);
            this._oMockDataManager = new MockDataManager(this);
            this._oRouteManager = new RouteManager(this);
            this._oNotificationManager = new NotificationManager(this);

            this._oWebUiManager.start();
            this._oContextManager.init();
            this._oNotificationManager.init();
            this._oRealDataManager.addODataModels();
            this._oMockDataManager.startMockServers();
            this._oMockDataManager.addMockODataModels();
            this._oResourceBundleManager.addResourceModels();
            this._oStylesheetManager.addStylesheets();
            this._oIconManager.addIcons();
            this._oRouteManager.init();
        };

        CustomComponent.prototype.destroy = function () {
            if (this._oWebUiManager) {
                this._oWebUiManager.destroy();
                this._oWebUiManager = null;
            }

            if (this._oResourceBundleManager) {
                this._oResourceBundleManager.destroy();
                this._oResourceBundleManager = null;
            }

            if (this._oStylesheetManager) {
                this._oStylesheetManager.destroy();
                this._oStylesheetManager = null;
            }

            if (this._oIconManager) {
                this._oIconManager.destroy();
                this._oIconManager = null;
            }

            if (this._oMockDataManager) {
                this._oMockDataManager.destroy();
                this._oMockDataManager = null;
            }

            if (this._oRealDataManager) {
                this._oRealDataManager.destroy();
                this._oRealDataManager = null;
            }

            if (this._oRouteManager) {
                this._oRouteManager.destroy();
                this._oRouteManager = null;
            }

            if (this._oContextManager) {
                this._oContextManager.destroy();
                this._oContextManager = null;
            }

            Component.prototype.destroy.apply(this, arguments);
        };

        return CustomComponent;
    }
);
```

***
## Component descriptor ##

You will need to create a `manifest.json` at the following location to declare the configurations for your component.

> Please keep in mind that the [Grunt buid](build.md#markdowndown-header-component) will pull and merge `manifest.json` files from other modules into here.

```
<component folder name>/
└── src/
    └── nrg/
        └── component/
            └── <component identifier>/
                └── manifest.json
```

##

**manifest.json**

Generally, it should have the following items:

* Name and id for the component.
* CSS resources for baselines' CSS and `normalize.css`.
* Root view pointing to `nrg.module.app.view.CcuxApp`.
* Router class `nrg.base.component.Router`.
* Defaults the following for routing configurations:
    * `viewType` to `XML`.
    * `controlAggregation` to `content`.
    * `clearControlAggregation` to `true`.

```
{
    "name": "nrg.component.ic.Component",

    "sap.app": {
        "id": "nrg.component.ic.Component",
        "type": "application",
        "applicationVersion": {
            "version": "1.0.0"
        },
        "title": "Reliant Interaction Center",
        "description": "Reliant Interaction Center"
    },

    "sap.ui": {
        "technology": "UI5"
    },

    "sap.ui5": {
        "resources": {
            "css": [
                { "uri": "../../../../../ZELIB/normalize.css/normalize.css" },
                { "uri": "../../../../../ZEBASE_CTRL/build/ute/ui/base/asset/css/base.css" },
                { "uri": "../../../../../ZEBASE/build/nrg/base/asset/css/base.css" }
            ]
        },

        "rootView": {
            "viewName": "nrg.module.app.view.CcuxApp",
            "type": "XML"
        },

        "routing": {
            "routes": {
                "notFound": {
                    "pattern": "{all*}",
                    "target": [ "others.GeneralEmpty", "others.SummaryEmpty", "others.ToolsEmpty" ]
                }
            },
            "config": {
                "routerClass": "nrg.base.component.Router",
                "viewType": "XML",
                "controlAggregation": "content",
                "clearControlAggregation": true
            }
        }
    }
}
```

***
## Global settings ##
**Git setting**

Add the following entry to the `.gitignore` file in root folder to prevent Git from uploading the component `build/` folder to the remote repository. **Please make sure that you add this entry before performing the first build for your component**.

```
/<component folder>/build/
```

> where
>
> `component folder` is the folder name of your component such as ZECMP_IC

##

**Full build**

Add the following entry to the `build.bat` file in root folder so that when someone performs a full [build](build.md#markdown-header-control), this control library will be included as part of the build.

```
#!batch
@CALL grunt --build=component --componentName=<component ui5 namespace> --componentFolder=<component folder>
```

> where
>
> `component ui5 namespace` is the UI5 namespace for your component such as nrg.component.ic
>
> `component folder` is the folder name of your control library such as ZECMP_IC

##

Add the following entry to the `build.sh` file in root folder for folks that are using \*nix based operating systems.

```
#!sh
grunt --build=component --componentName=<component ui5 namespace> --componentFolder=<component folder>
```

> where
>
> `component ui5 namespace` is the UI5 namespace for your component such as nrg.component.ic
>
> `component folder` is the folder name of your control library such as ZECMP_IC

##

**Deploy**

Add the following entry to the `deploy.bat` file in root folder so that when someone performs a [deploy](build.md##markdown-header-grunt-deploy-tasks), this component will be included as part of the deployment.

```
#!batch
@IF EXIST %ECLIPSE_WORKSPACE_PATH%\<component folder> (
    @CALL grunt --deploy=component --componentName=<component ui5 namespace> --componentFolder=<component folder> --eclipseProjectPath=%ECLIPSE_WORKSPACE_PATH%\<component folder>
) ELSE (
    @ECHO Path %ECLIPSE_WORKSPACE_PATH%\<component folder> does not exists.
)
```

> where
>
> `component ui5 namespace` is the UI5 namespace for your component such as nrg.component.ic
>
> `component folder` is the folder name of your control library such as ZECMP_IC
