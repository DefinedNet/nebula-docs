// tests/demo.js
import fc from 'fast-check';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { INVALID_DOMAIN, validateDomain } from './validateDomain';

const test = suite('validateDomain()');

test('should accept a valid domain', () => {
  assert.is(validateDomain('defined.net'), true);
  assert.is(validateDomain('DEFINED.NET'), true);
  assert.is(validateDomain('prometheus.nebula'), true);
  assert.is(validateDomain('GRAFANA.admin.INTERNAL'), true);
  assert.is(validateDomain('3.com'), true);
  // xn--b09h.com -> 🪀.com when rendered
  assert.is(validateDomain('xn--b09h.com'), true);
});

test('should reject an invalid domain', () => {
  assert.is(validateDomain('🪀'), INVALID_DOMAIN);
  assert.is(validateDomain('🪀.com'), INVALID_DOMAIN);
  assert.is(validateDomain('a.a'), INVALID_DOMAIN);
});

test('should accept generated valid domains', () => {
  fc.assert(
    fc.property(fc.domain(), (domain) => {
      return validateDomain(domain) === true;
    })
  );
});

test.run();
