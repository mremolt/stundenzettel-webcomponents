import { css } from 'lit-element';

export const STYLES = css`
  :host {
    display: block;
  }

  .form-group {
    display: flex;
    justify-content: flex-end;
    padding: 0.5em;
  }

  .form-group > label {
    padding: 0.5em 1em 0.5em 0;
    flex: 1;
  }
  .form-group > input {
    flex: 2;
  }

  .form-group > input:focus {
    border: 1px solid var(--theme-active-background-color);
  }

  .form-group > input:invalid {
    border: 1px dashed red;
  }
`;
