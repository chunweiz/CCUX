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

        var Controller = CoreController.extend('tm.message.validation.view.App', {
            onInit: function (oEvent) {
                this._first = true;
            }
        });

        Controller.prototype.onPress = function (oEvent) {
            var oMessageManager, oControlMessageProcessor, oMessage, vMsg;

            if (this._first) {
                vMsg = 'this is the first time';
                this._first = false;
            } else {
                vMsg = 'this is not the first time ....';
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
