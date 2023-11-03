import axios from "axios";
import { ChannelResponse, NewChannelRequest, OAuthResponse } from "../Types/ServerTypes";
import Constants from "./Constants";
import { enqueueSnackbar } from "notistack";

/**
 * GET /status
 */
function Status(): Promise<any> {
  const url = Constants.BackendUrl + "status";
  try {
    return axios.get(url, getConfig());
  } catch (error) {
    return Promise.reject("Error");
  }
}

/**
 * POST /auth/google
 * @param code The code recieved from googles oauth2 code-flow
 */
async function AuthGoogle(code: string): Promise<OAuthResponse> {
  const resp = await axios.post<OAuthResponse>(Constants.BackendUrl + "auth/google", {
    code: code,
  });
  return resp.data;
}

/**
 * GET /login
 */
async function GetLogin(): Promise<ChannelResponse[]> {
  const url = Constants.BackendUrl + "channels";
  const resp = await axios.get<ChannelResponse[]>(url, getConfig());
  return resp.data;
}

/**
 * GET /channels
 */
async function GetChannels(): Promise<ChannelResponse[]> {
  const url = Constants.BackendUrl + "channels";
  return AuthGet<ChannelResponse[]>(url);
}

/**
 * POST /channels
 */
function PostChannels(data: NewChannelRequest) {
  const url = Constants.BackendUrl + "channels";
  return AuthPost<NewChannelRequest, number>(url, data);
}

async function AuthGet<Result>(url: string): Promise<Result> {
  try {
    const resp = await axios.get<Result>(url, getConfig());
    return resp.data;
  } catch (error) {
    enqueueSnackbar("Error: " + error, { variant: "error" });
    return Promise.reject("Error");
  }
}

async function AuthPost<Data, Result>(url: string, data: Data): Promise<Result> {
  try {
    const resp = await axios.post<Result>(url, data, getConfig());
    return resp.data;
  } catch (error) {
    enqueueSnackbar("Error: " + error, { variant: "error" });
    return Promise.reject("Error");
  }
}

function getConfig() {
  return {
    headers: {
      Authorization: "Bearer " + localStorage.getItem(Constants.AccessTokenKey),
    },
  };
}

export default {
  Status,
  AuthGoogle,
  GetLogin,
  GetChannels,
  PostChannels,
};
