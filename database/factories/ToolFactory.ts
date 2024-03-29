import Tool from "App/Models/Tool";
import Factory from "@ioc:Adonis/Lucid/Factory";
import { toolIconIdentifier, toolLicenses, toolNames, toolRepositoryUrls, toolWebsiteUrls } from "Database/seeders/data/ToolSamples";

export default Factory.define(Tool, ({ faker }) => {
    return {
        //
        name: faker.helpers.arrayElement(toolNames),
        websiteUrl: faker.helpers.arrayElement(toolWebsiteUrls),
        repositoryUrl: faker.helpers.arrayElement(toolRepositoryUrls),
        description: faker.lorem.paragraph(),
        // set license by a change of 60% of being null or faker.
        license: faker.datatype.boolean({ probability: 0.6 }) ? faker.helpers.arrayElement(toolLicenses) : null,
        iconIdentifier: faker.helpers.arrayElement(toolIconIdentifier),
    };
}).build();
