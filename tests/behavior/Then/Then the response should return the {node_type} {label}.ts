import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {validateJson} from "../../_toolbox/validateJson"
import type {BaseNode} from "../../../src/db/types/BaseNode"
import {CompanySchema} from "../../_toolbox/schemas/CompanySchema"

Then('the response should return the {string} {string}',
    (nodeType: string, label: string) => {
        const expectedNode: BaseNode = world.recallNode(label).data
        const actualNode = world.recallResponse().data

        assert.ok(validateJson(actualNode, CompanySchema))

        for (const expectedProperty in expectedNode) {
            // @ts-expect-error TS7053
            assert.equal(actualNode[expectedProperty], expectedNode[expectedProperty])
        }
    })
