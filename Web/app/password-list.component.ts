import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { IPasswordService } from "./password.service";
import { Password } from "./password";

@Component({
    selector: "password-list",
    templateUrl: "./app/password-list.component.html"
})
export class PasswordListComponent {
    passwordService: IPasswordService;

    passwords: Array<Password>;

    @Input()
    newDescription: string;

    @Input()
    newPassword: string;

    constructor(passwordService: IPasswordService) {
        this.passwordService = passwordService;

        passwordService.getPasswords().then((passwords) => {
            this.passwords = passwords;
        });
    }

    public addPassword() {
        let password: Password = {
            PasswordId: -1,
            Description: this.newDescription,
            PasswordText: this.newPassword,
            UserName: ""
        };

        this.passwordService.addPassword(password).then((id: number) => {
            password.PasswordId = id;
            this.newDescription = "";
            this.newPassword = "";
            this.passwords.push(password);
        });
    } 

    public removePassword(id: number) {
        this.passwordService.removePassword(id).then(() => {
            var index = this.passwords.findIndex((password) => password.PasswordId == id);
            this.passwords.splice(index, 1);
        })
    }
}
