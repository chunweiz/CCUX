# Module
Module is a logical grouping of related business content such as billing and campaign. Generally, it is used to create a unique UI5 namespace and to store the XML views, controllers, stylesheets, mock data, documentations, translation files and configurations such as routing.

How to introduce a new module:

1. Pick a [UI5 namespace](#markdown-header-module-ui5-namespace).
1. Create a [module folder](#markdown-header-module-folder).
1. Add in [stylesheet](#markdown-header-stylesheets).
1. Add in [translation file](#markdown-header-translation-files).
1. Add in [configuration file](#markdown-header-configuration).
1. Add in [documentations](#markdown-header-documentation).

***
## Module UI5 namespace ##
A UI5 namespace is a way for the framework to uniquely identifies a particular resource. In our case, everything that falls under a particular module will be namespaced after that module. The UI5 namespace for a module starts with `nrg.module.` follows by a `module identifier`.

##

```
nrg.module.<module identifier>
```

> where
>
> `module identifier` is a unique keyword that identifies the module such as billing, campaign or dashboard. The format requirement for a module identifier is `[a-z]+`. Please make sure that you are using a unique module identifier for your module by cross checking it against [existing modules](../README.md#markdown-header-module).


Below are some examples of valid module UI5 namespace:

* nrg.module.billing
* nrg.module.campaign
* nrg.module.dashboard

***
## Module folder

### Module folder name ###
The naming convention for a module folder is as follows. This is because SAP BSP application name accommodates up to 15 characters only.


Regular expression syntax for a module folder is as follows:

```
ZEMOD_[a-zA-Z0-9_]{1,9}
```

Below are some examples of valid module folder name:

* ZEMOD_BILLING
* ZEMOD_CMPGN
* ZEMOD_DSHB



### Module folder structure ###

```
src/
└── nrg/
    └── module/
        └── <module identifier>/
            ├── asset/
            |   └── css/
            |       └── module.less
            ├── data/
            ├── doc/
            |   └── CHANGELOG.md
            ├── i18n/
            ├── view/
            ├── manifest.json
            └── README.md
```

> where
>
> `module ui5 namespace path` is the folder structure path based on the [UI5 namespace][#markdown-header-module-ui5-namespace]. For instance, the folder path for nrg.module.billing will be nrg/module/billing.

## Stylesheet


## Translation


## Configuration


## Documentation
