class RegisterHandler {
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
    init() { }

    /**
     * Handle DOM queries
     */
    handleDOM() {
        this.registerForm = $(".registerForm");
        this.formWrapper = $(".register .content");
        this.errorMessageDiv = $(".error-messages");

        this.phoneInput = $("#phone");
        this.storeInput = $("#store");
        this.receiptInput = $("#receipt");
        this.dateInput = $("#date");
        this.accordAge = $("#accordAge");
        this.accordTerms = $("#accordTerms");
        this.accordRules = $("#accordRules");

        this.info = $(".info-wrapper");
        this.bonImg = $("#receiptModal").find(".receipt-image");
        this.bonImgPop = $(".receipt-img").find(".receipt-image");
        this.infoReceipt = $(".info-receipt");

        this.receiptModal = $("#receiptModal");
        this.closeModal = $(".close-modal");
        this.messageModal = $("#messageModal");
        this.modalWrapper = jQuery(".message-modal .modal-wrapper");
        this.getSelectedState = null;
    }

    /**
     * Listen for events
     */
    handleEvents() {
        let self = this;

        let imagesBon = [
            {
                name: "auchan",
                image: `${absolutePath}/bonuri/Auchan.png`,
            },
            {
                name: "carrefour",
                image: `${absolutePath}/bonuri/Carrefour.png`,
            },
            {
                name: "cora",
                image: `${absolutePath}/bonuri/Cora.png`,
            },
            {
                name: "kaufland",
                image: `${absolutePath}/bonuri/Kaufland.png`,
            },
            {
                name: "mega",
                image: `${absolutePath}/bonuri/Mega-Image.png`,
            },
            {
                name: "metro",
                image: `${absolutePath}/bonuri/Metro.png`,
            },
            {
                name: "penny",
                image: `${absolutePath}/bonuri/Penny.png`,
            },
            {
                name: "profi",
                image: `${absolutePath}/bonuri/Profi.png`,
            },
            {
                name: "selgros",
                image: `${absolutePath}/bonuri/Selgros.png`,
            },
            {
                name: "altele",
                image: `${absolutePath}/bonuri/Kaufland.png`,
            },
            {
                name: "",
                image: `${absolutePath}/bonuri/Kaufland.png`,
            },
        ];

        this.messageModal.on("hidden.bs.modal", function () {
            self.resetModalClass();
        });

        this.closeModal.on("click", function (e) {
            e.preventDefault();

            self.messageModal.modal("hide");
            self.resetModalClass();
        });

        this.infoReceipt.on("click", function (e) {
            e.preventDefault();

            let width = jQuery(window).width();
            if (width >= 1200) {
                $(".receipt-img").addClass("d-block");
            } else {
                self.receiptModal.modal("show");
            }
        });

        this.closeModal.on("click", function (e) {
            e.preventDefault();

            self.receiptModal.modal("hide");
            $(".receipt-img").removeClass("d-block");
        });

        this.storeInput.on("change", function () {
            let option = $(this).val();
            for (let i = 0; i < imagesBon.length; i++) {
                if (option === imagesBon[i].name) {
                    $(".receipt-img").removeClass("d-block");
                    self.bonImg.attr("src", imagesBon[i].image);
                    self.bonImgPop.attr("src", imagesBon[i].image);
                }
            }
        });



        // precampanie – ???
        // startDate - 09 ianuarie 2025, ora 10:00:00
        // endDate - ???
        // postcampanie – ???

        let campaignMaxDate = null;
        let currentDate = Math.floor(Date.now() / 1000);
        // let endCampaignDate = ???; // -- endDate PRODUCTIE
        let endCampaignDate = 1730066399; // -- endDate TESTARE

        if (currentDate <= endCampaignDate) {
            campaignMaxDate = new Date();
        } else {
            // campaignMaxDate = new Date(2025, 10 - 1, 27); // -- endDate PRODUCTIE
            campaignMaxDate = new Date(2025, 1 - 1, 27); // -- endDate TESTARE
        }

        this.dateInput.datepicker({
            monthNames: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"], // set month names
            monthNamesShort: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Noi", "Dec"], // set short month names
            dayNames: ["Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbată"], // set days names
            dayNamesShort: ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâb"], // set short day names
            dayNamesMin: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"], // set more short days names
            dateFormat: "dd/mm/yy",
            // minDate: new Date(2025, 1 - 1, 9), // -- startDate PRODUCTIE
            minDate: new Date(2024, 11 - 1, 16), // -- startDate TESTARE
            maxDate: campaignMaxDate,
            orientation: "bottom",
        });

        this.dateInput.on("change", function (e) {
            $(this).valid();
        });


        if (registerHelper.testEnvironmentHandler()) {
            self.getSelectedState = registerHelper.modalTestEnvironment();
        }

        let digitsOnly = formHelper.validateRegDigitsOnly();
        let phoneRO = formHelper.validateRegPhoneRO();
        let recipeRegex = formHelper.validateRegRecipe();
        this.registerForm.validate({
            rules: {
                phone: {
                    required: true,
                    digitsOnly: true,
                    minlength: 10,
                    maxlength: 10,
                    number: true,
                    phoneRO: true,
                },
                store: {
                    required: true,
                },
                receipt: {
                    required: true,
                    maxlength: 25,
                    recipeRegex: true,
                    number: false,
                    digitsOnly: false,
                    phoneRO: false,
                },
                date: {
                    required: true,
                },
                accordAge: {
                    required: true,
                },
                accordTerms: {
                    required: true,
                },
                accordRules: {
                    required: true,
                },
            },
            messages: {
                phone: {
                    required: "Trebuie să introduci un număr de telefon valid",
                    phoneRO: "Trebuie să introduci un număr de telefon valid",
                    minlength: "Trebuie să introduci un număr de telefon valid",
                    maxlength: "Trebuie să introduci un număr de telefon valid",
                    digitsOnly: "Trebuie să introduci un număr de telefon valid",
                },
                store: {
                    required: "Trebuie să selectezi un magazin",
                },
                receipt: {
                    required: "Trebuie să introduci un număr de bon valid",
                    maxlength: "Trebuie să introduci un număr de bon valid",
                    recipeRegex: "Trebuie să introduci un număr de bon valid",
                },
                date: {
                    required: "Trebuie să introduci data bonului fiscal",
                },
                accordAge: {
                    required: "Trebuie să bifezi că declari că ai peste 18 ani",
                },
                accordTerms: {
                    required: "Trebuie să bifezi că ai citit și că ești de acord cu ”Termenii și condițiile”",
                },
                accordRules: {
                    required: "Trebuie să bifezi că ai citit și că ești de acord cu ”Regulamentul campaniei”",
                },
            },
            errorElement: "span",
            highlight: function (element) {
                $(element).parent().addClass("error");
            },
            unhighlight: function (element) {
                $(element).parent().removeClass("error");
            },
            submitHandler: function (form, event) {
                event.preventDefault();

                if (registerHelper.testEnvironmentHandler()) {
                    self.modalHandler(self.getSelectedState());
                }
                if (!registerHelper.testEnvironmentHandler()) {
                    $.ajax({
                        method: "POST",
                        url: window.endpointForm,
                        data: $(".registerForm").serialize(),
                        cache: false,
                        beforeSend: function () {
                            self.formWrapper.addClass("show-loader");
                            setTimeout(function () {
                                self.formWrapper.removeClass("show-loader");
                            }, 5000);
                        },
                        success: function (response) {
                            if (response.status) {
                                self.resetForm();
                                formHelper.resetRecaptcha();
                            }

                            self.modalHandler(response);
                        },
                        complete: function () {
                            self.formWrapper.removeClass("show-loader");
                            ttq.track('SubmitForm');
                            fbq('track', 'Trimite-Bon');
                        },
                        error: function () {
                            self.errorMessageDiv.html("<p>A intervenit o eroare neprevăzută. Te rugăm să încerci din nou mai târziu.</p>");
                        },
                    });
                }
            },
        });
    }

