# Module
Module is a logical grouping of related business content such as billing and campaign. Generally, it is used to create a unique UI5 namespace and to store the XML views, controllers, stylesheets, mock data, documentations, translation files and configurations such as routing.

How to create a module:

1. Create a new [module folder](#markdown-header-module-folder).
2. Add in [stylesheet](#markdown-header-stylesheets).
3. Add in [translation file](#markdown-header-translation-files).
4. Add in [configuration file](#markdown-header-configuration).
5. Add in [documentations](#markdown-header-documentation).

***
## Module folder
### Module folder name ###
The naming convention for a module folder is as follows. This is because SAP BSP application name can only accommodate up to 15 characters.

```
ZEMOD_[a-zA-Z0-9_]{1,9}
```

### Module folder structure ###


```
ZEMOD_<module folder name>/
└── src/<module ui5 namespace path>/
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


## Stylesheet


## Translation


## Configuration


## Documentation
