# Module
Module is a logical grouping of related business content such as billing and campaign. Generally, it is used to create a unique UI5 namespace and to store the XML views, controllers, stylesheets, mock data, documentations, translation files and configurations such as routing.

How to create a new module:

1. [Pick a UI5 namespace](#markdown-header-ui5-namespace-for-module).
1. [Create the module folder](#markdown-header-module-folder).
1. [Add in stylesheet](#markdown-header-stylesheet).
1. [Add in mock data](#markdown-header-mock-data). This is optional.
1. [Add in documentation](#markdown-header-documentation).
1. [Add in translation](#markdown-header-translation).
1. [Add in content](#markdown-header-view).
1. [Add in module descriptor](#markdown-header-module-descriptor).
1. [Setup CCUX global settings](#markdown-header-global-settings).

***
## UI5 namespace for module ##
UI5 namespace is a way for the framework to uniquely identifies a particular resource. In our case, everything that falls under a particular module will be namespaced after that module. The UI5 namespace for a module starts with the keyword `nrg.module.` follows by a `module identifier`.

##

```
nrg.module.<module identifier>
```

> where
>
> `module identifier` is a unique keyword that identifies the module such as billing, campaign or dashboard. The format requirement for a module identifier is `[a-z]+`. Please make sure that you pick a unique module identifier by cross checking it against [existing modules](../README.md#markdown-header-module).

##

Below are some examples of valid module UI5 namespace:

* nrg.module.billing
* nrg.module.campaign
* nrg.module.dashboard

***
## Module folder

### Module folder name ###
Module folder is the place where you are going to keep the content for your module. The folder name starts with `ZEMOD_` follows by a `module initial`. The module folder name needs to be consistent across the Git repository, Eclipse project and SAPUI5 ABAP repository.

##

```
ZEMOD_<module initial>
```

> where
>
> `module initial` is a unique initial that identifies the module such as BILLING, CMPGN or DSHB. The format requirement for a module initial is `[A-Z0-9]{1-9}`. The limitation imposed on the total length of a module folder name is because SAP BSP application name supports up to 15 characters only.

##

Below are some examples of valid module folder name:

* ZEMOD_BILLING
* ZEMOD_CMPGN
* ZEMOD_DSHB

### Module folder structure ###
It is important to keep folder structure consistent among all modules. This allows the [Grunt build](build.md) to locate files it needs for processing. Below is the initial folder structure for a new module:

```
<module folder name>/
└── src/
    └── nrg/
        └── module/
            └── <module identifier>/
                ├── asset/
                |   └── css/
                ├── data/
                ├── doc/
                ├── i18n/
                └── view/
```

> where
>
> `module folder name` refers to the [folder described here](#markdown-header-module-folder-name).
>
> `module identifier` refers to the [keyword described here](#markdown-header-ui5-namespace-for-module).

##

Folder | General idea of its purpose                                                                                              | Support subfolder
------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------
asset  | Mainly used to store stylesheets. You can also use it to store resources such as images that are specific to the module. | Yes
data   | Keep all the mock resources such as OData metadata.xml and mock data for entities.                                       | Yes
doc    | Keep all the documentations related to the module.                                                                       | Yes
i18n   | Keep all the translation files.                                                                                          | No
view   | Keep all module content related development objects such as views, fragments and controllers.                            | Yes

***
## Stylesheet
We are using [LESS](http://lesscss.org/) for module related CSS development. LESS allows us to use a shared set of style guides and also to optimize the generated CSS.

##

All stylesheets are stored under `asset/css/` folder. The minimum requirement is to have the `module.less` file created under `asset/css/`. The [Grunt build](build.md) will be looking for this file to determine what to do with the module stylesheets.

```
<module folder name>/
└── src/
    └── nrg/
        └── module/
            └── <module identifier>/
                └── asset/
                    └── css/
                        └── module.less
```

##

Add the following baseline references at the beginning of your `module.less` file. This allows you to use LESS variables based on style guides in your module.

```
@import '../../../../../../../ZEBASE/src/nrg/base/asset/css/color.less';
@import '../../../../../../../ZEBASE/src/nrg/base/asset/css/typography.less';
```
> Always make an effort to stick to style guides especially on matters such as color and typography.

##

There is no hard limit on how many `*.less` to create but the general rule of thumb is to create one `*.less` for each view or fragment, then add it into `module.less` as a dependency. For instance:

```
@import '../../../../../../../ZEBASE/src/nrg/base/asset/css/color.less';
@import '../../../../../../../ZEBASE/src/nrg/base/asset/css/typography.less';

@import 'BillingCheckbook.view.less';
@import 'BillingBillingInfo.view.less';
@import 'BillingPrePaidBilling.view.less';
@import 'BillingHighBill.view.less';
@import 'BillingCheckbookTools.view.less';
```

##

All CSS classes must be namespaced by the module. This is to avoid unnecessary conflict and overriding other CSS. As for naming convention, the general format is `<module namespace><block>-<element>-<modifier>`. Please refer to [BEM naming convention](http://getbem.com/naming/) for the definition of block, element and modifier. For instance:

```
.nrgBilling {

    & .nrgBilling-content {
        background-color: @nrgColor-blue-link;

        &.nrgBilling-content-disabled {
            background-color: @nrgColor-grey-light;
        }
    }
}
```

***
## Mock data
We are using [OpenUI5 mock server](https://openui5.hana.ondemand.com/#docs/guide/3459c372aaaa4c31ab87bb0e174adcc3.html) to mock OData services so that we can test our development locally on our machine and to circumvent the lack of test data in SAP development environment.

##

All mock data are stored under `data/` folder. There only requirement is to place the OData `metadata.xml` in the same folder as your mock entity set `*.json` files. For instance:

```
<module folder name>/
└── src/
    └── nrg/
        └── module/
            └── <module identifier>/
                └── data/
                    ├── test_scenario_001/
                    |   ├── metadata.xml
                    |   ├── CustomerSet.json
                    |   ├── AgentSet.json
                    |   └── ProductSet.json
                    |
                    └── test_scenario_002/
                        ├── metadata.xml
                        ├── EmployeeSet.json
                        └── CompanySet.json
```

***
## Documentation
Documentations that are specific to a particular module are stored within the module itself. The documentation is to be written in [Markdown](https://bitbucket.org/tutorials/markdowndemo/src) format. This gives us the ability to integrate the documentations to the Git repository in a Wiki-like fashion.

##

The minimum requirement is to create the `README.md` and `doc/CHANGELOG.md` files. Git repositories such as Bitbucket and Github renders the content of `README.md` automatically when it sees one. There is no hard rules on what to put in `README.md`. A general rule of thumb is to focus on the quirks of the module. As for `CHANGELOG.md`, please follow the guidelines provided by [Keep a CHANGELOG](http://keepachangelog.com/) to determine what to put in `CHANGELOG.md`. You can use `doc/` to keep additional assets such as images that are relevant to the documentation of the module.

##

```
<module folder name>/
└── src/
    └── nrg/
        └── module/
            └── <module identifier>/
                ├── doc/
                |   └── CHANGELOG.md
                └── README.md
```

> Do not treat the documentation as a place to provide general development tutorials. Focus on how you have used a particular feature in your module development and why. For instance, if you have used UI5 EventBus to communicate, document down the channels used, why you used, behaviors, etc ... do not document down how to use EventBus.

***
## Translation
All `*.properties` files are stored under `i18n/`. They are based on [Java properties files](https://openui5.hana.ondemand.com/#docs/guide/91f225ce6f4d1014b6dd926db0e91070.html) The [Grunt build](build.md) compiles all the `*.properties` files in `i18n/` and generates a new set of `module*.properties` files.

##

```
<module folder name>/
└── src/
    └── nrg/
        └── module/
            └── <module identifier>/
                └── i18n/
                    └── *.properties
```

##

At the moment, there is no rule on how many `*.properties` file to be created but it would be good if you can try to create one for each view and fragment. The key of each entry in your `*.properties` needs to be in `camelCase`. It is advisable to namespace the key to `nrg<module identifier><key>` to avoid any unnecessary conflict.

```
#!properties
nrgBillingKey=Value
```

***
## View
This is the place to store the content and business logic. XML based [view](https://openui5.hana.ondemand.com/#docs/guide/e3b5323649b44d9a883a6233fb01ee9d.html) and [fragment](https://openui5.hana.ondemand.com/#docs/guide/d6af195124cf430599530668ddea7425.html) should be your default choice.

```
<module folder name>/
└── src/
    └── nrg/
        └── module/
            └── <module identifier>/
                └── view/
                    ├── *.js
                    ├── *.controller.js
                    ├── *.fragment.xml
                    └── *.view.xml
```

##

This is how the boilerplate codes of your XML view looks like. We are using quite a lot of plain HTML, so the default XML namespace is reserved for HTML. If you are using events in your XML view, please remember to add the [dot (.)](https://openui5.hana.ondemand.com/#docs/guide/b0fb4de7364f4bcbb053a99aa645affe.html) in the event handler of your XML view.

```
<mvc:View
    controllerName="nrg.module.sample.view.Overview"
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:mvc="sap.ui.core.mvc">

    <!-- Content -->

</mvc:View>
```

##

This is how the boilerplate codes of your controller looks like. We are using AMD style to load all the necessary dependencies and it should be your default way in loading your dependencies.

```
/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller'
    ],

    function (Controller) {
        'use strict';

        var CustomController = Controller.extend('nrg.module.sample.view.Overview');

        return CustomController;
    }
);
```

Please refer to [OpenUI5 Javascript coding guidelines](https://github.com/SAP/openui5/blob/master/docs/guidelines.md#javascript-coding-guidelines) for [naming conventions](https://github.com/SAP/openui5/blob/master/docs/guidelines.md#naming-conventions) and [class creation](https://github.com/SAP/openui5/blob/master/docs/guidelines.md#creating-classes). Also, keep in mind that the [Grunt build](build.md) will be screening your Javascript codes for best practices with [JSHint](http://jshint.com/).

***
## Module descriptor
The `manifest.json` file is the place for you to declare module related settings such as routes and OData services.

```
src/
└── nrg/
    └── module/
        └── <module identifier>/
            └── manifest.json
```

##

**Stylesheets**

This is the place for you to register the stylesheets that you would like to load when the CCUX application starts. It is relative to the `build/` folder and by default, you should add in `asset/css/module.css` entry.

```
{
    "sap.ui5": {
        "config": {
            "module": {
                "<module ui5 namespace>": {
                    "stylesheet": [
                        "asset/css/module.css"
                    ]
                }
            }
        }
    }
}
```

> where
>
> `module ui5 namespace` is the UI5 namespace for your module such as nrg.module.billing

##

**Resource bundles**

This is the place for you to register your translation file. A [resource model](https://github.com/SAP/openui5/blob/master/src/sap.ui.core/src/sap/ui/model/resource/ResourceModel.js) will be created and stored in the component for each key-value pair in `resourceBundle`. The key serves as the name of your model. By default, you should add an entry with the following key-value pair. The `*.properties` file path is relative to the `build/` folder.

```
{
    "sap.ui5": {
        "config": {
            "module": {
                "<module ui5 namespace>": {
                    "resourceBundle": {
                        "comp-i18n-<module identifier>": "i18n/module.properties"
                    }
                }
            }
        }
    }
}
```

> where
>
> `module ui5 namespace` is the UI5 namespace for your module such as nrg.module.billing
>
> `module identifier` is a unique keyword that identifies the module such as billing

##

**Actual OData services**

You will add an entry here if you would like CCUX to preload the OData service when the application starts. A [OData model](https://github.com/SAP/openui5/blob/master/src/sap.ui.core/src/sap/ui/model/odata/v2/ODataModel.js) will be created and stored in the component for each key-value pair in `odata.real`. The key serves as the name of the model. At the moment, it supports only OData services that are coming from SAP NW Gateway, hence the hard coded initial path of `sap/opu/odata/sap/`.

```
{
    "sap.ui5": {
        "config": {
            "module": {
                "<module ui5 namespace>": {
                    "odata": {
                        "real": {
                            "comp-<module identifier>": {
                                "url": "sap/opu/odata/sap/<odata service name/"
                            }
                        }
                    }
                }
            }
        }
    }
}
```

> where
>
> `module ui5 namespace` is the UI5 namespace for your module such as nrg.module.billing
>
> `module identifier` is a unique keyword that identifies the module such as billing
>
> 'odata service name' is the external service name of your SAP NW Gateway OData service such as ZE_CCUX_BILLING_SRV

##

**Mock OData services**

You will add an entry here if you would would like to use mock OData services. A [OData model](https://github.com/SAP/openui5/blob/master/src/sap.ui.core/src/sap/ui/model/odata/v2/ODataModel.js) will be created and stored in the component for each key-value pair entry in `odata.mock`. The key serves as the name of the model. The mock OData models will be created after the actual OData models. So, if you have a mock OData service that shares the same name as the actual OData service, the actual OData service will be replaced.

> Mock OData services will only be activated if you add `nrg-mock=true` as part of CCUX application URL parameters.

```
{
    "sap.ui5": {
        "config": {
            "module": {
                "<module ui5 namespace>": {
                    "odata": {
                        "mock": {
                            "comp-<module identifier>": {
                                "mockDataBaseUrl": "<mock base url>",
                                "generateMissingMockData": <generate missing mock data>
                            }
                        }
                    }
                }
            }
        }
    }
}
```

> where
>
> `module ui5 namespace` is the UI5 namespace for your module such as nrg.module.billing
>
> `module identifier` is a unique keyword that identifies the module such as billing
>
> `mock base url` is the relative path to your mock data such as data/devtest/
>
> `generate missing mock data` is a boolean value. If it is set to `true`, random data will be generated for each entity in the `metadata.xml` that does not has a corresponding `*.json` entity set file


##

**Routing**

This is the place for you to declare all the routes and targets for your module. All the routes, patterns and targets must be namespaced after your module to make sure they are unique throughout the CCUX application. By default, registered views are assumed to be XML views. For instance:

```
{
    "sap.ui5": {
        "routing": {
            "routes": {
                "<module identifier>.overview": {
                    "pattern": "<module identifier>/overview",
                    "target": [
                        "<module identifier>.GeneralOverview",
                        "<module identifier>.SummaryOverview",
                        "<module identifier>.ToolsOverview"
                    ]
                }
            },
            "targets": {
                "<module identifier>.GeneralOverview": {
                    "viewName": "<module ui5 namespace>.view.General",
                    "controlId": "idAppGeneral"
                },
                "<module identifier>.SummaryOverview": {
                    "viewName": "<module ui5 namespace>.view.Summary",
                    "controlId": "idAppSummary"
                },
                "<module identifier>.ToolsOverview": {
                    "viewName": "<module ui5 namespace>.view.Tools",
                    "controlId": "idAppTools"
                }
            }
        }
    }
}
```
> where
>
> `module ui5 namespace` is the UI5 namespace for your module such as nrg.module.billing
>
> `module identifier` is a unique keyword that identifies the module such as billing

***
## Global settings
**Git setting**

Add the following entry to the `.gitignore` file in root folder to prevent Git from uploading the module `build/` folder to the remote repository. **Please make sure that you add this entry before performing the first build for your module**.

```
/<module folder>/build/
```

> where
>
> `module folder` is the folder name of your module such as ZEMOD_BILLING

##

**Full build**

Add the following entry to the `build.bat` file in root folder so that when someone performs a full [build](build.md#markdown-header-module), this module will be included as part of the build.

```
#!batch
@CALL grunt --build=module --moduleName=<module ui5 namespace> --moduleFolder=<module folder>
```

> where
>
> `module ui5 namespace` is the UI5 namespace for your module such as nrg.module.billing
>
> `module folder` is the folder name of your module such as ZEMOD_BILLING

##

Add the following entry to the `build.sh` file in root folder for folks that are using \*nix based operating systems.

```
#!sh
grunt --build=module --moduleName=<module ui5 namespace> --moduleFolder=<module folder>
```

> where
>
> `module ui5 namespace` is the UI5 namespace for your module such as nrg.module.billing
>
> `module folder` is the folder name of your module such as ZEMOD_BILLING

##

**Deploy**

Add the following entry to the `deploy.bat` file in root folder so that when someone performs a [deploy](build.md##markdown-header-grunt-deploy-tasks), this module will be included as part of the deployment.

```
#!batch
@IF EXIST %ECLIPSE_WORKSPACE_PATH%\<module folder> (
    @CALL grunt --deploy=module --moduleName=<module ui5 namespace> --moduleFolder=<module folder> --eclipseProjectPath=%ECLIPSE_WORKSPACE_PATH%\<module folder>
) ELSE (
    @ECHO Path %ECLIPSE_WORKSPACE_PATH%\<module folder> does not exists.
)
```

> where
>
> `module ui5 namespace` is the UI5 namespace for your module such as nrg.module.billing
>
> `module folder` is the folder name of your module such as ZEMOD_BILLING
