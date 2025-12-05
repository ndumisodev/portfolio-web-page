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





// Simple hover effect
const projectItems = document.querySelectorAll('.project-item');
const projectCards = document.querySelectorAll('.project-card');

projectItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const targetId = item.getAttribute('data-target');
        
        // Remove active class from all
        projectItems.forEach(i => i.classList.remove('active'));
        projectCards.forEach(card => card.classList.remove('active'));
        
        // Add active class to hovered item
        item.classList.add('active');
        
        // Show corresponding card
        const targetCard = document.getElementById(targetId);
        if (targetCard) {
            targetCard.classList.add('active');
        }
    });
});

// Set first project as active by default
document.addEventListener('DOMContentLoaded', () => {
    if (projectItems.length > 0) {
        projectItems[0].classList.add('active');
        const firstTarget = projectItems[0].getAttribute('data-target');
        const firstCard = document.getElementById(firstTarget);
        if (firstCard) {
            firstCard.classList.add('active');
        }
    }
});