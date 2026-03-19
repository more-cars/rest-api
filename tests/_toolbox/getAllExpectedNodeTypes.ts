import {ExpectedNodeType} from "./types/ExpectedNodeType"

export function getAllExpectedNodeTypes() {
    return Array.from(new Set(Object.values(ExpectedNodeType) as string[])) as ExpectedNodeType[]
}
