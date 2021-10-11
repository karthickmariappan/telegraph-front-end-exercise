const fetch = require('node-fetch');

/**
 * Service class for making API calls. This class
 * will take url as constructor param.
 * @param {String} url - the location of the API end point
 */
class APIService{
    constructor(url){
        this._url = url;
    }

    /**
     * Async function which will trigger the API call using the url set in the constructor
     *
     * @returns {Object} the response from the API end point or null in case of error
     */
    async makeApiCall(){
        let response = null;

        try{
            response = await fetch(this._url);
        }catch(error){
            // Ideally this should be a log to the logging server.
            console.log(`The API Call failed for ${this._url} with error message: ${error.message}`);
        }finally{
            return response;
        }
    }
}

module.exports = APIService;