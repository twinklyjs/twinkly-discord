import * as echo from './echo.js';
import * as party from './party.js';
import * as setcolor from './setcolor.js';
import * as setopmode from './setopmode.js';

export const commands = new Map([
	[echo.data.name, echo],
	[setcolor.data.name, setcolor],
	[setopmode.data.name, setopmode],
	[party.data.name, party],
]);
