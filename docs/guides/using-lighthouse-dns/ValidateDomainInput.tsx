import React, { useEffect, useRef, useState } from 'react';
import { validateDomain } from './validateDomain';

export function ValidateDomainInput() {
  const [value, setValue] = useState('');

  const error = validateDomain(value);

  return (
    <form>
      <input name="domain" type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      {!value.length ? (
        <div>Please input a domain to validate</div>
      ) : typeof error === 'string' ? (
        <div style={{ color: 'tomato' }}>{error}</div>
      ) : (
        <div>Passing domain!</div>
      )}
    </form>
  );
}
