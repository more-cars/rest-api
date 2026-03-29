import {expect, test} from 'vitest'
import {VideoNode} from "../../../../../../src/models/node-types/videos/types/VideoNode"
import {ModelNodeType} from "../../../../../../src/models/types/ModelNodeType"
import {convertVideoModelNodeToControllerNode} from "../../../../../../src/controllers/node-types/videos/convertVideoModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../../src/controllers/types/ControllerNodeType"

test("converting a VIDEO node", async () => {
    const node: VideoNode = {
        node_type: ModelNodeType.Video,
        attributes: {
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
    }

    const convertedNode = convertVideoModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.Video,
            fields: {
                id: 1,
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
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            },
        })
})
