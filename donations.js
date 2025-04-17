const form = document.getElementById("donationForm");

/**
 * HIDES & SHOWS error messages near input fields to handle user input errors
 * showError dynamically updates the content of the error message span 
 * (<span id="charityNameError">, etc) and makes it visible by adding the error-visible 
 * class. 
 * Ensures that the user immediately sees the issue that needs to be corrected. 
*/
const showError = (fieldName, message) => {
    const errorFieldId = `${fieldName}Error`;
    const errorField = document.getElementById(errorFieldId);

    if (!errorField) {
        console.error(`Error field with ID '${errorFieldId}' not found.`);
        return;
    }

    errorField.textContent = message;
    errorField.classList.add("error-visible");
}

/*
querySelectorAll = Iterates over all elements with (".error-message") class.
Clears the text contents and hides any visible error messages
*/
const clearErrors = () => {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((errorField) => {
        errorField.textContent = "";
        errorField.classList.remove("error-visible");
    })
};

/**
 * Form submission event listener
 */
document
    .getElementById("donationForm")
    .addEventListener("submit", function (event){
        // Prevents the form from submitting
        event.preventDefault();

        // Removes any existing error messages
        clearErrors();

/** Validates the input ensuring that the charity name, 
 * donation amount, and date field are not empty.
 * showError is invoked to show error message next to the input field
 */
        const name = document.getElementById("charityName").value;
	    if (name === "") {
            showError("charityName", "Charity name is required.");
        };

        const amount = document.getElementById("donationAmount").value;
        if (amount === "") {
            showError("donationAmount", "Donation amount is required.");
        } else if (amount < 0) {
            showError("donationAmount", "Please enter a positive value.");
        } else if (isNaN(amount)) {
            showError("donationAmount", "Please enter a numeric value.");
        };

        const date = document.getElementById("donationDate").value;
        if (date === "") {
            showError("donationDate", "Donation date is required.");
        } 
            const selectedDate = new Date(date);
            const today = new Date()
        if (selectedDate > today) {
            showError("donationDate", "Please enter a valid date.")
        }

        else {
            console.log("Form submission complete!");
        };

    });