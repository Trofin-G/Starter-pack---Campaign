class RegisterHelper {
    constructor() {
        if (jQuery(".register").length === 0) {
            return;
        }

        this.init();
        this.handleDOM();
        this.handleEvents();
    }

    /**
     * Declare global variables
     */
    init() {
        this.testEnvironment = true; // true pentru TESTARE - false pentru PRODUCTIE

        this.modalStates = {
            recaptcha: {
                messageStatus: "recaptcha",
                message: "<p>Nu uita să bifezi recaptcha!</p>",
                isLastWeek: false,
            },

            precampanie: {
                messageStatus: "precampanie",
                message: "<p>Precampanie</p>",
                isLastWeek: false,
            },

            postcampanie: {
                messageStatus: "postcampanie",
                message:
                    "<p>Campania „Găsește-ți inspirație la început de an” s-a încheiat pe data de 19.02.2025. Îți mulțumim pentru participare și te așteptăm la următoarele campanii!</p>",
                isLastWeek: false,
            },

            corect: {
                messageStatus: "corect",
                message:
                    "<p>Felicitări! Ai reușit să te înscrii în campanie! Pentru a avea mai multe șanse de câștig, poți înregistra până la zece bonuri fiscale pe săptămână de campanie. Nu uita să păstrezi bonul fiscal pentru validare! <br /> Îți ținem pumnii!</p>",
                isLastWeek: false,
            },

            dubla: {
                messageStatus: "dubla",
                message: "<p>Acest număr de bon fiscal a mai fost înscris în campanie. Pentru a putea participa, te rugăm să introduci alt bon fiscal.</p>",
                isLastWeek: false,
            },

            blocat_corecte: {
                messageStatus: "blocat_corecte",
                message:
                    "<p>Campania „Găsește-ți inspirație la început de an” continuă și săptămâna viitoare. Se pare că ai atins pragul de maximum zece înscrieri pentru această săptămână de campanie. Te așteptăm săptămâna viitoare pentru noi înscrieri!</p>",
                isLastWeek: false,
            },

            blocked_correct_last_week: {
                messageStatus: "blocked_correct_last_week",
                message:
                    "<p>Se pare că ai atins pragul de maximum zece înscrieri pentru această săptămână de campanie. Ne aflăm și în ultima săptămână a campaniei „Găsește-ți inspirație la început de an”. Îți mulțumim pentru participare! Verifică rezultatul tragerii la sorți și vezi dacă ai câștigat.</p>",
                isLastWeek: true,
            },
        };

        if (this.testEnvironment) {
            document.querySelector(".registerForm").insertAdjacentHTML(
                "beforeend",
                `<div class="group select modalStateSelect">
                    <label for="modalState">Modal State</label>
                    <select name="modalState" id="modalState">
                        <option value="" disabled selected hidden>Select state</option>
                        ${Object.entries(this.modalStates)
                            .map(([key, state]) => `<option value="${key}">${key}</option>`)
                            .join("")}
                    </select>
                </div>`
            );
        }
    }

    /**
     * Handle DOM queries
     */
    handleDOM() {
        this.valueSelected = document.querySelector(".modalStateSelect select");
    }

    /**
     * Listen for events
     */ 
    handleEvents() {
        let self = this;
    }

    modalTestEnvironment() {
        let self = this;
        let selectedState = {};

        this.valueSelected.addEventListener("change", function (e) {
            Object.entries(self.modalStates).forEach(([key, state]) => {
                if (key === e.target.value) {
                    selectedState = { ...state };
                }
            });
        });

        return () => selectedState;
    }

    testEnvironmentHandler() {
        return this.testEnvironment;
    }
}
