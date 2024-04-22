import { atom } from "recoil";
import { getCookie } from "../util/cookieUtil";

const initState = {
    username:'',
    social: false,
    accessToken:'',
    refreshToken:''
}

const loadMemberCookie = () => { //쿠키에서 체크

    const memberInfo =  getCookie("member")

    //닉네임 처리
    if(memberInfo && memberInfo.username) {
        memberInfo.username = decodeURIComponent(memberInfo.username)
    }

    return memberInfo
}

const signinState = atom({
    key:'signinState',
    default: loadMemberCookie() || initState
})


export default signinState
