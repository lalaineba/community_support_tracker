const form = document.getElementById("donationForm")

// MODAL FUNCTIONALITY
const modal = document.getElementById("donationModal")
const button = document.getElementById("addDonation")
const span = document.getElementsByClassName("close");
// Modal opens When the user clicks on the Contribute button
button.onclick = function() {
    modal.style.display = "block";
}
// Modal closes when the user clicks on the X button
span.onclick = function() {
    form.classList.add("closing");
    // Wait for animation to finish before hiding modal
    setTimeout(() => {
        modal.style.display = "none";
        form.classList.remove("closing");
        // Reset the form and clear error messages
        form.reset();
        clearErrors();
    }, 1000);
}

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
        let isFormValid = true;

        const name = document.getElementById("charityName").value;
	    if (name === "") {
            showError("charityName", "Charity name is required.");
            isFormValid = false;
        };

        const amount = document.getElementById("donationAmount").value;
        if (amount === "") {
            showError("donationAmount", "Donation amount is required.");
            isFormValid = false;
        }
        if (amount < 0) {
            showError("donationAmount", "Please enter a positive value.");
            isFormValid = false;
        }
        if (isNaN(amount)) {
            showError("donationAmount", "Please enter a numeric value.");
            isFormValid = false;
        };

        const date = document.getElementById("donationDate").value;
        if (date === "") {
            showError("donationDate", "Donation date is required.");
            isFormValid = false;
        }
        const selectedDate = new Date(date);
        const today = new Date()
        if (selectedDate > today) {
            showError("donationDate", "Please enter a valid date.");
            isFormValid = false;
        }

        else {
            console.log("Form submission complete!");
        };
        if (!isFormValid) {
            return;
        }

        /** Storing an array of objects in localStorage: 
         * Converts array of objects into a JSON string because localStorage can only store strings
        */ 
        const message = document.getElementById("donorMessage").value;
        const donations = JSON.parse(localStorage.getItem("donationList")) || [];
        // Adds new items to the end of the array
        donations.push({
            name: name,
            amount: amount,
            date: date,
            message: message
        });

        localStorage.setItem("donationList", JSON.stringify(donations));

        document.getElementById("donationForm").reset()
        modal.style.display = "none";

        displayDonations();
});

/** Loops through the donations array and returns a single value of the donation amount
 * accumulator = running total
 * donation = current item in the array
 */
function totalAmount() {
    const initialValue = 0
    const donations = JSON.parse(localStorage.getItem("donationList")) || [];
    const total = donations.reduce((accumulator, donation) =>
        accumulator + Number(donation.amount), initialValue);
    document.getElementById("totalAmount").innerHTML = `$${total}`;
}

/**
 * Displays the Donations records in the table by retrieving donation data stored 
 * in the localStorage under the key 'donationList'
 * JSON.parse() converts the stored JSON string back into a JavaScript array
 * 
 */
function displayDonations() {
    const donationData = document.getElementById("tableData");
    donationData.innerHTML = "";
    const donations = JSON.parse(localStorage.getItem("donationList")) || [];

    // Iterates through each donation in the array, the index tracks the position in the array
    donations.forEach((donation, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${donation.name}</td>
            <td>${donation.amount}</td>
            <td>${donation.date}</td>
            <td>${donation.message}</td>
            <td><i onclick="removeDonation(${index})" class="fa fa-trash"></i></td>
        `;
        donationData.appendChild(row);
    });
    totalAmount();
}

// Delete row
function removeDonation(index) {
    const donations = JSON.parse(localStorage.getItem("donationList")) || [];
    donations.splice(index, 1);
    localStorage.setItem('donationList', JSON.stringify(donations));
    displayDonations();
}

window.onload = displayDonations();