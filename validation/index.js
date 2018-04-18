
const validators = {
    'req': e => e != null && e,
    'pos': e => { return e && parseInt(e) > 0 },
    'zpos': e => { console.log('zpos', e); return e !== '' && parseInt(e) >= 0 },
    'gt': (e, t) => { return e && parseFloat(e) > parseFloat(t) },
    'lt': (e, t) => { return e && parseFloat(e) < parseFloat(t) },
    'date': (e) => { return !!(new Date(e) !== "Invalid Date") && !isNaN(new Date(e)) }
}

export default {
    validate: (rules, val, vargs) => {
        let errors = [];
        let hasErrors = false;
        let self = this;
        let args = !vargs ? [val] : [val].concat(vargs);

        if (!rules instanceof Array) {
            if (!validators[rules].apply(this, args)) {
                errors.push(rules);
            }
            return errors;
        }

        [].forEach.call(rules, r => {
            if (!validators.hasOwnProperty(r)) {
                return;
            }

            if (!validators[r].apply(this, args)) {
                errors.push(r);
            }
        });
        
        return errors;
    }
}