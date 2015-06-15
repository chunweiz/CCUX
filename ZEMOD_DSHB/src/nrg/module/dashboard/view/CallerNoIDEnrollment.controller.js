/*globals sap*/
/*jslint nomen:true*/

sap.ui.define(
    [
        'nrg/base/view/BaseController'
    ],

    function (CoreController) {
        'use strict';

        var Controller = CoreController.extend('nrg.module.dashboard.view.CallerNoIDEnrollment');

        Controller.prototype.onInit = function () {
        };

        Controller.prototype.onEnrollBusiness = function () {
            sap.ui.commons.MessageBox.alert("Enroll Business User");
        };

        Controller.prototype.onEnrollResident = function () {
            sap.ui.commons.MessageBox.alert("Enroll Resident User");
        };

        Controller.prototype.onEnrollRHS = function () {
            sap.ui.commons.MessageBox.alert("Enroll RHS User");
        };

        Controller.prototype.onEnrollHomeSecurity = function () {
            sap.ui.commons.MessageBox.alert("Enroll Home Security User");
        };

        return Controller;
    }
);
