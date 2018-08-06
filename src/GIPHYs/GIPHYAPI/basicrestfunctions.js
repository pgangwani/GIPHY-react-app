import { getBASEGIPHYURI, getAPIKEYparams, isALLOWEDMETHOD, getDefaultFetchParams } from './.api.config.js';

export function getTrendingURLAPI() {
	const APIPATH = `${getBASEGIPHYURI()}trending?${getAPIKEYparams()}`;
	return APIPATH;
}

export function getSearchURLAPI() {
	const APIPATH = `${getBASEGIPHYURI()}search?${getAPIKEYparams()}`;
	return APIPATH;
}

export function resolved(result) {
	//TODO: 
  console.log('Resolved');
  console.log(result);
}

export function rejected(result) {
	//TODO: Error Handling i.e. TypeError: Failed to fetch
	console.log('Rejected!!');
  console.log(result);
  return null;
}

export async function fetchCaller(url,METHOD='GET',params) {
	const fullURLAPI = url;

	let errorinparams = false;
	if ( !isALLOWEDMETHOD(METHOD) ) {
		errorinparams = true;
	} else if ( ( METHOD === "POST" || METHOD === "PUT" )
		&& ( typeof params === "undefined" || params === null) ) {
		errorinparams = true;
	}

	if (!errorinparams) {
		let fetchParams = getDefaultFetchParams();
		fetchParams.method = METHOD;
		
		if (params !== null) {
			fetchParams.body = JSON.stringify( params );
		}

		try {
			const response = await fetch(fullURLAPI, fetchParams);
			if ( response.status !== 200) {
				//TODO: Error Handling
	    	return Promise.reject(response).then(resolved, rejected);
	    }
	    const data = await response.json();
	    return data;
	  } catch(error) {
	    return Promise.reject(error).then(resolved, rejected);	  	
	  }

  } else {
  	return null;
  }

}