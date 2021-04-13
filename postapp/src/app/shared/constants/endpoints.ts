import { environment } from './../../../environments/environment';



environment
class Endpoints {
    baseUrl: string = environment.baseUrl;

    USER_BASE = this.baseUrl + '/api/user';




    USER_ENDPONTS = {
        LOGIN: this.joinPaths(this.USER_BASE, 'login'),
        SIGN_UP: this.joinPaths(this.USER_BASE, 'signUp'),
        CREATE_POST: this.joinPaths(this.USER_BASE, 'createPost'),
        MY_POST: this.joinPaths(this.USER_BASE, 'myPostList'),
        COMPLETE_PASSWORD: this.joinPaths(this.USER_BASE, 'completeProfile'),
        LOGOUT: this.joinPaths(this.USER_BASE, 'logout'),
        LOGOUT_ADMIN: this.joinPaths(this.USER_BASE, 'logoutAdmin'),
        USER_LIST: this.joinPaths(this.USER_BASE, 'userList'),
        USER_POST_LIST:ID=> this.joinPaths(this.USER_BASE, 'userPost',ID),


        // APK_VERSION: this.joinPaths(this.USER_BASE, 'get-app-version'),

    };



    private joinPaths(...params) {
        const newUrl = params.join('/');
        return newUrl;
    }
}
export const API = new Endpoints();
