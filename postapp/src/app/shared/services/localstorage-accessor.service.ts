import { Injectable } from "@angular/core";
import * as CryptoJS from "crypto-js";
import { isDevMode } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

const dataName = "userAdminData";

export interface UserData {
  _id: string,
  email: string,
  gender: string,
  first_name: string,
  last_name: string
  image?: string,
    name?: string,
  user_type: string,
  status: string,
  role:string,
  otp_verify: string,
  accessToken: string,
  loginForm: {
    email?: string;
    password?: string;
  };
}

@Injectable()
export class StorageAccessorService {
  encryptionKey = environment.encryptionKey;
  constructor(private router: Router) { }

  storeData(data: UserData | object) {
    if (data) {
      if (isDevMode()) {
        localStorage.setItem(dataName, JSON.stringify(data));
      } else {
        localStorage.setItem(
          dataName,
          CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptionKey)
        );
      }
    }
  }

  fetchData(): UserData | null {
    const userData = localStorage.getItem(dataName);
    if (!userData) {
      return null;
    }
    try {
      if (isDevMode()) {
        return JSON.parse(userData);
      }
      const bytes = CryptoJS.AES.decrypt(userData.toString(), this.encryptionKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      // console.log(decryptedData.loginForm);
      return decryptedData;
    } catch (err) {
      this.deleteData();
      this.router.navigate(["/login"]);
    }
  }

  fetchToken() {
    const userData = this.fetchData();
    if (userData) {
      return userData.accessToken || "";
    } else {
      return "";
    }
  }

  storeToken(newToken) {
    // debugger;
    const userData = this.fetchData();
    if (userData) {
      const newData = Object.assign({}, userData, { accessToken: newToken},{ role: userData['role'] });
      this.storeData(newData);
    }
  }

  fetchRole() {
    const userData = this.fetchData();
    if (userData) {
      return userData["user_type"] || "";
    } else {
      return "";
    }
  }

  fetchUserDetailsByKey(keyToFetch) {
    const userData = this.fetchData();
    if (userData) {
      return userData[keyToFetch] || "";
    } else {
      return "";
    }
  }

  deleteToken() {
    this.storeToken("");
  }

  deleteData() {
    localStorage.removeItem(dataName);
  }
}
