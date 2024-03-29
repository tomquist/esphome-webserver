import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("wattage-status-box")
export class WattageStatusBox extends LitElement {
  @property({ type: Boolean }) active = false;
  @property({ type: String }) label = "";
  @property({ type: Boolean }) interactive = false;

  render() {
    return html`
      <button
        class=${this.active ? "button active" : "button"}
        ?disabled=${!this.interactive}
        @click=${this._handleClick}
      >
        ${this.label}<br />
        <slot></slot>
      </button>
    `;
  }

  private _handleClick() {
    this.dispatchEvent(new CustomEvent("box-click"));
  }

  static styles = css`
    .button {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 8px 16px;
      background-color: #1c1c1e;
      border: 1px solid #5f5f5f;
      border-radius: 14px;
      color: white;
      font-size: 18px;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      transition: background-color 0.3s;
      margin: 0 5px;
      font-size: 0.8rem;
      min-width: 60px;
      min-height: 60px;
      box-sizing: border-box;
    }

    @media (min-width: 768px) {
      .button {
        min-width: 80px;
        min-height: 80px;
      }
    }

    .button.active {
      background-color: #007aff;
    }

    .button:disabled {
      cursor: not-allowed;
    }

    .button:active {
      background-color: #0a0a0a;
    }
  `;
}
