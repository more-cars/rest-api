import {NodeTypeLabel} from "../NodeTypeLabel"
import neo4j, {Driver, Node, Session} from "neo4j-driver"
import {getDriver} from "../driver"
import {getNodeByIdQuery} from "./getNodeById"

export async function fetchNodeFromDb(id: number, nodeType: NodeTypeLabel): Promise<false | Node> {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getNodeByIdQuery(id, nodeType))
        return result.records
    })

    await session.close()

    if (records.length === 0) {
        return false
    }

    return records[0].get('node')
}
