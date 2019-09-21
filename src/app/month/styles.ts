import { css } from 'lit-element';

export const STYLES = css`
  :host {
    display: block;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: var(--theme-card-background-color);
  }

  tr.weekend {
    background-color: #999;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: var(--theme-active-background-color);
    color: var(--theme-active-color);
  }

  input:invalid {
    border: 1px dashed red;
  }
`;
