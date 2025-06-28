import {Driver, Node, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../../driver"
import {CarModelNode} from "./types/CarModelNode"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {getNodeByIdQuery} from "../getNodeById"

export async function getNodeById(id: number): Promise<false | CarModelNode> {
    const node = await fetchNodeFromDb(id)

    if (!node) {
        return false
    }

    return mapDbNodeToModelNode(node)
}

async function fetchNodeFromDb(id: number): Promise<false | Node> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const {records} = await driver.executeQuery(getNodeByIdQuery(id, NodeTypeLabel.CarModel))

    await session.close()
    await closeDriver(driver)

    if (records.length === 0) {
        return false
    }

    return records[0].get('node')
}
