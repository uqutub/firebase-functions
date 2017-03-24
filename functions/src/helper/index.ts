import * as functions from 'firebase-functions';
import { Request, Response } from 'express';

let handleContentType = (req: Request) => {
    return new Promise(res => {
        switch (req.get('content-type')) {
            case 'text/plain':
            case 'application/json':
            case 'application/x-www-form-urlencoded':
                res(req.body);
                break;

            case 'application/octet-stream':
                res(req.body.toString()); // Convert buffer to a string
                break;

            default:
                res(null);
                break;
        }
    });
}

let http: {
    get: (cb: (req: Request, res: Response) => void) => void,
    post: (cb: (req: Request, res: Response, data: any) => void) => void,
    put: (cb: (req: Request, res: Response, data: any) => void) => void,
    delete: (cb: (req: Request, res: Response) => void) => void
} = <any>{};

http.get = (cb) => {
    return functions.https.onRequest((request: Request, response: Response) => {
        if (request.method == 'GET') {
            cb(request, response);
        } else {
            response.status(500).send({ error: 'Something blew up!' });
        }
    });
};
http.post = (cb) => {
    return functions.https.onRequest((request: Request, response: Response) => {
        if (request.method == 'POST') {
            handleContentType(request).then(data => {
                cb(request, response, data);
            });
        } else {
            response.status(500).send({ error: 'Something blew up!' });
        }
    });
};
http.put = (cb) => {
    return functions.https.onRequest((request: Request, response: Response) => {
        if (request.method == 'PUT') {
            handleContentType(request).then(data => {
                cb(request, response, data);
            });
        } else {
            response.status(500).send({ error: 'Something blew up!' });
        }
    });
};
http.delete = (cb) => {
    return functions.https.onRequest((request: Request, response: Response) => {
        if (request.method == 'DELETE') {
            cb(request, response);
        } else {
            response.status(500).send({ error: 'Something blew up!' });
        }
    });
};

export {
    http
};