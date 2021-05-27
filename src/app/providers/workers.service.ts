import { Injectable } from "@angular/core";
import axios, { AxiosResponse } from "axios";

@Injectable({
  providedIn: "root",
})
export class WorkersService {
  baseUrl = "https://jmg-aug99-server.herokuapp.com";

  getWorkers() {
    // Make a request for a user with a given ID
    return axios
      .get<AxiosResponse>(this.baseUrl + "/workers")
      .then((response) => {
        // handle success
        console.log("getWorkers", response);
        return response;
      })
      .catch((error) => {
        // handle error

        console.log("getWorkers", error);
        return error;
      });
  }
}
