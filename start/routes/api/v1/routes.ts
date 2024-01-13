import Router from "@ioc:Adonis/Core/Route";

Router.group(() => {
    Router.group(() => {
        Router.post("/hydrateTools", "v1/InternalsController.hydrateTools").as("hydrateTools");
        Router.post("/hydrateTool/:toolId", "v1/InternalsController.hydrateTool").as("hydrateTool");
        Router.post("/calculateScores", "v1/InternalsController.calculateScores").as("calculateScores");
        Router.post("/calculateScore/:toolId", "v1/InternalsController.calculateScore").as("calculateScore");
    })
        .prefix("/internals")
        .as("internals")
        .middleware(["auth:jwt", "internal"]);

    Router.group(() => {
        Router.post("/login", "v1/AuthController.login").as("login").middleware("auth:basic");
    })
        .prefix("/auth")
        .as("auth");

    Router.group(() => {
        Router.post("/", "v1/MediaController.index").as("index");
        Router.get("/:mediaId", "v1/MediaController.view").as("view");
        Router.get("/:mediaId/show", "v1/MediaController.show").as("show");
    })
        .prefix("/medias")
        .as("media");
})
    .prefix("/api/v1")
    .as("api.v1");
