import {Driver, Node} from "neo4j-driver"
import {addMoreCarsIdToNodeQuery} from "./addMoreCarsIdToNodeQuery"
import {NodeTypeLabel} from "../NodeTypeLabel"

export async function addMoreCarsIdToNode(
    elementId: string,
    moreCarsId: number,
    nodeType: NodeTypeLabel,
    driver: Driver
): Promise<Node> {
    const {records} = await driver.executeQuery(addMoreCarsIdToNodeQuery(nodeType, elementId, moreCarsId))

    return records[0].get('node')
}
