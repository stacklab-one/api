/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Event from "@ioc:Adonis/Core/Event";
import Logger from "@ioc:Adonis/Core/Logger";

Event.on("hydrate:tool", "Tool.onHydrateTool");
Event.on("hydrate:tools", "Tool.onHydrateTools");
Event.on("calculate:score", "Tool.onCalculateScore");
Event.on("calculate:scores", "Tool.onCalculateScores");

Logger.info("Registered Events");
