var chalk = require('chalk');
var numeral = require('numeral');
var zpad = require('zpad');
var argv = require('minimist')(process.argv.slice(2));

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

if (!argv.p || !argv.h || !isNumeric(argv.p) || !isNumeric(argv.h)) {
	console.log(chalk.red('Please provide numeric arguments -p (Stundensatz) and -h (Anzahl Stunden)'));
	process.exit();
}

numeral.language('de', {
	delimiters: {
		thousands: '.',
		decimal: ','
	},
	abbreviations: {
		thousand: 'k',
		million: 'm',
		billion: 'b',
		trillion: 't'
	},
	ordinal: function (number) {
		return '.';
	},
	currency: {
		symbol: '€'
	}
});

numeral.language('de');
var pad = zpad.amount(10).character(' ');

var stundensatz = argv.p;
var stunden = argv.h;

var netto = stunden * stundensatz;
var nettoFormatted = numeral(netto).format('0,0.00');

var brutto = netto / 0.81;
var bruttoFormatted = numeral(brutto).format('0,0.00');

var ust = brutto - netto;
var ustFormatted = numeral(ust).format('0,0.00');

console.log('');
console.log('Netto:\t\t' + chalk.green(pad(nettoFormatted)));
console.log('Umsatzsteuer:\t' + chalk.red(pad(ustFormatted)));
console.log('--------------------------');
console.log('Brutto:\t\t' + chalk.cyan(pad(bruttoFormatted)));
console.log('');