    modalHandler(modalStatusObj) {
        let self = this;
        let API_MESSAGES = ["recaptcha", "precampanie", "postcampanie", "corect", "dubla", "blocat_corecte", "blocked_correct_last_week"];

        if (API_MESSAGES.includes(modalStatusObj.messageStatus)) {
            self.displayModal(modalStatusObj.messageStatus, modalStatusObj.message, modalStatusObj.isLastWeek);
        } else {
            self.displayModal("error", `<p>A intervenit o eroare neprevăzută. Te rugăm să încerci din nou mai târziu.</p>`);
        }
    }

    displayModal(messageStatus, message, isLastWeek) {
        let currentIcon = `${absolutePath}/modals/${messageStatus}.svg`;
        this.messageModal.addClass(`${messageStatus}`);

        if (messageStatus == "recaptcha" || messageStatus == "precampanie" || messageStatus == "error") {
            currentIcon = `${absolutePath}/modals/corect.svg`;
        }

        if (isLastWeek && messageStatus == "blocat_corecte") {
            currentIcon = `${absolutePath}/modals/blocked_correct_last_week.svg`;
            this.messageModal.addClass(`blocked_correct_last_week`);
        }

        if (messageStatus == "corect") {
            gtag('event', 'conversion', {
                'send_to': 'AW-11033931261/WC_uCJrir74ZEP3bsY0p',
                'value': 1.0,
                'currency': 'RON'
            });
        }

        this.modalWrapper.find(".icon").attr("src", `${currentIcon}`);
        this.modalWrapper.find(".response").html(message);
        this.messageModal.modal("show");
    }

    resetModalClass() {
        setTimeout(() => {
            this.modalWrapper.find(".response").html("");
            this.messageModal.attr("class", "modal fade message-modal");
        }, 100);
    }

    resetForm() {
        this.phoneInput.val("");
        this.storeInput.val("");
        this.receiptInput.val("");
        this.dateInput.val("");
        this.accordAge.prop("checked", false).attr("checked", false);
        this.accordTerms.prop("checked", false).attr("checked", false);
        this.accordRules.prop("checked", false).attr("checked", false);
    }
}
