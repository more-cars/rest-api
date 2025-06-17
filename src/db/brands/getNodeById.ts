import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver"
import {BrandNode} from "../../types/brands/BrandNode"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"
import {getNodeByIdQuery} from "../getNodeByIdQuery"
import {NodeTypeLabel} from "../NodeTypeLabel"

export async function getNodeById(id: number): Promise<false | BrandNode> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const foundNode = await getNode(id, driver)

    await session.close()
    await closeDriver(driver)

    return foundNode
}

async function getNode(id: number, driver: Driver): Promise<false | BrandNode> {
    const {records} = await driver.executeQuery(getNodeByIdQuery(id, NodeTypeLabel.Brand))

    if (records.length === 0) {
        return false
    }

    return mapDbNodeToModelNode(records[0].get('node'))
}
