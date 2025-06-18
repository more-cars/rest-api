import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver"
import {BaseNode} from "../../types/BaseNode"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"
import {NodeTypeLabel} from "../NodeTypeLabel"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function getNodeById(id: number): Promise<false | BaseNode> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const foundNode = await getNode(id, driver)

    await session.close()
    await closeDriver(driver)

    return foundNode
}

async function getNode(id: number, driver: Driver): Promise<false | BaseNode> {
    const {records} = await driver.executeQuery(getNodeByIdQuery(id))

    if (records.length === 0) {
        return false
    }

    return mapDbNodeToModelNode(records[0].get('node'))
}

export function getNodeByIdQuery(id: number, nodeLabel: false | NodeTypeLabel = false) {
    let query = getCypherQueryTemplate('nodes/_cypher/getNodeById.cypher')
        .trim()
        .replace('$id', id.toString())

    if (nodeLabel) {
        query = query.replace(':nodeLabel', `:${nodeLabel}`)
    } else {
        query = query.replace(':nodeLabel', '')
    }

    return query
}
