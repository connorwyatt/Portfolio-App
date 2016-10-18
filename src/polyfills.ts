import 'core-js/es6';
import 'ts-helpers';
require('core-js/es7/reflect');
require('zone.js/dist/zone');

require('web-animations-js/web-animations.min.js');

if (ENV === 'DEVELOPMENT') {
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
