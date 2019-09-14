const express = require('express')
const cors = require('cors');
const { getJobs, createJob, findJobById } = require('./controller');

const app = express()

app.use(cors());
app.use(express.json())
const port = 3000

app.get('/jobs', (req, res) => {
    const jobs = getJobs();
    const jobsData = {'data': jobs, 'len': jobs.length};
    res.json(jobsData); 
});

app.get('/jobs/:id', (req, res) => {
    const id = req.params.id;
    const job = findJobById(id);
    if(job !== null && job !== undefined) {
        res.json(job);
    } else {
        res.sendStatus(404);
    }
});

app.post('/jobs', (req, res) => {
    const jobData = req.body;
    const job = createJob(jobData);
    res.status(201).json(job);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))