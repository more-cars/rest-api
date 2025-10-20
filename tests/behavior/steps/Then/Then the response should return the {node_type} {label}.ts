import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import type {BaseNode} from "../../../../src/db/types/BaseNode"
import {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CompanySchema} from "../../../_toolbox/schemas/CompanySchema"
import {BrandSchema} from "../../../_toolbox/schemas/BrandSchema"
import {CarModelSchema} from "../../../_toolbox/schemas/CarModelSchema"
import {RaceTrackSchema} from "../../../_toolbox/schemas/RaceTrackSchema"
import {ImageSchema} from "../../../_toolbox/schemas/ImageSchema"
import {validateJson} from "../../../_toolbox/validateJson"

Then('the response should return the {string} {string}',
    (nodeType: string, label: string) => {
        const expectedNode: BaseNode = world.recallNode(label).data
        const actualNode = world.recallResponse().data.data

        let schema
        switch (nodeType.toLowerCase()) {
            case NodeTypeEnum.COMPANY:
                schema = CompanySchema
                break
            case NodeTypeEnum.BRAND:
                schema = BrandSchema
                break
            case NodeTypeEnum.CAR_MODEL:
                schema = CarModelSchema
                break
            case NodeTypeEnum.IMAGE:
                schema = ImageSchema
                break
            case NodeTypeEnum.RACE_TRACK:
                schema = RaceTrackSchema
                break
            default:
                assert.fail(`Node type "${nodeType}" is invalid or unknown`)
        }
        assert.ok(validateJson(actualNode, schema))

        for (const expectedProperty in expectedNode) {
            // @ts-expect-error TS7053
            assert.equal(actualNode[expectedProperty], expectedNode[expectedProperty])
        }
    })
