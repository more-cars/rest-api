import {Then} from "@cucumber/cucumber"
import assert from "assert"
import {CarModelSchema} from "../../_toolbox/schemas/CarModelSchema"
import {CarModelNode} from "../../../src/models/car-models/types/CarModelNode"
import {validateJson} from "../../_toolbox/validateJson"

Then('the response should return the CAR MODEL {string}',
    function (label: string) {
        const expectedNode: CarModelNode = this.carmodel[label]
        const actualNode: CarModelNode = this.latestResponse.data

        assert.ok(validateJson(actualNode, CarModelSchema))

        for (const expectedProperty in expectedNode) {
            // @ts-expect-error TS7053
            assert.equal(actualNode[expectedProperty], expectedNode[expectedProperty])
        }
    })
