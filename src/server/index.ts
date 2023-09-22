import express from 'express';

const app = express();
const port = 4001;

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});