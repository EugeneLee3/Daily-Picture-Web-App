//still needs work, does not function as designed

//
const validator = require('validator');

//
async function validateEmail(email) {
    if (validator.isEmail(email, {require_display_name: false, domain_specific_validation: true}) === true) {
        return true;
    } else {
        return false;
    }
}


//
module.exports = { validateEmail };