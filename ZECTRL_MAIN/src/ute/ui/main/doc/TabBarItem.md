# [ute.ui.main.TabBarItem](../TabBarItem.js)

***

## Properties ##

| Property | Type                                           | Description                                   |
|----------|------------------------------------------------|-----------------------------------------------|
| design   | [ute.ui.main.TabBarItemDesign](../library.js)  | The style and layout of the `TabBarItem`.     |
| key      | [string](https://goo.gl/tle3QN)                | The key of the `TabBarItem`.                  |
| group    | [string](https://goo.gl/tle3QN)                | The group name for the grouped `TabBarItem`s. |
| selected | [boolean](https://goo.gl/KjFDba)               | Whether the `TabBarItem` is selected or not.  |
| enabled  | [boolean](https://goo.gl/KjFDba)               | Whether the `TabBarItem` is enabled or not.   |

## Aggregations ##

| Aggregation | Type                                                                                        | Multiple | Description                  |
| :-----------| :------------------------------------------------------------------------------------------ | :------- | :--------------------------- |
| content     | [sap.ui.core.Control](../../../../../../ZELIB/openui5/resources/sap/ui/core/Control-dbg.js) | `true`   | The content of `TabBarItem`. |

> defaultAggregation: `content`

## Events ##

### select ##
Triggered when `change` event is detected. 

| Parameter | Type | Description |
|-----------|------|-------------|
| `none`    |      |             |
