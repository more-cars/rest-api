import type {NodeTypeLabelOld} from "./types/NodeTypeLabelOld"
import {getMc1Driver} from "../../src/db/driver-mc1"
import neo4j, {type Record} from "neo4j-driver"

export async function fetchOldNodesOfType(nodeType: NodeTypeLabelOld): Promise<Array<Record>> {
    const driver = getMc1Driver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getNodeQuery(nodeType))
        return result.records
    })

    await session.close()
    await driver.close()

    return records
}

function getNodeQuery(label: string) {
    return `MATCH (node:${label}) RETURN node ORDER BY id(node)`
}
