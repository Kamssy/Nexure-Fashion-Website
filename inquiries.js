// Mobile Menu and Sidebar Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle button
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    
    // Add menu toggle to the header
    const header = document.querySelector('header');
    if (header) {
        header.style.position = 'relative';
        header.appendChild(menuToggle);
    }
    
    // Create sidebar toggle button
    const sidebarToggle = document.createElement('button');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '☰';
    sidebarToggle.setAttribute('aria-label', 'Toggle sidebar');
    sidebarToggle.style.display = 'none'; // Hidden by default
    
    // Add sidebar toggle to the body
    document.body.appendChild(sidebarToggle);
    
    // Create overlay for sidebar
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    
    // Get navigation elements
    const topNav = document.querySelector('.top-nav ul');
    const sidebar = document.querySelector('.sidebar');
    
    // Toggle mobile menu function
    function toggleMobileMenu() {
        if (topNav) {
            topNav.classList.toggle('show');
        }
    }
    
    // Toggle sidebar function
    function toggleSidebar() {
        if (sidebar) {
            sidebar.classList.toggle('show');
            overlay.classList.toggle('show');
            document.body.classList.toggle('no-scroll');
        }
    }
    
    // Add event listeners
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }
    
    // Close sidebar when clicking on a link (mobile)
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && sidebar.classList.contains('show')) {
                toggleSidebar();
            }
        });
    });
    
    // Handle window resize
    function handleResize() {
        if (window.innerWidth <= 768) {
            // Mobile view
            if (sidebarToggle) {
                sidebarToggle.style.display = 'block';
            }
            if (topNav) {
                topNav.classList.remove('show');
            }
        } else {
            // Desktop view
            if (sidebarToggle) {
                sidebarToggle.style.display = 'none';
            }
            if (sidebar) {
                sidebar.classList.remove('show');
            }
            if (overlay) {
                overlay.classList.remove('show');
            }
            document.body.classList.remove('no-scroll');
        }
    }
    
    // Initial check and add resize listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // FAQ Toggle Functionality
    document.querySelectorAll('.faq .question').forEach(question => {
        question.addEventListener('click', function () {
            const answer = this.nextElementSibling;
            const parentFaq = this.parentElement;

            // Close all other open FAQs
            document.querySelectorAll('.faq .answer').forEach(ans => {
                if (ans !== answer) {
                    ans.style.maxHeight = null;
                    ans.parentElement.classList.remove('open');
                }
            });

            // Toggle visibility with smooth animation
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                parentFaq.classList.remove('open');
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                parentFaq.classList.add('open');
            }
        });
    });

    // Form Submission (For Inquiry and Appointment Forms)
    function handleFormSubmission(form, message) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent actual form submission

            // Display a confirmation message
            const confirmationSection = document.getElementById('confirmation');
            const confirmationMessage = document.getElementById('confirmation-message');

            confirmationMessage.textContent = message;
            confirmationSection.style.display = 'block';

            // Reset form fields after submission
            form.reset();

            // Hide confirmation message after a few seconds
            setTimeout(() => {
                confirmationSection.style.display = 'none';
            }, 5000);
        });
    }

    // Attach event listeners if forms exist
    const inquiryForm = document.getElementById('inquiry-form');
    const appointmentForm = document.getElementById('appointment-form');

    if (inquiryForm) handleFormSubmission(inquiryForm, 'Inquiry Submitted Successfully!');
    if (appointmentForm) handleFormSubmission(appointmentForm, 'Appointment Booked Successfully!');
});