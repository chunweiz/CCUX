@SETLOCAL
@SET ECLIPSE_WORKSPACE_PATH=%1
@SET ECLIPSE_SRC_FOLDER=%2

@IF EXIST %ECLIPSE_WORKSPACE_PATH%\%ECLIPSE_SRC_FOLDER% (
    @CALL grunt --deploy=sourceLib --eclipseProjectPath=%ECLIPSE_WORKSPACE_PATH% --eclipseProjectName=%ECLIPSE_SRC_FOLDER%
) ELSE (
    @ECHO Path %ECLIPSE_WORKSPACE_PATH%\%ECLIPSE_SRC_FOLDER% does not exists.
)

@ENDLOCAL