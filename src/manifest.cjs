
/** @type { chrome.runtime.ManifestV3 } */
module.exports = {
	name        : 'tbank-edu-extension',
	description : 'импорт и экспорт тинькофф заданий',

	version : '1.0.0',
	icons   : {
		32 : 'icons/32x32@favicon.ico',
	},

	manifest_version: 3,

	host_permissions: [
		'https://edu.tbank.ru/selection/*/practice/*/task/*',
		'https://edu.tbank.ru/selection/*/questionnaire'
	],

	content_scripts: [
		{
			matches: [
				'https://edu.tbank.ru/selection/*/practice/*/task/*'
			],

			js: [
				'global-query-selector.js',
				'page-practice.js',
			],
		},
		{
			matches: [
				'https://edu.tbank.ru/selection/*/questionnaire'
			],

			js: [
				'global-query-selector.js',
				'page-questionnaire.js',
			]
		}
	],
};
