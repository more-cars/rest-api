import {expect, test} from 'vitest'
import {escapeSingleQuotes} from "../../../../../src/db/nodes/escapeSingleQuotes"

test('single quotes are escaped', async () => {
    const value = "Test's Brand Full' Name"
    const escapedValue = escapeSingleQuotes(value)

    expect(escapedValue)
        .toEqual("Test\\'s Brand Full\\' Name")
})

test('backslashes are escaped', async () => {
    const value = "Test Brand\\'s Full Name\\"
    const escapedValue = escapeSingleQuotes(value)

    expect(escapedValue)
        .toEqual("Test Brand\\\\\\'s Full Name\\\\")
})
