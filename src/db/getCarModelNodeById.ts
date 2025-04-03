import {Driver, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "./driver"
import {dbCarModelType} from "./types/dbCarModelType"

export async function getCarModelNodeById(id: number): Promise<false | dbCarModelType> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const {records} = await driver.executeQuery(
        'MATCH (cm:CarModel {mc_id: $mcId}) RETURN cm',
        {mcId: id},
    )

    await session.close()
    await closeDriver(driver)

    if (records.length === 0) {
        return false
    }

    const dbNode: dbCarModelType = records.map(record => record.get('cm'))[0].properties

    return dbNode
}
