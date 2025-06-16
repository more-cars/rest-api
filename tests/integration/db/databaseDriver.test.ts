import {getDriver} from "../../../src/db/driver"

test('Missing env variable DB_HOST should cause an exception', () => {
    delete process.env.DB_HOST

    // TODO the driver needs to be closed afterwards to prevent memory leaks
    expect(getDriver).toThrow(Error)
})

test('Provided env variable DB_HOST should NOT cause an exception', () => {
    process.env.DB_HOST = '127.0.0.1'

    // TODO the driver needs to be closed afterwards to prevent memory leaks
    expect(getDriver).not.toThrow(Error)
})
