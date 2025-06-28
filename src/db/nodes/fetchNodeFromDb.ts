import {NodeTypeLabel} from "../NodeTypeLabel.ts"
import {Driver, Node, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver.ts"
import {getNodeByIdQuery} from "./getNodeById.ts"

export async function fetchNodeFromDb(id: number, nodeType: NodeTypeLabel): Promise<false | Node> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const {records} = await driver.executeQuery(getNodeByIdQuery(id, nodeType))

    await session.close()
    await closeDriver(driver)

    if (records.length === 0) {
        return false
    }

    return records[0].get('node')
}
