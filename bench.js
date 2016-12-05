 /* eslint-disable no-unused-vars, no-unused-expressions, no-new */

const Benchmark = require('benchmark');
const moment = require('moment-timezone');
const dateFns = require('date-fns');
const cctz = require('./');

const suite = new Benchmark.Suite();

let iunix = new Date() / 1000;
let idate = new Date();
let idtfs = new Date();
let icctz = cctz.convert(new Date() / 1000, cctz.tz('UTC'));
let immtz = moment().tz('America/New_York');

const intl = new Intl.DateTimeFormat('en-US', {timezone: 'America/New_York'});

suite
	.add('Format              (cctz)', () => {
		cctz.format('%m/%d/%Y, %H:%M:%S %p', Date.now() / 1000, cctz.tz('America/New_York'));
	})
	.add('Format              (Date)', () => {
		intl.format(new Date());
	})
	.add('Format          (date-fns)', () => {
		dateFns.format(Date.now(), 'MM/DD/YYYY HH:mm:ss A');
	})
	.add('Format            (moment)', () => {
		moment.tz('America/New_York').format('M/D/YYYY, HH:mm:ss A');
	})
	.add('Parse               (cctz)', () => {
		cctz.parse('%Y-%m-%d %H:%M:%S %Ez', '2015-09-22 09:35:12+03:00');
	})
	.add('Parse               (Date)', () => {
		new Date('2015-09-22 09:35:12+03:00') / 1000;
	})
	.add('Parse           (date-fns)', () => {
		dateFns.parse('2015-09-22 09:35:12+03:00') / 1000;
	})
	.add('Parse             (moment)', () => {
		moment('2015-09-22 09:35:12+03:00').unix();
	})
	.add('Add hour            (cctz)', () => {
		icctz.hour += 1;
	})
	.add('Add hour            (Date)', () => {
		idate.setHours(idate.getHours() + 1);
	})
	.add('Add hour        (date-fns)', () => {
		dateFns.addHours(idtfs, 1);
	})
	.add('Add hour          (moment)', () => {
		immtz.add(1, 'h');
	})
	.on('cycle', event => {
		console.log(String(event.target));
	})
	.run({
		async: true
	});
