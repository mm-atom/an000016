const test = require('ava');

const { default: a } = require('../dist/index');

test('redis set single', async (t) => {
	const key = 'key';
	const value = 'value';
	const r = await a(key, value);
	t.is(r, true);
});

test('redis set multy', async (t) => {
	const key1 = 'key1';
	const value1 = 'value1';
	const r1 = await a(key1, value1);
	t.is(r1, true);
	const key2 = 'key2';
	const value2 = 'value2';
	const r2 = await a(key2, value2);
	t.is(r2, true);
});
