import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {FakeCarModel} from "../../../fixtures/nodes/FakeCarModel"

export async function seedCarModelMinimal(customFakeData: object = {}) {
    return createDbNode(DbNodeType.CarModel, Object.assign({}, FakeCarModel.dbInputMinimal, customFakeData))
}
