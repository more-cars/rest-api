import {NodeTypeLabel} from "../NodeTypeLabel.ts"
import neo4j, {Driver, Node, Session} from "neo4j-driver"
import {getDriver} from "../driver.ts"
import {getNodeByIdQuery} from "./getNodeById.ts"

export async function fetchNodeFromDb(id: number, nodeType: NodeTypeLabel): Promise<false | Node> {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getNodeByIdQuery(id, nodeType))
        return result.records
    })

    await session.close()
    await driver.close()

    if (records.length === 0) {
        return false
    }

    return records[0].get('node')
}
