import {Driver, Node, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver.ts"
import {NodeTypeLabel} from "../NodeTypeLabel.ts"
import {getAllNodesOfTypeQuery} from "./getAllNodesOfTypeQuery.ts"

export async function fetchNodesFromDb(nodeType: NodeTypeLabel): Promise<Array<Node>> {
    const nodes: Array<Node> = []

    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const {records} = await driver.executeQuery(getAllNodesOfTypeQuery(nodeType))

    await session.close()
    await closeDriver(driver)

    records.forEach(record => {
        nodes.push(record.get('node'))
    })

    return nodes
}
