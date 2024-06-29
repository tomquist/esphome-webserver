import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("wattage-status-box")
export class WattageStatusBox extends LitElement {
  @property({ type: Boolean }) active = false;
  @property({ type: String }) label = "";
  @property({ type: Boolean }) interactive = false;

  render() {
    if (this.interactive) {
      return html`
        <button
          class="button ${this.active ? "active" : ""}"
          ?disabled=${!this.interactive}
          @click=${this._handleClick}
        >
          ${this.label}<br />
          <slot></slot>
        </button>
      `;
    } else {
      return html`
        <div class="button disabled ${this.active ? "active" : ""}">
          ${this.label}<br />
          <slot></slot>
        </div>
      `;
    }
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
      border: 1px solid #5f5f5f;
      border-radius: 14px;
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
      background-color: rgba(127, 127, 127, 0.3);
      color: none;
    }

    @media (min-width: 768px) {
      .button {
        min-width: 80px;
        min-height: 80px;
      }
    }

    .button.disabled {
      cursor: not-allowed;
      background-color: rgba(127, 127, 127, 0.3);
    }

    .button.active {
      background-color: #007aff;
    }

    .button:active {
      background-color: #0a0a0a;
    }
  `;
}
