import Router from "@ioc:Adonis/Core/Route";

Router.group(() => {
    Router.group(() => {
        Router.post("/hydrateTools", "v1/InternalsController.hydrateTools").as("hydrateTools");
        Router.post("/hydrateTool/:toolId", "v1/InternalsController.hydrateTool").as("hydrateTool");
        Router.post("/calculateScores", "v1/InternalsController.calculateScores").as("calculateScores");
        Router.post("/calculateScore/:toolId", "v1/InternalsController.calculateScore").as("calculateScore");
        Router.post("/hydrateToolSearchIndex", "v1/InternalsController.hydrateToolSearchIndex").as("hydrateToolSearchIndex");
        Router.post("/hydrateCategorySearchIndex", "v1/InternalsController.hydrateCategorySearchIndex").as("hydrateCategorySearchIndex");
    })
        .prefix("/internals")
        .as("internals")
        .middleware(["auth:jwt", "internal"]);

    Router.group(() => {
        Router.post("/login", "v1/AuthController.login").as("login").middleware("auth:basic");
        Router.post("/logout", "v1/AuthController.logout").as("logout.post").middleware("auth:jwt");
        Router.get("/logout", "v1/AuthController.logout").as("logout.get").middleware("auth:jwt");
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

    Router.group(() => {
        Router.get("/redirect", "v1/GithubController.redirect").as("redirect");
        Router.get("/callback", "v1/GithubController.callback").as("callback");
    })
        .prefix("/github")
        .as("github");

    Router.group(() => {
        Router.get(":id", "v1/UsersController.getUserById").as("getById").middleware("auth:jwt");
    })
        .prefix("/users")
        .as("users");
})
    .prefix("/api/v1")
    .as("api.v1");
