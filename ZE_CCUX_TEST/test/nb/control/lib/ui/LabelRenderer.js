/*global sap, tm*/
/*jslint nomen:true*/

sap.ui.define(
    [],

    function () {
        'use strict';

        var ControlRenderer = {},
            sTextClass,
            sDesignClass,sPaddingClass,sNotificationClass,sCampaignClass;

        ControlRenderer.render = function (oRm, oIcoLabel) {
            oRm.write('<div');
            oRm.writeControlData(oIcoLabel);
            oRm.write('>');

            if (oIcoLabel.getIcon()) {
                this.writeImgHtml(oRm, oIcoLabel);
            }


            oRm.write('<label');

            sPaddingClass = 'uteIcoLabel-padding';
            sDesignClass = 'utIcoLabel-design-' + oIcoLabel.getDesign().toLowerCase();

            oRm.addClass('sPaddingClass');
            oRm.addClass('sDesignClass');

            switch (oIcoLabel.getDesign()) {
             case 'Notification':
                sNotificationClass = 'uteIcoLabel-notification-' + oIcoLabel.getNotificationDesign().toLowerCase();
                oRm.addClass('sNotificationClass');
                break;
             case 'Campaign':
                sCampaignClass = 'uteIcoLabel-campaign-' + oIcoLabel.getCampaignDesign().toLowerCase();
                oRm.addClass('sCampaignClass');
                break;
             case 'DashboardWeather':
                break;
             case 'AppHeader':
                break;
            }

            oRm.writeClasses();

            oRm.write('>');
            oRm.writeEscaped(oIcoLabel.getText());


            oRm.write('</label>');

            oRm.write('</div>');
        };

        ControlRenderer.writeImgHtml = function (oRm, oIcoLabel) {
            var sDesignClass,sPaddingClass,sNotificationClass,sCampaignClass,oImage;

            oImage = oIcoLabel._getImage(oIcoLabel.getIcon());

            sDesignClass = 'utIcoLabel-design-' + oIcoLabel.getDesign().toLowerCase();
            oImage.addStyleClass('sDesignClass');
            switch (oIcoLabel.getDesign()) {
             case 'Notification':
                sNotificationClass = 'uteIcoLabel-notification-' + oIcoLabel.getNotificationDesign().toLowerCase();
                oImage.addStyleClass('sNotificationClass');
                break;
             case 'Campaign':
                sCampaignClass = 'uteIcoLabel-campaign-' + oIcoLabel.getCampaignDesign().toLowerCase();
                oImage.addStyleClass('sCampaignClass');
                break;
             case 'DashboardWeather':
                break;
             case 'AppHeader':
                break;
            }

             oRm.renderControl(oImage);
        };

        return ControlRenderer;
    },

    true
);
