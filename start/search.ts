/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import { HydrationService } from "App/Services/HydrationService";
import Logger from "@ioc:Adonis/Core/Logger";

HydrationService.bootstrapSearchEngine();
Logger.info("Search engine bootstrapped");
