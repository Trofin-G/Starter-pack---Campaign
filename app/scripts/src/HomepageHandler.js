class HomepageHandler {
    constructor() {
        if (jQuery(".homepage").length === 0) {
            return;
        }

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
    }
}
