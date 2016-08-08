sap.ui.define(["jquery.sap.global","sap/ui/model/SimpleType","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException"],function(a,b,c,d,e){"use strict";var f=b.extend("nrg.base.type.ESID",{constructor:function(){b.apply(this,arguments)}});return f.prototype.getName=function(){return"nrg.base.type.ESID"},f.prototype.setFormatOptions=function(a){this.oFormatOptions=a},f.prototype.setConstraints=function(b){this.oConstraints=b,a.isEmptyObject(this.oConstraints)&&(this.oConstraints={mandatory:!1,wildCard:!1})},f.prototype.parseValue=function(a){var b=new RegExp("^[0-9+*]*$");if(void 0===a||null===a)return a;if(this.oConstraints.wildCard){if(!a.match(b))throw jQuery.sap.log.error("Parse Exception: Invalid ESID",a),new d("Invalid ESID")}else if(isNaN(a))throw jQuery.sap.log.error("Parse Exception: Invalid ESID",a),new d("Invalid ESID");return a},f.prototype.validateValue=function(a){if((void 0===a||null===a||""===a.trim())&&this.oConstraints.mandatory)throw jQuery.sap.log.error("Validate Exception: ESID cannot be empty",a),new e("ESID cannot be empty");if(a.length>50)throw jQuery.sap.log.error("Validate Exception: ESID length exceeds(allowed upto 50 char)",a),new e("ESID length exceeds(allowed upto 50 char)");return a},f.prototype.formatValue=function(a){return a},f});