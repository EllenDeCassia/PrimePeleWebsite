
/* =========================================
   PRIME PELE | MOBILE WAXING
   Website JavaScript
   ========================================= */


/* =========================================
   CONTACT FORM
   Validation and Email Preparation
   ========================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const nameField = document.getElementById("name");
        const emailField = document.getElementById("email");
        const subjectField = document.getElementById("subject");
        const messageField = document.getElementById("message");
        const contactStatus = document.getElementById("contactStatus");

        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const subject = subjectField.value.trim();
        const message = messageField.value.trim();

        // Validate full name
        if (name === "") {
            alert("Please enter your full name.");
            nameField.focus();
            return;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            emailField.focus();
            return;
        }

        // Validate subject
        if (subject === "") {
            alert("Please enter a subject.");
            subjectField.focus();
            return;
        }

        // Validate message
        if (message === "") {
            alert("Please enter your message.");
            messageField.focus();
            return;
        }

        // Prime Pele business email
        const businessEmail = "cptbeautyccn@gmail.com";

        // Prepare email subject
        const emailSubject = encodeURIComponent(
            "Prime Pele Contact: " + subject
        );

        // Prepare email body
        const emailBody = encodeURIComponent(
            "Name: " + name + "\n" +
            "Email: " + email + "\n\n" +
            "Message:\n" + message
        );

        // Create email link
        const mailtoLink =
            "mailto:" + businessEmail +
            "?subject=" + emailSubject +
            "&body=" + emailBody;

        // Explain the next step to the visitor
        if (contactStatus) {
            contactStatus.textContent =
                "Your email is ready. Please complete " +
                "the sending process in your email application.";
        }

        // Open the visitor's email application
        window.location.href = mailtoLink;

    });

}

        // Validation only.
        // Actual email submission will be added later.
        alert(
            "Thank you, " + name +
            "! Your form is valid. Email submission " +
            "is not yet configured."
        );

    });
}


/* ---------- FAQ Accordion ---------- */

const faqItems = document.querySelectorAll(".faq-item");

if (faqItems.length > 0) {

    faqItems.forEach(function(item) {

        item.addEventListener("toggle", function() {

            if (item.open) {

                faqItems.forEach(function(otherItem) {

                    if (otherItem !== item) {
                        otherItem.open = false;
                    }

                });

            }

        });

    });

}

/* =========================================
   GALLERY LIGHTBOX
   Part 3 - Interactive Gallery
   ========================================= */

const galleryTriggers = document.querySelectorAll(".gallery-trigger");

const galleryLightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightboxButton = document.getElementById("closeLightbox");

if (
    galleryTriggers.length > 0 &&
    galleryLightbox &&
    lightboxImage &&
    lightboxCaption &&
    closeLightboxButton
) {

    galleryTriggers.forEach(function(trigger) {

        trigger.addEventListener("click", function() {

            const image = trigger.querySelector("img");

            if (!image) {
                return;
            }

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            const card = trigger.closest(".service-card");
            const heading = card ? card.querySelector("h3") : null;

            lightboxCaption.textContent = heading
                ? heading.textContent
                : image.alt;

            galleryLightbox.showModal();

        });

    });

    closeLightboxButton.addEventListener("click", function() {
        galleryLightbox.close();
    });

    galleryLightbox.addEventListener("click", function(event) {

        if (event.target === galleryLightbox) {
            galleryLightbox.close();
        }

    });

    galleryLightbox.addEventListener("close", function() {

        lightboxImage.removeAttribute("src");
        lightboxImage.alt = "";
        lightboxCaption.textContent = "";

    });

}

/* =========================================
   SERVICE SEARCH AND PRICE FILTER
   Part 3 - DOM Manipulation
   ========================================= */

const serviceSearch = document.getElementById("serviceSearch");
const priceFilter = document.getElementById("priceFilter");
const serviceList = document.getElementById("serviceList");
const serviceResults = document.getElementById("serviceResults");
const noServiceResults = document.getElementById("noServiceResults");

