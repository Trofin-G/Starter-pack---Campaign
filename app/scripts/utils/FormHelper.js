class FormHelper {

    resetRecaptcha() {
        setTimeout(function () {
            grecaptcha.reset();
        }, 500);
    }

    validateRegDigitsOnly() {
        $.validator.addMethod(
            "digitsOnly",
            function (value, element) {
                return this.optional(element) || /^[0-9+]+$/g.test(value);
            },
            ""
        );
    }

    validateRegPhoneRO() {
        $.validator.addMethod(
            "phoneRO",
            function (phone_number, element) {
                phone_number = phone_number.replace(/\(|\)|\s+|-/g, "");
                return (
                    this.optional(element) ||
                    (phone_number.length > 9 &&
                        phone_number.match(
                            /^(?:(?:07\d{2}\S?\d{3}\S?\d{3}|(21|31)\d{1}\S?\d{3}\S?\d{3}|((2|3)[3-7]\d{1})\S?\d{3}\S?\d{3}|(8|9)0\d{1}\S?\d{3}\S?\d{3}))$/
                        ))
                );
            },
            ""
        );

    }

    validateRegRecipe() {
        $.validator.addMethod(
            "recipeRegex",
            function (value, element) {
                return this.optional(element) || /^(?![\s-0]*$)\d{1,25}(?:[\s-]\d{1,25})*$/g.test(value);
            },
            ""
        );
    }
}