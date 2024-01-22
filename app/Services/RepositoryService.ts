import Env from "@ioc:Adonis/Core/Env";
import axios from "axios";
import { Gitlab } from "@gitbeaker/node";
import Logger from "@ioc:Adonis/Core/Logger";
import Incident from "App/Models/Incident";
import { IncidentType } from "App/Enums/IncidentType";

export interface RepositoryResult {
    success: boolean;
    stars: number;
    commits: number;
    updatedAt: Date;
    topics: string[];
    license?: {
        key: string;
        name: string;
        url: string;
    };
    openIssues: number;
    archived: boolean;
    forks: number;
    createdAt: Date;
    languages: Record<string, number>;
    websiteURL?: string;
    description?: string;
}

export class RepositoryService {
    public static async getRepositoryData(url: string): Promise<RepositoryResult | null> {
        if (url.startsWith("https://github.com")) {
            return this.getGithubRepositoryData(url);
        } else if (url.startsWith("https://gitlab.com")) {
            return this.getGitLabRepositoryData(url);
        }
        return null;
    }

    private static async getGithubRepositoryData(url: string): Promise<RepositoryResult | null> {
        try {
            const [owner, repo] = url.split("/").slice(-2);
            const repositoryRequest = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Env.get("GITHUB_TOKEN")}`,
                },
            });
            const repository = (await repositoryRequest.json()) as any;
            /* const languages = (
                await axios.get(repository.languages_url, {
                    headers: {
                        Authorization: `Bearer ${Env.get("GITHUB_TOKEN")}`,
                    },
                })
            ).data; */
            if (repository.message === "Not Found") {
                Logger.error("Repository not found");
                const incident = new Incident();
                incident.type = IncidentType.FAULTY_REPOSITORY;
                incident.title = "Repository not found";
                incident.description = `Repository ${url} not found`;
                incident.data = { url };
                await incident.save();
                return null;
            }

            return {
                success: true,
                stars: repository.stargazers_count,
                commits: -1,
                updatedAt: new Date(repository.updated_at),
                topics: repository.topics ?? [],
                license: {
                    key: repository.license?.key ?? "",
                    name: repository.license?.name ?? "",
                    url: repository.license?.url ?? "",
                },
                openIssues: repository.open_issues_count,
                archived: repository.archived,
                forks: repository.forks_count,
                createdAt: new Date(repository.created_at),
                languages: {},
                websiteURL: repository.homepage ?? repository.html_url ?? undefined,
                description: repository.description ?? undefined,
            };
        } catch (e) {
            Logger.error(e);
            return null;
        }
    }

    private static async getGitLabRepositoryData(url: string): Promise<RepositoryResult | null> {
        Logger.info("Getting GitLab repository data for %s", url);
        try {
            const gitlab = new Gitlab({
                host: "https://gitlab.com",
                token: Env.get("GITLAB_TOKEN"),
            });
            const [namespace, projectName] = url.split("/").slice(-2);
            if (!namespace || !projectName) {
                return this.returnErrorResult();
            }
            const nameSpaceAndProject = `${namespace}/${projectName}`;
            const project = await gitlab.Projects.show(nameSpaceAndProject);
            return {
                success: true,
                stars: project.star_count,
                commits: -1,
                archived: project.archived,
                createdAt: new Date(project.created_at),
                forks: project.forks_count,
                languages: await gitlab.Projects.languages(nameSpaceAndProject),
                openIssues: project.open_issues_count,
                topics: project.topics ?? [],
                updatedAt: new Date(project.last_activity_at),
                websiteURL: project.web_url,
                description: project.description,
            };
        } catch (e) {
            Logger.error(e);
            return null;
        }
    }

    private static returnErrorResult(): RepositoryResult {
        return {
            success: false,
            stars: -1,
            commits: -1,
            archived: false,
            createdAt: new Date(),
            forks: 0,
            languages: {},
            openIssues: 0,
            topics: [],
            updatedAt: new Date(),
        };
    }
}
