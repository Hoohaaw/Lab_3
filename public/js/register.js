class PasswordValidator {
  constructor() {
    this.passwordInput = document.getElementById("password");
    this.usernameInput = document.getElementById("username");
    this.submitBtn = document.getElementById("submitBtn");
    this.validationList = document.getElementById("validationList");
    this.validCount = document.getElementById("validCount");
    this.form = document.getElementById("registerForm");
    this.errorMessage = document.getElementById("errorMessage");

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.passwordInput.addEventListener("input", () => this.validatePassword());
    this.usernameInput.addEventListener("input", () => this.validatePassword());

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  async validatePassword() {
    const password = this.passwordInput.value;
    const username = this.usernameInput.value;

    if (!password) {
      this.resetValidations();
      return;
    }

    try {
      const response = await fetch("/validate-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, username })
      });

      if (!response.ok) {
        throw new Error("Validation request failed");
      }

      const data = await response.json();
      this.updateValidationUI(data.validations);
    } catch (error) {
      console.error("Validation error:", error);
    }
  }

  updateValidationUI(validations) {
    let validCount = 0;

    validations.forEach(validation => {
      const listItem = this.validationList.querySelector(`[data-validation="${validation.name}"]`);

      if (listItem) {
        listItem.classList.remove("valid", "invalid", "pending");

        if (validation.result === true) {
          listItem.classList.add("valid");
          validCount++;
        } else {
          listItem.classList.add("invalid");
        }
      }
    });

    this.validCount.textContent = validCount;

    const allValid = validCount === validations.length;
    this.submitBtn.disabled = !allValid;
  }

  resetValidations() {
    const listItems = this.validationList.querySelectorAll("li");
    listItems.forEach(item => {
      item.classList.remove("valid", "invalid");
      item.classList.add("pending");
    });

    this.validCount.textContent = "0";
    this.submitBtn.disabled = true;
  }

  async handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const data = {
      username: formData.get("username"),
      password: formData.get("password")
    };

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        this.errorMessage.style.color = "#4CAF50";
        this.errorMessage.textContent = result.message || "Registration successful! Redirecting to login...";

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        this.errorMessage.style.color = "#f44336";
        this.errorMessage.textContent = result.error || "Registration failed";

        if (result.validations) {
          this.updateValidationUI(result.validations);
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      this.errorMessage.style.color = "#f44336";
      this.errorMessage.textContent = "An error occurred. Please try again.";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PasswordValidator();
});
