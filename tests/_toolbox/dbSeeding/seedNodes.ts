import {NodeTypeEnum} from "../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedNode} from "./seedNode"

export async function seedNodes(nodeType: NodeTypeEnum, amount: number) {
    const nodes: any[] = []

    for (let i = 0; i < amount; i++) {
        nodes.push(await seedNode(nodeType))
    }

    return nodes
}
