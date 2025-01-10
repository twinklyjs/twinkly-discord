import * as echo from './echo.js';
import * as setcolor from './setcolor.js';

export const commands = new Map([
	[echo.data.name, echo],
	[setcolor.data.name, setcolor],
]);
