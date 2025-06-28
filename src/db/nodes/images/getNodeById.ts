import {Driver, Node, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../../driver"
import {ImageNode} from "./types/ImageNode"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"
import {getNodeByIdQuery} from "../getNodeById"
import {NodeTypeLabel} from "../../NodeTypeLabel"

export async function getNodeById(id: number): Promise<false | ImageNode> {
    const node = await fetchNodeFromDb(id)

    if (!node) {
        return false
    }

    return mapDbNodeToModelNode(node)
}

async function fetchNodeFromDb(id: number): Promise<false | Node> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const {records} = await driver.executeQuery(getNodeByIdQuery(id, NodeTypeLabel.Image))

    await session.close()
    await closeDriver(driver)

    if (records.length === 0) {
        return false
    }

    return records[0].get('node')
}
