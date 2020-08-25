import { Request, Response } from 'express';
import redis = require('redis');

export const client = redis.createClient(process.env.REDIS_PORT);

export function getUserFromCache(req: Request, res: Response, next: Function) {
    const { id } = req.params;
    client.get(id, (err, data) => {
        if (err) throw err;
        if(data) res.send(JSON.parse(data));
        else next();
    });
}

export function getUsersFromCache(req: Request, res: Response, next: Function) {
    client.keys('*', (err, keys) => {
        if(err) res.send(err.message);
        if(keys){
            Promise.all(keys.map(key => {
                return new Promise((resolve, rejects) => {
                    client.get(key, (err, data) => {
                        if(err) rejects(err);
                        resolve(JSON.parse(data))
                    });
                })

            })).then(data => {
                res.send(data)
            }).catch(err => {
                res.send(err.message)
            });

        } else next();
    })
}
