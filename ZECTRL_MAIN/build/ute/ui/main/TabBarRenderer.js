sap.ui.define(["ute/ui/main/TabBarItem"],function(a){"use strict";var b={};return b.render=function(a,b){a.write("<div"),a.writeControlData(b),a.addClass("uteMTabBar"),b.getDesign()!==ute.ui.main.TabBar.None&&a.addClass("uteMTabBar-design-"+b.getDesign().toLowerCase()),a.writeClasses(),a.write(">"),this._renderContent(a,b),a.write("</div>")},b._renderContent=function(b,c){var d=c.getContent()||[];d.forEach(function(d){d instanceof a&&(d.setGroup(c.getId()+"--grp"),c._attachItemSelect(d)),b.renderControl(d)})},b},!0);