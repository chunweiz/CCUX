sap.ui.define(["jquery.sap.global","sap/ui/commons/CalloutBaseRenderer","sap/ui/core/Renderer"],function(a,b,c){"use strict";var d=c.extend(b);return d.renderContent=function(a,b){var c,d=a,e=b.getContent();for(c=0;c<e.length;c+=1)d.renderControl(e[c])},d.addRootClasses=function(a){a.addClass("uteCommonsTooltip")},d.addContentClasses=function(a){a.addClass("uteCommonsTooltip-content")},d.addArrowClasses=function(a){a.addClass("uteCommonsTooltip-arrow")},d},!0);