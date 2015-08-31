# Build
This section details how CCUX build system works. You might have performed your first build from [here](getting_started.md/#markdown-header-first-build) and wondered what was going on.

> Please make sure that you have installed all the necessary [build modules](getting_started.md/#markdown-header-install-build-modules).

***
## Overview
CCUX build system primary goal is to generate an optimized set of files to run the application. On a high level, this is achieved by transforming the actual source files through a series of compression, mangling and concatenation.

CCUX is using [Grunt](http://gruntjs.com/) to automate its build tasks and the build steps are optimized to the each of the following scenarios:

* [Module](#markdown-header-module)
* [Control](#markdown-header-control)
* [Baseline](#markdown-header-baseline)
* [Component](#markdown-header-component)

When you run one of the build scenario, a `build` folder will be generated in the respective root folder of the scenario.

> You can run `build.bat` on Windows or `build.sh` on Mac from the local root folder of your CCUX application to build the entire application covering all scenarios.
>
> **Do not** push the generated `build` folder to CCUX remote Git repository. Build folder is for deployment.

***
## Module

This is how a generated build structure for a module typically looks like:

```
+-- build/<module ui5 namespace path>
|   +-- asset
|   |   +-- css
|   |   |   +-- module.css
|   +-- i18n
|   |   +-- module.properties
|   |   +-- module_en.properties
|   |   +-- module_en_US.properties
|   +-- view
|   |   +-- *-dbg*.js
|   |   +-- *.js
|   |   +-- *.xml
|   +-- manifest.json
```


***
## Control

This is how a generated build structure for a control library typically looks like:

```
+-- build/<control library ui5 namespace path>
|   +-- themes
|   |   +-- base
|   |   |   +-- library.css
|   |   +-- sap_bluecrystal
|   |   |   +-- library.css
|   +-- *-dbg.js
|   +-- *.js
|   +-- library-dbg.js
|   +-- library.js
|   +-- library-preload.json
```

***
## Baseline

This is how a generated build structure for a baseline typically looks like:

```
+-- build/<baseline ui5 namespace path>
|   +-- themes
|   |   +-- base
|   |   |   +-- library.css
|   |   +-- sap_bluecrystal
|   |   |   +-- library.css
|   +-- *-dbg.js
|   +-- *.js
|   +-- library-dbg.js
|   +-- library.js
|   +-- library-preload.json
```

***
## Component

This is how a generated build structure for a baseline typically looks like:

```
+-- build/<component ui5 namespace path>
|   +-- Component-dbg.js
|   +-- Component-preload.js
|   +-- Component.js
|   +-- index.html
|   +-- manifest.json
```
