/*global sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'jquery.sap.global',
        'sap/ui/core/mvc/Controller',
        'sap/ui/core/message/Message',
        'sap/ui/core/message/ControlMessageProcessor',
        'tm/message/validation/type/ContractAccountNumber',
        'tm/message/validation/type/BusinessPartnerNumber',
        'tm/message/validation/type/ContractNumber',
        'tm/message/validation/type/Price',
        'tm/message/validation/type/EmailAddress',
        'tm/message/validation/type/SocialSecurityNumber',
        'tm/message/validation/type/DrivingLicenseNumber',
        'tm/message/validation/type/ESID',
        'tm/message/validation/type/MeterNumber',
        'tm/message/validation/type/CellPhoneNumber',
        'tm/message/validation/type/Consumption'

    ],

    function ($, CoreController, CoreMessage, CoreControlMessageProcessor) {
        'use strict';

        var Controller = CoreController.extend('tm.message.validation.view.App');
        Controller.prototype.format = function (cellnum,cNum) {
            alert('test');
          //  oValue = oValue.replace(/^(0+)/g, '9');
            return cellnum + cNum;
        }

        Controller.prototype._getMessageProcessor = function () {
            if (!this._oControlMessageProcessor) {
                this._oControlMessageProcessor = new CoreControlMessageProcessor();
            }

            return this._oControlMessageProcessor;
        };

        Controller.prototype._addMessage = function (oEvent, sMsg, sType) {
            var oMsg = new CoreMessage({
                message: sMsg,
                type: sType,
                target: [oEvent.getParameter('id'), oEvent.getParameter('property')].join('/'),
                processor: this._getMessageProcessor()
            });

            sap.ui.getCore().getMessageManager().addMessages(oMsg);
        };

        Controller.prototype.onInit = function () {
            var oModel, oMessageManager, oControlMessageProcessor;

            oModel = sap.ui.model.json.JSONModel({
                caNum: '000123456789',
                bpNum: '1234567890',
                price: 12.35,
                email: 'test@test.com',
                dl: 'NGLT21OU-9592',
                cNum: '0027914550',
                esid: '20443720006324100',
                mnum: '029545116GE',
                cellnum: '+17134974384OR74384',
                table: {"Test":[{cellnum: '+17134974384OR74384',cNum: '0027914550',email: 'test@test.com'}]},
                consumption: 1200

            });

            this.getView().setModel(oModel);

            this.getView().attachValidationError(function (oEvent) {
                this._addMessage(oEvent, 'attachValidationError: ' + oEvent.getParameter('message'), sap.ui.core.MessageType.Error);
            }.bind(this));

            this.getView().attachValidationSuccess(function (oEvent) {
                var oMessageManager, aMessage;

                oMessageManager = sap.ui.getCore().getMessageManager();
                aMessage = oMessageManager.getMessageModel().getData();
                if (aMessage && !$.isEmptyObject(aMessage)) {
                    aMessage.forEach(function (oMessage) {
                        if (oMessage.target === [oEvent.getParameter('id'), oEvent.getParameter('property')].join('/')) {
                            oMessageManager.removeMessages(oMessage);
                        }
                    }.bind(this));
                }
            });

            this.getView().attachParseError(function (oEvent) {
                this._addMessage(oEvent, 'attachParseError: ' + oEvent.getParameter('message'), sap.ui.core.MessageType.Error);
            }.bind(this));

            this.getView().attachFormatError(function (oEvent) {
                this._addMessage(oEvent, 'attachFormatError: ' + oEvent.getParameter('message'), sap.ui.core.MessageType.Error);
            }.bind(this));

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

        /*    oMessage = new CoreMessage({
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

            oMessageManager.addMessages(oMessage);*/
        };

        return Controller;
    }
);
