# Build
This section details how CCUX build system works. You might have performed your first build from [here](getting_started.md/#markdown-header-first-build) and wonder what was going on.

> Please make sure that you have installed all the necessary [build modules](getting_started.md/#markdown-header-install-build-modules).

***
## Overview
CCUX build system primary goal is to generate an optimized set of application files. On a high level, this is done by transforming the actual source files through a series of compression, mangling, concatenation and preprocessing. CCUX is using [Grunt](http://gruntjs.com/) to achieve this. You can refer to [Getting started with Grunt](http://gruntjs.com/getting-started) to find out more about Grunt.

CCUX grunt build is divided into four main scenarios:

* [Module](#markdown-header-module)
* [Control](#markdown-header-control)
* [Baseline](#markdown-header-baseline)
* [Component](#markdown-header-component)

Depending on what you need to build, you would need to run Grunt for that particular scenario. When you run one of the build scenario, a `build` folder will be generated in the respective root folder of the scenario.

> You can run `build.bat` on Windows or `build.sh` on Mac from the local root folder of your CCUX application to build the entire application. The build script covers all scenarios.
>
> **Do not** push the generated `build` folder to CCUX remote Git repository. You can always generate the build locally.

***
## Module
The Grunt build for module will perform the following tasks:

* Javascript code quality check through [JSHint](http://jshint.com/about/).
* Clean up respective module build folder.
* Minify and mangle Javascript files.
* Add suffix -dbg to selected Javascript files for sap-ui-debug=true purpose.
* Optimize and compile LESS files to CSS.
* Minify XML and HTML files.
* Concatenate properties files.
* Compress JSON files.
* Copy selected files to build folder.

> The Grunt build for module is maintained at `grunt\build\module.js`.

In order to invoke Grunt to build a module, open your command prompt and navigate to your local CCUX repository root folder where the `Gruntfile.js` resides. Type the following command:

```
#!batch
grunt --build=module --moduleName=<module ui5 namespace> --moduleFolder=<module folder>
```

> where
>
> `module ui5 namespace` is the UI5 namespace for your module such as nrg.module.app
> `module folder` is the folder name of your module such as ZEMOD_APP

This is how a generated build structure for a module typically looks like:

```
├── build/<module ui5 namespace path>/
|   ├── asset/
|   |   ├── css/
|   |   |   └── module.css
|   |   └── data/
|   |       ├── **/*.json
|   |       └── **/*.xml
|   ├── i18n/
|   |   ├── module.properties
|   |   ├── module_en.properties
|   |   └── module_en_US.properties
|   └── view/
|       ├── *-dbg*.js
|       ├── *.js
|       └── *.xml
```

***
## Control
The Grunt build for control library will perform the following tasks:

* Javascript code quality check through [JSHint](http://jshint.com/about/).
* Clean up respective control library build folder.
* Minify and mangle Javascript files.
* Add suffix -dbg to selected Javascript files for sap-ui-debug=true purpose.
* Optimize and compile LESS files to CSS.
* Generate library-preload file.
* Copy selected files to build folder.

> The Grunt build for control is available at `grunt\build\control.js`.

In order to invoke Grunt to build a control library, open your command prompt and navigate to your local CCUX repository root folder where the `Gruntfile.js` resides. Type the following command:

```
#!batch
grunt --build=control --controlLibrary=<control library ui5 namespace> --controlFolder=<control library folder>
```

> where
>
> `control library ui5 namespace` is the UI5 namespace for your control library such as ute.ui.main
> `control library folder` is the folder name of your control library such as ZECTRL_MAIN

This is how a generated build structure for a control library typically looks like:

```
├── build/<control library ui5 namespace path>/
|   ├── themes/
|   |   ├── base/
|   |   |   └── library.css
|   |   └── sap_bluecrystal/
|   |       └── library.css
|   ├── *-dbg.js
|   ├── *.js
|   ├── library-dbg.js
|   ├── library.js
|   └── library-preload.json
```

***
## Baseline
The Grunt build for baseline will perform the following tasks:

* Javascript code quality check through [JSHint](http://jshint.com/about/).
* Clean up respective baseline build folder.
* Minify and mangle Javascript files.
* Add suffix -dbg to selected Javascript files for sap-ui-debug=true purpose.
* Optimize and compile LESS files to CSS.
* Compress JSON files.
* Copy selected files to build folder.

> The Grunt build for baseline is available at `grunt\build\base.js`.

In order to invoke Grunt to build a baseline, open your command prompt and navigate to your local CCUX repository root folder where the `Gruntfile.js` resides. Type the following command:

```
#!batch
grunt --build=base --baseFolder=<base folder> --basePath=<base path>
```

> where
>
> `base folder` is the folder name of your baseline such as ZEBASE_CTRL
> `base path` is the path to your baseline based on UI5 namespace such as ute/ui

There is no predefined folder structure for baseline. Hence, the Grunt build for baseline will just create a build folder structure which is identical to the source folder structure.

***
## Component
The Grunt build for component is special in the sense that it is specific to the respective component. This is because each components need to determine what modules to include, which routes are permitted, type of customizations required, etc ...

Having said that, a Grunt build for component should at least perform the following tasks:

* Javascript code quality check through [JSHint](http://jshint.com/about/).
* Clean up respective component build folder.
* Minify and mangle Javascript files.
* Add suffix -dbg to selected Javascript files for sap-ui-debug=true purpose.
* Merge and compress multiple manifest.json files.
* Minify index.html.
* Generate Component-preload file.

> The Grunt build for respective components are available at `grunt\build\component\<component ui5 namespace>.js`.

This is how a generated build structure for a component typically looks like:

```
├── build/<component ui5 namespace path>/
│   ├── Component-dbg.js
|   ├── Component-preload.js
|   ├── Component.js
|   ├── index.html
|   └── manifest.json
```
