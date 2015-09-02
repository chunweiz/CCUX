# Control library ute.ui.main

> Notable changes made to this folder are [logged here](doc/CHANGELOG.md).


***
## Dependencies
* [ute.ui.base](../../../../../ZEBASE_CTRL/src/ute/ui/base/README.md)


***
#Controls
The controls here are mean to supersedes the controls in `ZECTRL_COMMONS`. `ZECTRL_MAIN` controls are designed based on how we would use them in modules. Generally, `ZECTRL_MAIN` controls are leaning towards CSS for alterations.

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

### Class Info ##
| Item                     | Description                     |
| :----------------------- | :------------------------------ |
| Inheritance              | [sap/ui/core/Control](../../../../../ZELIB/openui5/resources/sap/ui/core/Control-dbg.js), [sap/ui/core/EnabledPropagator](../../../../../ZELIB/openui5/resources/sap/ui/core/EnabledPropagator-dbg.js)|
| Available since version  | |
| Source Code              | [ute.ui.main.Button](Button.js) |

### Example ##
```xml
<utmain:Button 
    design="None"
    text="buttonClass"
    class="buttonClass" 
    press="onAction"/>
```


