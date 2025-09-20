document.addEventListener("DOMContentLoaded", () => {
    // ===== Mobile Sidebar Toggle with Overlay =====
    const sidebar = document.querySelector(".sidebar");
    const toggleButton = document.querySelector(".toggle-sidebar");
    const body = document.body;
    
    // Create overlay element if it doesn't exist
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
    }

    function toggleSidebar() {
        sidebar.classList.toggle("show");
        overlay.classList.toggle("show");
        body.classList.toggle("no-scroll");
    }

    if (toggleButton && sidebar) {
        toggleButton.addEventListener("click", toggleSidebar);
        overlay.addEventListener("click", toggleSidebar);
    }

    // Close sidebar when clicking on a link (mobile)
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
    });

    // Handle window resize
    function handleResize() {
        if (window.innerWidth > 768) {
            // On larger screens, ensure sidebar is visible and overlay is hidden
            sidebar.classList.remove("show");
            overlay.classList.remove("show");
            body.classList.remove("no-scroll");
            
            if (toggleButton) {
                toggleButton.style.display = 'none';
            }
        } else {
            // On mobile screens, show the toggle button
            if (toggleButton) {
                toggleButton.style.display = 'block';
            }
        }
    }

    // Initial check and add resize listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // ===== Section Navigation =====
    function showSection(sectionId) {
        // Hide all product sections
        const sections = document.querySelectorAll('.product-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show the selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            
            // Scroll to the top of the section
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    }
    
    // Set up section navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            if (sectionId) {
                showSection(sectionId);
            }
        });
    });

    // ===== Cart System =====
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    // Only proceed if cart elements exist
    if (cartItems && cartTotal) {
        function updateCart() {
            cartItems.innerHTML = "";
            let total = 0;

            cart.forEach((item, index) => {
                const li = document.createElement("li");
                li.innerHTML = `${item.name} - $${item.price.toFixed(2)}
                    <button class="remove-item" data-index="${index}">❌</button>`;
                cartItems.appendChild(li);
                total += item.price;
            });

            cartTotal.textContent = total.toFixed(2);
            localStorage.setItem("cart", JSON.stringify(cart));
        }

        document.body.addEventListener("click", (event) => {
            if (event.target.classList.contains("add-to-cart")) {
                // Get product details from the clicked product card
                const productCard = event.target.closest('.product');
                if (!productCard) return;
                
                const name = productCard.querySelector('h3').textContent;
                const priceText = productCard.querySelector('p').textContent;
                const price = parseFloat(priceText.replace('$', '').replace('<del>', '').split(' ')[0]);
                
                if (!name || isNaN(price) || price < 0) return;

                cart.push({ name, price });
                updateCart();
                
                // Show feedback to user
                event.target.textContent = "Added!";
                setTimeout(() => {
                    event.target.textContent = "Add to Cart";
                }, 1500);
            }
        });

        // Event delegation for remove buttons
        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("remove-item")) {
                const index = event.target.getAttribute("data-index");
                if (index !== null) {
                    cart.splice(index, 1);
                    updateCart();
                }
            }
        });

        updateCart();
    }

    // ===== Marquee Controls =====
    const marquee = document.querySelector(".marquee-container marquee");
    if (marquee) {
        // Only add hover controls on non-touch devices
        if (!('ontouchstart' in window)) {
            marquee.addEventListener("mouseover", () => marquee.stop());
            marquee.addEventListener("mouseout", () => marquee.start());
        }
        
        // Add pause on tap for mobile devices
        if ('ontouchstart' in window) {
            let tapTimer;
            marquee.addEventListener('touchstart', () => {
                marquee.stop();
                clearTimeout(tapTimer);
            });
            
            marquee.addEventListener('touchend', () => {
                tapTimer = setTimeout(() => {
                    marquee.start();
                }, 1000);
            });
        }
    }
});

// ===== Product Section Filtering =====
    function showSection(sectionId) {
        // Hide all product sections
        const sections = document.querySelectorAll('.product-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Show the selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            
            // Scroll to the top of the section
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    }
    
    // Make showSection function available globally
    window.showSection = showSection;
    
    // Set up section navigation
    const navLinks = document.querySelectorAll('nav a[onclick]');
    navLinks.forEach(link => {
        // Remove the existing onclick and replace with modern event listener
        const onClickAttr = link.getAttribute('onclick');
        if (onClickAttr && onClickAttr.startsWith('showSection')) {
            link.removeAttribute('onclick');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = onClickAttr.match(/'([^']+)'|"([^"]+)"|\(([^)]+)\)/)[1];
                showSection(sectionId);
            });
        }
    });
});