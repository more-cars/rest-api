import {createNode} from "../../../../../src/db/nodes/racing-series/createNode"
import {FakeRacingSeries} from "../../../fixtures/nodes/FakeRacingSeries"

export async function seedRacingSeries(customFakeData: object = {}) {
    return createNode(Object.assign({}, FakeRacingSeries.dbInput(), customFakeData))
}
