import { expect } from "chai";

import { buildVdOpenUrl } from "./build-vd-open-url.ts";

describe("buildVdOpenUrl", () => {
    it("builds the dashboard open-from-github url", () => {
        expect(
            buildVdOpenUrl({
                dashboardOrigin: "https://dash.example.com",
                githubUrl: "https://github.com/octocat/Hello-World/pull/1",
            }),
        ).to.equal(
            "https://dash.example.com/dashboard?from_gh_url=https%3A%2F%2Fgithub.com%2Foctocat%2FHello-World%2Fpull%2F1",
        );
    });

    it("normalizes a trailing slash on the dashboard origin", () => {
        expect(
            buildVdOpenUrl({
                dashboardOrigin: "http://localhost:3001/",
                githubUrl: "https://github.com/octocat/Hello-World/tree/feature%2Fbranch",
            }),
        ).to.equal(
            "http://localhost:3001/dashboard?from_gh_url=https%3A%2F%2Fgithub.com%2Foctocat%2FHello-World%2Ftree%2Ffeature%252Fbranch",
        );
    });
});
