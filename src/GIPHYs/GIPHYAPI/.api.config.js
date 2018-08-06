// config for GIPHY-SAMPLE-APP

const APIKEY = "PUT-YOUR-API-KEY-HERE";
const allowedMETHODs = ["GET","POST","PUT","PUT", "DELETE"];
const BASEGIPHYURI = "https://api.giphy.com/v1/gifs/";

export function isALLOWEDMETHOD(METHOD) {
	return ( allowedMETHODs.includes(METHOD) ? true : false ) ;
}

export function getDefaultFetchParams() {
	let defaultFetchParams = {};
	defaultFetchParams.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  defaultFetchParams.timeout = 10000;
  defaultFetchParams.followRedirect = true;
  defaultFetchParams.maxRedirects = 10;

  return defaultFetchParams;
}

export function getAPIKEYparams() {
	return `api_key=${APIKEY}`;
}

export function getBASEGIPHYURI() {
	return BASEGIPHYURI;
}

