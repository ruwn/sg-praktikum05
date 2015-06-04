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
        var url = 'http://localhost:3000/mailapi/folder/'+ f;
        var para = {newval: nn};
        console.log("MailApi.renameFolder: "+url+"," + nn);

        return axios.put(url, para ).then(response => response);
    }

    deleteFolder(f) {
        var url = 'http://localhost:3000/mailapi/folder/'+f;
        return axios.delete(url).then(response => response);
    }

    deleteMail(m) {
        var url = 'http://localhost:3000/mailapi/msg/'+ m._id;
        console.log("MailApi.deleteMail: "+url);
        return axios.delete(url).then(response => response);
    }
}
