sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'test/tm/ze_ccux_ctrl/view/control/ABPPopup'
    ],

    function (Controller, ABPPopupControl) {
        var CustomController = Controller.extend('test.tm.ze_ccux_ctrl.view.ABPPopup');

        CustomController.prototype.onInit = function () {
            var oPopup = new ABPPopupControl({
                nrgTitle: 'testzzzz'
            });
        };

        return CustomController;
    }
);
