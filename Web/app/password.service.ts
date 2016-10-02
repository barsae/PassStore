import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Password } from './password'

// TODO: not sure if abstract class is best practice here
export abstract class IPasswordService {
    abstract getPasswords(): Promise<Array<Password>>;
    abstract addPassword(password: Password): Promise<number>;
    abstract removePassword(id: number): Promise<void>;
}

@Injectable()
export class MemoryPasswordService extends IPasswordService {
    private passwords: Array<Password> = [{
        PasswordId: 1,
        Description: 'Test Password',
        PasswordText: 't3stp@55word',
        UserName: ''
    }];

    private nextId = 100;

    getPasswords(): Promise<Array<Password>> {
        return Promise.resolve(this.passwords.slice());
    }

    addPassword(password: Password): Promise<number> {
        password.PasswordId = this.nextId;
        this.passwords.push(password);
        this.nextId++;
        return Promise.resolve(password.PasswordId);
    }

    removePassword(id: number): Promise<void> {
        var index = this.passwords.findIndex((password) => password.PasswordId == id);
        this.passwords.splice(index, 1);
        return Promise.resolve();
    }
}

@Injectable()
export class ApiPasswordService extends IPasswordService {
    constructor(private http: Http) {
        super();
    }

    getPasswords(): Promise<Array<Password>> {
        return this.http
                   .get("http://localhost:3000/password/all")
                   .toPromise()
                   .then(response => {
                       var json = response.json();
                       console.log(json);
                       return json as Array<Password>
                   });
    }

    addPassword(password: Password): Promise<number> {
        throw "Not Implemented";
    }

    removePassword(id: number): Promise<void> {
        throw "Not Implemented";
    }
}
