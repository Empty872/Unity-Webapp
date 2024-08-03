@echo off
start cmd /k "node server.js"
timeout /t 2
start https://localhost:3000