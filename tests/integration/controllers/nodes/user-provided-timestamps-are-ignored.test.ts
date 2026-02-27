import {describe, expect, test} from 'vitest'
import {getAllNodeTypes} from "../../../_toolbox/getAllNodeTypes"
import {getFakeNode} from "../../../_toolbox/fixtures/nodes/getFakeNode"
import request from "supertest"
import {app} from "../../../../src/app"
import {getUrlFragmentForNodeType} from "../../../_toolbox/getUrlFragmentForNodeType"

describe('The user injects the timestamp fields illegally', () => {
    test.each(
        getAllNodeTypes().map(nodeType => [nodeType]),
    )('when creating a new node of type $0', async (nodeType) => {
        if (!nodeType) {
            return
        }

        const manipulatedInput = Object.assign({}, getFakeNode(nodeType).dbInput(), {
            name: "TIMESTAMP TEST",
            created_at: "blubb",
            updated_at: "blobb",
        })

        const response = await request(app)
            .post('/' + getUrlFragmentForNodeType(nodeType))
            .send(manipulatedInput)

        expect(response.body.data).toHaveProperty('created_at')
        expect(response.body.data).not.toHaveProperty('created_at', "blubb")
        expect(response.body.data).toHaveProperty('updated_at')
        expect(response.body.data).not.toHaveProperty('updated_at', "blobb")
    })
})
