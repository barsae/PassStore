import { Injectable } from '@angular/core';
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
        id: 1,
        description: 'Test Password',
        password: 't3stp@55word'
    }];

    private nextId = 100;

    getPasswords(): Promise<Array<Password>> {
        return Promise.resolve(this.passwords.slice());
    }

    addPassword(password: Password): Promise<number> {
        password.id = this.nextId;
        this.passwords.push(password);
        this.nextId++;
        return Promise.resolve(password.id);
    }

    removePassword(id: number): Promise<void> {
        var index = this.passwords.findIndex((password) => password.id == id);
        this.passwords.splice(index, 1);
        return Promise.resolve();
    }
}
