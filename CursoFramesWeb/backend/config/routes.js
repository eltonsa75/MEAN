const express = require('express')
const auth = require('./auth')

module.exports = function(server) {

    /*
    * rotas Abertas
    */

    const openAi = express.Router()
    server.user('/opai', openAi)

    const AuthService = require('../api/user/authService')
    openAi.post('/login', AuthService.login)
    openAi.post('/signup', AuthService.signup)
    openAi.post('/validateToken', AuthService.validateToken)

    /*
    * Rotas protegidas por Token JWT
    */

    const protectdApi = express.Router()
    server.use('/api', protectdApi)

    protectdApi.use(auth)    
   

    // rotas da API
    const billingCycleService = require('../api/billingCycle/billingCycleService')
    billingCycleService.register(router, '/billingCycles')

    const billingSummaryService = require('../api/billingSummary/billingSummaryService')
    router.route('/billingSummary').get(billingSummaryService.getSummary)
}