const REST_API_KEY = "f0a19fb1284652becb04ae52040ddc81";
const REDIRECT_PATH = '/loginProcess';
const REDIRECT_ORIGIN = window.location.origin;
export const REDIRECT_URI = REDIRECT_ORIGIN + REDIRECT_PATH;
export const KAKAO_AUTH_HOST = "https://kauth.kakao.com";
export const GET_CODE_API = `/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
