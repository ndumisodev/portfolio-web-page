const container = document.querySelector('.container');
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navigation a");
const navBar = document.querySelector('.nav-bar');
const navHeight = navBar ? navBar.offsetHeight : 0;

// Calculate section positions considering scroll-snap
let sectionPositions = [];
function calculatePositions() {
    sectionPositions = Array.from(sections).map(section => ({
        element: section,
        top: section.offsetTop - navHeight,
        bottom: section.offsetTop + section.offsetHeight - navHeight
    }));
}

// Update on resize
window.addEventListener('resize', calculatePositions);
calculatePositions();

container.addEventListener("scroll", () => {
    const currentScroll = container.scrollTop + navHeight;
    
    sectionPositions.forEach(({ element, top, bottom }) => {
        if (currentScroll >= top && currentScroll < bottom) {
            const id = element.getAttribute("id");
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
});

// Initial setup
window.addEventListener('load', () => {
    calculatePositions();
    container.dispatchEvent(new Event('scroll'));
});
window.addEventListener('hashchange', calculatePositions);



const toggleButton = document.querySelector(".toggle_button")
const toggleButtonIcon = document.querySelector(".toggle_button span")
const dropDownMenu = document.querySelector(".dropdown-menu")

toggleButton.addEventListener('click', function() {
    dropDownMenu.classList.toggle("open");
    const isOpen = dropDownMenu.classList.contains("open");
    
    // Toggle between menu and close icons
    toggleButtonIcon.textContent = isOpen ? "close" : "menu";
});





function adjustForNavbar() {
    const navBar = document.querySelector('.nav-bar');
    const navHeight = navBar.offsetHeight;
    
    // Update container padding
    document.querySelector('.container').style.paddingTop = `${navHeight + 20}px`;
    
    // Update section margins
    document.querySelectorAll('section:not(.one)').forEach(section => {
        section.style.marginTop = `${navHeight}px`;
    });
    
    // Update hero content padding
    document.querySelector('.hero-content').style.paddingTop = `${navHeight}px`;
}

// Run on load and resize
window.addEventListener('load', adjustForNavbar);
window.addEventListener('resize', adjustForNavbar);





/// Project hover functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectItems = document.querySelectorAll('.project-list-item');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Function to switch active project
    function activateProject(targetId) {
        // Remove active class from all items and cards
        projectItems.forEach(item => {
            item.classList.remove('active');
        });
        
        projectCards.forEach(card => {
            card.classList.remove('active');
            // Add fade-out animation before hiding
            card.style.animation = 'fadeOut 0.3s ease';
        });
        
        // Add active class to clicked item
        const activeItem = document.querySelector(`[data-target="${targetId}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
        
        // Show corresponding card with animation delay
        setTimeout(() => {
            const activeCard = document.getElementById(targetId);
            if (activeCard) {
                activeCard.classList.add('active');
                activeCard.style.animation = 'slideIn 0.5s ease forwards';
            }
        }, 300);
    }
    
    // Add event listeners to project items
    projectItems.forEach(item => {
        // Hover effect
        item.addEventListener('mouseenter', () => {
            const targetId = item.getAttribute('data-target');
            activateProject(targetId);
        });
        
        // Click effect for mobile/touch devices
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            activateProject(targetId);
        });
    });
    
    // Set first project as active on page load
    if (projectItems.length > 0) {
        const firstTarget = projectItems[0].getAttribute('data-target');
        activateProject(firstTarget);
    }
    
    // Optional: Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const activeItem = document.querySelector('.project-list-item.active');
        if (!activeItem) return;
        
        let nextItem;
        
        if (e.key === 'ArrowDown') {
            nextItem = activeItem.nextElementSibling;
        } else if (e.key === 'ArrowUp') {
            nextItem = activeItem.previousElementSibling;
        }
        
        if (nextItem && nextItem.classList.contains('project-list-item')) {
            const targetId = nextItem.getAttribute('data-target');
            activateProject(targetId);
            nextItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
});