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