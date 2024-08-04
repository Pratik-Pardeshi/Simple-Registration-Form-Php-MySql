document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const message = document.getElementById('message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = new URLSearchParams(formData);

        message.textContent = ""; // Clear previous messages

        try {
            const response = await fetch('register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: data.toString()
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const result = await response.text();

            if (result === "Registration successful!") {
                showSuccessAnimation();
                setTimeout(() => {
                    window.location.href = `welcome.html?username=${encodeURIComponent(formData.get('username'))}`;
                }, 1000); // Delay to show animation
            } else {
                message.textContent = result || "An unexpected error occurred. Please try again.";
            }
        } catch (error) {
            console.error('Error:', error);
            message.textContent = "An unexpected error occurred. Please try again.";
        }
    });

    function showSuccessAnimation() {
        const container = document.querySelector('.container');
        container.style.position = 'relative';
        const animation = document.createElement('div');
        animation.className = 'success-animation';
        container.appendChild(animation);
        setTimeout(() => {
            animation.remove();
        }, 1000);
    }
});
