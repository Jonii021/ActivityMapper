This is a project made with efcore and react native and the function of this project is to be a application where you can create and join activities made by you or someone in your area. (the project is still in production)

to try the application you will need docker and .net 9.0 or newer, 

to start the application

/myApp
docker compose up -d

myApp/backend
dotnet ef update database

myApp/Frontend
(need to change ip in api.ts -- will be fixed later)
npm install
npx expo start
