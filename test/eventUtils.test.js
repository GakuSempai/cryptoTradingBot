const assert = require('assert');
const { normalizeEventType, parseTicketsField, toBoolean } = require('../utils/eventUtils');

// Test normalizeEventType
assert.strictEqual(normalizeEventType('diner'), 'Dîner - spectacle');
assert.strictEqual(normalizeEventType(['afterbeach', 'club']), 'After beach');
assert.strictEqual(normalizeEventType('unknown'), 'unknown');

// Test parseTicketsField
assert.deepStrictEqual(parseTicketsField('[{"name":"VIP"}]'), [{ name: 'VIP' }]);
assert.deepStrictEqual(parseTicketsField([{name:'A'}]), [{name:'A'}]);
assert.deepStrictEqual(parseTicketsField(null), []);

// Test toBoolean
assert.strictEqual(toBoolean('on'), true);
assert.strictEqual(toBoolean(''), false);
assert.strictEqual(toBoolean(true), true);
assert.strictEqual(toBoolean('false'), false);

console.log('All tests passed');
