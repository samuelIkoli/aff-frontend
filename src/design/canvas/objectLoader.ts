import * as fabric from "fabric";
import { loadSVGAsGroup } from "@/lib/fabricLoader";
import type { BlockMetadata, LoadedBlock } from "./types";

async function fetchMetadata(url: string): Promise<BlockMetadata> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load metadata: ${url}`);
    return res.json();
}

type LoadBlockOptions = {
    patternPath: string;
    metadataPath: string;
    groupOptions?: fabric.IGroupOptions;
};

/**
 * Load an SVG block and attach its metadata to the fabric group.
 */
export async function loadBlock(options: LoadBlockOptions): Promise<LoadedBlock> {
    const { patternPath, metadataPath, groupOptions } = options;
    const metadata = await fetchMetadata(metadataPath);
    const group = await loadSVGAsGroup(patternPath, {
        selectable: false,
        ...(groupOptions ?? {}),
    });

    (group as any).metadata = metadata;
    return { group, metadata };
}
