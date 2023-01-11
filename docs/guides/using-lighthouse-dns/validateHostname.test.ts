// tests/demo.js
import fc from 'fast-check';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { INVALID_HOSTNAME, INVALID_HOSTNAME_IP, validateHostname } from './validateHostname';

const test = suite('validateHostname()');

function validHostnameTest(hostname: string) {
  assert.is(validateHostname(hostname), true, `${hostname} should be a valid hostname`);
  return true;
}

function invalidHostnameTest(hostname: string) {
  assert.match(validateHostname(hostname).toString(), INVALID_HOSTNAME, `${hostname} should not be a valid hostname`);
  return true;
}

test('should accept a valid hostname', () => {
  validHostnameTest('defined.net');
  validHostnameTest('DEFINED.NET');
  validHostnameTest('prometheus.nebula');
  validHostnameTest('GRAFANA.admin.INTERNAL');
  validHostnameTest('3.com');
  validHostnameTest('NEBULA');
  // xn--b09h.com -> 🪀.com when rendered
  validHostnameTest('xn--b09h.com');
  validHostnameTest('xn--b09h');
  validHostnameTest('a.a');
  validHostnameTest('0.a');
});

test('should reject an invalid hostname', () => {
  // hostname must be ASCII
  invalidHostnameTest('🪀');
  invalidHostnameTest('🪀.com');
  invalidHostnameTest('jkfd@jkfdkd.com');
  invalidHostnameTest('@mfd.com');
  invalidHostnameTest('!jkfd.com');
  assert.is(validateHostname('8.8.8.8'), INVALID_HOSTNAME_IP);
});

test('should accept generated valid domain names', () => {
  fc.assert(fc.property(fc.domain(), validHostnameTest));
});

test('should reject generated invalid hostnames', () => {
  fc.assert(
    fc.property(fc.oneof(fc.ipV4(), fc.ipV6()), (hostname) => {
      assert.is(validateHostname(hostname), INVALID_HOSTNAME_IP);
      return true;
    })
  );
});

test.run();
