@SETLOCAL
@SET ECLIPSE_WORKSPACE_PATH=%1

@CALL grunt --deploy=base --baseFolder=ZEBASE --baseName=nrg.base --eclipseProjectPath=%ECLIPSE_WORKSPACE_PATH%\ZEBASE
@CALL grunt --deploy=control --controlFolder=ZECTRL_MAIN --controlName=ute.ui.main --eclipseProjectPath=%ECLIPSE_WORKSPACE_PATH%\ZECTRL_MAIN
@CALL grunt --deploy=control --controlFolder=ZECTRL_COMMONS --controlName=ute.ui.commons --eclipseProjectPath=%ECLIPSE_WORKSPACE_PATH%\ZECTRL_COMMONS
@CALL grunt --deploy=module --moduleName=nrg.module.app.main --moduleFolder=ZEMOD_APP --eclipseProjectPath=%ECLIPSE_WORKSPACE_PATH%\ZEMOD_APP
@CALL grunt --deploy=module --moduleName=nrg.module.app.header --moduleFolder=ZEMOD_APP --eclipseProjectPath=%ECLIPSE_WORKSPACE_PATH%\ZEMOD_APP
@CALL grunt --deploy=module --moduleName=nrg.module.app.footer --moduleFolder=ZEMOD_APP --eclipseProjectPath=%ECLIPSE_WORKSPACE_PATH%\ZEMOD_APP
@CALL grunt --deploy=module --moduleName=nrg.module.others --moduleFolder=ZEMOD_OTHERS --eclipseProjectPath=%ECLIPSE_WORKSPACE_PATH%\ZEMOD_OTHERS
@CALL grunt --deploy=module --moduleName=nrg.module.dashboard --moduleFolder=ZEMOD_DSHB --eclipseProjectPath=%ECLIPSE_WORKSPACE_PATH%\ZEMOD_DSHB
@CALL grunt --deploy=module --moduleName=nrg.module.campaign --moduleFolder=ZEMOD_CMPGN --eclipseProjectPath=%ECLIPSE_WORKSPACE_PATH%\ZEMOD_CMPGN
@CALL grunt --deploy=component --componentName=nrg.component.ic --componentFolder=ZECMP_IC --eclipseProjectPath=%ECLIPSE_WORKSPACE_PATH%\ZECMP_IC

@ENDLOCAL