import jwt_decode from 'jwt-decode';

export function getToken() {
    return localStorage.getItem('token')
}

export function setToken(token: string) {
    localStorage.setItem('token', token)
}

export function getOtp_uuid() {
    return localStorage.getItem('Otp_uuid')
}

export function setOtp_uuid(Otp_uuid: string) {
    return localStorage.setItem('Otp_uuid', Otp_uuid)
}

export function isLogined() {
    if (localStorage.getItem('token')) {
        return true;
    }
    return false;
}

export function ifExpire() {
    var isExpired = true;
    const token = localStorage.getItem('token');
    if (token != null) {
        var decodedToken:any = jwt_decode(token);
        var dateNow = new Date();
        var timestamp = Number.parseInt(dateNow.getTime().toString().substring(0, 10));
        var t1:number = decodedToken.exp;
        if(t1 >= timestamp) {
            isExpired = false;
        }
    }

    return isExpired
}