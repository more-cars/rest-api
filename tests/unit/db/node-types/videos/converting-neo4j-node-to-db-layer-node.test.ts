import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertVideoNeo4jNodeToDbNode} from "../../../../../src/db/node-types/videos/convertVideoNeo4jNodeToDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {VideoNode} from "../../../../../src/db/node-types/videos/types/VideoNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            video_provider: "youtube",
            external_id: "NqsBncRslsg",
            title: "P1 vs F40",
            description: "Drag Race - P1 vs F40",
            creator: "Lovecars",
            license: "youtube",
            tags: "F40, P1",
            source: "https://www.youtube.com/watch?v=NqsBncRslsg",
            duration: "PT7M24S",
            thumbnail_url_l: "https://i.ytimg.com/vi/NqsBncRslsg/maxresdefault.jpg",
            thumbnail_url_m: "https://i.ytimg.com/vi/NqsBncRslsg/sddefault.jpg",
            thumbnail_url_s: "https://i.ytimg.com/vi/NqsBncRslsg/mqdefault.jpg",
            thumbnail_url_xs: "https://i.ytimg.com/vi/NqsBncRslsg/default.jpg",
        },
        elementId: "",
    }

    const mappedNode = convertVideoNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: DbNodeType.Video,
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                video_provider: "youtube",
                external_id: "NqsBncRslsg",
                title: "P1 vs F40",
                description: "Drag Race - P1 vs F40",
                creator: "Lovecars",
                license: "youtube",
                tags: "F40, P1",
                source: "https://www.youtube.com/watch?v=NqsBncRslsg",
                duration: "PT7M24S",
                thumbnail_url_l: "https://i.ytimg.com/vi/NqsBncRslsg/maxresdefault.jpg",
                thumbnail_url_m: "https://i.ytimg.com/vi/NqsBncRslsg/sddefault.jpg",
                thumbnail_url_s: "https://i.ytimg.com/vi/NqsBncRslsg/mqdefault.jpg",
                thumbnail_url_xs: "https://i.ytimg.com/vi/NqsBncRslsg/default.jpg",
            },
        } satisfies VideoNode)
})
