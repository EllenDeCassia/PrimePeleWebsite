// Prime Pele - Website JavaScript

// Contact form validation
const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value.trim();

        if (name === "") {
            alert("Please enter your full name.");
            return;
        }

        if (email === "") {
            alert("Please enter your email address.");
            return;
        }

        if (service === "") {
            alert("Please select a service.");
            return;
        }

        if (message === "") {
            alert("Please enter your message.");
            return;
        }

        alert(
            "Thank you, " + name +
            "! Your enquiry has been submitted successfully."
        );

        contactForm.reset();
    });
}