import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {CarModelSchema} from "../../../_toolbox/schemas/CarModelSchema"
import {CarModelNode} from "../../../../src/models/car-models/types/CarModelNode"
import {validateJson} from "../../../_toolbox/validateJson"

Then('the response should return the CAR MODEL {string}',
    (label: string) => {
        const expectedNode: CarModelNode = world.recallNode(label).data
        const actualNode: CarModelNode = world.recallResponse().data.data

        assert.ok(validateJson(actualNode, CarModelSchema))

        for (const expectedProperty in expectedNode) {
            // @ts-expect-error TS7053
            assert.equal(actualNode[expectedProperty], expectedNode[expectedProperty])
        }
    })
