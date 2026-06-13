@echo off
REM ============================================
REM Script de configuracion - TP Taller de Programacion 2
REM ============================================

echo.
echo === TP - API RESTful Alumnos, Materias e Inscripciones ===
echo.

REM Verificar que existe .env
if not exist .env (
    echo [!] No se encontro .env. Creando desde .env.example...
    copy .env.example .env >nul
    echo [i] Edita el archivo .env con tus credenciales de MySQL y JWT_SECRET
    echo.
)

REM Preguntar si quiere crear la base de datos
set /p CREAR_DB="Deseas crear/configurar la base de datos MySQL? (s/n): "
if /i "%CREAR_DB%"=="s" (
    echo.
    echo [i] Asegurate de tener MySQL instalado y el comando 'mysql' disponible
    echo.
    set /p DB_USER="Usuario MySQL (default: root): "
    if "%DB_USER%"=="" set DB_USER=root
    set /p DB_PASS="Contrasena MySQL: "
    
    echo.
    echo Creando base de datos y tablas...
    mysql -u %DB_USER% -p%DB_PASS% < "src\sql\esquema.sql"
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Fallo al ejecutar esquema.sql
        pause
        exit /b 1
    )
    echo [OK] Esquema creado
    
    mysql -u %DB_USER% -p%DB_PASS% < "src\sql\datos.sql"
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Fallo al ejecutar datos.sql
        pause
        exit /b 1
    )
    echo [OK] Datos iniciales insertados
)

echo.
echo === Instalando dependencias ===
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Fallo npm install
    pause
    exit /b 1
)
echo [OK] Dependencias instaladas

echo.
echo ============================================
echo Todo listo! Para iniciar el servidor:
echo   npm run dev
echo ============================================
echo.
pause
