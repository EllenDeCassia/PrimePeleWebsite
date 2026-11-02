
/* =========================================
   PRIME PELE | MOBILE WAXING
   Website JavaScript - Part 3
   ========================================= */


/* =========================================
   CONTACT FORM - AJAX
   ========================================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const contactStatus = document.getElementById("contactStatus");
    const contactSubmit = document.getElementById("contactSubmit");

    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            contactStatus.textContent =
                "Please complete all required fields.";
            return;
        }

        const formData = new FormData(contactForm);

        const submitButton = contactSubmit ||
            contactForm.querySelector('button[type="submit"]');

        submitButton.disabled = true;
        submitButton.textContent = "SENDING...";
        contactStatus.textContent = "Sending your message...";

        try {

            const response = await fetch(
                "https://formsubmit.co/ajax/cptbeautyccn@gmail.com",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Contact request failed.");
            }

            const result = await response.json();

            if (result.success === true ||
                result.success === "true") {

                contactStatus.textContent =
                    "Your message was submitted successfully!";

                contactForm.reset();

            } else {
                throw new Error("Submission was not accepted.");
            }

        } catch (error) {

            contactStatus.textContent =
                "Unable to send your message. Please try again.";

            console.error("Contact form error:", error);

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = "SEND MESSAGE";

        }

    });

}


/* =========================================
   FAQ ACCORDION
   ========================================= */

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
   ========================================= */

const galleryTriggers =
    document.querySelectorAll(".gallery-trigger");

const galleryLightbox =
    document.getElementById("galleryLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxCaption =
    document.getElementById("lightboxCaption");

const closeLightboxButton =
    document.getElementById("closeLightbox");

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
   ========================================= */

const serviceSearch =
    document.getElementById("serviceSearch");

const priceFilter =
    document.getElementById("priceFilter");

const serviceList =
    document.getElementById("serviceList");

const serviceResults =
    document.getElementById("serviceResults");

const noServiceResults =
    document.getElementById("noServiceResults");

if (
    serviceSearch &&
    priceFilter &&
    serviceList &&
    serviceResults &&
    noServiceResults
) {

    const serviceCards =
        serviceList.querySelectorAll(".service-card");

    function filterServices() {

        const searchTerm =
            serviceSearch.value.toLowerCase().trim();

        const selectedPrice = priceFilter.value;

        let visibleCount = 0;

        serviceCards.forEach(function(card) {

            const serviceName =
                (card.dataset.service || "").toLowerCase();

            const priceValue = card.dataset.price || "";

            const matchesSearch =
                serviceName.includes(searchTerm);

            let matchesPrice = false;

            if (selectedPrice === "all") {

                matchesPrice = true;

            } else if (selectedPrice === "custom") {

                matchesPrice = priceValue === "custom";

            } else if (priceValue !== "custom") {

                const price = Number(priceValue);

                if (selectedPrice === "under150") {

                    matchesPrice = price <= 150;

                } else if (selectedPrice === "151to200") {

                    matchesPrice =
                        price >= 151 && price <= 200;

                } else if (selectedPrice === "above200") {

                    matchesPrice = price > 200;

                }

            }

            const shouldShow =
                matchesSearch && matchesPrice;

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
   APPOINTMENT ENQUIRY FORM - AJAX
   Dynamic Prices and Validation
   ========================================= */

const enquiryForm =
    document.getElementById("enquiryForm");

if (enquiryForm) {

    const enquiryName =
        document.getElementById("enquiryName");

    const enquiryEmail =
        document.getElementById("enquiryEmail");

    const enquiryService =
        document.getElementById("enquiryService");

    const enquiryDate =
        document.getElementById("enquiryDate");

    const enquiryMessage =
        document.getElementById("enquiryMessage");

    const enquiryPrice =
        document.getElementById("enquiryPrice");

    const enquiryStatus =
        document.getElementById("enquiryStatus");

    const servicePrices = {
        "Full Leg Wax": 250,
        "Half Leg Wax": 200,
        "Underarm Wax": 120,
        "Arm Wax": 200,
        "Bikini Wax": 150,
        "Custom Service": null
    };

    function getLocalDateString(date) {

        const year = date.getFullYear();

        const month =
            String(date.getMonth() + 1).padStart(2, "0");

        const day =
            String(date.getDate()).padStart(2, "0");

        return year + "-" + month + "-" + day;

    }

    enquiryDate.min = getLocalDateString(new Date());

    enquiryService.addEventListener("change", function() {

        const selectedService = enquiryService.value;

        if (selectedService === "") {

            enquiryPrice.textContent =
                "Select a service to view its price.";

        } else if (selectedService === "Custom Service") {

            enquiryPrice.textContent =
                "Price: Available on request.";

        } else if (
            Object.prototype.hasOwnProperty.call(
                servicePrices,
                selectedService
            )
        ) {

            enquiryPrice.textContent =
                "Price: R" + servicePrices[selectedService];

        } else {

            enquiryPrice.textContent =
                "Please select a valid service.";

        }

    });

    enquiryForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        enquiryDate.min = getLocalDateString(new Date());

        const name = enquiryName.value.trim();
        const email = enquiryEmail.value.trim();
        const service = enquiryService.value;
        const date = enquiryDate.value;
        const message = enquiryMessage.value.trim();

        if (!name) {
            enquiryStatus.textContent =
                "Please enter your full name.";
            enquiryName.focus();
            return;
        }

        if (!enquiryEmail.validity.valid || !email) {
            enquiryStatus.textContent =
                "Please enter a valid email address.";
            enquiryEmail.focus();
            return;
        }

        if (!Object.prototype.hasOwnProperty.call(
            servicePrices, service
        )) {

            enquiryStatus.textContent =
                "Please select a valid service.";

            enquiryService.focus();
            return;
        }

        if (
            !date ||
            date < getLocalDateString(new Date())
        ) {

            enquiryStatus.textContent =
                "Please select today or a future date.";

            enquiryDate.focus();
            return;
        }

        if (!enquiryForm.checkValidity()) {
            enquiryForm.reportValidity();
            return;
        }

        const price = servicePrices[service] === null
            ? "Price on request"
            : "R" + servicePrices[service];

        const formData = new FormData(enquiryForm);

        // Include all relevant appointment information
        formData.set("name", name);
        formData.set("email", email);
        formData.set("service", service);
        formData.set("preferred_date", date);
        formData.set("estimated_price", price);
        formData.set("message", message || "None provided");

        formData.set(
            "_subject",
            "Prime Pele Appointment Enquiry - " + service
        );

        const submitButton =
            enquiryForm.querySelector('button[type="submit"]');

        submitButton.disabled = true;
        submitButton.textContent = "SENDING...";

        enquiryStatus.textContent =
            "Submitting your appointment enquiry...";

        try {

            const response = await fetch(
                "https://formsubmit.co/ajax/cptbeautyccn@gmail.com",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Enquiry request failed.");
            }

            const result = await response.json();

            if (
                result.success === true ||
                result.success === "true"
            ) {

                enquiryStatus.textContent =
                    "Your appointment enquiry was submitted. " +
                    "Your appointment is not yet confirmed.";

                enquiryForm.reset();

                enquiryPrice.textContent =
                    "Select a service to view its price.";

            } else {

                throw new Error("Submission was not accepted.");

            }

        } catch (error) {

            enquiryStatus.textContent =
                "Unable to submit your enquiry. " +
                "Please try again.";

            console.error("Enquiry form error:", error);

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = "SUBMIT ENQUIRY";

        }

    });

}
