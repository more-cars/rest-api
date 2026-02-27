import type {ModelNodes} from "../../../../../src/models/types/ModelNodes"
import type {InputNodeTypeCreate} from "../../../../../src/db/types/InputNodeTypeCreate"

export type FakeNode = {
    dbInput: InputNodeTypeCreate
    dbInputMinimal: {}
    modelOutput: ModelNodes
}
