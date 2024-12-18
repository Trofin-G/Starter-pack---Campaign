// init handlers
let swiperHelper = null;
let formHelper = null;
let layoutHandler = null;
let homepageHandler = null;
let registerHandler = null;
let registerHelper = null;

const initHandlers = () => {
    // Utils
    swiperHelper = new SwiperHelper();
    formHelper = new FormHelper();
    registerHelper = new RegisterHelper();

    // Pages
    layoutHandler = new LayoutHandler();
    homepageHandler = new HomepageHandler();
    registerHandler = new RegisterHandler();
};

// uncomment this to use jQuery
(($) => {
    $(document).ready(() => {
        initHandlers();
    });
})(jQuery);

// init handlers using vanilla
// document.addEventListener('DOMContentLoaded', () => { initHandlers(); });
