import React, { useState } from 'react'
import FormField from 'elements/Form'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import Calendar from 'elements/Calendar'

const events = [
  { title: 'Bijay Bohora', start: '2021-06-04', end: '2021-06-04' },
  { title: 'Bijay Bohora', start: '2021-06-02', end: '2021-06-02' },
  { title: 'Bijay Bohora', start: '2021-06-04', end: '2021-06-04' },
  { title: 'Bijay Bohora', start: '2021-06-03', end: '2021-06-03' },
  { title: 'Bijay Bohora', start: '2021-06-03', end: '2021-06-03' },
  { title: 'Shishir Poudel', start: '2019-07-17', end: '2019-07-17' },
  { title: 'Shishir Poudel', start: '2019-07-12', end: '2019-07-12' },
  { title: 'Rosan Nagaju', start: '2019-07-11', end: '2019-07-11' },
  {
    title: 'Rosan Nagaju : First Half',
    start: '2019-07-10T09:00:00',
    end: '2019-07-10T13:30:00',
  },
  {
    title: 'Srijana Kunwar : Second Half',
    start: '2019-07-25T13:30:00',
    end: '2019-07-25T18:00:00',
  },
  {
    title: 'Srijana Kunwar : First Half',
    start: '2019-07-17T09:00:00',
    end: '2019-07-17T13:30:00',
  },
  {
    title: 'Srijana Kunwar : First Half',
    start: '2019-07-18T09:00:00',
    end: '2019-07-18T13:30:00',
  },
  { title: 'Srijana Kunwar', start: '2019-07-26', end: '2019-07-26' },
  { title: 'Urusaa Dangol', start: '2019-07-16', end: '2019-07-16' },
  {
    title: 'Subir Shakya : First Half',
    start: '2019-06-06T09:00:00',
    end: '2019-06-06T13:30:00',
  },
  { title: 'Subir Shakya', start: '2019-06-05', end: '2019-06-05' },
  { title: 'Urusaa Dangol', start: '2019-05-09', end: '2019-05-09' },
  {
    title: 'Urusaa Dangol : First Half',
    start: '2019-05-22T09:00:00',
    end: '2019-05-22T13:30:00',
  },
  { title: 'Urusaa Dangol', start: '2019-05-06', end: '2019-05-06' },
  { title: 'Urusaa Dangol', start: '2019-05-07', end: '2019-05-07' },
  { title: 'Urusaa Dangol', start: '2019-05-08', end: '2019-05-08' },
  { title: 'Urusaa Dangol', start: '2019-05-21', end: '2019-05-21' },
  {
    title: 'Urusaa Dangol : First Half',
    start: '2019-05-20T09:00:00',
    end: '2019-05-20T13:30:00',
  },
  { title: 'Rahul Ck', start: '2019-05-14', end: '2019-05-14' },
  { title: 'Rahul Ck', start: '2019-05-15', end: '2019-05-15' },
  { title: 'Rahul Ck', start: '2019-05-16', end: '2019-05-16' },
  { title: 'Rahul Ck', start: '2019-05-17', end: '2019-05-17' },
  { title: 'Urusaa Dangol', start: '2019-05-01', end: '2019-05-01' },
  { title: 'Urusaa Dangol', start: '2019-05-02', end: '2019-05-02' },
  { title: 'Urusaa Dangol', start: '2019-05-03', end: '2019-05-03' },
  {
    title: 'Urusaa Dangol : Second Half',
    start: '2019-05-15T13:30:00',
    end: '2019-05-15T18:00:00',
  },
  {
    title: 'Urusaa Dangol : First Half',
    start: '2019-05-13T09:00:00',
    end: '2019-05-13T13:30:00',
  },
  { title: 'Urusaa Dangol', start: '2019-05-14', end: '2019-05-14' },
  { title: 'Digamber Pradhan', start: '2019-05-31', end: '2019-05-31' },
  {
    title: 'Srijana Kunwar : Second Half',
    start: '2019-04-23T13:30:00',
    end: '2019-04-23T18:00:00',
  },
  { title: 'Srijana Kunwar', start: '2019-04-26', end: '2019-04-26' },
  { title: 'Srijana Kunwar', start: '2019-04-24', end: '2019-04-24' },
  { title: 'Srijana Kunwar', start: '2019-04-25', end: '2019-04-25' },
  { title: 'Subir Shakya', start: '2019-04-22', end: '2019-04-22' },
  { title: 'Subir Shakya', start: '2019-04-23', end: '2019-04-23' },
  {
    title: 'Prashnna Sapkota : Second Half',
    start: '2019-04-24T13:30:00',
    end: '2019-04-24T18:00:00',
  },
  { title: 'Krishna Pariyar', start: '2019-04-22', end: '2019-04-22' },
  { title: 'Digamber Pradhan', start: '2019-04-18', end: '2019-04-18' },
  { title: 'Srijana Kunwar', start: '2019-04-11', end: '2019-04-11' },
  { title: 'Bharat Thapa', start: '2019-04-23', end: '2019-04-23' },
  { title: 'Bharat Thapa', start: '2019-04-24', end: '2019-04-24' },
  { title: 'Sanjay Kumar Siwa', start: '2019-04-12', end: '2019-04-12' },
  { title: 'Saugat Shakya', start: '2019-04-09', end: '2019-04-09' },
  { title: 'Srijana Kunwar', start: '2019-04-04', end: '2019-04-04' },
  { title: 'Shishir Poudel', start: '2019-04-15', end: '2019-04-15' },
  { title: 'Saugat Shakya', start: '2019-04-03', end: '2019-04-03' },
  { title: 'Urusaa Dangol', start: '2019-04-05', end: '2019-04-05' },
  {
    title: 'Biraj Bajracharya : Second Half',
    start: '2019-04-01T13:30:00',
    end: '2019-04-01T18:00:00',
  },
  {
    title: 'Sudatta Shakya : First Half',
    start: '2019-04-01T09:00:00',
    end: '2019-04-01T13:30:00',
  },
  { title: 'Roniz Shakya', start: '2019-04-01', end: '2019-04-01' },
  { title: 'Digamber Pradhan', start: '2019-03-27', end: '2019-03-27' },
  {
    title: 'Ritesh Shakya : First Half',
    start: '2019-04-01T09:00:00',
    end: '2019-04-01T13:30:00',
  },
  { title: 'Biraj Bajracharya', start: '2019-03-25', end: '2019-03-25' },
  { title: 'Sushila Karmacharya', start: '2019-04-02', end: '2019-04-02' },
  { title: 'Sushila Karmacharya', start: '2019-04-03', end: '2019-04-03' },
  { title: 'Sushila Karmacharya', start: '2019-04-04', end: '2019-04-04' },
  { title: 'Sushila Karmacharya', start: '2019-04-05', end: '2019-04-05' },
  { title: 'Sushila Karmacharya', start: '2019-04-08', end: '2019-04-08' },
  { title: 'Sushila Karmacharya', start: '2019-04-09', end: '2019-04-09' },
  { title: 'Sushila Karmacharya', start: '2019-04-10', end: '2019-04-10' },
  { title: 'Sushila Karmacharya', start: '2019-04-11', end: '2019-04-11' },
  { title: 'Sushila Karmacharya', start: '2019-04-12', end: '2019-04-12' },
  { title: 'Sushila Karmacharya', start: '2019-04-15', end: '2019-04-15' },
  { title: 'Sushila Karmacharya', start: '2019-04-16', end: '2019-04-16' },
  { title: 'Sushila Karmacharya', start: '2019-04-17', end: '2019-04-17' },
  { title: 'Sushila Karmacharya', start: '2019-04-18', end: '2019-04-18' },
  { title: 'Sushila Karmacharya', start: '2019-04-19', end: '2019-04-19' },
  { title: 'Prateekshya Pradhan', start: '2019-04-02', end: '2019-04-02' },
  { title: 'Prateekshya Pradhan', start: '2019-04-03', end: '2019-04-03' },
  { title: 'Prateekshya Pradhan', start: '2019-04-04', end: '2019-04-04' },
  { title: 'Prateekshya Pradhan', start: '2019-04-05', end: '2019-04-05' },
  { title: 'Prateekshya Pradhan', start: '2019-04-08', end: '2019-04-08' },
  { title: 'Prateekshya Pradhan', start: '2019-04-09', end: '2019-04-09' },
  { title: 'Prateekshya Pradhan', start: '2019-04-10', end: '2019-04-10' },
  { title: 'Prateekshya Pradhan', start: '2019-04-11', end: '2019-04-11' },
  { title: 'Prateekshya Pradhan', start: '2019-04-12', end: '2019-04-12' },
  { title: 'Prateekshya Pradhan', start: '2019-04-15', end: '2019-04-15' },
  { title: 'Prateekshya Pradhan', start: '2019-04-16', end: '2019-04-16' },
  { title: 'Prateekshya Pradhan', start: '2019-04-17', end: '2019-04-17' },
  { title: 'Prateekshya Pradhan', start: '2019-04-18', end: '2019-04-18' },
  { title: 'Prateekshya Pradhan', start: '2019-04-19', end: '2019-04-19' },
  { title: '', start: '2019-03-21', end: '2019-03-21' },
  { title: '', start: '2019-03-22', end: '2019-03-22' },
  { title: 'Subir Shakya', start: '2019-03-21', end: '2019-03-21' },
  {
    title: 'Krishna Pariyar : Second Half',
    start: '2019-03-21T13:30:00',
    end: '2019-03-21T18:00:00',
  },
  {
    title: 'Sudatta Shakya : First Half',
    start: '2019-03-18T09:00:00',
    end: '2019-03-18T13:30:00',
  },
  { title: 'Prashnna Sapkota', start: '2019-03-11', end: '2019-03-11' },
  { title: 'Prashnna Sapkota', start: '2019-03-12', end: '2019-03-12' },
  { title: 'Prashnna Sapkota', start: '2019-03-13', end: '2019-03-13' },
  { title: 'Prashnna Sapkota', start: '2019-03-14', end: '2019-03-14' },
  { title: 'Sudatta Shakya', start: '2019-03-12', end: '2019-03-12' },
  {
    title: 'Biraj Bajracharya : Second Half',
    start: '2019-03-14T13:30:00',
    end: '2019-03-14T18:00:00',
  },
  { title: 'Ritesh Shakya', start: '2019-03-21', end: '2019-03-21' },
  { title: 'Ritesh Shakya', start: '2019-03-22', end: '2019-03-22' },
  {
    title: 'Subir Shakya : Second Half',
    start: '2019-03-13T13:30:00',
    end: '2019-03-13T18:00:00',
  },
  { title: 'Srijana Kunwar', start: '2019-03-08', end: '2019-03-08' },
  { title: 'Rahul Ck', start: '2019-03-11', end: '2019-03-11' },
  { title: 'Rahul Ck', start: '2019-03-13', end: '2019-03-13' },
  { title: 'Rahul Ck', start: '2019-03-15', end: '2019-03-15' },
  { title: 'Rahul Ck', start: '2019-03-19', end: '2019-03-19' },
  { title: 'Digamber Pradhan', start: '2019-03-07', end: '2019-03-07' },
  { title: 'Urusaa Dangol', start: '2019-03-01', end: '2019-03-01' },
  { title: 'Urusaa Dangol', start: '2019-03-06', end: '2019-03-06' },
  { title: 'Saugat Shakya', start: '2019-03-06', end: '2019-03-06' },
  { title: 'Mohammad Ali', start: '2019-02-25', end: '2019-02-25' },
  { title: 'Mohammad Ali', start: '2019-02-26', end: '2019-02-26' },
  { title: 'Mohammad Ali', start: '2019-02-27', end: '2019-02-27' },
  { title: 'Mohammad Ali', start: '2019-02-28', end: '2019-02-28' },
  { title: 'Mohammad Ali', start: '2019-03-01', end: '2019-03-01' },
  { title: 'Mohammad Ali', start: '2019-03-05', end: '2019-03-05' },
  { title: 'Mohammad Ali', start: '2019-03-06', end: '2019-03-06' },
  { title: 'Saugat Shakya', start: '2019-03-11', end: '2019-03-11' },
  {
    title: 'Roniz Shakya : Second Half',
    start: '2019-03-08T13:30:00',
    end: '2019-03-08T18:00:00',
  },
  { title: 'Manish Pyatha', start: '2019-03-07', end: '2019-03-07' },
  { title: 'Rosan Nagaju', start: '2019-03-07', end: '2019-03-07' },
  { title: 'Sushila Karmacharya', start: '2019-03-06', end: '2019-03-06' },
  { title: 'Sushila Karmacharya', start: '2019-03-11', end: '2019-03-11' },
  { title: 'Sushila Karmacharya', start: '2019-03-14', end: '2019-03-14' },
  { title: 'Prateekshya Pradhan', start: '2019-03-06', end: '2019-03-06' },
  { title: 'Prateekshya Pradhan', start: '2019-03-11', end: '2019-03-11' },
  { title: 'Prateekshya Pradhan', start: '2019-03-14', end: '2019-03-14' },
  { title: 'Srijana Kunwar', start: '2019-02-28', end: '2019-02-28' },
  { title: 'Bishnu Sunar', start: '2019-03-01', end: '2019-03-01' },
  { title: 'Bishnu Sunar', start: '2019-02-26', end: '2019-02-26' },
  {
    title: 'Urusaa Dangol : Second Half',
    start: '2019-02-27T13:30:00',
    end: '2019-02-27T18:00:00',
  },
  { title: 'Rosan Nagaju', start: '2019-02-28', end: '2019-02-28' },
  { title: 'Manish Pyatha', start: '2019-03-01', end: '2019-03-01' },
  {
    title: 'Rosan Nagaju : Second Half',
    start: '2019-02-25T13:30:00',
    end: '2019-02-25T18:00:00',
  },
  { title: 'Mohammad Ali', start: '2019-02-22', end: '2019-02-22' },
  { title: 'Biraj Bajracharya', start: '2019-02-21', end: '2019-02-21' },
  {
    title: 'Subir Shakya : Second Half',
    start: '2019-02-22T13:30:00',
    end: '2019-02-22T18:00:00',
  },
  {
    title: 'Subir Shakya : First Half',
    start: '2019-02-19T09:00:00',
    end: '2019-02-19T13:30:00',
  },
  { title: 'Rosan Nagaju', start: '2019-02-21', end: '2019-02-21' },
  { title: 'Sujan Nagaju', start: '2019-02-21', end: '2019-02-21' },
  { title: 'Biraj Bajracharya', start: '2019-02-12', end: '2019-02-12' },
  { title: 'Biraj Bajracharya', start: '2019-02-13', end: '2019-02-13' },
  { title: 'Biraj Bajracharya', start: '2019-02-14', end: '2019-02-14' },
  { title: 'Digamber Pradhan', start: '2019-02-12', end: '2019-02-12' },
  { title: 'Digamber Pradhan', start: '2019-02-13', end: '2019-02-13' },
  { title: 'Srijana Kunwar', start: '2019-02-13', end: '2019-02-13' },
  { title: 'Prashnna Sapkota', start: '2019-02-15', end: '2019-02-15' },
  { title: 'Biraj Bajracharya', start: '2019-02-11', end: '2019-02-11' },
  { title: 'Urusaa Dangol', start: '2019-02-13', end: '2019-02-13' },
  {
    title: 'Sudatta Shakya : Second Half',
    start: '2019-02-08T13:30:00',
    end: '2019-02-08T18:00:00',
  },
  { title: 'Subir Shakya', start: '2019-02-14', end: '2019-02-14' },
  {
    title: 'Subir Shakya : Second Half',
    start: '2019-02-11T13:30:00',
    end: '2019-02-11T18:00:00',
  },
  { title: 'Rahul Ck', start: '2019-02-04', end: '2019-02-04' },
  { title: 'Mohammad Ali', start: '2019-01-29', end: '2019-01-29' },
  { title: 'Mohammad Ali', start: '2019-01-30', end: '2019-01-30' },
  { title: 'Mohammad Ali', start: '2019-01-31', end: '2019-01-31' },
  { title: 'Mohammad Ali', start: '2019-02-01', end: '2019-02-01' },
  { title: 'Mohammad Ali', start: '2019-02-04', end: '2019-02-04' },
  { title: 'Mohammad Ali', start: '2019-02-05', end: '2019-02-05' },
  {
    title: 'Biraj Bajracharya : First Half',
    start: '2019-02-04T09:00:00',
    end: '2019-02-04T13:30:00',
  },
  { title: 'Srijana Kunwar', start: '2019-02-04', end: '2019-02-04' },
  { title: 'Prashnna Sapkota', start: '2019-01-31', end: '2019-01-31' },
  { title: 'Krishna Pariyar', start: '2019-01-25', end: '2019-01-25' },
  { title: 'Ritesh Shakya', start: '2019-01-31', end: '2019-01-31' },
  {
    title: 'Urusaa Dangol : Second Half',
    start: '2019-01-29T13:30:00',
    end: '2019-01-29T18:00:00',
  },
  { title: 'Mohammad Ali', start: '2019-01-22', end: '2019-01-22' },
  { title: 'Saugat Shakya', start: '2019-01-28', end: '2019-01-28' },
  { title: '', start: '2019-01-21', end: '2019-01-21' },
  { title: 'Sudatta Shakya', start: '2019-01-25', end: '2019-01-25' },
  { title: 'Urusaa Dangol', start: '2019-01-17', end: '2019-01-17' },
  { title: 'Urusaa Dangol', start: '2019-01-18', end: '2019-01-18' },
  { title: 'Digamber Pradhan', start: '2019-01-16', end: '2019-01-16' },
  { title: 'Digamber Pradhan', start: '2019-01-17', end: '2019-01-17' },
  { title: 'Shishir Poudel', start: '2019-01-21', end: '2019-01-21' },
  { title: 'Mohammad Ali', start: '2019-01-15', end: '2019-01-15' },
  {
    title: 'Prashnna Sapkota : Second Half',
    start: '2019-01-15T13:30:00',
    end: '2019-01-15T18:00:00',
  },
  { title: 'Urusaa Dangol', start: '2018-12-28', end: '2018-12-28' },
  { title: 'Urusaa Dangol', start: '2018-12-31', end: '2018-12-31' },
  { title: 'Urusaa Dangol', start: '2019-01-02', end: '2019-01-02' },
  {
    title: 'Mohammad Ali : First Half',
    start: '2019-01-09T09:00:00',
    end: '2019-01-09T13:30:00',
  },
  {
    title: 'Subir Shakya : Second Half',
    start: '2018-12-28T13:30:00',
    end: '2018-12-28T18:00:00',
  },
  { title: 'Saugat Shakya', start: '2018-12-31', end: '2018-12-31' },
  { title: 'Prashnna Sapkota', start: '2018-12-24', end: '2018-12-24' },
  { title: 'Bishnu Sunar', start: '2018-12-24', end: '2018-12-24' },
  {
    title: 'Prasidhda Malla : Second Half',
    start: '2018-12-18T13:30:00',
    end: '2018-12-18T18:00:00',
  },
  { title: 'Biraj Bajracharya', start: '2018-12-19', end: '2018-12-19' },
  {
    title: ' : First Half',
    start: '2018-12-11T09:00:00',
    end: '2018-12-11T13:30:00',
  },
  { title: '', start: '2018-12-10', end: '2018-12-10' },
  {
    title: 'Sudatta Shakya : First Half',
    start: '2018-12-14T09:00:00',
    end: '2018-12-14T13:30:00',
  },
  { title: 'Urusaa Dangol', start: '2018-12-07', end: '2018-12-07' },
  {
    title: 'Urusaa Dangol : First Half',
    start: '2018-12-06T09:00:00',
    end: '2018-12-06T13:30:00',
  },
  { title: 'Rahul Ck', start: '2018-12-06', end: '2018-12-06' },
  { title: 'Krishna Pariyar', start: '2018-12-12', end: '2018-12-12' },
  { title: 'Krishna Pariyar', start: '2018-12-14', end: '2018-12-14' },
  { title: 'Saugat Shakya', start: '2018-12-13', end: '2018-12-13' },
  { title: 'Roniz Shakya', start: '2018-12-04', end: '2018-12-04' },
  { title: 'Shishir Poudel', start: '2018-12-03', end: '2018-12-03' },
  {
    title: 'Roniz Shakya : Second Half',
    start: '2018-12-03T13:30:00',
    end: '2018-12-03T18:00:00',
  },
  { title: 'Urusaa Dangol', start: '2018-11-29', end: '2018-11-29' },
  { title: 'Bishnu Sunar', start: '2018-11-30', end: '2018-11-30' },
  { title: 'Prashnna Sapkota', start: '2018-11-28', end: '2018-11-28' },
  { title: 'Rosan Nagaju', start: '2018-11-23', end: '2018-11-23' },
  { title: 'Urusaa Dangol', start: '2018-11-26', end: '2018-11-26' },
  { title: 'Prashnna Sapkota', start: '2018-11-27', end: '2018-11-27' },
  { title: 'Digamber Pradhan', start: '2018-11-19', end: '2018-11-19' },
  { title: 'Prasidhda Malla', start: '2018-11-20', end: '2018-11-20' },
  {
    title: 'Srijana Kunwar : First Half',
    start: '2018-11-19T09:00:00',
    end: '2018-11-19T13:30:00',
  },
  {
    title: 'Subir Shakya : First Half',
    start: '2018-11-20T09:00:00',
    end: '2018-11-20T13:30:00',
  },
  { title: 'Ritesh Shakya', start: '2018-11-21', end: '2018-11-21' },
  { title: 'Ranjan Vilakhe', start: '2018-11-20', end: '2018-11-20' },
  { title: 'Roniz Shakya', start: '2018-12-10', end: '2018-12-10' },
  { title: 'Roniz Shakya', start: '2018-12-11', end: '2018-12-11' },
  { title: 'Roniz Shakya', start: '2018-12-12', end: '2018-12-12' },
  { title: 'Roniz Shakya', start: '2018-12-13', end: '2018-12-13' },
  { title: 'Roniz Shakya', start: '2018-12-14', end: '2018-12-14' },
  { title: 'Aishan Shrestha', start: '2018-11-12', end: '2018-11-12' },
  { title: 'Aishan Shrestha', start: '2018-11-13', end: '2018-11-13' },
  { title: 'Aishan Shrestha', start: '2018-11-14', end: '2018-11-14' },
  { title: 'Aishan Shrestha', start: '2018-11-15', end: '2018-11-15' },
  { title: 'Prasidhda Malla', start: '2018-11-12', end: '2018-11-12' },
  { title: 'Mohammad Ali', start: '2018-11-12', end: '2018-11-12' },
  { title: 'Bishnu Sunar', start: '2018-11-23', end: '2018-11-23' },
  {
    title: 'Subir Shakya : Second Half',
    start: '2018-11-19T13:30:00',
    end: '2018-11-19T18:00:00',
  },
  { title: 'Manish Pyatha', start: '2018-11-22', end: '2018-11-22' },
  { title: 'Manish Pyatha', start: '2018-11-23', end: '2018-11-23' },
  {
    title: 'Sudatta Shakya : First Half',
    start: '2018-11-16T09:00:00',
    end: '2018-11-16T13:30:00',
  },
  { title: 'Rosan Nagaju', start: '2018-11-16', end: '2018-11-16' },
  {
    title: 'Prashnna Sapkota : First Half',
    start: '2018-11-12T09:00:00',
    end: '2018-11-12T13:30:00',
  },
  { title: 'Prashnna Sapkota', start: '2018-11-05', end: '2018-11-05' },
  {
    title: 'Sudatta Shakya : First Half',
    start: '2018-11-06T09:00:00',
    end: '2018-11-06T13:30:00',
  },
  { title: 'Shishir Poudel', start: '2018-11-12', end: '2018-11-12' },
  { title: 'Urusaa Dangol', start: '2018-11-19', end: '2018-11-19' },
  { title: 'Urusaa Dangol', start: '2018-11-20', end: '2018-11-20' },
  { title: 'Urusaa Dangol', start: '2018-11-21', end: '2018-11-21' },
  { title: 'Urusaa Dangol', start: '2018-11-22', end: '2018-11-22' },
  { title: 'Urusaa Dangol', start: '2018-11-23', end: '2018-11-23' },
  { title: 'Subir Shakya', start: '2018-10-26', end: '2018-10-26' },
  { title: '', start: '2018-10-15', end: '2018-10-15' },
  { title: 'Rahul Ck', start: '2018-10-15', end: '2018-10-15' },
  { title: 'Manish Pyatha', start: '2018-10-22', end: '2018-10-22' },
  { title: 'Manish Pyatha', start: '2018-10-23', end: '2018-10-23' },
  { title: 'Manish Pyatha', start: '2018-10-24', end: '2018-10-24' },
  { title: 'Ritesh Shakya', start: '2018-10-22', end: '2018-10-22' },
  { title: 'Ritesh Shakya', start: '2018-10-23', end: '2018-10-23' },
  { title: 'Ritesh Shakya', start: '2018-10-24', end: '2018-10-24' },
  { title: 'Ritesh Shakya', start: '2018-10-25', end: '2018-10-25' },
  { title: 'Ritesh Shakya', start: '2018-10-26', end: '2018-10-26' },
  { title: 'Prashnna Sapkota', start: '2018-10-15', end: '2018-10-15' },
  { title: 'Bishnu Sunar', start: '2018-10-15', end: '2018-10-15' },
  { title: 'Prasidhda Malla', start: '2018-10-22', end: '2018-10-22' },
  { title: 'Urusaa Dangol', start: '2018-10-15', end: '2018-10-15' },
  { title: 'Prashnna Sapkota', start: '2018-10-02', end: '2018-10-02' },
  {
    title: 'Biraj Bajracharya : First Half',
    start: '2018-10-03T09:00:00',
    end: '2018-10-03T13:30:00',
  },
  { title: 'Prashnna Sapkota', start: '2018-10-01', end: '2018-10-01' },
  { title: 'Sujan Nagaju', start: '2018-10-02', end: '2018-10-02' },
  { title: 'Shishir Poudel', start: '2018-10-15', end: '2018-10-15' },
  { title: 'Biraj Bajracharya', start: '2018-09-25', end: '2018-09-25' },
  {
    title: 'Srijana Kunwar : First Half',
    start: '2018-09-26T09:00:00',
    end: '2018-09-26T13:30:00',
  },
  { title: 'Digamber Pradhan', start: '2018-09-24', end: '2018-09-24' },
  {
    title: 'Prasidhda Malla : Second Half',
    start: '2018-09-28T13:30:00',
    end: '2018-09-28T18:00:00',
  },
  { title: 'Ritesh Shakya', start: '2018-10-01', end: '2018-10-01' },
  {
    title: 'Biraj Bajracharya : Second Half',
    start: '2018-09-24T13:30:00',
    end: '2018-09-24T18:00:00',
  },
  {
    title: 'Shishir Poudel : Second Half',
    start: '2018-09-18T13:30:00',
    end: '2018-09-18T18:00:00',
  },
  { title: 'Krishna Pariyar', start: '2018-09-14', end: '2018-09-14' },
  { title: 'Ritesh Shakya', start: '2018-09-14', end: '2018-09-14' },
  { title: 'Mohammad Ali', start: '2018-09-10', end: '2018-09-10' },
  { title: 'Urusaa Dangol', start: '2018-09-06', end: '2018-09-06' },
  { title: 'Subir Shakya', start: '2018-08-31', end: '2018-08-31' },
  {
    title: 'Srijana Kunwar : Second Half',
    start: '2018-08-28T13:30:00',
    end: '2018-08-28T18:00:00',
  },
  { title: 'Rosan Nagaju', start: '2018-08-27', end: '2018-08-27' },
  { title: 'Ranjan Vilakhe', start: '2018-08-27', end: '2018-08-27' },
  { title: 'Manish Pyatha', start: '2018-08-27', end: '2018-08-27' },
  {
    title: 'Ranjan Vilakhe : First Half',
    start: '2018-08-21T09:00:00',
    end: '2018-08-21T13:30:00',
  },
  {
    title: 'Manish Pyatha : Second Half',
    start: '2018-08-22T13:30:00',
    end: '2018-08-22T18:00:00',
  },
  { title: 'Rahul Ck', start: '2018-08-21', end: '2018-08-21' },
  { title: 'Rahul Ck', start: '2018-08-22', end: '2018-08-22' },
  { title: 'Prashnna Sapkota', start: '2018-08-20', end: '2018-08-20' },
  { title: 'Mohammad Ali', start: '2018-08-21', end: '2018-08-21' },
  { title: 'Mohammad Ali', start: '2018-08-22', end: '2018-08-22' },
  { title: 'Mohammad Ali', start: '2018-08-23', end: '2018-08-23' },
  { title: 'Manish Pyatha', start: '2018-08-14', end: '2018-08-14' },
  { title: 'Manish Pyatha', start: '2018-08-15', end: '2018-08-15' },
  { title: 'Manish Pyatha', start: '2018-08-16', end: '2018-08-16' },
  {
    title: 'Digamber Pradhan : First Half',
    start: '2018-08-15T09:00:00',
    end: '2018-08-15T13:30:00',
  },
  { title: 'Biraj Bajracharya', start: '2018-08-10', end: '2018-08-10' },
  { title: '', start: '2018-08-03', end: '2018-08-03' },
  { title: '', start: '2018-08-06', end: '2018-08-06' },
  { title: '', start: '2018-08-07', end: '2018-08-07' },
  {
    title: 'Digamber Pradhan : First Half',
    start: '2018-08-14T09:00:00',
    end: '2018-08-14T13:30:00',
  },
  { title: 'Mohammad Ali', start: '2018-08-07', end: '2018-08-07' },
  { title: 'Srijana Kunwar', start: '2018-08-07', end: '2018-08-07' },
  { title: 'Subir Shakya', start: '2018-08-06', end: '2018-08-06' },
  { title: 'Mohammad Ali', start: '2018-08-06', end: '2018-08-06' },
  { title: 'Manish Pyatha', start: '2018-07-30', end: '2018-07-30' },
  {
    title: 'Sudatta Shakya : First Half',
    start: '2018-07-27T09:00:00',
    end: '2018-07-27T13:30:00',
  },
  {
    title: 'Digamber Pradhan : First Half',
    start: '2018-07-25T09:00:00',
    end: '2018-07-25T13:30:00',
  },
  { title: 'Digamber Pradhan', start: '2018-07-23', end: '2018-07-23' },
  { title: 'Rosan Nagaju', start: '2018-07-23', end: '2018-07-23' },
  { title: 'Urusaa Dangol', start: '2018-07-20', end: '2018-07-20' },
  { title: 'Ritesh Shakya', start: '2018-07-20', end: '2018-07-20' },
  {
    title: 'Aishan Shrestha : First Half',
    start: '2018-07-19T09:00:00',
    end: '2018-07-19T13:30:00',
  },
  { title: 'Digamber Pradhan', start: '2018-07-16', end: '2018-07-16' },
]

