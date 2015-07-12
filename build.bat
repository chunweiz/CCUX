@CALL grunt --build=base --baseFolder=ZEBASE
@CALL grunt --build=control --controlLibrary=ute.ui.main --controlFolder=ZECTRL_MAIN
@CALL grunt --build=control --controlLibrary=ute.ui.commons --controlFolder=ZECTRL_COMMONS
@CALL grunt --build=control --controlLibrary=ute.ui.app --controlFolder=ZECTRL_APP
@CALL grunt --build=module --moduleName=nrg.module.app.header --moduleFolder=ZEMOD_APP
@CALL grunt --build=module --moduleName=nrg.module.app.footer --moduleFolder=ZEMOD_APP
@CALL grunt --build=module --moduleName=nrg.module.app.main --moduleFolder=ZEMOD_APP
@CALL grunt --build=module --moduleName=nrg.module.others --moduleFolder=ZEMOD_OTHERS
@CALL grunt --build=module --moduleName=nrg.module.dashboard --moduleFolder=ZEMOD_DSHB
@CALL grunt --build=module --moduleName=nrg.module.campaign --moduleFolder=ZEMOD_CMPGN
@CALL grunt --build=component --componentName=nrg.component.ic --componentFolder=ZECMP_IC