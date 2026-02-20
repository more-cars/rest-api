import {ControllerNodeType} from "../../../src/controllers/nodes/types/ControllerNodeType"
import {seedNode} from "./seedNode"

export async function seedNodes(nodeType: ControllerNodeType, amount: number) {
    const nodes: any[] = []

    for (let i = 0; i < amount; i++) {
        nodes.push(await seedNode(nodeType))
    }

    return nodes
}
