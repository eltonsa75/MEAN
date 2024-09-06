const { upperCase, min } = require('lodash')
const restful = require('node-restful')
const mongoose = restful.mongoose

// Mapeamento do Credito
const creditSchema = new mongoose.schema({
    name: {type: String, require: true},
    value: {type: Number, min: 0, require: true}
})

//Mapeamento do Debito 
const debtSchema = new mongoose.schema({
    name: {type: String, require: true},
    value: {type: Number, require: true},
    status: {type: String, require: false, upperCase: true,
    enum: ['PAGO', 'PENDENTE', 'AGENDADO']}
})

const billingCycleSchema = new mongoose.schema({
    name: {type: String, require: true},
    month: {type: Number, min: 1, max: 12, require: true},
    year: {type: Number, min: 1970, max: 2100, require: true },
    credits: [creditSchema],
    debts: [debtSchema]
})

module.exports = restful.model('BillingCycle', billingCycleSchema)