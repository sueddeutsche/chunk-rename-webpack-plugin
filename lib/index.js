"use strict"; // eslint-disable-line strict
let instanceCounter = 0;

module.exports = class ChunkRenamePlugin {
    /**
     * Rename specific chunks deviating from output.filename and output.chunkFilename
     *
     * @param {Object} mapping  - Mapping from chunk name to filename template. See readme.md for details.
     */
    constructor(mapping) {
        this.mapping = mapping;
        this.instanceId = `crwp-${instanceCounter++}`;
    }

    apply(compiler) {
        compiler.plugin("this-compilation", (compilation) => {
            compilation.plugin(["optimize-chunks", "optimize-extracted-chunks"], (chunks) => {
                // Prevent multiple rename operations
                if (compilation[this.instanceId]) {
                    return;
                }
                compilation[this.instanceId] = true;

                chunks.forEach((chunk) => {
                    Object
                        .keys(this.mapping)
                        .forEach((chunkName) => {
                            if (chunkName === chunk.name) {
                                chunk.filenameTemplate = this.mapping[chunkName];
                            }
                        });
                });
            });
        });
    }
};
