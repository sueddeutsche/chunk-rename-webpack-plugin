const ChunkRenamePlugin = require("../lib/");
const expect = require("chai").expect;

describe("unit", () => {
    it("should not rename chunks more than once per compilation", (done) => {
        const chunks = [{
            name: "cookie"
        }];

        const mapping = {
            cookie: "monster.js"
        };

        const plugin = new ChunkRenamePlugin(mapping);

        plugin.apply({
            plugin: (event, compilationCb) => {
                compilationCb({
                    plugin: (events, chunksCb) => {
                        chunksCb(chunks);
                        mapping.cookie = "error.js";
                        chunksCb(chunks);
                        expect(chunks[0].filenameTemplate).to.equal("monster.js");

                        done();
                    }
                });
            }
        });
    });
});
