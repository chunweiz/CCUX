## Button ##
Button renders a ute-customized button.

### Inheritance ##
[ute.ui.main.Button](../Button.js) >> [sap.ui.core.Control](../../../../../../ZELIB/openui5/resources/sap/ui/core/Control-dbg.js) >> [sap.ui.core.Element](../../../../../../ZELIB/openui5/resources/sap/ui/core/Element-dbg.js)

### Properties ##
| Property            | Type                                      | Description                                                                | Defined By                                 |
| :------------------ | :---------------------------------------- | :------------------------------------------------------------------------- | :----------------------------------------- |
| design              | [ute.ui.main.ButtonDesign](../library.js) | The style and layout of a button.                                          | [ute.ui.main.Button](../Button.js)         |
| text                | [string](https://goo.gl/tle3QN)           | The text to be shown inside the button.                                    | [ute.ui.main.Button](../Button.js)         |
| enabled             | [boolean](https://goo.gl/KjFDba)          | Whether the button should be active.                                       | [ute.ui.main.Button](../Button.js)         |

### Aggregations ##
| Aggregation         | Type                                   | Multiple | Description                                                                | Defined By                                 |
| :------------------ | :------------------------------------- | :------- | :------------------------------------------------------------------------- | :----------------------------------------- |
| content             | [sap.ui.core.Control](../../../../../../ZELIB/openui5/resources/sap/ui/core/Control-dbg.js) | `true` | Determines the content of the Button. | [ute.ui.main.Button](../Button.js) |

> defaultAggregation: `content`

### Events ##

#### press ##
Triggered by `ontap()`.

| Parameter | Type  | Description         |
|-----------|-------|---------------------|
| none      |       |                     |

### Public Methods ##
| Method              |  Description                                                                | Defined By                                 |
| :------------------ |  :------------------------------------------------------------------------- | :----------------------------------------- |
| [setEnabled()](#markdown-header-setenabledovalue)   |  To enable or disable a button.                                             | [ute.ui.main.Button](../Button.js)         |
| [ontap()](#markdown-header-ontapoevent)             |  When tap on the button, fire the `press` event.                            | [ute.ui.main.Button](../Button.js)         |

### Protected Methods ##
| Method            | Description                                         | Defined By                         |
|-------------------|-----------------------------------------------------|------------------------------------|
| [_addHtmlText()](#markdown-header-_addhtmltextorm)       | Render HTML elements for the `text` property.       | [ute.ui.main.Button](../Button.js) |
| [_addHtmlContent()](#markdown-header-_addhtmlcontentorm) | Render HTML elements for the `content` aggregation. | [ute.ui.main.Button](../Button.js) |

### Method Details ##

#### setEnabled(`oValue`) ##
To enable or disable a button.

| Parameter | Type                                 | Description                                                   |
|-----------|--------------------------------------|---------------------------------------------------------------|
| oValue    | [boolean](https://goo.gl/KjFDba)     | The boolean value that determines a button is enabled or not. |

#### ontap(`oEvent`) ##
When tap on the button, fire the `press` event.

| Parameter | Type                                 | Description       |
|-----------|--------------------------------------|-------------------|
| oEvent    | [jQuery.Event](http://goo.gl/2OC2kf) | The event object. |

#### _addHtmlText(`oRm`) ##
Render HTML elements for the `text` property.

| Parameter | Type                                                                                                    | Description         |
|-----------|---------------------------------------------------------------------------------------------------------|---------------------|
| oRm       | [sap.ui.core.RenderManager](../../../../../../ZELIB/openui5/resources/sap/ui/core/RenderManager-dbg.js) | The render manager. |

#### _addHtmlContent(`oRm`) ##
Render HTML elements for the `content` aggregation.

| Parameter | Type                                                                                                    | Description         |
|-----------|---------------------------------------------------------------------------------------------------------|---------------------|
| oRm       | [sap.ui.core.RenderManager](../../../../../../ZELIB/openui5/resources/sap/ui/core/RenderManager-dbg.js) | The render manager. |