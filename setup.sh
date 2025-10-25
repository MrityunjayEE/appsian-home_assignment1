#!/bin/bash

echo "Setting up Task Manager Application..."

# Backend setup
echo "Setting up Backend..."
cd Backend
dotnet restore
cd ..

# Frontend setup
echo "Setting up Frontend..."
cd Frontend
npm install
cd ..

echo "Setup complete!"
echo ""
echo "To run the application:"
echo "1. Backend: cd Backend && dotnet run"
echo "2. Frontend: cd Frontend && npm run dev"
echo ""
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:3000"
