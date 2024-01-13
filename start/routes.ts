/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import "./routes/api/v1/routes";

import Application from "@ioc:Adonis/Core/Application";
import Route from "@ioc:Adonis/Core/Route";
import Logger from "@ioc:Adonis/Core/Logger";

Route.get("/", async () => {
    return { hello: "world" };
});

if (Application.inDev) {
    Route.get("/test", "TestController.index");
    Route.post("/test/fileUpload", "TestController.upload");
}

Logger.info("Registered Routes");
