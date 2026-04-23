import {expect, test} from 'vitest'
import {InputVideoCreate} from "../../../../../src/db/node-types/videos/types/InputVideoCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a VIDEO node', async () => {
    const data: InputVideoCreate = {
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
        thumbnail_url_xs: "https://i.ytimg.com/vi/NqsBncRslsg/default.jpg"
    }

    const query = createNodeQuery(DbNodeType.Video, data, "2025-05-14T11:05:07.793Z")

    expect(query)
        .toEqual(
            "CREATE (n:Video_A_" + appInstanceId + " {\n" +
            "  video_provider: 'youtube',\n" +
            "  external_id: 'NqsBncRslsg',\n" +
            "  title: 'P1 vs F40',\n" +
            "  description: 'Drag Race - P1 vs F40',\n" +
            "  creator: 'Lovecars',\n" +
            "  license: 'youtube',\n" +
            "  tags: 'F40, P1',\n" +
            "  source: 'https://www.youtube.com/watch?v=NqsBncRslsg',\n" +
            "  duration: 'PT7M24S',\n" +
            "  thumbnail_url_l: 'https://i.ytimg.com/vi/NqsBncRslsg/maxresdefault.jpg',\n" +
            "  thumbnail_url_m: 'https://i.ytimg.com/vi/NqsBncRslsg/sddefault.jpg',\n" +
            "  thumbnail_url_s: 'https://i.ytimg.com/vi/NqsBncRslsg/mqdefault.jpg',\n" +
            "  thumbnail_url_xs: 'https://i.ytimg.com/vi/NqsBncRslsg/default.jpg',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
