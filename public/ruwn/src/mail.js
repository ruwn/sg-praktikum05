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

        <button (click) = "removeFolder(folder)">deleteFolder </button>
        <input type="text" #nnamefolder (keyup)="setNeuerNameFolder(nnamefolder)"></input>
        <button (click) ="updateFolder(folder)">renameFolder</button>

    </div>
</div>
<div *for="#mail of mails">
    <button class="ru-button --primary" (click)="mailOpen(mail)" >     <strong>Subject: </strong> {{mail.subject}} <strong> Date:</strong> {{mail.date}} </button>
    <button (click) ="removeMail(mail)">DeleteMail</button>
    <input type="text" #nnamemail (keyup)="setNeuerNameMail(nnamemail)"></input>
    <button (click) ="updateMail(mail)">move2Folder</button>
    </div>
    <div> {{myText}} </div>
    <br><br><br><br><br><br><br>

    <div>sender: <input type="text" #nnsender></input>  <div>
    <div>empfänger: <input type="text" #nnempfaenger></input>  <div>
    <div>betreff: <input type="text" #nnbetreff></input>  <div>
    <div>text: <input type="text" #nntext></input><button (click)="sendmail(nnsender.value, nnempfaenger.value,nnbetreff.value, nntext.value)"> send mail </button><div>

`,
directives: [For]
})

class Mail{

    constructor(mailApi: MailApi) {
        this.getFolder = mailApi.getAll;
        this.getMails= mailApi.getMails;
        this.rnFolder = mailApi.renameFolder;
        this.delMail = mailApi.deleteMail;
        this.delFolder = mailApi.deleteFolder;
        this.mvMail = mailApi.moveMail;
        this.crMail = mailApi.createMail;


        this.debugAusgabe='';
        this.myText = '';
        this.folder='';
        this.folders=[];
        this.resp=[];
        this.mails=[];
        this.neuerNameFolder='';
        this.neuerNameMail='';
        this.mailID='';
        this.getFolder().then(resp => {this.folders = resp.data});

    };

    selectedButton(folder) {
        this.folder = folder;
        console.log("läuft");
        console.log(folder);
        this.getMails(folder).then(resp => {this.mails=resp.data});
        console.log(this.mails.subject);

    };

    mailOpen(mail) {
        console.log(mail);
        this.myText = mail.text;
        this.getMails(mail).then(resp => {this.mails=resp.data});
            console.log(mail._id);
    };

    removeFolder(folder) {
        console.log("Mail.remove " +folder);
        this.delFolder(folder).then(resp => {this.debugAusgabe = resp._id});
        this.getFolder().then(resp => {this.folders = resp.data}); //folder liste neu laden

};
    // rename folder
    updateFolder(folder) {
        console.log("Mail.updateFolder: folder: "+ folder +"  "+ "neuer name: "+ this.neuerNameFolder);
        this.rnFolder(folder,this.neuerNameFolder).then(resp => {this.debugAusgabe = resp.data});
        this.getFolder().then(resp => {this.folders = resp.data}); //folder liste neu laden

    };

    //
    removeMail(mail) {
        this.mailID=mail._id;
        console.log("Mail.removeMail: "+this.mailID);
        this.delMail(this.mailID).then(resp => {this.debugAusgabe = "remove Mail"});
        this.getMails(this.folder).then(resp => {this.mails=resp.data});

};
    //moves mail to another folder
    updateMail(mail) {
        console.log(mail);
        console.log("Mail.updateFolder: folder: "+ mail._id +"  "+ "neuer name: "+ this.neuerNameMail);
        this.mvMail(mail._id,this.neuerNameMail).then(resp => {this.debugAusgabe = resp.data});
    }

    setNeuerNameFolder(nnamefolder) {
        this.neuerNameFolder=nnamefolder.value;
        console.log("neuer name folder: "+nnamefolder.value);
    };

    sendmail(s,e,b,t) {
        console.log("sender: "+s+ " empfänger: " +e+ " subject"+b+" text: "+t);
        this.crMail(s,e,b,t).then(resp => {this.debugAusgabe = resp.data});
    };


    setNeuerNameMail(nnamemail) {
        this.neuerNameMail=nnamemail.value;
        console.log("neuer name mail: "+nnamemail.value);
    };


}

bootstrap(Mail);