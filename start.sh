#!/bin/bash
# PryFry - Start all services natively
# Usage: ./start.sh

set -e

export JAVA_HOME=/opt/homebrew/opt/openjdk@17
export PATH="$JAVA_HOME/bin:$PATH"

echo "=== Starting PryFry ==="
echo ""

# 1. Django DB Service (port 8000)
echo "[1/3] Starting Django DB Service..."
cd db_service
pip3 install -q django djangorestframework django-cors-headers 2>/dev/null
python3 manage.py migrate --run-syncdb 2>/dev/null
python3 manage.py runserver 8000 &
DJANGO_PID=$!
cd ..

# Wait for Django
sleep 3
echo "  Django running on http://localhost:8000"
echo "  Admin panel: http://localhost:8000/admin/"

# 2. Spring Boot Backend (port 8080)
echo "[2/3] Starting Spring Boot Backend..."
cd backend
./mvnw -q spring-boot:run &
SPRING_PID=$!
cd ..

echo "  Spring Boot starting on http://localhost:8080 (takes ~30s first time)"

# 3. React Frontend (port 5173)
echo "[3/3] Starting React Frontend..."
cd frontend
npm install --silent 2>/dev/null
npm run dev &
REACT_PID=$!
cd ..

echo ""
echo "=== All services starting ==="
echo "  Frontend:  http://localhost:5173"
echo "  Backend:   http://localhost:8080"
echo "  DB Service: http://localhost:8000"
echo "  DB Admin:  http://localhost:8000/admin/"
echo ""
echo "Press Ctrl+C to stop all services"

# Cleanup on exit
trap "kill $DJANGO_PID $SPRING_PID $REACT_PID 2>/dev/null; exit" INT TERM
wait
