import {Component, Template, bootstrap, For} from 'angular2/angular2';
import {MailApi} from 'mailApi';

@Component({
    selector: 'mail',
    services: [MailApi]

})

@Template({
    inline: `
<div>{{debugAusgabe}}</div>

<div *for="#folder of folders">
    <div class="new-user-button">
        <button class="ru-button --primary" (click)="selectedButton(folder)" > {{folder}} </button>

        <button (click) = "deleteFolder(folder)">deleteFolder </button>
        <input type="text" #nname (keyup)="setNeuerName(nname)"></input>
        <button (click) = "renameFolder(folder,nname.text)">renameFolder</button>

    </div>
</div>
<div *for="#mail of mails">
    <button class="ru-button --primary" (click)="mailOpen(mail)" >     <strong>Subject: </strong> {{mail.subject}} <strong> Date:</strong> {{mail.date}} </button>
    <button (click) ="deleteMail(mail)">DeleteMail</button>
</div>

<div> {{myText}} </div>

`,
directives: [For]
})

class Mail{

    constructor(mailApi: MailApi) {
        this.getFolder = mailApi.getAll;
        this.getMails= mailApi.getMails;
        this.rnFolder = mailApi.renameFolder;
        this.deleteMail = mailApi.deleteMail;

        this.debugAusgabe='';
        this.myText = '';

        this.folders=[];
        this.resp=[];
        this.mails=[];
        this.neuerName='';
        this.mailID='';
        this.getFolder().then(resp => {this.folders = resp.data});

    };

    selectedButton(folder) {
        console.log("läuft");
        console.log(folder);
        this.getMails(folder).then(resp => {this.mails=resp.data});
        console.log(this.mails.subject);

    };

    mailOpen(mailId) {
        console.log(mailId);
        this.myText = mailId.text;
        this.getMails(mailID).then(resp => {this.mails=resp.data});
            console.log(mailId._id);
    };

    deleteFolder(folder) {
        console.log(folder);

    };

    renameFolder(folder, nn) {
        console.log("folder: "+folder +"  "+ "neuer name: "+ this.neuerName);
        this.rnFolder(folder,this.neuerName).then(resp => {this.debugAusgabe = resp.data});
    };

    deleteMail(mail) {
        this.mailID=mail._id;
        console.log(this.mailID);
        this.deleteMail(mail._id).then(resp => {this.debugAusgabe = resp.data});
    }

    setNeuerName(nname) {
        console.log(nname.value);
        this.neuerName=nname.value;
    };

}

bootstrap(Mail);