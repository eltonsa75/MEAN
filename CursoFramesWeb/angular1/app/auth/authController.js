(function() {

    angular.module('primeiraApp').controller('AuthCtrl', [
        '$location',
        'msgs',
        'auth',
        AuthController
    ])

    function AuthController($location, msgs, auth) {
        const vm = this

        vm.loginMode = true

        vm.changeMode = () => vm.loginMode = !vm.loginMode

        vm.login = () => {
            auth.login(vm.user, err => err ? msgs.addError(err) : msgs.addSucess('Sucesso!'))
        }

        vm.signup = () => {
            auth.signup(vm.user, err => err ? msgs.addError(err) : msgs.addSucess('Sucesso!'))
        }

        vm.getUser = () => auth.getUser()

        vm.logout = () => {
            auth.logout(() => msgs.addSucess('Sucesso!'))
        }
    }
})()