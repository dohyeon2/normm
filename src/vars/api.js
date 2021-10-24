const DATA_HOST_WP = 'https://data.normm.me/wp-json/wp/v2';
const DATA_HOST = "https://data.normm.me/wp-json/normm/v1";
const FILE = "/file";
const IWC = "/iwc";
const IWC_TOURNAMENT = "/tournament";
const COMMENT = "/comment";
const CANDIDATE = "/candidate";
const LOGIN = "/login";
const USER = "/user";

const API = {
    file: DATA_HOST + FILE,
    IWC: DATA_HOST + IWC,
    IWCTournament: DATA_HOST + IWC_TOURNAMENT,
    comment: DATA_HOST + COMMENT,
    candidate: DATA_HOST + CANDIDATE,
    login: DATA_HOST + LOGIN,
    user: DATA_HOST + USER,
    wp: DATA_HOST_WP,
}
export default API;