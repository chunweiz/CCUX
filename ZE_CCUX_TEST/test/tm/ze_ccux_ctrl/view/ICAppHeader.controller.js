/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller',
        'sap/ui/core/Popup',
        'sap/m/Label'
    ],

    function (jQuery, Controller, Popup, Label) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.ICAppHeader');

        CustomController.prototype.onHdrMenuItemPressed = function (oControlEvent) {
            var oMenuItem = oControlEvent.getSource();

            oMenuItem.deselectOthers();
            if (oMenuItem.data('nrg-type') !== 'menu') {
                oMenuItem.setSelected(false);
            } else {
                switch (oMenuItem.getId().replace(this.getView().getId() + '--', '')) {
                case 'menu':
                    if (oMenuItem.getSelected()) {
                        this._openMenuPopup(oMenuItem);
                    } else {
                        this._closeMenuPopup(oMenuItem);
                    }
                    break;
                default:
                }
            }
        };

        CustomController.prototype._openMenuPopup = function (oMenuItem) {
            this._oPopup = new Popup();
            this._oPopup.setModal(false);
            this._oPopup.setAutoClose(false);
            this._oPopup.setShadow(false);
            this._oPopup.setContent(new Label({
                text: 'test data',
                width: '100%'
            }));

            this._oPopup.setPosition(
                Popup.Dock.CenterCenter,
                Popup.Dock.CenterBottom,
                this.getView().byId('header'),
                '0 6'
            );

            this._oPopup.open();
        };

        CustomController.prototype._closeMenuPopup = function (oMenuItem) {
            this._oPopup.close();
        };

        return CustomController;
    }
);

