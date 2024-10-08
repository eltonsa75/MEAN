(function() {
    angular.module('primeiraApp').controller('BillingCycleCtrl', [
        '$http',
        '$location',
        'msgs',
        'tabs',
        BillingCycleController
    ])

    function BillingCycleController($http, $location, msgs, tabs,) {
        const vm = this
        const url = 'http://localhost:3003/api/billingCycles'

        vm.refresh = function() {
            // Criando a páginação da plataforma
            const page = parseInt($location.search().page) || 1
            $http.get(`${url}?skip=${(page - 1) * 10}&limit=10`).then(function (response) {
                vm.billingCycle = {credits: [{}], debts: [{}]}
                vm.billingCycles = response.data
                vm.calculateValues()
                
                // Metodo que calcula a páginação
                $http.get(`${url}/count`).then(function(response) {
                    vm.pages = Math.ceil(response.data.value / 3)
                    tabs.show(vm, {tabList: true, tabCreate: true})
                    
                })
            })
        }

        vm.create = function(){           
            $http.post(url, vm.billingCycle)
            .then(function (response) {
                vm.billingCycle = {}
                vm.refresh();
                    msgs.addSuccess('Operação realizada com sucesso!');
                })
                .catch(function(response) { // Alterado de .error para .catch
                    msgs.addError(response.data.errors || 'Ocorreu um erro na operação.')
                })
        }



        vm.showTabUpdate = function(billingCycle) {
            vm.billingCycle = billingCycle
            vm.calculateValues()
            tabs.show(vm, {tabUpdate: true})
        }

        vm.showTabDelete = function(billingCycle) {
            vm.billingCycle = billingCycle
            vm.calculateValues()
            tabs.show(vm, {tabDelete: true})
        }

        vm.update = function() {
            const updateUrl = `${url}/${vm.billingCycle._id}`; // Ajuste na string template
            $http.put(updateUrl, vm.billingCycle)
                .then(function(response) {
                    vm.refresh();
                    msgs.addSuccess('Operação realizada com sucesso!');
                })
                .catch(function(response) { // Alterado de .error para .catch
                    msgs.addError(response.data.errors || 'Ocorreu um erro na operação.')
                })
        }

        vm.delete = function() {
            const deleteUrl = `${url}/${vm.billingCycle._id}`
            $http.delete(deleteUrl, vm.billingCycle)
            .then(function(response) {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
            })
            .catch(function(response) {
                msgs.addError(response.data.errors || 'Ocorreu um erro na operação.')
            })
        }

        vm.addCredit = function(index) {
            vm.billingCycle.credits.splice(index + 1, 0, {})
        }

        vm.cloneCredit = function(index, {name, value}) {
            vm.billingCycle.credits.splice(index + 1, 0, {name, value})
            vm.calculateValues()
        }

        vm.deleteCredit = function(index) {
            if(vm.billingCycle.credits.length > 1) {
                vm.billingCycle.credits.splice(index, 1)
                vm.calculateValues()
            }
        }

        vm.addDebt = function(index) {
            vm.billingCycle.debts.splice(index + 1, 0, {})
        }

        vm.cloneDebt = function(index, {name, value, status}) {
            vm.billingCycle.debts.splice(index + 1, 0, {name, value, status})
            vm.calculateValues()
        }

        vm.deleteDebt = function(index) {
            if(vm.billingCycle.debts.length > 1) {
                vm.billingCycle.debts.splice(index, 1)
                vm.calculateValues()
            }
        }

        vm.calculateValues = function() {
            vm.credit = 0
            vm.debt = 0

            if(vm.billingCycle) {
                vm.billingCycle.credits.forEach(function({value}) {
                    vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)
                })

                vm.billingCycle.debts.forEach(function({value}) {
                    vm.debt += !value || isNaN(value) ? 0 : parseFloat(value)
                })
            }

            vm.total = vm.credit - vm.debt
        }



        vm.refresh()
    }
    })()
