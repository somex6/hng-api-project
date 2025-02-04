
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "\*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

app.get('/api/classify-number', async (req, res) => {
    const num = req.query.number;
    if (!/^-?\d+$/.test(num)) {
        return res.status(400).json({ number: "alphabet", error: true });
    }

    const number = parseInt(num);
    const properties = getMathProperties(number);
    const funFact = await getFunFact(number);

    res.json({
        number: number,
        is_prime: properties.isPrime,
        is_perfect: properties.isPerfect,
        properties: properties.types,
        digit_sum: getDigitSum(number),
        fun_fact: funFact
    });
});

function getMathProperties(n) {
    const isPrimeNumber = isPrime(n);
    const isPerfectNumber = isPerfect(n);
    const types = [];

    if (n % 2 !== 0) types.push("odd");
    if (n % 2 === 0) types.push("even");
    if (isPrimeNumber) types.push("prime");
    if (isPerfectNumber) types.push("perfect");
    if (n >= 10 && isArmstrong(n)) types.push("armstrong");

    return {
        isPrime: isPrimeNumber,
        isPerfect: isPerfectNumber,
        types
    };
}

function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function isPerfect(n) {
    let sum = 1;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            sum += i + (i === n / i ? 0 : n / i);
        }
    }
    return sum === n && n !== 1;
}

function isArmstrong(n) {
    const digits = n.toString().split('').map(Number);
    const power = digits.length;
    return digits.reduce((sum, d) => sum + Math.pow(d, power), 0) === n;
}

function getDigitSum(n) {
    return n.toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
}

async function getFunFact(n) {
    try {
        const response = await axios.get(`http://numbersapi.com/${n}`);
        return response.data;
    } catch (error) {
        return `Could not fetch a fun fact for ${n}.`;
    }
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
