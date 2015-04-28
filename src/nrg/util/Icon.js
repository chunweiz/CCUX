/*globals sap*/

sap.ui.define(
    [
        'sap/ui/core/IconPool'
    ],

    function (IconPool) {
        'use strict';

        var Icon;

        Icon = function () {};

        Icon.prototype.load = function () {
            IconPool.addIcon('agent', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e600'
            });

            IconPool.addIcon('billing', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e601'
            });

            IconPool.addIcon('bp', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e602'
            });

            IconPool.addIcon('bulb', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e603'
            });

            IconPool.addIcon('calculator', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e604'
            });

            IconPool.addIcon('call-center', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e605'
            });

            IconPool.addIcon('campaign', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e606'
            });

            IconPool.addIcon('cc-amex', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e607'
            });

            IconPool.addIcon('cc-discover', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e608'
            });

            IconPool.addIcon('cc-mastercard', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e609'
            });

            IconPool.addIcon('cc-visa', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e60a'
            });

            IconPool.addIcon('contact-log', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e60b'
            });

            IconPool.addIcon('dashboard', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e60c'
            });

            IconPool.addIcon('dollar', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e60d'
            });

            IconPool.addIcon('enroll-biz', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e60e'
            });

            IconPool.addIcon('enroll-res', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e60f'
            });

            IconPool.addIcon('gear', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e610'
            });

            IconPool.addIcon('high-bill', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e611'
            });

            IconPool.addIcon('history', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e612'
            });

            IconPool.addIcon('ivr', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e613'
            });

            IconPool.addIcon('location', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e614'
            });

            IconPool.addIcon('notes', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e615'
            });

            IconPool.addIcon('notification', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e616'
            });

            IconPool.addIcon('pencil', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e617'
            });

            IconPool.addIcon('popup', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e618'
            });

            IconPool.addIcon('refresh', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e619'
            });

            IconPool.addIcon('rhs', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e61a'
            });

            IconPool.addIcon('service-order', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e61b'
            });

            IconPool.addIcon('survey', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e61c'
            });

            IconPool.addIcon('tag', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e61d'
            });

            IconPool.addIcon('weather-cloud', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e61e'
            });

            IconPool.addIcon('weather-rain-sun', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e61f'
            });

            IconPool.addIcon('weather-rain', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e620'
            });

            IconPool.addIcon('weather-snow', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e621'
            });

            IconPool.addIcon('weather-sunny', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e622'
            });

            IconPool.addIcon('webchat', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e623'
            });

            IconPool.addIcon('website', 'nrg-icon', {
                fontFamily: 'nrg-icon',
                content: 'e624'
            });
        };

        return new Icon();
    },

    false
);

/*
.icon-billing:before {
	content: "\e601";
}

.icon-bp:before {
	content: "\e602";
}

.icon-bulb:before {
	content: "\e603";
}

.icon-calculator:before {
	content: "\e604";
}

.icon-call-center:before {
	content: "\e605";
}

.icon-campaign:before {
	content: "\e606";
}

.icon-cc-amex:before {
	content: "\e607";
}

.icon-cc-discover:before {
	content: "\e608";
}

.icon-cc-mastercard:before {
	content: "\e609";
}

.icon-cc-visa:before {
	content: "\e60a";
}

.icon-contact-log:before {
	content: "\e60b";
}

.icon-dashboard:before {
	content: "\e60c";
}

.icon-dollar:before {
	content: "\e60d";
}

.icon-enroll-biz:before {
	content: "\e60e";
}

.icon-enroll-res:before {
	content: "\e60f";
}

.icon-gear:before {
	content: "\e610";
}

.icon-high-bill:before {
	content: "\e611";
}

.icon-history:before {
	content: "\e612";
}

.icon-ivr:before {
	content: "\e613";
}

.icon-location:before {
	content: "\e614";
}

.icon-notes:before {
	content: "\e615";
}

.icon-notification:before {
	content: "\e616";
}

.icon-pencil:before {
	content: "\e617";
}

.icon-popup:before {
	content: "\e618";
}

.icon-refresh:before {
	content: "\e619";
}

.icon-rhs:before {
	content: "\e61a";
}

.icon-service-order:before {
	content: "\e61b";
}

.icon-survey:before {
	content: "\e61c";
}

.icon-tag:before {
	content: "\e61d";
}

.icon-weather-clouds:before {
	content: "\e61e";
}

.icon-weather-rain-sun:before {
	content: "\e61f";
}

.icon-weather-rain:before {
	content: "\e620";
}

.icon-weather-snow:before {
	content: "\e621";
}

.icon-weather-sunny:before {
	content: "\e622";
}

.icon-webchat:before {
	content: "\e623";
}

.icon-website-grey:before {
	content: "\e624";
}
*/