if (
    serviceSearch &&
    priceFilter &&
    serviceList &&
    serviceResults &&
    noServiceResults
) {

    const serviceCards = serviceList.querySelectorAll(".service-card");

    function filterServices() {

        const searchTerm = serviceSearch.value.toLowerCase().trim();
        const selectedPrice = priceFilter.value;

        let visibleCount = 0;

        serviceCards.forEach(function(card) {

            const serviceName = card.dataset.service || "";
            const priceValue = card.dataset.price || "";

            const matchesSearch = serviceName.includes(searchTerm);

            let matchesPrice = false;

            if (selectedPrice === "all") {
                matchesPrice = true;
            }

            else if (selectedPrice === "custom") {
                matchesPrice = priceValue === "custom";
            }

            else if (priceValue !== "custom") {

                const price = Number(priceValue);

                if (selectedPrice === "under150") {
                    matchesPrice = price <= 150;
                }

                else if (selectedPrice === "151to200") {
                    matchesPrice = price >= 151 && price <= 200;
                }

                else if (selectedPrice === "above200") {
                    matchesPrice = price > 200;
                }

            }

            const shouldShow = matchesSearch && matchesPrice;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }

        });

        serviceResults.textContent =
            "Showing " + visibleCount +
            " of " + serviceCards.length + " services.";

        noServiceResults.hidden = visibleCount !== 0;

    }

    serviceSearch.addEventListener("input", filterServices);

    priceFilter.addEventListener("change", filterServices);

    filterServices();

}

/* =========================================
   APPOINTMENT ENQUIRY FORM
   Part 3 - Dynamic Prices and Validation
   ========================================= */

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {

    const enquiryName = document.getElementById("enquiryName");
    const enquiryEmail = document.getElementById("enquiryEmail");
    const enquiryService = document.getElementById("enquiryService");
    const enquiryDate = document.getElementById("enquiryDate");
    const enquiryMessage = document.getElementById("enquiryMessage");
    const enquiryPrice = document.getElementById("enquiryPrice");
    const enquiryStatus = document.getElementById("enquiryStatus");

    // Service price information
    const servicePrices = {
        "Full Leg Wax": 250,
        "Half Leg Wax": 200,
        "Underarm Wax": 120,
        "Arm Wax": 200,
        "Bikini Wax": 150,
        "Custom Service": null
    };

    // Format local date as YYYY-MM-DD
    function getLocalDateString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return year + "-" + month + "-" + day;
    }

    // Prevent selection of past dates
    enquiryDate.min = getLocalDateString(new Date());

    // Display price when service changes
    enquiryService.addEventListener("change", function() {

        const selectedService = enquiryService.value;

        if (selectedService === "") {
            enquiryPrice.textContent =
                "Select a service to view its price.";
        }

        else if (selectedService === "Custom Service") {
            enquiryPrice.textContent =
                "Price: Available on request.";
        }

        else {
            enquiryPrice.textContent =
                "Price: R" + servicePrices[selectedService];
        }

    });

    // Validate and prepare appointment enquiry
    enquiryForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = enquiryName.value.trim();
        const email = enquiryEmail.value.trim();
        const service = enquiryService.value;
        const date = enquiryDate.value;
        const message = enquiryMessage.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name === "") {
            alert("Please enter your full name.");
            enquiryName.focus();
            return;
        }

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            enquiryEmail.focus();
            return;
        }

        if (!Object.prototype.hasOwnProperty.call(
            servicePrices, service
        )) {
            alert("Please select a valid service.");
            enquiryService.focus();
            return;
        }

        if (date === "" || date < getLocalDateString(new Date())) {
            alert("Please select today or a future date.");
            enquiryDate.focus();
            return;
        }

        // Determine selected service price
        const price = servicePrices[service] === null
            ? "Price on request"
            : "R" + servicePrices[service];

        // Prepare email details
        const emailSubject = encodeURIComponent(
            "Prime Pele Appointment Enquiry - " + service
        );

        const emailBody = encodeURIComponent(
            "APPOINTMENT ENQUIRY\n\n" +
            "Full Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Service: " + service + "\n" +
            "Price: " + price + "\n" +
            "Preferred Date: " + date + "\n\n" +
            "Additional Information:\n" +
            (message || "None provided") + "\n\n" +
            "Please confirm availability and any " +
            "additional charges before booking."
        );

        const mailtoLink =
            "mailto:cptbeautyccn@gmail.com" +
            "?subject=" + emailSubject +
            "&body=" + emailBody;

        enquiryStatus.textContent =
            "Your enquiry email is ready. Please complete " +
            "the sending process in your email application. " +
            "Your appointment is not yet confirmed.";

        window.location.href = mailtoLink;

    });

}

