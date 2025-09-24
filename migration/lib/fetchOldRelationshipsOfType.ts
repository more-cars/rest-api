import {getMc1Driver} from "../../src/db/driver-mc1"
import neo4j, {type Record} from "neo4j-driver"
import type {RelationshipTypeLabelOld} from "./types/RelationshipTypeLabelOld"
import type {NodeTypeLabelOld} from "./types/NodeTypeLabelOld"

export async function fetchOldRelationshipsOfType(relationshipType: RelationshipTypeLabelOld, startNodeType: NodeTypeLabelOld, endNodeType: NodeTypeLabelOld): Promise<Array<Record>> {
    const driver = getMc1Driver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getRelationshipQuery(startNodeType, relationshipType, endNodeType))
        return result.records
    })

    await session.close()
    await driver.close()

    return records
}

function getRelationshipQuery(startNodeType: string, relationshipName: string, endNodeType: string) {
    return `MATCH (a:${startNodeType})-[rel:${relationshipName}]->(:${endNodeType}) RETURN rel ORDER BY id(rel)`
}
