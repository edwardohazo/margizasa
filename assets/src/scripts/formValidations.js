document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const fields = ["name", "telephone", "email", "message"];
    const data = {};

    function validateField(input) {
        let valid = true;
        let error = "";
        
        if (input.id === "name" && input.value.trim().length < 3) {
            valid = false;
            error = "Name must be at least 3 characters.";
        }
        if (input.id === "telephone" && !/^\d{10}$/.test(input.value)) {
            valid = false;
            error = "Telephone must be a 10-digit number.";
        }
        if (input.id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            valid = false;
            error = "Enter a valid email address.";
        }
        if (input.id === "message" && input.value.trim().length < 10) {
            valid = false;
            error = "Message must be at least 10 characters.";
        }
        
        const errorSpan = input.nextElementSibling;
        if (errorSpan) {
            errorSpan.textContent = error;
        }
        
        input.classList.toggle("border-red-500", !valid);
        input.classList.toggle("border-green-500", valid);
        
        return valid;
    }
    
    form.addEventListener("input", function (event) {
        if (fields.includes(event.target.id)) {
            validateField(event.target);
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let valid = true;
        fields.forEach(id => {
            const input = document.getElementById(id);

            if (!validateField(input)) {
                valid = false;
            }
        });

        if (!valid) {
            return; // Stop submission if validation fails
        }

        let formData = new FormData(form);

        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        fetch('https://formsubmit.co/ajax/margizasamasiosare@gmail.com', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            // Clear form inputs on success
            form.reset();

            // Remove any existing feedback messages
            const existingFeedback = document.getElementById("form-feedback");
            if (existingFeedback) {
                existingFeedback.remove();
            }

            // Insert success message
            const feedback = document.createElement("div");
            feedback.id = "form-feedback";
            feedback.textContent = "Message sent successfully!";
            feedback.classList.add("bg-green-100", "border-green-500", "text-green-700", "p-4", "mt-4", "rounded");
            form.insertAdjacentElement("afterend", feedback); // Insert after the form
        })
        .catch(error => {
            console.log(error);

            // Remove any existing feedback messages
            const existingFeedback = document.getElementById("form-feedback");
            if (existingFeedback) {
                existingFeedback.remove();
            }

            // Insert error message
            const feedback = document.createElement("div");
            feedback.id = "form-feedback";
            feedback.textContent = "Something went wrong. Please try again.";
            feedback.classList.add("bg-red-100", "border-red-500", "text-red-700", "p-4", "mt-4", "rounded");
            form.insertAdjacentElement("afterend", feedback); // Insert after the form
        });
    });
});