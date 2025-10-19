import neo4j, {Driver, Session} from "neo4j-driver"
import {getDriver} from "../driver"
import {BaseNode} from "../types/BaseNode"
import {NodeTypeLabel} from "../NodeTypeLabel"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function getNodeById(id: number): Promise<false | BaseNode> {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getNodeByIdQuery(id))
        return result.records
    })

    await session.close()
    await driver.close()

    if (records.length === 0) {
        return false
    }

    const node = records[0].get('node').properties
    node.id = node.mc_id
    delete node.mc_id

    return node
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
