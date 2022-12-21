// tests/demo.js
import fc from 'fast-check';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { INVALID_HOSTNAME, validateHostname } from './validateHostname';

const test = suite('validateHostname()');

function validHostnameTest(hostname: string) {
  assert.is(validateHostname(hostname), true, `${hostname} should be a valid hostname`);
  return true;
}

function invalidHostnameTest(hostname: string) {
  assert.is(validateHostname(hostname), INVALID_HOSTNAME, `${hostname} should not be a valid hostname`);
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
});

test('should reject an invalid hostname', () => {
  invalidHostnameTest('🪀');
  invalidHostnameTest('🪀.com');
  invalidHostnameTest('a.a');
});

test('should accept generated valid hostnames', () => {
  fc.assert(
    fc.property(
      fc.oneof(
        fc.domain(),
        fc.domain().map((domain) => {
          // convert domain to hostname
          return domain.slice(0, domain.indexOf('.'));
        })
      ),
      validHostnameTest
    )
  );
});

test.run();
