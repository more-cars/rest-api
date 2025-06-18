import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../../driver"
import {CarModelNode} from "../../../types/car-models/CarModelNode"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {getNodeByIdQuery} from "../getNodeById"

export async function getNodeById(id: number): Promise<false | CarModelNode> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const foundNode = await getNode(id, driver)

    await session.close()
    await closeDriver(driver)

    return foundNode
}

async function getNode(id: number, driver: Driver): Promise<false | CarModelNode> {
    const {records} = await driver.executeQuery(getNodeByIdQuery(id, NodeTypeLabel.CarModel))

    if (records.length === 0) {
        return false
    }

    return mapDbNodeToModelNode(records[0].get('node'))
}
