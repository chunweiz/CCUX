# Component #
Component serves as an entry point to the CCUX application. We will be using component to adapt, to control and to determine the type of content that are accessible by different groups of users.

How to create a new component:

1. [Pick a UI5 namespace](#markdown-header-ui5-namespace-for-component).
1. [Create the component folder](#markdown-header-component-folder).
1. [Add in documentation](#markdown-header-documentation).
1. [Add in component descriptor](#markdown-header-component-descriptor).
1. [Setup CCUX global settings](#markdown-header-global-settings).

***
## UI5 namespace for component ##
UI5 namespace is a way for the framework to uniquely identifies a particular resource. In our case, everything that falls under a particular component will be namespaced after that component. The UI5 namespace for a campaign starts with the keyword `nrg.component.` follows by a `component identifier`.

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
Each component has their own [Grunt build](build.md) but try to keep the folder structure of components as consistent as possible so that most of the build code can be reuse.

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
## Component descriptor ##


***
## Global settings ##
