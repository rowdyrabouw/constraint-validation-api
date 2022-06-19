/* possible states to check on
const ValidityState = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: false,
  valueMissing: false,
};
*/

const form = document.querySelector("#signup");

form.addEventListener("submit", (event) => {
  if (!form.checkValidity()) {
    document.querySelectorAll('[id*="-error-"]').forEach((el) => {
      el.classList.add("hidden");
    });

    // check each element
    const errors = [];
    Array.from(form.elements).forEach((el) => {
      el.classList.remove("error");
      el.removeAttribute("aria-invalid");
      if (!el.checkValidity()) {
        el.classList.add("error");
        if (el.validity.tooShort) {
          errors.push({ id: el.id, type: "length" });
        }
        if (el.validity.valueMissing) {
          errors.push({ id: el.id, type: "required" });
        }
        if (el.validity.patternMismatch) {
          errors.push({ id: el.id, type: "pattern" });
        }
        if (el.validity.typeMismatch) {
          errors.push({ id: el.id, type: "type" });
        }
      }
    });

    // build error summary
    let errorText = `<p>There `;
    if (errors.length === 1) {
      errorText += `is 1 error`;
    } else {
      errorText += `are ${errors.length} errors`;
    }
    errorText += ` found in the information you submitted.</p><ol>`;
    errors.forEach((error) => {
      errorText += `<li><a href="#${error.id}">` + form.querySelector(`#${error.id}-error-${error.type}`).textContent + `</a></li>`;
      form.querySelector(`#${error.id}`).setAttribute("aria-invalid", true);
      form.querySelector(`#${error.id}-error-${error.type}`).classList.remove("hidden");
    });
    errorText += `</ol>`;

    setTimeout(() => {
      document.querySelector("#errors").innerHTML = errorText;
    }, 500);

    event.preventDefault();
    event.stopPropagation();
  }
});
