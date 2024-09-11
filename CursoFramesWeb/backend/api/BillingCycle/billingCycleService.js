const billingCycle = require('./billingCycle')
const BillingCycle = require('./billingCycle')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
billingCycle.updateOptions({new: true, runValidators: true})

module.exports = BillingCycle