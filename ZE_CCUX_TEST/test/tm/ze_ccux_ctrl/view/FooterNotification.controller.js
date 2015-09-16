/*global sap*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/model/json/JSONModel'
    ],

    function (Controller, JSONModel) {
        'use strict';

        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.FooterNotification');

        CustomController.prototype.onBeforeRendering = function () {
            this.getView().setModel(new JSONModel({
                notification: [
                    { link: false, design: 'Error', text: 'Winter purslane courgette pumpkin quandong komatsuna fennel green bean cucumber watercress.' },
                    { link: false, design: 'Warning', text: 'Caulie dandelion maize lentil collard greens radish arugula sweet pepper water spinach kombu courgette lettuce.' },
                    { link: false, design: 'Success', text: 'Parsnip lotus root celery yarrow seakale tomato collard greens tigernut epazote ricebean melon tomatillo soybean chicory broccoli beet greens peanut salad.' },
                    { link: false, design: 'Information', text: 'Peanut gourd nori welsh onion rock melon mustard jícama. Desert raisin amaranth kombu aubergine kale seakale brussels sprout pea.' },
                    { link: true, design: 'Error', text: 'Winter purslane courgette pumpkin quandong komatsuna fennel green bean cucumber watercress.' },
                    { link: true, design: 'Warning', text: 'Caulie dandelion maize lentil collard greens radish arugula sweet pepper water spinach kombu courgette lettuce.' },
                    { link: true, design: 'Success', text: 'Parsnip lotus root celery yarrow seakale tomato collard greens tigernut epazote ricebean melon tomatillo soybean chicory broccoli beet greens peanut salad.' },
                    { link: true, design: 'Information', text: 'Peanut gourd nori welsh onion rock melon mustard jícama. Desert raisin amaranth kombu aubergine kale seakale brussels sprout pea.' }
                ]
            }), 'view-data');
        };

        CustomController.prototype._onLinkPress = function (oEvent) {
            console.log(oEvent.getSource());
        };

        return CustomController;
    }
);
