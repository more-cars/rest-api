import neo4j, {Driver, Session} from "neo4j-driver"
import {getDriver} from "../../../src/db/driver"
import type {RelationshipType} from "../../../src/db/types/RelationshipType"
import type {Neo4jNodeType} from "../../../src/db/types/Neo4jNodeType"

export async function deleteAllRelationshipsOfType(relationshipType: RelationshipType, startNodeType: Neo4jNodeType, endNodeType: Neo4jNodeType) {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    await session.executeWrite(async txc => {
        await txc.run(`
            MATCH (a:${startNodeType})-[r:${relationshipType}]->(b:${endNodeType})
            DELETE r
        `)
    })

    await session.close()
}
