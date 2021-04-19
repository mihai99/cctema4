// const serverUrl = "http://localhost:8080";
import { graphConfig } from "./authConfig";
const serverUrl = "http://localhost:8080";

export const post = (path, body) => {
  return fetch(serverUrl + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
};
export const get = async (path) => {
  return fetch(serverUrl + path);
};

export async function callMsGraph(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(graphConfig.graphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}
