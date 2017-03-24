import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import { Event } from 'firebase-functions';
import { Request, Response } from 'express';

import { http } from './helper';

// intialize admin
admin.initializeApp(functions.config().firebase);

export let helloWorld = functions.https.onRequest((request: Request, response: Response) => {
    response.json({ 'Firebase': "Hello from Firebase!" });
});

export let helloGet = http.get((req, res) => {
    res.json({ 'Get Method': "Yahoo Working....!" });
});

export let helloPost = http.post((req, res, data) => {
    res.json({ 'POST Method': data });
});

export let helloPut = http.put((req, res, data) => {
    res.json({ 'Put Method': data });
});

export let helloDelete = http.delete((req, res) => {
    res.json({ 'Delete Method': 'Working...' });
});