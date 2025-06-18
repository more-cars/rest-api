import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../../driver"
import {CarModelNode} from "../../../types/car-models/CarModelNode"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"
import {getAllNodesOfTypeQuery} from "../getAllNodesOfTypeQuery"
import {NodeTypeLabel} from "../../NodeTypeLabel"

export async function getAllNodesOfType(): Promise<Array<CarModelNode>> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const foundNodes = await getNodes(driver)

    await session.close()
    await closeDriver(driver)

    return foundNodes
}

async function getNodes(driver: Driver): Promise<Array<CarModelNode>> {
    const carModelNodes: Array<CarModelNode> = []

    const {records} = await driver.executeQuery(getAllNodesOfTypeQuery(NodeTypeLabel.CarModel))

    records.forEach(record => {
        carModelNodes.push(mapDbNodeToModelNode(record.get('node')))
    })

    return carModelNodes
}
