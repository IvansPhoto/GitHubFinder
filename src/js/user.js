export default class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
 export function printName(user) {
	 console.log(`Name is ${user.name}`)
 }
 export function printAge(user) {
	 console.log(`Name is ${user.age}`)
 }