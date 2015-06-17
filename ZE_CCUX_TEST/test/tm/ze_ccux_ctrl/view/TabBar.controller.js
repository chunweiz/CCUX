/*global sap, ute*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller',
        'ute/ui/main/Label',
        'ute/ui/main/TabBarItem'
    ],

    function (jQuery, Controller, Label, TabBarItem) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.TabBar');

        CustomController.prototype.onInit = function () {

            var oTabBar = this.getView().byId('nrgTabBar');



            var oLabel = new Label({ text: 'this is a label' });
            var oItem = new TabBarItem({
                content: oLabel,
                press: function (oControlEvent) {
                    alert('try me');
                }
            });

            oTabBar.addContent(oItem);

            oLabel = new Label({ text: 'this is another label' });
            oItem = new TabBarItem({
                content: oLabel,
                press: function (oControlEvent) {
                    alert('try another me');
                }
            });

            oTabBar.addContent(oItem);

        };

        CustomController.prototype.onPressed = function (oControlEvent) {
            console.log("onPressed ... " + oControlEvent.getSource().getSelected());
        };

        CustomController.prototype.onSelected = function (oControlEvent) {
            console.log(oControlEvent.getParameter('selectedItem').getKey());
        };

        return CustomController;
    }
);
