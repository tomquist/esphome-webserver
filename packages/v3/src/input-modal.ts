import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("input-modal")
export class InputModal extends LitElement {
  static styles = css`
    .modal {
      position: fixed;
      z-index: 10;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgb(0, 0, 0);
      background-color: rgba(0, 0, 0, 0.4);
    }
    .modal-content {
      background-color: #000;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      max-width: 300px;
      width: 100%;
    }
    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }
    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }

    input {
      min-width: 100px;
    }
  `;

  @property({ type: String }) title = "";
  @property({ type: Boolean }) isOpen = true;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number })
  get value() {
    return this.currentValue;
  }
  set value(value: number) {
    this.currentValue = value;
  }
  @state() private currentValue: number = this.value;

  private _closeModal() {
    this.dispatchEvent(new CustomEvent("close"));
  }

  private _updateValue(e: Event) {
    const input = e.target as HTMLInputElement;
    this.currentValue = input.value ? parseInt(input.value) : "";
  }

  private _submitValue() {
    console.log("submitting", this.currentValue);
    this.dispatchEvent(
      new CustomEvent("submit", { detail: this.currentValue })
    );
  }

  render() {
    return this.isOpen
      ? html`
          <div class="modal">
            <form @submit=${this._submitValue}>
              <div class="modal-content">
                <span class="close" @click="${this._closeModal}">&times;</span>
                <h2>${this.title}</h2>
                <input
                  type="number"
                  .value=${String(this.currentValue)}
                  @input=${this._updateValue}
                  placeholder=${this.placeholder}
                  min=${this.min}
                  max=${this.max}
                  autofocus
                />
                <button @click=${this._submitValue}>Submit</button>
              </div>
            </form>
          </div>
        `
      : "";
  }
}
