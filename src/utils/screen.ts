const isMobile = window.innerWidth <= 640;
const isTablet = window.innerWidth > 640 && window.innerWidth <= 1024;
const isDesktop = window.innerWidth > 1024;
const isLargeDesktop = window.innerWidth > 1280;

// TailwindCSS breakpoints
const isSmallScreen = window.innerWidth <= 640; // sm
const isMediumScreen = window.innerWidth > 640 && window.innerWidth <= 1024; // md
const isLargeScreen = window.innerWidth > 1024 && window.innerWidth <= 1280; // lg
const isXLargeScreen = window.innerWidth > 1280 && window.innerWidth <= 1536; // xl
const is2XLargeScreen = window.innerWidth > 1536; // 2xl

export {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isXLargeScreen,
    is2XLargeScreen,
};
