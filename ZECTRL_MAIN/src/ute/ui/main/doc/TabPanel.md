# [ute.ui.main.TabPanel](../TabPanel.js)

***

## Properties ##

| Property | Type                                         | Description                             |
|----------|----------------------------------------------|-----------------------------------------|
| design   | [ute.ui.main.TabPanelDesign](../library.js)  | The style and layout of the `TabPanel`. |


## Aggregations ##

| Aggregation | Type                                           | Multiple | Description                  |
| :-----------| :--------------------------------------------- | :------- | :--------------------------- |
| content     | [ute.ui.main.TabPanelItem](../TabPanelItem.js) | `true`   | The content of `TabPanel`. |

> defaultAggregation: `content`

## Associations ##

| Association | Type                               | Multiple | Description                        |
| :-----------| :--------------------------------- | :------- | :----------------------------------|
| tabPanelFor | [ute.ui.main.TabBar](../TabBar.js) | `false`  | Associated control for `TabPanel`. |