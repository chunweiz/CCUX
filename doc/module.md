# Module
Generally, a module is a logical grouping of related business processes such as billing and campaign.

***
## Create a new module

**Initial module structure**

```
ZEMOD_<module folder name>/
└── src/<module ui5 namespace path>/
    ├── asset/
    |   └── css/
    |       └── module.less
    ├── data/
    ├── doc/
    |   └── CHANGELOG.md
    ├── i18n/
    ├── view/
    ├── manifest.json
    └── README.md
```

**Initial manifest.json**

```
#!json
{
    "sap.ui5": {
        "config": {
            "module": {
                "<module ui5 namespace>": {
                    "stylesheet": [
                        "asset/css/module.css"
                    ],
                    "resourceBundle": {
                        "comp-i18n-billing": "i18n/module.properties"
                    },
                    "odata": {
                        "real": {
                            "comp-billing": {
                                "url": "sap/opu/odata/sap/ZE_CCUX_CHKBOOK_SRV/"
                            }
                        },
                        "mock": {
                            "comp-billing": {
                                "mockDataBaseUrl": "data/devtest/",
                                "generateMissingMockData": true
                            }
                        }
                    }
                }
            }
        },

        "routing": {
            "routes": {
                "billing.CheckBook": {
                    "pattern": "billing/checkbook/bp/{bpNum}/ca/{caNum}/co/{coNum}",
                    "target":["billing.Checkbook", "dashboard.CustomerDataSummary", "billing.CheckbookTools"]
                }
            },

            "targets":{
                "billing.Checkbook": {
                    "viewName": "nrg.module.billing.view.BillingCheckbook",
                    "controlId": "idAppGeneral"
                },
                "billing.CheckbookTools": {
                    "viewName": "nrg.module.billing.view.BillingCheckbookTools",
                    "controlId": "idAppTools"
                }
            }
        }
    }
}
```
