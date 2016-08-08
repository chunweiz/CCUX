sap.ui.define(["sap/ui/base/EventProvider","nrg/module/app/view/AppHeader","nrg/module/app/view/AppBody","nrg/module/app/view/AppFooter","sap/m/BusyDialog"],function(a,b,c,d,e){"use strict";var f=a.extend("nrg.module.app.view.App",{constructor:function(d){a.apply(this),this._oController=d,this._oBusyDialog=new e,this._bEdit=!1,this._oAppHeader=new b(d,this),this._oAppHeader.init(),this._oAppBody=new c(d,this),this._oAppBody.init()},metadata:{publicMethods:["setOccupied","isOccupied","setHeaderMenuItemSelected","isHeaderMenuItemSelected","setHeaderMenuItemEnabled","isHeaderMenuItemEnabled","setTitle","setLayout","attachNavLeft","detachhNavLeft","showNavLeft","detachNavLeftAll","attachNavRight","detachNavRight","showNavRight","detachNavRightAll","setInEdit","isInEdit","updateFooter","updateFooterNotification","updateFooterRHS","updateFooterCampaign"]}});return f.HMItemId=b.HMItemId,f.QuickLinkId=b.QuickLinkId,f.LayoutType=c.ContentLayoutType,f.prototype.reset=function(a){this._oAppHeader.reset(),this._oAppBody.reset(a),this.setInEdit(!1)},f.prototype.setOccupied=function(a){return a=!!a,a?this._oBusyDialog.open():this._oBusyDialog.close(),this},f.prototype.isOccupied=function(){return this._oBusyDialog.isOpen()},f.prototype.setInEdit=function(a){return this._bEdit=!!a,this},f.prototype.isInEdit=function(){return this._bEdit},f.prototype.setHeaderMenuItemSelected=function(a,b){return this._oAppHeader.setSelected(a,b),this},f.prototype.isHeaderMenuItemSelected=function(a){return this._oAppHeader.isSelected(a)},f.prototype.setHeaderMenuItemEnabled=function(a,b){return this._oAppHeader.setEnabled(a,b),this},f.prototype.isHeaderMenuItemEnabled=function(a){return this._oAppHeader.isEnabled(a)},f.prototype.setTitle=function(a){var b=this._oController.getView().byId("appBodyTitle");return b&&a&&b.setText(a),this},f.prototype.setLayout=function(a){return this._oAppBody.setContentLayout(a),this},f.prototype.attachNavLeft=function(a,b){return this._oAppBody.attachNavLeft(a,b),this},f.prototype.detachNavLeft=function(a,b){return this._oAppBody.detachNavLeft(a,b),this},f.prototype.showNavLeft=function(a){return this._oAppBody.showNavLeft(a),this},f.prototype.detachNavLeftAll=function(){return this._oAppBody.detachNavLeftAll(),this},f.prototype.attachNavRight=function(a,b){return this._oAppBody.attachNavRight(a,b),this},f.prototype.detachNavRight=function(a,b){return this._oAppBody.detachNavRight(a,b),this},f.prototype.showNavRight=function(a){return this._oAppBody.showNavRight(a),this},f.prototype.detachNavRightAll=function(){return this._oAppBody.detachNavRightAll(),this},f.prototype._getHeader=function(){return this._oAppHeader},f.prototype._getBody=function(){return this._oAppBody},f.prototype.updateFooter=function(a,b,c){return sap.ui.getCore().getEventBus().publish("nrg.module.appFooter","eUpdateFooter",{bpNum:a,caNum:b,coNum:c}),this},f.prototype.updateFooterNotification=function(a,b,c){return sap.ui.getCore().getEventBus().publish("nrg.module.appFooter","eUpdateNotification",{bpNum:a,caNum:b,coNum:c}),this},f.prototype.updateFooterRHS=function(a,b,c){return sap.ui.getCore().getEventBus().publish("nrg.module.appFooter","eUpdateRhs",{bpNum:a,caNum:b,coNum:c}),this},f.prototype.updateFooterCampaign=function(a,b,c){return sap.ui.getCore().getEventBus().publish("nrg.module.appFooter","eUpdateCampaign",{bpNum:a,caNum:b,coNum:c}),this},f});