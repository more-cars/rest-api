import {Then, world} from "@cucumber/cucumber"
import assert from "assert"
import {NodeTypeEnum} from "../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CompanySchema} from "../../../_toolbox/schemas/CompanySchema"
import {BrandSchema} from "../../../_toolbox/schemas/BrandSchema"
import {CarModelSchema} from "../../../_toolbox/schemas/CarModelSchema"
import {RaceTrackSchema} from "../../../_toolbox/schemas/RaceTrackSchema"
import {ImageSchema} from "../../../_toolbox/schemas/ImageSchema"
import {validateJson} from "../../../_toolbox/validateJson"

Then('the response should return a collection of {int} {string}s',
    (amount: number, nodeType: string) => {
        assert.equal(world.recallResponse().data.data.length, amount)

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

        world.recallResponse().data.data.forEach((item: any) => {
            assert.ok(validateJson(item.data, schema))
        })
    })
