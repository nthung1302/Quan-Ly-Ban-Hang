const expresss = require('express');
const cors = require('cors');
const app = expresss();
app.use(expresss.json());
app.use(cors());

app.post('/api/v1/login', (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt:", username, password);
    if (username === 'admin' && password === '123') {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
    }
)