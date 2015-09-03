# Control
Controls consist mainly of reusable UI elements such as button and checkbox.

How to create a new control library:

1. [Pick a UI5 namespace](#markdown-header-ui5-namespace-for-control).
1. [Create the control library folder](#markdown-header-control-library-folder).
1. [Add in stylesheet](#markdown-header-stylesheet).
1. [Add in documentation](#markdown-header-documentation).
1. [Add in content](#markdown-header-content).
1. [Setup CCUX global settings](#markdown-header-global-settings).

***
## UI5 namespace for control
UI5 namespace is a way for the framework to uniquely identifies a particular resource. In our case, everything that falls under a particular control library will be namespaced after that control library. The UI5 namespace for a control library starts with the keyword `ute.ui.` follows by a `control library identifier`.

##

```
ute.ui.<control library identifier>
```

> where
>
> `control library identifier` is a unique keyword that identifies the control library such as main and commons. The format requirement for a control library identifier is `[a-z]+`. Please make sure that you pick a unique control library identifier by cross checking it against [existing control libraries](../README.md#markdown-header-control).

##

Below are some examples of valid module UI5 namespace:

* ute.ui.main
* ute.ui.commons

***
## Control library folder

### Control library folder name ###
Control library folder is the place where you are going to keep the content for your control library. The folder name starts with `ZECTRL_` follows by a `control library  initial`. The control library folder name needs to be consistent across the Git repository, Eclipse project and SAPUI5 ABAP repository.

##

```
ZECTRL_<control library initial>
```

> where
>
> `control library initial` is a unique initial that identifies the control library such as MAIN or COMMONS. The format requirement for a control library initial is `[A-Z0-9]{1-8}`. The limitation imposed on the total length of a control library folder name is because SAP BSP application name supports up to 15 characters only.

##

Below are some examples of valid control library folder name:

* ZECTRL_MAIN
* ZECTRL_COMMONS

### Control library folder structure ###
It is important to keep folder structure consistent among all control libraries. This allows the [Grunt build](build.md) to locate files it needs for processing. Below is the initial folder structure for a new control library:

```
<control library folder name>/
└── src/
    └── ute/
        └── ui/
            └── <control library identifier>/
                ├── doc/
                └── themes/
                    ├── base/
                    └── sap_bluecrystal/
```

> where
>
> `control library folder name` refers to the [folder described here](#markdown-header-control-library-folder-name).
>
> `control library identifier` refers to the [keyword described here](#markdown-header-ui5-namespace-for-control).

##

Folder | General idea of its purpose                                  | Support subfolder
------ | ------------------------------------------------------------ | ------------------
doc    | Keep all the documentations related to the control library.  | Yes
themes | Keep all the stylesheets. Each subfolder represents a theme. | Yes

***
## Documentation
Documentations that are specific to a particular control library are stored within the control library itself. The documentation is to be written in [Markdown](https://bitbucket.org/tutorials/markdowndemo/src) format. This gives us the ability to integrate the documentations to the Git repository in a Wiki-like fashion.

##

The minimum requirement is to create the `README.md` and `doc/CHANGELOG.md` files. Git repositories such as Bitbucket and Github renders the content of `README.md` automatically when it sees one. There is no hard rules on what to put in `README.md`. A general rule of thumb is to focus on the quirks of the control library and guidelines on how to use each controls. As for `CHANGELOG.md`, please follow the guidelines provided by [Keep a CHANGELOG](http://keepachangelog.com/) to determine what to put in `CHANGELOG.md`. You can use `doc/` to keep additional assets such as images that are relevant to the documentation of the control library.

##

```
<control library folder name>/
└── src/
    └── ute/
        └── ui/
            └── <control library identifier>/
                ├── doc/
                |   └── CHANGELOG.md
                └── README.md
```

***
## Stylesheet
We are using [LESS](http://lesscss.org/) for control library related CSS development. LESS allows us to use a shared set of style guides and also to optimize the generated CSS.

##

All stylesheets are stored in their theme folders. The minimum requirement is to have the `library.less` file created under each theme folders. The [Grunt build](build.md) will be looking for this file to determine what to do with the control library stylesheets.

```
<control library folder name>/
└── src/
    └── ute/
        └── ui/
            └── <control library identifier>/
                ├── doc/
                └── themes/
                    ├── base/
                    |   └── library.less
                    |
                    └── sap_bluecrystal/
                        └── library.less
```

##

**base theme folder**

Add the following baseline references at the beginning of your `library.less` file. This allows you to use LESS variables based on style guides in your control library.

```
@import "../../../../../../../ZEBASE_CTRL/src/ute/ui/base/asset/css/color.less";
@import "../../../../../../../ZEBASE_CTRL/src/ute/ui/base/asset/css/typography.less";
```
> Always make an effort to stick to style guides especially on matters such as color and typography.

##

There is no hard limit on how many `*.less` to create but the general rule of thumb is to create one `*.less` for each control, then add it into `base\library.less` as a dependency. For instance:

```
@import "../../../../../../../ZEBASE_CTRL/src/ute/ui/base/asset/css/color.less";
@import "../../../../../../../ZEBASE_CTRL/src/ute/ui/base/asset/css/typography.less";

@import "control/Button.less";
@import "control/TabBar.less";
```

##

All CSS classes must be namespaced by the control library. This is to avoid unnecessary conflict and overriding other CSS. As for naming convention, the general format is `<control namespace><block>-<element>-<modifier>`. Please refer to [BEM naming convention](http://getbem.com/naming/) for the definition of block, element and modifier. For instance:

```
.uteMBtn {
    & .uteMBtn-text {
        font-size: @uteFontSize-small;
        vertical-align: middle;
        text-align: center;
        padding: 3.5px 0;
    }

    &.uteMBtn-design-default {
        min-width: 82px;
        min-height: 28px;
        background-color: @uteColor-blue-link;
        color: @uteColor-white;
    }
}
```

##

**sap_bluecrystal theme folder**

Add the following entry to your `sap_bluecrystal\library.less`. This allows you to create a dependency to the base theme so that when CCUX application loads the SAP Blue Crystal theme, the base CCUX theme will be loaded. We are not designing the screen based on SAP Blue Crystal theme but the components are loading this theme so that if we are using any standard UI5 controls, they will be displayed correctly because the stylesheets for standard controls are loaded properly.

```
@import "../base/library.less";
```

***
## Content
In order for OpenUI5 to recognize this as a control library, you will need to create a `library.js` file.

> Please refer to [OpenUI5 Javascript coding guidelines](https://github.com/SAP/openui5/blob/master/docs/guidelines.md#javascript-coding-guidelines) for [naming conventions](https://github.com/SAP/openui5/blob/master/docs/guidelines.md#naming-conventions) and [class creation](https://github.com/SAP/openui5/blob/master/docs/guidelines.md#creating-classes). Also, keep in mind that the [Grunt build](build.md) will be screening your Javascript codes for best practices with [JSHint](http://jshint.com/).

```
<control library folder name>/
└── src/
    └── ute/
        └── ui/
            └── <control library identifier>/
                └── library.js
```

##

This will be the template for your `library.js`:

```
/*global sap, ute*/

sap.ui.define(
    [],

    function () {
        'use strict';

        sap.ui.getCore().initLibrary({
            name: '<control library ui5 namespace>',
			version: '1.0.0',
			dependencies: [
                'sap.ui.core'
            ]
        });

        return <control library ui5 namespace>;
    },

    true
);
```

> where
>
> `control library ui5 namespace` is the UI5 namespace for your control library such as ute.ui.main

##

**Control**

Please refer to [OpenUI5 control API and behavior development guide](https://github.com/SAP/openui5/blob/master/docs/controllibraries.md#the-control-api-and-behavior). Below will be the starting template for your new control:

```
#!js
/*global sap, ute*/

sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        'use strict';

        var CustomControl = Control.extend('ute.ui.main.Button', {
            metadata: {
                library: 'ute.ui.main'
            }
        });

        return CustomControl;
    },

    true
);
```

##

**Control Renderer**

Please refer to [OpenUI5 control renderer development guide](https://github.com/SAP/openui5/blob/master/docs/controllibraries.md#the-control-renderer). Below will be the template for your new control renderer:

```
#!js
/*global sap*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var CustomRenderer = {};

        CustomRenderer.render = function (oRm, oCustomControl) {
            oRm.write('<div');
            oRm.writeControlData(oCustomControl);
            oRm.writeClasses();
            oRm.write('>');

            /* Content rendering */

            oRm.write('</div>');
        };

        return CustomRenderer;
    },

    true
);

```

***
## Global settings
**Git setting**

Add the following entry to the `.gitignore` file in root folder to prevent Git from uploading the control library `build/` folder to the remote repository. **Please make sure that you add this entry before performing the first build for your control library**.

```
/<control library folder>/build/
```

> where
>
> `control library folder` is the folder name of your control library such as ZECTRL_MAIN

##

**Full build**

Add the following entry to the `build.bat` file in root folder so that when someone performs a full [build](build.md#markdown-header-control), this control library will be included as part of the build.

```
#!batch
@CALL grunt --build=control --controlLibrary=<control library ui5 namespace> --controlFolder=<control library folder>
```

> where
>
> `control library ui5 namespace` is the UI5 namespace for your control library such as ute.ui.main
>
> `control library folder` is the folder name of your control library such as ZECTRL_MAIN

##

Add the following entry to the `build.sh` file in root folder for folks that are using \*nix based operating systems.

```
#!sh
grunt --build=control --controlLibrary=<control library ui5 namespace> --controlFolder=<control library folder>
```

> where
>
> `control library ui5 namespace` is the UI5 namespace for your control library such as ute.ui.main
>
> `control library folder` is the folder name of your control library such as ZECTRL_MAIN

##

**Deploy**

Add the following entry to the `deploy.bat` file in root folder so that when someone performs a [deploy](build.md##markdown-header-grunt-deploy-tasks), this control library will be included as part of the deployment.

```
#!batch
@IF EXIST %ECLIPSE_WORKSPACE_PATH%\<control library folder> (
    @CALL grunt --deploy=control --controlFolder=<control library folder> --controlName=<control library ui5 namespace> --eclipseProjectPath=%ECLIPSE_WORKSPACE_PATH%\<control library folder>
) ELSE (
    @ECHO Path %ECLIPSE_WORKSPACE_PATH%\<control library folder> does not exists.
)
```

> where
>
> `control library ui5 namespace` is the UI5 namespace for your control library such as ute.ui.main
>
> `control library folder` is the folder name of your control library such as ZECTRL_MAIN
