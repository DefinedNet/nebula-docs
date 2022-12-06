// tests/demo.js
import fc from 'fast-check';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { INVALID_DOMAIN, validateDomain } from './validateDomain';

const test = suite('validateDomain()');

test('should accept a valid domain', () => {
  assert.is(validateDomain('defined.net'), true);
});

test('should reject an invalid domain', () => {
  assert.is(validateDomain('🪀'), INVALID_DOMAIN);
});

test('should accept generated valid domains', () => {
  fc.assert(
    fc.property(fc.domain(), (domain) => {
      return validateDomain(domain) === true;
    })
  );
});

test.run();
