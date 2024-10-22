const sum = (number * (number + 1)) / 2; // 합 공식 사용
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