import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/nodes/images/createNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        external_id: "Ö_3'A123456789",
        image_provider: "flickr's",
        name: "'''",
        description: "$A'1",
        creator: "B''2$",
        license: "C'''3$\"",
        tags: "D''''4",
        source: "E'''''5",
        image_url_original: "abcd'ef",
        image_url_xxl: "ab'cd'ef",
        image_url_xl: "ab'cd''ef",
        image_url_l: "ab''cd'ef",
        image_url_m: "ab'cd'ef",
        image_url_s: "ab''cd'ef",
        image_url_xs: "ab'''cd'ef",
    }
    const createdNode = await createNode(data)

    expect(createdNode.properties.external_id)
        .toEqual("Ö_3'A123456789")

    expect(createdNode.properties.image_provider)
        .toEqual("flickr's")

    expect(createdNode.properties.name)
        .toEqual("'''")

    expect(createdNode.properties.description)
        .toEqual("$A'1")

    expect(createdNode.properties.creator)
        .toEqual("B''2$")

    expect(createdNode.properties.license)
        .toEqual("C'''3$\"")

    expect(createdNode.properties.tags)
        .toEqual("D''''4")

    expect(createdNode.properties.source)
        .toEqual("E'''''5")

    expect(createdNode.properties.image_url_original)
        .toEqual("abcd'ef")

    expect(createdNode.properties.image_url_xxl)
        .toEqual("ab'cd'ef")

    expect(createdNode.properties.image_url_xl)
        .toEqual("ab'cd''ef")

    expect(createdNode.properties.image_url_l)
        .toEqual("ab''cd'ef")

    expect(createdNode.properties.image_url_m)
        .toEqual("ab'cd'ef")

    expect(createdNode.properties.image_url_s)
        .toEqual("ab''cd'ef")

    expect(createdNode.properties.image_url_xs)
        .toEqual("ab'''cd'ef")
})
