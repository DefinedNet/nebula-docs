// tests/demo.js
import fc from 'fast-check';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { INVALID_HOSTNAME, validateHostname } from './validateHostname';

const test = suite('validateHostname()');

test('should accept a valid domain', () => {
  assert.is(validateHostname('defined.net'), true);
  assert.is(validateHostname('DEFINED.NET'), true);
  assert.is(validateHostname('prometheus.nebula'), true);
  assert.is(validateHostname('GRAFANA.admin.INTERNAL'), true);
  assert.is(validateHostname('3.com'), true);
  assert.is(validateHostname('NEBULA'), true);
  // xn--b09h.com -> 🪀.com when rendered
  assert.is(validateHostname('xn--b09h.com'), true);
});

test('should reject an invalid domain', () => {
  assert.is(validateHostname('🪀'), INVALID_HOSTNAME);
  assert.is(validateHostname('🪀.com'), INVALID_HOSTNAME);
  assert.is(validateHostname('a.a'), INVALID_HOSTNAME);
});

test('should accept generated valid domains', () => {
  fc.assert(
    fc.property(
      fc.oneof(
        fc.domain(),
        fc.domain().map((domain) => {
          // convert domain to hostname
          return domain.slice(0, domain.indexOf('.'));
        })
      ),
      (hostname) => {
        return validateHostname(hostname) === true;
      }
    )
  );
});

test.run();
