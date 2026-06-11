import { expect } from "chai";

import { hostToOrigin, parseEndpoint } from "./parse-endpoint.ts";

describe("parseEndpoint", () => {
    it("parses valid hosts", () => {
        expect(parseEndpoint("https://dash.example.com/dashboard")).to.equal("https://dash.example.com");
        expect(parseEndpoint("dash.example.com")).to.equal("https://dash.example.com");
        expect(parseEndpoint("dash.example.com/dashboard")).to.equal("https://dash.example.com");
        expect(parseEndpoint("http://localhost:3000")).to.equal("http://localhost:3000");
    });

    it("does not parse invalid hosts", () => {
        expect(() => parseEndpoint("vibe-dashboard")).to.throw(TypeError);
        expect(() => parseEndpoint("gitpod://")).to.throw(TypeError);
        expect(() => parseEndpoint("ftp://dash.example.com")).to.throw(TypeError);
        expect(() => parseEndpoint("https://")).to.throw(TypeError);
    });
});

describe("hostToOrigin", () => {
    it("converts hosts to origins", () => {
        expect(hostToOrigin("https://gitpod.io")).to.equal("https://gitpod.io/*");
        expect(hostToOrigin("http://localhost:3000")).to.equal("http://localhost:3000/*");
    });

    it("does not convert invalid hosts", () => {
        expect(hostToOrigin("ftp://dash.example.com")).to.be.undefined;
    });
});
