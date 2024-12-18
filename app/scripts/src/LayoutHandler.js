class LayoutHandler {
    constructor() {
        this.init();
        this.handleDOM();
        this.handleEvents();
    }

    /**
     * Declare global variables
     */
    init() {}

    /**
     * Handle DOM queries
     */
    handleDOM() {}

    /**
     * Listen for events
     */
    handleEvents() {
        let self = this;

        setTimeout(() => {
            self.setBgImage();
        }, 150);
    }

    /**
     * Set background image if attribute "data-image" exist
     */
    setBgImage() {
        jQuery("*[data-image]").each(function () {
            let imageUrl = jQuery(this).attr("data-image");

            if (imageUrl) {
                jQuery(this).css("background-image", "url(" + imageUrl + ")");
            }
        });
    }
}
