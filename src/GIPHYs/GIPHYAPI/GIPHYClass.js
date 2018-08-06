import { Obj } from './ObjClass.js';
import { getTrendingURLAPI, getSearchURLAPI, fetchCaller } from './basicrestfunctions.js';

//TODO: NO ERROR CHECKING HERE -- JUST HOPING OBJECT IS JUST PERFECT

export class GIPHY extends Obj {
	constructor(each) {
		super(each);
		this.pagination = {
			offset: 0,
			count: 20,
		};
		this.data = [];
		this.searchString = "";
		this.searching = false;
	}

	getDefaultUrlParams() {
		//TODO :: BREAK THIS OUT INTO OBJECT WITH FUNCTIONALITY
		//...yet in the interest of time, we handle just pagination
		let offsetparam = "&offset=";
		if ( typeof this.pagination === "undefined" ) {
			offsetparam = `${offsetparam}0`;
		} else {
			//TODO: NO ERROR CHECKING HERE -- JUST HOPING OBJECT IS JUST PERFECT
			offsetparam = `${offsetparam}${this.pagination.offset}`;
		}

		return `&limit=20&rating=G&${offsetparam}`;
	}

	// Used : ViewGIPHYs 
	async getGIPHYs() {
		if ( this.searchString !== "") {
			const returnedGIPHYs = await this.searchGIPHYs();
			return returnedGIPHYs;
		} else {
			const returnedGIPHYs = await this.getTrendingGIPHYs();
			return returnedGIPHYs;
		}
	}

	// Used : ViewGIPHYs 
	async getTrendingGIPHYs() {
		this.searching = true;
		const url = `${getTrendingURLAPI()}${this.getDefaultUrlParams()}`;
		
		const returnedGIPHYs = await fetchCaller(url,"GET", null);
		this.data = returnedGIPHYs.data;
		this.pagination = returnedGIPHYs.pagination;
		this.searching = false;
		return returnedGIPHYs;
	}

	// Used : ViewGIPHYs 
	async searchGIPHYs() {
		this.searching = true;
		const baseURLAPI = getSearchURLAPI();
		const defaulturlparams = this.getDefaultUrlParams();
		const url = `${baseURLAPI}${defaulturlparams}&q=${this.searchString}`;

		const returnedGIPHYs = await fetchCaller(url,"GET", null);
		this.data = returnedGIPHYs.data;
		this.pagination = returnedGIPHYs.pagination;
		this.searching = false;
		return returnedGIPHYs;
	}

	async incrementPage() {
    this.pagination.offset = Number(this.pagination.count) + Number(this.pagination.offset);
    await this.getGIPHYs();
    return this;
  }
}