function Test() {
  const [input, setInput] = useState('')
  const onChnage = (e) => {
    console.log(e)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Ashok Component Test</h3>
      <div>
        <h4>Calendar component</h4>
        <div
          style={{
            height: '80vh',
            width: '80%',
            margin: 'auto',
          }}
        >
          <Calendar events={events} />
        </div>
      </div>
      <div>
        <h4>InputField Component</h4>
        <FormField
          component="InputField"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <FormField
          component="InputField"
          placeholder="enter something"
          size="large"
          backgroundColor="green"
          textColor="red"
          width="30rem"
          borderRadius="6px"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div>
        <h4>DatePicker Component</h4>
        {/* <FormField component="DatePicker" /> */}
        <FormField component="DatePicker" size="large" onChange={onChnage} />
        {/* <FormField
          component="DatePicker"
          size="large"
          isRange
          onChange={onChnage}
        /> */}
      </div>
      <div>
        <h4>MultiSelectCalendar Component</h4>
        <div>
          <FormField
            component="MultiSelectCalendar"
            plugins={[<DatePanel />]}
            multiple
          />
        </div>
        <div>
          <h4>TextAreaField Component</h4>
          <FormField component="TextAreaField" size="small" />
          <FormField
            component="TextAreaField"
            rows={10}
            width="30%"
            allowClear
          />
        </div>
      </div>
    </div>
  )
}

export default Test
