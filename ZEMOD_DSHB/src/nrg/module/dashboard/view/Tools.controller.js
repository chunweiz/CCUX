/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller'
    ],

    function (CoreController) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.dashboard.view.Tools');

        //TODO: Implementation required
        Controller.prototype._onReconnectionClick = function () {
            if (!this._oReconnectPopup) {
                this._oReconnectPopup = ute.ui.main.Popup.create({
				    content: sap.ui.xmlfragment(this.getView().sId, "nrg.module.dashboard.view.Reconnect", this),
					title: 'RECONNETION'
				});
                this._oReconnectPopup.addStyleClass('nrgDashboard-reconnectionPopup');
				this.getView().addDependent(this._oReconnectPopup);
            }
            this._oReconnectPopup.open();
        };

        return Controller;
    }
);
