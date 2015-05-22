/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'sap/ui/core/mvc/Controller',
        'sap/ui/core/message/Message',
        'sap/ui/core/message/ControlMessageProcessor'
    ],

    function (CoreController, CoreMessage, CoreControlMessageProcessor) {
        'use strict';

        var Controller = CoreController.extend('tm.message.validation.view.App');

        Controller.prototype.onInit = function () {
            var oModel, oMessageManager, oControlMessageProcessor;

            oModel = sap.ui.model.json.JSONModel({
                name: 'ypyp'
            });

            this.getView().setModel(oModel);

            this.getView().attachValidationError(function (oEvent) {
                var oMessageManager, oControlMessageProcessor, oMessage, vMsg;

                vMsg = 'message from attachValidationError';

                oMessageManager = sap.ui.getCore().getMessageManager();
                oControlMessageProcessor = new CoreControlMessageProcessor();
                oMessageManager.registerMessageProcessor(oControlMessageProcessor);

                oMessage = new CoreMessage({
                    message: vMsg,
                    type: sap.ui.core.MessageType.Error,
                    persistent: false,
                    processor: oControlMessageProcessor
                });

                oMessageManager.addMessages(oMessage);
            });

        };

        Controller.prototype.onPress = function (oEvent) {
            var oMessageManager, oControlMessageProcessor, oMessage, vMsg;

            if (this._notFirst) {
                vMsg = 'this is not the first message .... ';

            } else {
                this._notFirst = true;
                vMsg = 'this is the first message .... ';
            }

            oMessageManager = sap.ui.getCore().getMessageManager();
            oMessageManager.removeAllMessages();
            oControlMessageProcessor = new CoreControlMessageProcessor();
            oMessageManager.registerMessageProcessor(oControlMessageProcessor);

            oMessage = new CoreMessage({
                message: vMsg,
                type: sap.ui.core.MessageType.Error,
                processor: oControlMessageProcessor
            });

            oMessageManager.addMessages(oMessage);

            oMessage = new CoreMessage({
                message: vMsg,
                type: sap.ui.core.MessageType.Information,
                processor: oControlMessageProcessor
            });

            oMessageManager.addMessages(oMessage);

            oMessage = new CoreMessage({
                message: vMsg,
                type: sap.ui.core.MessageType.None,
                processor: oControlMessageProcessor
            });

            oMessageManager.addMessages(oMessage);

            oMessage = new CoreMessage({
                message: vMsg,
                type: sap.ui.core.MessageType.Success,
                processor: oControlMessageProcessor
            });

            oMessageManager.addMessages(oMessage);

            oMessage = new CoreMessage({
                message: vMsg,
                type: sap.ui.core.MessageType.Warning,
                processor: oControlMessageProcessor
            });

            oMessageManager.addMessages(oMessage);
        };

        return Controller;
    }
);
