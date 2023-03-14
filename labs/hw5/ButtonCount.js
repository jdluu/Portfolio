// ButtonCount.js
class ButtonCount extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create a button element
    const button = document.createElement("button");
    button.textContent = "Times Clicked: ";

    // Create a count element
    const count = document.createElement("span");
    count.textContent = "0";
    button.appendChild(count);

    // Append the elements to the shadow root
    shadow.appendChild(button);

    // Add a click event listener to the button element
    let counter = 0;
    button.addEventListener("click", () => {
      counter++;
      count.textContent = counter;
    });
  }
}

// Define the custom element in the registry
customElements.define("button-count", ButtonCount);
