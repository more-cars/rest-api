import {Driver, Node} from "neo4j-driver"

export async function addMoreCarsIdToNode(elementId: string, moreCarsId: number, nodeType: string, driver: Driver): Promise<Node> {
    const {records} = await driver.executeQuery(`
        MATCH (node:${nodeType})
        WHERE elementId(node) = "${elementId}"
        SET node.mc_id = ${moreCarsId}
        RETURN node
        LIMIT 1
    `)

    return records[0].get('node')
}
