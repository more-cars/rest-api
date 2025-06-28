import {Driver, Node, Session} from "neo4j-driver"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {NodeTypeLabel} from "../NodeTypeLabel"
import {closeDriver, getDriver} from "../driver.ts"

export async function addMoreCarsIdToNode(
    elementId: string,
    moreCarsId: number,
    nodeType: NodeTypeLabel,
): Promise<Node> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const {records} = await driver.executeQuery(addMoreCarsIdToNodeQuery(nodeType, elementId, moreCarsId))

    await session.close()
    await closeDriver(driver)

    return records[0].get('node')
}

export function addMoreCarsIdToNodeQuery(nodeLabel: NodeTypeLabel, elementId: string, moreCarsId: number) {
    return getCypherQueryTemplate('nodes/_cypher/addMoreCarsIdToNode.cypher')
        .trim()
        .replace(':nodeLabel', `:${nodeLabel}`)
        .replace('$elementId', elementId)
        .replace('$moreCarsId', moreCarsId.toString())
}
