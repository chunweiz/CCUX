sap.ui.define(
    [
        'sap/ui/core/Control'
    ],

    function (Control) {
        var CustomControl = Control.extend('test.tm.ze_ccux_ctrl.view.control.ABPPopup', {
            metadata: {
                properties: {
                    title: { type: 'string', defaultValue: null }
                }
            }
        });

        CustomControl.prototype.init = function () {
            console.log(this.getTitle());
        };

        return CustomControl;
    }
);
