const { data } = require('./data.js');
const uuidv4 = require('uuid/v4');
const moment = require('moment');

function getJobs() {
    return data.slice(0, data.length).filter(item => {
        if(moment(item.enddate, 'YYYY-MM-DD').diff(moment(new Date()), 'days') <= 5) {
            item['expiring'] = true;
        }
        return moment(item.enddate, 'YYYY-MM-DD').isSameOrAfter(moment(new Date()), 'day')
    });
}

function findJobById(id) {
    return data.find(item => item.id === id);
}

function createJob(jobData) {
    const created = new Date();
    jobData['created'] = created;
    jobData['id'] = uuidv4();
    data.push(jobData);
    return jobData;
}

module.exports = { getJobs, createJob, findJobById };