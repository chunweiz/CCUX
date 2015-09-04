# Baseline nrg.base
Consist of functionalities that are shared across all components and modules.

> Notable changes made to this folder are [logged here](doc/CHANGELOG.md).

***
# Assets
Shared items such as style guides, images, icon font files are stored in `asset/`.

***
## Formatters and Types
Reusable [OpenUI5 custom formatters](https://openui5.hana.ondemand.com/#docs/guide/07e4b920f5734fd78fdaa236f26236d8.html) and [OpenUI5 type](https://openui5.hana.ondemand.com/#docs/guide/91f37e746f4d1014b6dd926db0e91070.html) are stored in their respective `formatter/` and `type/` folders.

> Always favor type over formatter. It offers more than formatting and hence will be more likely be reuse.

***
## Application descriptors
Common `manifest.json` entries are stored in `component/manifest/`. This allows us to maintain generic configurations in a single place and also allows [Grunt build](../../../../doc/build.md#markdown-header-component) to take advantage of them while constructing the manifest.json for a component.

***
## Managers
Managers are generic classes that handle application level operations such as routing, icon pool and integration with SAP CRM WebUI. They are stored in `component/`.

**Overview**

Manager                                  | Description
---------------------------------------- | ----------------------------------------------------------------------------------------------
nrg.base.component.ContextManager        | Allow modules to share information among one another.
nrg.base.component.IconManager           | Responsible in loading custom icons to the UI5 icon pool.
nrg.base.component.MockDataManager       | Responsible in loading mock OData services.
nrg.base.component.NotificationManager   | Provide central notification capability to the application.
nrg.base.component.RealDataManager       | Responsible in loading OData services.
nrg.base.component.ResourceBundleManager | Responsible in loading resource models.
nrg.base.component.RouteManager          | Responsible in handling navigation related activities such as capturing navigation history.
nrg.base.component.StylesheetManager     | Responsible in loading stylesheets.
nrg.base.component.WebUiManager          | Provide two way communication between CCUX and SAP CRM WebUI.

***
### nrg.base.component.ContextManager

**Purpose**

Provide a managed area where modules can share information among themselves.

***
**nrg.base.component.ContextManager.getContext**

Returns the shared context model.

**Returns:**

{sap.ui.model.JSONModel} The context model

***
### nrg.base.component.IconManager

**Purpose**

Add custom icons from `ZEBASE/build/nrg/base/asset/css/base.css` based on [OpenUI5 icon font](https://openui5.hana.ondemand.com/#docs/guide/21ea0ea94614480d9a910b2e93431291.html).

***
**nrg.base.component.IconManager.addIcons**

Assign [Private Use Area](https://en.wikipedia.org/wiki/Private_Use_Areas#Private_Use_Areas) from loaded icon font file to OpenUI5 icon collection `nrg-icon` so that they can be referenced through [[OpenUI5 icon protocol](https://openui5.hana.ondemand.com/#docs/guide/21ea0ea94614480d9a910b2e93431291.html)].

***
### nrg.base.component.MockDataManager

**Purpose**

Leverage [OpenUI5 mock server](https://openui5.hana.ondemand.com/#docs/guide/69d3cbd4150c4ffb884e788f7f60fd93.html) to mock OData services for testing purpose.

***
**nrg.base.component.MockDataManager.startMockServers**

Read mock OData configurations from `manifest.json` and create the respective mock servers which means starting mock OData services.

***
**nrg.base.component.MockDataManager.addMockODataModels**

Add mock OData models to the component based on `manifest.json` configurations.

***
**nrg.base.component.MockDataManager.stopMockServers**

Stop all initialized mock servers which means stopping all mock OData services. At the moment, it is not removing mock OData models from the component.

***
### nrg.base.component.NotificationManager

**Purpose**

Act as a mediator between [OpenUI5 messages](https://openui5.hana.ondemand.com/#docs/guide/62b1481d3e084cb49dd30956d183c6a0.html) and CCUX to provide a centralized place to manage messages and notifications.

***
**nrg.base.component.NotificationManager.getHeaderMessageProcessor**

Get the message processor for header. This allows you to create a message to be added to the header `Messages` area.

**Returns:**

{sap.ui.core.message.ControlMessageProcessor} The message processor for header

***
**nrg.base.component.NotificationManager.addHeaderMessage**

Allows you to add a message to the header `Messages` area. If you did not provide a message processor or the message processor is not the same as the one provided by `nrg.base.component.NotificationManager.getHeaderMessageProcessor()`, it will be defaulted to header message processor.

**Parameters:**

{sap.ui.core.message.Message} *oMsg* Message to be added to header.

***
**nrg.base.component.NotificationManager.clearHeaderMessages**

Clear all the messages at header `Messages` area.

***
### nrg.base.component.RealDataManager



***
### nrg.base.component.ResourceBundleManager



***
### nrg.base.component.RouteManager



***
### nrg.base.component.StylesheetManager



***
### nrg.base.component.WebUiManager



***
## Router
Custom router implemented is stored in `component/`.


### nrg.base.component.Router
This router has an implementation that is similar to SAP CRM data loss popup. If the user navigates away while still in [edit mode](), the router will shows a popup to confirm whether the user really wants to navigate away and if the user chooses *No*, the navigation will be cancelled.  
