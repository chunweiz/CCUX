# [ute.ui.main.Infoline](../Infoline.js)

***
## Properties ##

| Aggregation | Type                                        | Description                                                             |
|-------------|---------------------------------------------|-------------------------------------------------------------------------|
| design      | [ute.ui.main.InfolineDesign](../library.js) | The style and layout of the infoline.                                   |
| expanded    | [boolean](https://goo.gl/KjFDba)            | Whether the infoline is expanded.                                       |
| reverse     | [boolean](https://goo.gl/KjFDba)            | If set to true, it will render content first then header at the bottom. |

***
## Aggregations ##

| Aggregation         | Type                                                                                        | Multiple | Description                                                          |
| :------------------ | :------------------------------------------------------------------------------------------ | :------- | :--------------------------------------------------------------------|
| headerContent       | [sap.ui.core.Control](../../../../../../ZELIB/openui5/resources/sap/ui/core/Control-dbg.js) | `true`   | The infoline header.                                                 |
| content             | [sap.ui.core.Control](../../../../../../ZELIB/openui5/resources/sap/ui/core/Control-dbg.js) | `true`   | The infoline content.                                                |
| _headerExpander     | [sap.ui.core.Control](../../../../../../ZELIB/openui5/resources/sap/ui/core/Control-dbg.js) | `false`  | Aggregation that controls the expand and collapse of the `Infoline`. |

> defaultAggregation: `content`
> `_headerExpander` is mean to bind with a Checkbox control and is not accessible by the view.

***
## Events ##

### press ##
Triggered when `_headerExpander` is selected. 

| Parameter | Type                             | Description                       |
|-----------|----------------------------------|-----------------------------------|
| expanded  | [boolean](https://goo.gl/KjFDba) | Whether the infoline is expanded. |

***
## Methods ##

### onBeforeRendering() ##
Here we bind the `_headerExpander` aggregation with the `Checkbox` to control the collapse and expand of `Infoline`.

```JavaScript
this._oHdrExpander = new Checkbox({
    design: ute.ui.main.CheckboxDesign.None,
    select: jQuery.proxy(this._onHdrExpanderSelected, this),
    checked: this.getExpanded()
});

this.setAggregation('_headerExpander', this._oHdrExpander);
``` 

### _onHdrExpanderSelected() ##
Executed when the `select` event of the `_headerExpander` got triggered. It will set the `expanded` property and fire `press` event of the `Infoline`.

```JavaScript
var bExpand = oControlEvent.getParameter('checked');
this.setExpanded(bExpand);
this.firePress({ expanded: bExpand });
``` 

### exit() ##
Do the clean up for the `_headerExpander` binding.

```JavaScript
if (this._oHdrExpander) {
    this._oHdrExpander.destroy();
    this._oHdrExpander = null;
}
``` 

