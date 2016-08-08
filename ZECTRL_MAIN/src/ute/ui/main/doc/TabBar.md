# [ute.ui.main.TabBar](../TabBar.js)

***

## Properties ##

| Property | Type                                      | Description                           |
|----------|-------------------------------------------|---------------------------------------|
| design   | [ute.ui.main.TabBarDesign](../library.js) | The style and layout of the `TabBar`. |

## Aggregations ##

| Aggregation | Type                                                                                        | Multiple | Description              |
| :-----------| :------------------------------------------------------------------------------------------ | :------- | :----------------------- |
| content     | [sap.ui.core.Control](../../../../../../ZELIB/openui5/resources/sap/ui/core/Control-dbg.js) | `true`   | The content of `TabBar`. |

> defaultAggregation: `content`

## Events ##

### select ##
Triggered when `onchange` event is detected. 

| Parameter    | Type                                       | Description                |
|--------------|--------------------------------------------|----------------------------|
| selectedItem | [ute.ui.main.TabBarItem](../TabBarItem.js) | The selected `TabBarItem`. |
