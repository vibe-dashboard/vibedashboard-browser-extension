import { expect } from "chai";

import { buildVdOpenUrl } from "./build-vd-open-url.ts";

describe("buildVdOpenUrl", () => {
    it("builds the dashboard external view url", () => {
        expect(
            buildVdOpenUrl({
                dashboardOrigin: "https://dash.example.com",
                externalViewUrl: "https://github.com/octocat/Hello-World/pull/1",
            }),
        ).to.equal(
            "https://dash.example.com/dashboard?external_view_url=https%3A%2F%2Fgithub.com%2Foctocat%2FHello-World%2Fpull%2F1",
        );
    });

    it("normalizes a trailing slash on the dashboard origin", () => {
        expect(
            buildVdOpenUrl({
                dashboardOrigin: "http://localhost:3001/",
                externalViewUrl: "https://github.com/octocat/Hello-World/tree/feature%2Fbranch",
            }),
        ).to.equal(
            "http://localhost:3001/dashboard?external_view_url=https%3A%2F%2Fgithub.com%2Foctocat%2FHello-World%2Ftree%2Ffeature%252Fbranch",
        );
    });
});
