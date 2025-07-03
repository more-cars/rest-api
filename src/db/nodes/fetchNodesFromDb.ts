import neo4j, {Driver, Node, Session} from "neo4j-driver"
import {getDriver} from "../driver.ts"
import {NodeTypeLabel} from "../NodeTypeLabel.ts"
import {getAllNodesOfTypeQuery} from "./getAllNodesOfTypeQuery.ts"

export async function fetchNodesFromDb(nodeType: NodeTypeLabel): Promise<Array<Node>> {
    const nodes: Array<Node> = []

    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getAllNodesOfTypeQuery(nodeType))
        return result.records
    })

    await session.close()
    await driver.close()

    records.forEach(record => {
        nodes.push(record.get('node'))
    })

    return nodes
}
