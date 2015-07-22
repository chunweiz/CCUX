/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel',
        'ute/ui/app/HeaderSubmenu',
        'sap/m/Label'
    ],

    function (jQuery, Controller, JSONModel, HeaderSubmenu, Label) {
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
            if (!this._oPopup) {
                this._oPopup = new HeaderSubmenu();
                this._oPopup.setPosition(this.getView().byId('header'), '0 20');
                this._oPopup.addContent(new Label({ text: '{view-test>/name}' }));

                this.getView().addDependent(this._oPopup);
            }

            this._oPopup.open();
        };

        CustomController.prototype._closeMenuPopup = function (oMenuItem) {
            this._oPopup.close();
        };

        CustomController.prototype.onNavLeftPress = function (oControlEvent) {
            jQuery.sap.log.error('nav left pressed');
        };

        CustomController.prototype.onNavRightPress = function (oControlEvent) {
            jQuery.sap.log.error('nav right pressed');
        };

        CustomController.prototype.onInit = function () {
            var oModel = new JSONModel({
                name: 'test data'
            });

            this.getView().setModel(oModel, 'view-test');
        };

        return CustomController;
    }
);

