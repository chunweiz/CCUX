/*globals sap, sc */
/*jslint nomen: true */
// Provides control ute.ui.commons.DatePicker.
sap.ui.define(
    [
        'jquery.sap.global',
        './library',
        './Textfield',
        'sap/ui/model/type/Date',
        './Calendar'
    ],
	function (jQuery, library, TextField, Date1, Calendar) {
	    'use strict';

        var DatePicker = TextField.extend('ute.ui.commons.DatePicker', { metadata : {
            library : 'ute.ui.commons',
            properties : {
                defaultDate : {type : 'string', group : 'Misc', defaultValue : null}
            },
            events : {

            }
        }});

        /**
         * Initialization hook for the DatePicker.
         * It initializes some basic configuration.
         * 1) Assuming Default Date format is MM/dd/yyyy for NRG.
         * 2) Setting Min date and Max date for the validation purpose.
         *
         * @private
         */
        DatePicker.prototype.init = function () {

            this._oFormatYyyymmdd = sap.ui.core.format.DateFormat.getInstance({pattern: 'MM/dd/yyyy', strictParsing: true});
            this._oMinDate = new Date(1, 0, 1);
            this._oMinDate.setFullYear(1); // otherwise year 1 will be converted to year 1901
            this._oMaxDate = new Date(9999, 11, 31);

        };

         /*
         * Date Picker Exit method for memory leaks
         * 1) Deletes the popup session.
         * 2) Also delete calendar session.
         *
         *@private
         */
        DatePicker.prototype.exit = function () {

            this._oDate = undefined;
            this._oLocale = undefined;

            if (this._oPopup) {
                if (this._oPopup.isOpen()) {
                    this._oPopup.close();
                }
                delete this._oPopup;
            }

            if (this._oCalendar) {
                this._oCalendar.destroy();
                delete this._oCalendar;
            }

        };

       /**
         * gets the used locale for the DatePicker
         * only for internal use
         * @return {string} sLocale
         * @private
         */

        DatePicker.prototype._getLocale = function () {
            var oLocale = sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();
            return oLocale;

        };

        /**
         * when user selected particular date in Calendar control that need to be displayed in the Date picker field.
         *
         * @param {jQuery.EventObject} oEvent The event object
         *
         * @private
         */
        DatePicker.prototype._selectDate = function (oEvent) {

            var sNewValue = this._oFormatYyyymmdd.format(this._oCalendar._getFocusedDate()),
                $Input;
            this._oPopup.close();
            this.focus();
            // do not call this._checkChange(); because we already have the date object and no wrong entry is possible

            this.setProperty('value', sNewValue, true);
            this.setProperty('defaultDate', sNewValue, true);
            // this.setProperty('yyyymmdd', sYyyymmdd, true);
            // set inputs value after properties because of placeholder logic for IE
            $Input = jQuery(this.getDomRef());
            if ($Input.val() !== sNewValue) {
                $Input.val(sNewValue);
                this._curpos = sNewValue.length;
                $Input.cursorPos(this._curpos);
            }
        };

       /**
         * To show calendar control when user clicked on icon.
         *
         *
         *
         * @private
         */
        DatePicker.prototype._open = function () {

            var sValue = "",
                eDock,
                oThis = this;

            if (!oThis._oPopup) {
                jQuery.sap.require('sap.ui.core.Popup');
                oThis._oPopup = new sap.ui.core.Popup();
                oThis._oPopup.setAutoClose(true);
                oThis._oPopup.setDurations(0, 0); // no animations
                //oThis._oPopup.attachClosed(_handleClosed, oThis);
            }
            if (!oThis._oCalendar) {
                oThis._oCalendar = new Calendar(oThis.getId() + '-cal');
                oThis._oCalendar.setSelectedDate(oThis.getDefaultDate());
                oThis._oCalendar.attachEvent('select', oThis._selectDate, oThis);
                oThis._oPopup.setContent(oThis._oCalendar);
                oThis._oCalendar.setParent(oThis, undefined, true); // don't invalidate DatePicker
            } else {

                if (oThis.getDefaultDate()) {
                    sValue = oThis.getDefaultDate();
                }
                if (sValue !== oThis.$("input").val()) {
                    oThis._checkChange(); // to prove is something was typed in manually
                }
                oThis._oCalendar.addSelectedDate(oThis.getDefaultDate());
            }

            oThis._oPopup.setAutoCloseAreas([oThis.getDomRef()]);
            eDock = sap.ui.core.Popup.Dock;
            oThis._oPopup.open(0, eDock.BeginTop, eDock.BeginBottom, oThis, null, null, true);

        };

        /**
         * The event to show the calendar control.
         *
         * @param {jQuery.EventObject} oEvent The event object
         *
         *
         */
        DatePicker.prototype.onsapshow = function (oEvent) {
            var that = this;
            this._open(that);
            oEvent.preventDefault(); // otherwise IE opens the address bar history
        };

        /**
         * OnClick event for Date Picker
         *
         * @param {jQuery.EventObject} oEvent The event object
         *
         *
         */
        DatePicker.prototype.onclick = function (oEvent) {
            if (jQuery(oEvent.target).hasClass('uteDatePicIcon')) {
                var that = this;
                this._open(that);
            }
        };

        /**
         * to select default date to be populated in Date picker field and also Calendar control.
         *
         * @param {string} defaultDate
         *
         *
         */
        DatePicker.prototype.setDefaultDate = function (defaultDate) {

            var sOldDefaultDate = this.getDefaultDate(),
                sValue = '',
                sOutputValue = '',
                $Input;
            if (defaultDate === sOldDefaultDate) {
                return this;
            }
            if (defaultDate) {
                this._oDate = this._oFormatYyyymmdd.parse(defaultDate);
                if (!this._oDate || this._oDate.getTime() < this._oMinDate.getTime() || this._oDate.getTime() > this._oMaxDate.getTime()) {
                    this._oDate = undefined;
                    jQuery.sap.log.warning('Value can not be converted to a valid date', this);
                }
            } else {
                this._oDate = undefined;
            }

            if (this._oDate) {
                sValue = this._oFormatYyyymmdd.format(this._oDate);
                this.setProperty('defaultDate', defaultDate, true);

            }
            this.setProperty('value', sValue, true);
            if (this.getDomRef()) {
                // update value in input field
                sOutputValue = '';
                $Input = jQuery(this.getInputDomRef());
                // format date again - maybe value uses not the right pattern ???
                sOutputValue = sValue;
                $Input.val(sOutputValue);
            }

        };

        /**
         * The event to show the calendar control.
         *
         * @param {jQuery.EventObject} oEvent The event object
         *
         *
         */
        DatePicker.prototype.onsapfocusleave = function (oEvent) {
            var that = this;
            // Ignore event if DatePicker is opening or clicked on opener.
            if (this._oCalendar && oEvent.relatedControlId &&
                    (jQuery.sap.containsOrEquals(this._oCalendar.getDomRef(), sap.ui.getCore().byId(oEvent.relatedControlId).getFocusDomRef()) ||
                    this.getId() === oEvent.relatedControlId)) {
                return;
            } else {

                this._checkChange(oEvent);

                if ((that._oPopup !== undefined) && (that._oPopup.isOpen())) {
                    that._oPopup.close();
                    that.focus();
                }
                oEvent.preventDefault();
                oEvent.stopPropagation();
            }
        };

       /**
         * to override the change event of the text field
         *
         * @param {jQuery.EventObject} oEvent The event object
         *
         *
         */
        DatePicker.prototype._checkChange = function (oEvent) {
            var oInput = jQuery(this.getDomRef()),
                sNewValue = oInput.val(),
                oldVal = this.getValue();

            if (this.getEditable() && this.getEnabled() && (oldVal !== sNewValue)) {

                if (sNewValue !== "") {

                    this._oDate = this._oFormatYyyymmdd.parse(sNewValue);
                    if (!this._oDate || this._oDate.getTime() < this._oMinDate.getTime() || this._oDate.getTime() > this._oMaxDate.getTime()) {

				        this._oDate = undefined;

				    } else {

                        // just format date to right pattern, because maybe a fallback pattern is used in the parsing
                        sNewValue = this._oFormatYyyymmdd.format(this._oDate);
                        oInput.val(sNewValue);
                        this.setProperty("value", sNewValue, true); // suppress rerendering
                        this.setProperty("defaultDate", sNewValue, true); // suppress rerendering
                        this.fireChange({newValue: sNewValue}); // oldValue is not that easy in ComboBox and anyway not in API... thus skip it

                        if (this._oPopup && this._oPopup.isOpen()) {
                            this._oCalendar.focusDate(this._oDate);
                        }
				    }
                }

            }
        };
        return DatePicker;

    },
    true
);
