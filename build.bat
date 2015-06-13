call grunt --build=base --baseFolder=ZEBASE
call grunt --build=control --controlLibrary=ute.ui.main --controlFolder=ZECTRL_MAIN
call grunt --build=control --controlLibrary=ute.ui.commons --controlFolder=ZECTRL_COMMONS
call grunt --build=module --moduleName=nrg.module.app.header --moduleFolder=ZEMOD_APP
call grunt --build=module --moduleName=nrg.module.app.footer --moduleFolder=ZEMOD_APP
call grunt --build=module --moduleName=nrg.module.app.main --moduleFolder=ZEMOD_APP
call grunt --build=module --moduleName=nrg.module.others --moduleFolder=ZEMOD_OTHERS
call grunt --build=module --moduleName=nrg.module.dashboard --moduleFolder=ZEMOD_DSHB
call grunt --build=module --moduleName=nrg.module.campaign --moduleFolder=ZEMOD_CMPGN
call grunt --build=component --componentName=nrg.component.ic --componentFolder=ZECMP_IC