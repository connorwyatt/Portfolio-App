Error.stackTraceLimit = Infinity;

require('core-js/es6');
require('core-js/es7/reflect');
require('ts-helpers');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/sync-test');
require('zone.js/dist/async-test');
require('zone.js/dist/proxy');
require('zone.js/dist/jasmine-patch');

var appContext = require.context('../src', true, /\.spec\.ts/);

appContext.keys().forEach(appContext);

var coreTesting = require('@angular/core/testing'),
  browserTesting = require('@angular/platform-browser-dynamic/testing');

coreTesting.TestBed.initTestEnvironment(
  browserTesting.BrowserDynamicTestingModule,
  browserTesting.platformBrowserDynamicTesting()
);
