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