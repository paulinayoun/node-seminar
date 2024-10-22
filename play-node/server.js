// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));

// HTML 입력 폼
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Saira:ital,wght@0,100..900;1,100..900&display=swap');
                body {
                    font-family: "Saira", sans-serif;
                }
                button {
                    cursor: pointer;
                    font-family: "Saira", sans-serif;
                    padding: 0.54rem;
                    border: 1px solid #179c8a;
                    background-color: #0ab39c;
                    border-radius: 6px;
                    font-weight: bold;                
                    font-size:14px;
                    color: white;
                }
                input {
                    padding: 0.69rem 0.69rem 0.69rem 1.8em;
                    font-weight: bold;
                    cursor: pointer;
                    font-size:14px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    margin-bottom: 0.2em;
                }
                label {
                    display: block;
                    font-family: "Saira", sans-serif;
                }
            </style>
            <title>Sum Calculator</title>
        </head>
        <body>
            <h1>Sum Calculator</h1>
            <form action="/calculate" method="post">
                <label for="number">Enter a number:</label>
                <input type="number" id="number" name="number" min="1" required>
                <button type="submit">Calculate Sum</button>
            </form>
        </body>
        </html>
    `);
});

// 합 계산 및 결과 반환
app.post('/calculate', (req, res) => {
    const number = parseInt(req.body.number);
    if (!isNaN(number) && number > 0) {
        // let total = 0;
        // for (let i = 1; i <= number; i++) {
        //     total += i;
        // }
        const sum = (number * (number + 1)) / 2;
        return res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Saira:ital,wght@0,100..900;1,100..900&display=swap');
                    body {
                        font-family: "Saira", sans-serif;
                    }
                    span {
                        font-family: "Saira", sans-serif;
                    }
                </style>
                <title>Sum Calculator</title>
            </head>
            <body>
                <span>The sum of numbers from 1 to ${number} is: ${sum}</span>
            </body>
            </html>
        
            `);
    } else {
        res.send('Please enter a valid positive number.');
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
