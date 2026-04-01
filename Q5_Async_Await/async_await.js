// Function that returns a Promise
function findAbsolute(n) {
    return new Promise((resolve, reject) => {
        if (n >= 0) {
            resolve("Absolute value!!");
        } else {
            reject("Invalid");
        }
    });
}

// Async function
async function findResult(n) {
    try {
        const result = await findAbsolute(n); // wait for promise
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

// Input (you can change value)
findResult(10);   // Absolute value!!
findResult(-5);   // Invalid
