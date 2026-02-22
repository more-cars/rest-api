import {seedNode} from "./seedNode"
import type {DbNodeType} from "../../../src/db/types/DbNodeType"

export async function seedNodes(dbNodeType: DbNodeType, amount: number) {
    const nodes: any[] = []

    for (let i = 0; i < amount; i++) {
        nodes.push(await seedNode(dbNodeType))
    }

    return nodes
}
