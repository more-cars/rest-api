import neo4j, {Driver, Session} from "neo4j-driver"
import {getDriver} from "../../../src/db/driver"
import type {RelationshipType} from "../../../src/db/types/RelationshipType"
import type {DbNodeType} from "../../../src/db/types/DbNodeType"

export async function deleteAllRelationshipsOfType(relationshipType: RelationshipType, startNodeType: DbNodeType, endNodeType: DbNodeType) {
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
