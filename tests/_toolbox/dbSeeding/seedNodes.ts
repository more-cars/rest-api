import {seedNode} from "./seedNode"
import type {DbNodeType} from "../../../src/db/types/DbNodeType"
import type {DbNode} from "../../../src/db/types/DbNode"

export async function seedNodes(dbNodeType: DbNodeType, amount: number) {
    const nodes: DbNode[] = []

    for (let i = 0; i < amount; i++) {
        nodes.push(await seedNode(dbNodeType))
    }

    return nodes
}
