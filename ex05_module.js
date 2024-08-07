console.log(global === this) // False
console.log(module === this) // False
console.log(module.exports == this) // True

this.digaOi = function () {
    console.log('Oi!!!')
}