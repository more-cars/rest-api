import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {CarModelSchema} from "../../_schemas/CarModelSchema"
import {CarModelNode} from "../../../src/types/car-models/CarModelNode"
import {validateJson} from "../../_helpers/validateJson"

Then('the response should return the car model {string}', function (label: string) {
    const expectedNode: CarModelNode = this.carmodel[label]
    const actualNode: CarModelNode = this.latestResponse.data

    assert.ok(validateJson(actualNode, CarModelSchema))

    for (const expectedProperty in expectedNode) {
        // @ts-expect-error TS7053
        assert.equal(actualNode[expectedProperty], expectedNode[expectedProperty])
    }
})
