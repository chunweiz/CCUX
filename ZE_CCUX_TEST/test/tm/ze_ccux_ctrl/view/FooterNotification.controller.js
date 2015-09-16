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
                    { design: 'Error', text: 'Winter purslane courgette pumpkin quandong komatsuna fennel green bean cucumber watercress.' },
                    { design: 'Warning', text: 'Caulie dandelion maize lentil collard greens radish arugula sweet pepper water spinach kombu courgette lettuce.' },
                    { design: 'Success', text: 'Parsnip lotus root celery yarrow seakale tomato collard greens tigernut epazote ricebean melon tomatillo soybean chicory broccoli beet greens peanut salad.' },
                    { design: 'Information', text: 'Peanut gourd nori welsh onion rock melon mustard jícama. Desert raisin amaranth kombu aubergine kale seakale brussels sprout pea.' }
                ]
            }), 'view-data');
        };

        return CustomController;
    }
);
