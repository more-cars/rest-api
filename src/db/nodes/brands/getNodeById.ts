import {Driver, Node, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../../driver"
import {BrandNode} from "./types/BrandNode"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"
import {getNodeByIdQuery} from "../getNodeById"
import {NodeTypeLabel} from "../../NodeTypeLabel"

export async function getNodeById(id: number): Promise<false | BrandNode> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const node = await fetchNodeFromDb(id, driver)

    await session.close()
    await closeDriver(driver)

    if (!node) {
        return false
    }

    return mapDbNodeToModelNode(node)
}

async function fetchNodeFromDb(id: number, driver: Driver): Promise<false | Node> {
    const {records} = await driver.executeQuery(getNodeByIdQuery(id, NodeTypeLabel.Brand))

    if (records.length === 0) {
        return false
    }

    return records[0].get('node')
}
