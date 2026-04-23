import {expect, test} from 'vitest'
import {createNeo4jNode} from "../../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {VideoNode} from "../../../../../../src/db/node-types/videos/types/VideoNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        video_provider: "'youtube''",
        external_id: "'NqsBncRslsg''",
        title: "'P1 vs F40''",
        description: "'Drag Race - P1 vs F40''",
        creator: "'Lovecars''",
        license: "'youtube''",
        tags: "'F40, P1''",
        source: "'https://www.youtube.com/watch?v=NqsBncRslsg''",
        duration: "'PT7M24S''",
        thumbnail_url_l: "'https://i.ytimg.com/vi/NqsBncRslsg/maxresdefault.jpg''",
        thumbnail_url_m: "'https://i.ytimg.com/vi/NqsBncRslsg/sddefault.jpg''",
        thumbnail_url_s: "'https://i.ytimg.com/vi/NqsBncRslsg/mqdefault.jpg''",
        thumbnail_url_xs: "'https://i.ytimg.com/vi/NqsBncRslsg/default.jpg''",
    }

    const createdNode = await createNeo4jNode(DbNodeType.Video, data) as VideoNode

    expect(createdNode.properties.video_provider)
        .toEqual("'youtube''")

    expect(createdNode.properties.external_id)
        .toEqual("'NqsBncRslsg''")

    expect(createdNode.properties.title)
        .toEqual("'P1 vs F40''")

    expect(createdNode.properties.description)
        .toEqual("'Drag Race - P1 vs F40''")

    expect(createdNode.properties.creator)
        .toEqual("'Lovecars''")

    expect(createdNode.properties.license)
        .toEqual("'youtube''")

    expect(createdNode.properties.tags)
        .toEqual("'F40, P1''")

    expect(createdNode.properties.source)
        .toEqual("'https://www.youtube.com/watch?v=NqsBncRslsg''")

    expect(createdNode.properties.duration)
        .toEqual("'PT7M24S''")

    expect(createdNode.properties.thumbnail_url_l)
        .toEqual("'https://i.ytimg.com/vi/NqsBncRslsg/maxresdefault.jpg''")

    expect(createdNode.properties.thumbnail_url_m)
        .toEqual("'https://i.ytimg.com/vi/NqsBncRslsg/sddefault.jpg''")

    expect(createdNode.properties.thumbnail_url_s)
        .toEqual("'https://i.ytimg.com/vi/NqsBncRslsg/mqdefault.jpg''")

    expect(createdNode.properties.thumbnail_url_xs)
        .toEqual("'https://i.ytimg.com/vi/NqsBncRslsg/default.jpg''")
})
