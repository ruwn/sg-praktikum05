/**
 * Created by rdreimann on 03.06.15.
 */
export class MailApi {

    getAll() {
        var url = 'http://localhost:3000/mailapi/folders';
        return axios.get(url).then( response => response);

//        var url = 'http://api.randomuser.me';
//        return axios.get(url).then(response => response.data.results[0].user.name.first);
    }

    getMails(folder) {
        var url= 'http://localhost:3000/mailapi/shbyfolder/'+folder;
        console.log("MailApi.getMails: "+url);
        return axios.get(url).then( response => response);

    }

    getMail(mailID) {
        var url = 'http://localhost:3000/mailapi/show/'+mailID;
        console.log("MailApi.getMails");
        return axios.get(url).then(response => response);
    }

    renameFolder(f,nn) {
        var url = 'http://localhost:3000/mailapi/updfoldername/'+ f;
        var para = {folder: nn};
        console.log("MailApi.renameFolder: "+url+"," + nn);

        return axios.put(url, para ).then(response => response);
    }

    deleteFolder(f) {
        var url = 'http://localhost:3000/mailapi/deletefolder/'+f;
        console.log("MailApi.deleteFolder");
        return axios.delete(url).then(response => response);
    }

    deleteMail(m) {
        var url = 'http://localhost:3000/mailapi/deletemail/'+ m;
        console.log("MailApi.deleteMail: "+url);
        return axios.delete(url).then(response => response);
    }

    moveMail(m, newFolder) {
        var url = 'http://localhost:3000/mailapi/movemail/'+ m;
        var para = {folder: newFolder};
        console.log("MailApi.renameFolder: "+url+"," + newFolder);
        return axios.put(url, para ).then(response => response);
    }

    createMail(s,e,b,t) {
        var url= 'http://localhost:3000/mailapi/createmail/';
        var para = {sender: s, recipients: e, subject: b, text: t };
        console.log("MailApi.createMal: "+url+"," + para);

        return axios.post(url,para).then(response => response);

    }
}
