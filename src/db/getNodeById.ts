import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "./driver"
import {BaseNode} from "../types/BaseNode"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"
import {getNodeByIdQuery} from "./getNodeByIdQuery"

export async function getNodeById(id: number): Promise<false | BaseNode> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const foundNode = await getNode(id, driver)

    await session.close()
    await closeDriver(driver)

    return foundNode
}

async function getNode(id: number, driver: Driver): Promise<false | BaseNode> {
    const {records} = await driver.executeQuery(getNodeByIdQuery(id))

    if (records.length === 0) {
        return false
    }

    return mapDbNodeToModelNode(records[0].get('node'))
}
