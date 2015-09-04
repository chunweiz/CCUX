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


```
<component folder name>/
└── src/
    └── nrg/
        └── component/
            └── <component identifier>/
                ├── Component.js
                └── index.html
```

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

            //Instantiation sequence should not be important
            this._oWebUiManager = new WebUiManager(this);
            this._oContextManager = new ContextManager(this);
            this._oStylesheetManager = new StylesheetManager(this);
            this._oResourceBundleManager = new ResourceBundleManager(this);
            this._oIconManager = new IconManager(this);
            this._oRealDataManager = new RealDataManager(this);
            this._oMockDataManager = new MockDataManager(this);
            this._oRouteManager = new RouteManager(this);
            this._oNotificationManager = new NotificationManager(this);

            //Initialization sequence is important due to inter manager dependencies
            this._oWebUiManager.start();
            this._oContextManager.init(); //Depending on WebUiManager
            this._oNotificationManager.init();
            this._oRealDataManager.addODataModels();
            this._oMockDataManager.startMockServers();
            this._oMockDataManager.addMockODataModels();
            this._oResourceBundleManager.addResourceModels();
            this._oStylesheetManager.addStylesheets();
            this._oIconManager.addIcons();
            this._oRouteManager.init();  //Depending on WebUiManager
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

```
<component folder name>/
└── src/
    └── nrg/
        └── component/
            └── <component identifier>/
                └── manifest.json
```

***
## Global settings ##
