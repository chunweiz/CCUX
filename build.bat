call grunt --build=base --baseFolder=ZE_CCUX_BASE
call grunt --build=control --controlLibrary=ute.ui.main --controlFolder=ZE_CCUX_CTRL_MAIN
call grunt --build=control --controlLibrary=ute.ui.commons --controlFolder=ZE_CCUX_CTRL_COMMONS
call grunt --build=module --moduleName=nrg.module.app --moduleFolder=ZE_CCUX_MOD_APP
call grunt --build=module --moduleName=nrg.module.others --moduleFolder=ZE_CCUX_MOD_OTHERS
call grunt --build=module --moduleName=nrg.module.dashboard --moduleFolder=ZE_CCUX_MOD_DASHBOARD
call grunt --build=module --moduleName=nrg.module.campaign --moduleFolder=ZE_CCUX_MOD_CAMPAIGN
call grunt --build=component --componentName=nrg.component.ic --componentFolder=ZE_CCUX_COMP_IC