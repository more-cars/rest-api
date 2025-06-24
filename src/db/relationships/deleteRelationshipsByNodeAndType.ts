import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {DbRelationship} from "../types/DbRelationship"

export async function deleteRelationshipsByNodeAndType(nodeId: number, relationshipName: DbRelationship): Promise<boolean> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const {summary} = await driver.executeQuery(deleteRelationshipByNodeAndNameQuery(nodeId, relationshipName))

    await session.close()
    await closeDriver(driver)

    return summary.counters.updates().relationshipsDeleted > 0
}

export function deleteRelationshipByNodeAndNameQuery(nodeId: number, relationshipName: DbRelationship) {
    return getCypherQueryTemplate('relationships/_cypher/deleteRelationshipByNodeAndType.cypher')
        .trim()
        .replace('$nodeId', nodeId.toString())
        .replace('relationshipName', relationshipName)
}
