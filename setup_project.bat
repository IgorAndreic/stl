@echo off
echo Creating virtual environment...
python -m venv myprojectenv
call myprojectenv\Scripts\activate

echo Installing Django...
pip install django

echo Creating Django project and app...
django-admin startproject myproject
cd myproject
python manage.py startapp myapp

echo Adding 'myapp' to INSTALLED_APPS...
powershell -Command "(Get-Content myproject\settings.py) -replace 'INSTALLED_APPS = \[', 'INSTALLED_APPS = \['`n    'myapp',' | Set-Content myproject\settings.py"

echo Setting up static files...
echo STATIC_URL = '/static/'>>myproject\settings.py
echo STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]>>myproject\settings.py

cd ..

echo Creating React client...
npx create-react-app client
cd client

echo Installing proxy middleware...
npm install http-proxy-middleware --save

echo Creating setupProxy.js for API calls...
echo const { createProxyMiddleware } = require('http-proxy-middleware');>src\setupProxy.js
echo module.exports = function(app) {>>src\setupProxy.js
echo   app.use(>>src\setupProxy.js
echo     '/api',>>src\setupProxy.js
echo     createProxyMiddleware({>>src\setupProxy.js
echo       target: 'http://localhost:8000',>>src\setupProxy.js
echo       changeOrigin: true,>>src\setupProxy.js
echo     })>>src\setupProxy.js
echo   );>>src\setupProxy.js
echo };>>src\setupProxy.js

echo Setup complete! You can now start the Django server and React app.
pause
