import {describe, expect, test, vi} from 'vitest'
import request from "supertest"
import {getAllExpectedNodeTypes} from "../../../_toolbox/getAllExpectedNodeTypes"
import * as yt from "../../../../src/db/external/youtube/performYouTubeApiRequest"
import * as wm from "../../../../src/db/external/wikimedia/performWikimediaApiRequest"
import {FakeGetVideoByIdResponse} from "../../../_toolbox/fixtures/external/youtube/FakeGetVideoByIdResponse"
import {FakeGetWikimediaImageByIdResponse} from "../../../_toolbox/fixtures/external/wikimedia/FakeGetWikimediaImageByIdResponse"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import {app} from "../../../../src/app"
import {getUrlFragmentForNodeType} from "../../../_toolbox/getUrlFragmentForNodeType"
import {convertStringToNodeType} from "../../../_toolbox/convertStringToNodeType"

describe('The user injects the timestamp fields illegally', () => {
    test.each(
        getAllExpectedNodeTypes().map(nodeType => [nodeType]),
    )('when creating a new node of type $0', async (nodeType) => {
        if (!nodeType) {
            return
        }

        // edge case 'Video' -> mocking YouTube API request
        vi.spyOn(yt, 'performYouTubeApiRequest')
            .mockImplementation(async () => FakeGetVideoByIdResponse)

        // edge case 'Image' -> mocking Wikimedia API request
        vi.spyOn(wm, 'performWikimediaApiRequest')
            .mockImplementation(async () => FakeGetWikimediaImageByIdResponse)

        const manipulatedInput = Object.assign({}, getFakeNode(nodeType).dbInput, {
            name: "TIMESTAMP TEST",
            created_at: "blubb",
            updated_at: "blobb",
        })

        const response = await request(app)
            .post('/' + getUrlFragmentForNodeType(convertStringToNodeType(nodeType)))
            .send(manipulatedInput)

        expect(response.body.attributes).toHaveProperty('created_at')
        expect(response.body.attributes).not.toHaveProperty('created_at', "blubb")
        expect(response.body.attributes).toHaveProperty('updated_at')
        expect(response.body.attributes).not.toHaveProperty('updated_at', "blobb")
    })
})
