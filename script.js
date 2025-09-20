document.addEventListener("DOMContentLoaded", function () {
    // Countdown Timer
    function startCountdown() {
        const eventDate = new Date("May 5, 2025 00:00:00").getTime();
        const timerElement = document.getElementById("timer");

        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = eventDate - now;

            if (timeLeft < 0) {
                timerElement.innerHTML = "Event Started!";
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            timerElement.innerHTML = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
        }

        setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    startCountdown();

    // Smooth Scroll for Internal Links Only
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        const href = anchor.getAttribute("href");

        if (href.startsWith("#")) {  // Only apply smooth scroll to same-page links
            anchor.addEventListener("click", function (event) {
                event.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: "smooth"
                    });
                }
            });
        }
    });

    // Hover Effect for Articles
    document.querySelectorAll("#latest-news article").forEach(article => {
        article.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.05)";
            this.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
            this.style.transition = "all 0.3s ease";
        });

        article.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)";
            this.style.boxShadow = "none";
        });
    });
});
