import React, { useState } from 'react';
import { remapHostnameIfValid } from './remapHostnameIfValid';
import { validateHostname } from './validateHostname';
import styles from './ValidateHostnameInput.module.css';

export function ValidateHostnameInput() {
  const [value, setValue] = useState('');

  const error = validateHostname(value);

  return (
    <form className={styles.ValidateHostnameInput} onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="domainInput">You can use the following tool to check if a hostname is valid:</label>
      <input
        id="domainInput"
        className={styles.ValidateHostnameInput_input}
        name="domain"
        type="text"
        value={value}
        onChange={(e) => setValue(remapHostnameIfValid(e.target.value))}
      />
      {!value.length ? (
        <div className={styles.ValidateHostnameInput_info}>Please input a hostname to validate</div>
      ) : typeof error === 'string' ? (
        <div className={styles.ValidateHostnameInput_error}>{error}</div>
      ) : (
        <div className={styles.ValidateHostnameInput_success}>Passing hostname!</div>
      )}
    </form>
  );
}
