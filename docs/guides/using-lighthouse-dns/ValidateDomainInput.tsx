import React, { useEffect, useRef, useState } from 'react';
import { validateDomain } from './validateDomain';
import styles from './ValidateDomainInput.module.css';

export function ValidateDomainInput() {
  const [value, setValue] = useState('');

  const error = validateDomain(value);

  return (
    <form className={styles.ValidateDomainInput}>
      <label htmlFor="domainInput">Here's a validator inline in the documentation for you:</label>
      <input
        id="domainInput"
        className={styles.ValidateDomainInput_input}
        name="domain"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {!value.length ? (
        <div className={styles.ValidateDomainInput_info}>Please input a domain to validate</div>
      ) : typeof error === 'string' ? (
        <div className={styles.ValidateDomainInput_error}>{error}</div>
      ) : (
        <div className={styles.ValidateDomainInput_success}>Passing domain!</div>
      )}
    </form>
  );
}
