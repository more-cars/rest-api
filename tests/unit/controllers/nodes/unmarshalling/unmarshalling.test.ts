import {describe, expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../src/controllers/nodes/unmarshalInputData"

describe('unmarshalling requests', () => {
    test('no input data', async () => {
        const data = undefined

        const result = unmarshalInputData(data, [
            'a',
        ])

        expect(result)
            .toStrictEqual({
                'a': undefined,
            })
    })

    test('input data is null', async () => {
        const data = null

        const result = unmarshalInputData(data, [
            'a',
        ])

        expect(result)
            .toStrictEqual({
                'a': undefined,
            })
    })

    test('input data is empty', async () => {
        const data = {}

        const result = unmarshalInputData(data, [
            'a',
        ])

        expect(result)
            .toStrictEqual({
                'a': undefined,
            })
    })

    test('input data is nested', async () => {
        const data = {
            a: {
                b: 'b',
            },
        }

        const result = unmarshalInputData(data, [
            'a',
        ])

        expect(result)
            .toStrictEqual({
                'a': undefined,
            })
    })

    test('data field contains negative value', async () => {
        const data = {
            a: undefined,
            b: null,
            c: 0.0,
            d: 0,
            e: false,
            f: '',
            g: {},
        }

        const result = unmarshalInputData(data, [
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
        ])

        expect(result)
            .toStrictEqual({
                a: undefined,
                b: null,
                c: 0.0,
                d: 0,
                e: false,
                f: '',
                g: undefined,
            })
    })

    test('data field contains valid non-zero value', async () => {
        const data = {
            a: 0.1,
            b: 1,
            c: true,
            d: 'd',
        }

        const result = unmarshalInputData(data, [
            'a',
            'b',
            'c',
            'd',
        ])

        expect(result)
            .toStrictEqual({
                a: 0.1,
                b: 1,
                c: true,
                d: 'd',
            })
    })

    test('data field contains empty spaces', async () => {
        const data = {
            a: ' ',
            b: ' B ',
            c: ' 1 ',
            d: 'D ',
            e: ' E',
            f: ' F  F ',
        }

        const result = unmarshalInputData(data, [
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
        ])

        expect(result)
            .toStrictEqual({
                a: '',
                b: 'B',
                c: '1',
                d: 'D',
                e: 'E',
                f: 'F  F',
            })
    })
})
