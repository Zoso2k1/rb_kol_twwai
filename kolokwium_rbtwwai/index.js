const http = require('http');
const express = require('express');
const path = require('path');
const { config } = require('./config');

const app = express();
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

const users = [
    { id: 1, name: 'Radek', email: 'radek@onet.pl', password: 'slabehaslo123' },
    { id: 2, name: 'Damian', email: 'damian@wp.pl', password: 'slabszehaslo123' },
];

const chartData = {
    labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
    datasets: [
        {
            data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
            label: "Africa",
            borderColor: "#3e95cd",
            fill: false
        }, {
            data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
            label: "Asia",
            borderColor: "#8e5ea2",
            fill: false
        }, {
            data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
            label: "Europe",
            borderColor: "#3cba9f",
            fill: false
        }, {
            data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
            label: "Latin America",
            borderColor: "#e8c3b9",
            fill: false
        }, {
            data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
            label: "North America",
            borderColor: "#c45850",
            fill: false
        }
    ]
};

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.get('/api/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/continents', (req, res) => {
    res.render('continents', { chartData });
});


const server = http.createServer();
server.on('connection', (socket => {
    console.log('new connection');
}));

server.listen(5037);
console.info('Server is running on port 5037');