import {ModelNodeType} from "../../src/models/types/ModelNodeType"

export function getAllModelNodeTypes() {
    return Array.from(new Set(Object.values(ModelNodeType) as string[])) as ModelNodeType[]
}
