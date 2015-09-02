# Module
Module is a logical grouping of related business content such as billing and campaign. Generally, it is used to create a unique UI5 namespace and to store the XML views, controllers, stylesheets, mock data, documentations, translation files and configurations such as routing.

How to create a new module:

1. Pick a [UI5 namespace](#markdown-header-ui5-namespace-for-module).
1. Create a [module folder](#markdown-header-module-folder).
1. Add in [stylesheet](#markdown-header-stylesheets).
1. Add in [translation file](#markdown-header-translation-files).
1. Add in [configuration file](#markdown-header-configuration).
1. Add in [documentations](#markdown-header-documentation).

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
Module folder is the place where you are going to keep all content for your module. The folder name starts with `ZEMOD_` follows by a `module initial`. The module folder name is consistent across the Git repository, Eclipse project and SAPUI5 ABAP repository.

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
The folder structure is consistent among modules. This allows the [Grunt build](build.md) to locate the files it needs for processing. Below is how your initial folder structure of your module looks like:

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
> `module folder name` refers to the [folder described here](#markdown-header-ui5-namespace-for-module).
>
> `module identifier` refers to the [keyword described here](#markdown-header-ui5-namespace-for-module).

##

Folder | General idea of its purpose
------ | --------------------------------------------------------------------------------------------------------------------------------
asset  | This is mainly used to store stylesheets. You can also use it to store resources such as images that are specific to the module.
data   | This is where we keep all the mock resources such as OData metadata.xml and mock data for entities.
doc    | This is where we keep all the documentations related to the module.
i18n   | This is where we keep all the translation files.
view   | This is where we keep all module content related development objects such as views, fragments and controllers.

***
## Stylesheet
We are using [LESS](http://lesscss.org/) for module related CSS development. LESS allows us to use a shared set of style guides based on ChaiOne wireframe requirements and also to optimize the generated CSS based on certain set of requirements.

##

```
<module folder name>/
└── src/
    └── nrg/
        └── module/
            └── <module identifier>/
                └── asset/
                    └── css/
                        ├── **/*.less
                        └── module.less
```

## Translation


## Configuration


## Documentation

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
