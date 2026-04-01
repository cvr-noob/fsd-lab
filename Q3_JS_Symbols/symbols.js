// i. Create a program to demonstrate how Symbols can be used to generate unique IDs for properties in an object to avoid property name conflicts.
const id1 = Symbol("id");
const id2 = Symbol("id");

let user = {
    name: "John",
    [id1]: 101,
    [id2]: 202
};

console.log(user[id1]); // 101
console.log(user[id2]); // 202
console.log(id1 === id2); // false

// ii. Write a program where you use Symbols as keys in an object.
const symKey = Symbol("userID");
let obj = {};
obj[symKey] = 5001;
console.log(obj[symKey]); // 5001
console.log(symKey in obj); // true
console.log(obj.userID); // undefined

// iii. Create a program that uses Symbols to add metadata to an object.
const metaData = Symbol("metadata");
let product = {
    name: "Laptop",
    price: 50000
};
product[metaData] = {
    createdBy: "Admin",
    createdAt: "2026-03-31"
};
console.log(product);
console.log(product[metaData]);
for (let key in product) {
    console.log(key); // only name, price
}

// iv. Write a program that uses Symbol.iterator to create a custom iterable object.
let myCollection = {
    items: [10, 20, 30],
    [Symbol.iterator]: function () {
        let index = 0;
        let data = this.items;
        return {
            next: function () {
                if (index < data.length) {
                    return { value: data[index++], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

for (let value of myCollection) {
    console.log(value);
}
