import neo4j, {Driver, Session} from "neo4j-driver"
import {getDriver} from "../../../src/db/driver"
import type {DbRelationship} from "../../../src/db/types/DbRelationship"
import type {NodeTypeLabel} from "../../../src/db/NodeTypeLabel"

export async function deleteAllRelationshipsOfType(relationshipType: DbRelationship, startNodeType: NodeTypeLabel, endNodeType: NodeTypeLabel) {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    await session.executeWrite(async txc => {
        await txc.run(`
            MATCH (a:${startNodeType})-[r:${relationshipType}]->(b:${endNodeType})
            DELETE r
        `)
    })

    await session.close()
    await driver.close()
}
