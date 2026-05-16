import type {ModelNodes} from "../../../../../src/models/types/ModelNodes"
import type {DbInputData} from "../../../../../src/db/types/DbInputData"

export type FakeNode = {
    dbInput(): DbInputData
    dbInputMinimal(): object
    modelOutput(): ModelNodes
}
