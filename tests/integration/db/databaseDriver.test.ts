import {getDriver} from "../../../src/db/driver"

test('Missing env variable DB_HOST should cause an exception', () => {
    delete process.env.DB_HOST

    expect(getDriver).toThrow(Error)
})

test('Missing env variable DB_PASSWORD should cause an exception', () => {
    delete process.env.DB_PASSWORD

    expect(getDriver).toThrow(Error)
})

test('Provided env variable DB_HOST should NOT cause an exception', () => {
    process.env.DB_HOST = '127.0.0.1'

    expect(getDriver).not.toThrow(Error)
})

test('Provided env variable DB_PASSWORD should NOT cause an exception', () => {
    process.env.DB_PASSWORD = 'super-secret-password'

    expect(getDriver).not.toThrow(Error)
})
