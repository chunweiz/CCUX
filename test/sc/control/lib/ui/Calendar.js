/*globals sap, sc */
/*jslint nomen: true */
// Provides control ute.ui.commons.Calendar.

sap.ui.define(
    [
        'jquery.sap.global',
        './library',
        'sap/ui/core/Control',
        'sap/ui/core/LocaleData',
        'sap/ui/core/format/DateFormat'
    ],
	function (jQuery, library, Control, LocaleData, DateFormat) {
	    'use strict';

        var Calendar = Control.extend('sc.control.lib.ui.Calendar', { metadata : {
            library : 'sc.control.lib.ui',
            properties : {
                /*Calendar Width*/
                width : {type : 'sap.ui.core.CSSSize', group : 'Dimension', defaultValue : '340px'},

                /*Calendar height*/
                height : {type : 'sap.ui.core.CSSSize', group : 'Dimension', defaultValue : '250px'},

                /*Calendar selected Date*/
                selectedDate : {type : 'string', defaultValue : ''}
            },
            events : {

            }
        }});

        /**
         * Initialization hook for the dialog.
         * It initializes some basic configuration for it.
         *
         * @private
         */
        Calendar.prototype.init = function () {
            this._oFormatYyyymmdd = DateFormat.getInstance({pattern: 'MM/dd/yyyy'});
        };

        /**
         * gets localeData for used locale, if no locale is given use rendered one
         *
         * @return {Date} in UTC timezone
         * @private
         */
        Calendar.prototype._getLocaleData = function () {

            var sLocale, oLocale;
            if (!this._oLocaleData) {
                sLocale = this._getLocale();
                oLocale = new sap.ui.core.Locale(sLocale);
                this._oLocaleData = LocaleData.getInstance(oLocale);
            }
            return this._oLocaleData;

        };

        /**
         * Creates a Date in UTC timezone from local timezone
         * @param {Date} oDate in local timezone
         * @return {Date} in UTC timezone
         * @private
         */

        Calendar.prototype._createUTCDate =  function (oDate) {

            var oUTCDate;

            if (oDate) {
                oUTCDate = new Date(Date.UTC(oDate.getFullYear(), oDate.getMonth(), oDate.getDate()));
                if (oDate.getFullYear() < 1000) {
                    oUTCDate.setUTCFullYear(oDate.getFullYear());
                }
                return oUTCDate;
            }

        };

        /**
         * Gives a  Current Date in UTC timezone from local timezone
         *
         * @return {Date} in UTC timezone
         * @private
         */

        Calendar.prototype._getCurrentDate = function () {

            this._oFocusedDate = this._createUTCDate(new Date());
            return this._createUTCDate(this._oFocusedDate);

        };

        /**
         * Gives current focussed date for the session.
         *
         * @return focused {Date}
         * @private
         */

        Calendar.prototype._getFocusedDate = function () {

            var that = this,
                aSelectedDate = that.getSelectedDate();

            if (!this._oFocusedDate) {

                if (aSelectedDate) {
                    this._oFocusedDate = this._oFormatYyyymmdd.parse(aSelectedDate);
                } else {
                    this._getCurrentDate();
                }
            }
            return this._oFocusedDate;

        };

        /**
         * To focus the date for the session..
         *
         *
         * @private
         */

        Calendar.prototype._setFocusedDate = function (oDate) {
            this._oFocusedDate = oDate;
        };

        /**
         * render the previous and next months when the user selected to toggle.
         *
         *
         * @private
         */

        Calendar.prototype._renderMonth = function () {

            var oThis = this,
                oDate = oThis._getFocusedDate(),
                $Container = oThis.$('dayPic'),
                oRm,
                aMonthNames = [];
            oThis._sRenderMonth = undefined; // initialize delayed call

            if ($Container.length > 0) {
                oRm = sap.ui.getCore().createRenderManager();
                oThis.getRenderer().renderDays(oRm, oThis, oDate);
                oRm.flush($Container[0]);
                oRm.destroy();
            }

            // change month and year
            if (oThis._bLongMonth || !oThis._bNamesLengthChecked) {
                aMonthNames = oThis._getLocaleData().getMonthsStandAlone('wide');
            } else {
                aMonthNames = oThis._getLocaleData().getMonthsStandAlone('abbreviated');
            }
            oThis.$('month').text(aMonthNames[oDate.getUTCMonth()]);
            oThis.$('year').text(oDate.getUTCFullYear());

        };

        /**
         * change the selected date in the calendar control.
         *
         *
         * @private
         */

        Calendar.prototype._selectDay = function (oDate) {

            var oThis = this,
                aSelectedDates = oThis.getSelectedDate(),
                aDomRefs = oThis.$('dayPic').children('.uteCal-dayPic-day'),
                $DomRef,
                sYyyymmdd,
                i = 0,
                temp;
            sYyyymmdd = oThis._oFormatYyyymmdd.format(oDate, true);
            for (i = 0; i < aDomRefs.length; i = i + 1) {
                $DomRef = jQuery(aDomRefs[i]);
                temp = $DomRef.attr('data-nrg-day');
                if (!$DomRef.hasClass('uteCal-dayPic-dayOtherMonth') && $DomRef.attr('data-nrg-day') === sYyyymmdd) {
                    $DomRef.addClass('uteCal-dayPic-daySelected');
                } else if ($DomRef.hasClass('uteCal-dayPic-daySelected')) {
                    $DomRef.removeClass('uteCal-dayPic-daySelected');
                }
            }
            oThis.setProperty('selectedDate', sYyyymmdd, true);

        };

        /**
         * onClick event will have following functionality.
         * 1) when user is toggling between months.
         * 2) when user selected previous month and next month date so that function will render respective month.
         * 3) User selected a particular date in the calendar, which will populate in to textfield.
         *@param {jQuery.EventObject} oEvent The event object
         *
         */

        Calendar.prototype.onclick = function (oEvent) {

            var that = this,
                oFocusedDate = this._getFocusedDate(),
                $Target,
                oOldFocusedDate;

            if (jQuery.sap.containsOrEquals(this.getDomRef('next'), oEvent.target) && !this.$('next').attr('disabled')) {

                oFocusedDate.setUTCMonth(oFocusedDate.getUTCMonth() + 1, 1);
                that._renderMonth();

            } else if (jQuery.sap.containsOrEquals(this.getDomRef('prev'), oEvent.target) && !this.$('prev').attr('disabled')) {

                oFocusedDate.setUTCDate(1);
                oFocusedDate.setUTCDate(oFocusedDate.getUTCDate() - 1);
                that._renderMonth();

            } else {

                $Target = jQuery(oEvent.target);
                if ($Target.hasClass('uteCal-dayPic-day')) {

                    oFocusedDate = this._getFocusedDate();
                    oOldFocusedDate = oFocusedDate;
                    oFocusedDate = this._oFormatYyyymmdd.parse($Target.attr('data-nrg-day'), false);
                    this._setFocusedDate(oFocusedDate);
                    if (oFocusedDate.getTime() !== oOldFocusedDate.getTime()) {

                        if ($Target.hasClass('uteCal-dayPic-dayOtherMonth')) {

                            // in other month -> change month
                            that._renderMonth();
                            oEvent.stopPropagation();
                            oEvent.preventDefault();
                        } else {

                            this._selectDay(that._getFocusedDate());
                            this.fireEvent('select');
                            //to prevent bubbling into input field if in DatePicker
                            oEvent.stopPropagation();
                            oEvent.preventDefault();
                        }
                    }
                }

            }

        };


       /**
         * gets the used locale for the Calendar
         * only for internal use
         * @return {string} sLocale
         * @private
         */


        Calendar.prototype._getLocale = function () {

            if (!this._sLocale) {
                this._sLocale = sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString();
            }

            return this._sLocale;
        };


        /*
         * Checks if a date is selected and what kind of selected
         * @return {int} iSelected 0: not selected; 1: single day selected
         * @private
         */
        Calendar.prototype._checkDateSelected = function (oDate) {

            var iSelected = 0,
                oSelectedDate = this.getSelectedDate(),
                oDateTimeStamp = oDate.getTime(),
                oSelectedDateTimeStamp;
            if (!(oDate instanceof Date)) {
                throw new Error('Date must be a JavaScript date object; ' + this);
            }

            oSelectedDate = this._oFormatYyyymmdd.parse(oSelectedDate, false);
            if (oSelectedDate) {
                oSelectedDateTimeStamp = oSelectedDate.getTime();
            }
            if (oSelectedDateTimeStamp === oDateTimeStamp) {
                iSelected = 1; // single day selected
            }
            return iSelected;
        };

       /**
         * Change the focusdate and also the render month again in the calendar control
         * only for internal use
         * @return {string} sLocale
         * @private
         */
        Calendar.prototype.focusDate = function (oFocusedDate) {

            this._setFocusedDate(oFocusedDate);
            this.setProperty('selectedDate', this._oFormatYyyymmdd.format(oFocusedDate), true);
            this._renderMonth();
        };
       /**
         * Change the selectedDate
         * only for internal use
         * @return {string} oSelectedDate
         *
         */
        Calendar.prototype.addSelectedDate = function (oSelectedDate) {

            this.setProperty('selectedDate', oSelectedDate, true);
            this._oFocusedDate = this._oFormatYyyymmdd.parse(oSelectedDate);
            this._renderMonth();
        };
        return Calendar;

    },

    true

);
