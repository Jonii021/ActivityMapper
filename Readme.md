This is a project made with efcore and react native and the function of this project is to be a application where you can create and join activities made by you or someone in your area. (the project is still in production)

Features

Create activities and invite others

Browse and join activities in your area

Backend powered by EF Core and .NET

Requirements

Docker

.NET 9.0 or newer

Node.js and npm

Getting Started

Follow these steps to run the application locally:

1. Start the application with Docker
/myApp
docker compose up -d

2. Update the database
/myApp/backend
dotnet ef database update

3. Run the frontend
/myApp/frontend


Note: Before running, update the IP address in api.ts to point to your backend. This will be fixed in a future release.

npm install
npx expo start

Project Status

Currently in development

Some features are not finalized

