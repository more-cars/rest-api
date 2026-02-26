import {describe, expect, test} from 'vitest'
import {DbNodeType} from "../../../../src/db/types/DbNodeType"
import {getAllDbNodeTypes} from "../../../_toolbox/getAllDbNodeTypes"
import {FakeNodeType} from "../../../_toolbox/fixtures/nodes/FakeNodeType"
import request from "supertest"
import {app} from "../../../../src/app"
import {getUrlFragmentForNodeType} from "../../../_toolbox/getUrlFragmentForNodeType"
import {mapDbNodeTypeToNodeType} from "../../../../src/specification/mapDbNodeTypeToNodeType"

describe('The user injects the timestamp fields illegally', () => {
    test.each(
        getAllDbNodeTypes().map(nodeType => [nodeType]),
    )('when creating a new node of type $0', async (nodeType: DbNodeType) => {
        if (!nodeType) {
            return
        }

        const manipulatedInput = Object.assign({}, FakeNodeType(nodeType).dbInput(), {
            name: "TIMESTAMP TEST",
            created_at: "blubb",
            updated_at: "blobb",
        })

        const response = await request(app)
            .post('/' + getUrlFragmentForNodeType(mapDbNodeTypeToNodeType(nodeType)))
            .send(manipulatedInput)

        expect(response.body.data).toHaveProperty('created_at')
        expect(response.body.data).not.toHaveProperty('created_at', "blubb")
        expect(response.body.data).toHaveProperty('updated_at')
        expect(response.body.data).not.toHaveProperty('updated_at', "blobb")
    })
})
