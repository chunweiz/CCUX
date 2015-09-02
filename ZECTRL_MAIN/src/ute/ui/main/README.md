# Control library ute.ui.main

> Notable changes made to this folder are [logged here](doc/CHANGELOG.md).


***
## Dependencies
* [ute.ui.base](../../../../../ZEBASE_CTRL/src/ute/ui/base/README.md)


***
#Controls
The controls here are mean to supersedes the controls in `ZECTRL_COMMONS`. `ZECTRL_MAIN` controls are designed based on how we would use them in modules. Generally, `ZECTRL_MAIN` controls are leaning towards CSS for alterations, so keep the design as general as possible and leave the styling in view's CSS.

Control list:

* [Button]()
* [Checkbox]()
* [Dropdown]()
* [DropdownItem]()
* [Infoline]()
* [Label]()
* [RadioButton]()
* [TabBar]()
* [TabBarItem]()
* [TabPanel]()
* [TabPanelItem]()

***
## Button ##
Button renders a ute-customized button.

### Inheritance ##
[ute.ui.main.Button](Button.js) >> [sap.ui.core.Control](../../../../../ZELIB/openui5/resources/sap/ui/core/Control-dbg.js) >> [sap.ui.core.Element](../../../../../ZELIB/openui5/resources/sap/ui/core/Element-dbg.js)

### Public Properties ##
| Property            | Type                                   | Description                                                                | Defined By                                 |
| :------------------ | :------------------------------------- | :------------------------------------------------------------------------- | :----------------------------------------- |
| design              | [ute.ui.main.ButtonDesign](library.js) | The style and layout of a button.                                          | [ute.ui.main.Button](Button.js)            |
| text                | [string](https://goo.gl/tle3QN)        | The text to be shown inside the button.                                    | [ute.ui.main.Button](Button.js)            |
| enabled             | [boolean](https://goo.gl/KjFDba)       | Whether the button should be active.                                       | [ute.ui.main.Button](Button.js)            |











