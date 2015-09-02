# ute.ui.main.Checkbox

***
## Properties ##

| Aggregation | Type                                        | Description                         |
|-------------|---------------------------------------------|-------------------------------------|
| design      | [ute.ui.main.DropdownDesign](../library.js) | The style and layout of a dropdown. |
| enabled     | [boolean](https://goo.gl/KjFDba)            | Whether the checkbox is enabled.    |
| selectedKey | [string](https://goo.gl/tle3QN)             | The key of the item being selected. |
| placeholder | [string](https://goo.gl/tle3QN)             |                                     |

***
## Aggregations ##

| Aggregation         | Type                                           | Multiple | Description                                |
| :------------------ | :--------------------------------------------- | :------- | :----------------------------------------- |
| content             | [ute.ui.main.DropdownItem](../DropdownItem.js) | `true`   | The item list of a dropdown.               |
| _headerContent      | [ute.ui.main.DropdownItem](../DropdownItem.js) | `false`  | The currently selected item of a dropdown. |

> defaultAggregation: `content`

***
## Events ##

### select ##
Triggered when the value of the checkbox is changed.

| Parameter   | Type                             | Description                                        |
|-------------|----------------------------------|----------------------------------------------------|
| selectedKey | [string](https://goo.gl/tle3QN)  | The key of the selected `ute.ui.main.DropdownItem` |