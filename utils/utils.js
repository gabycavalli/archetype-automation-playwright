import axios from 'axios';

export async function getKCToken() {
    {
        var token = "token";
        const body = {
            grant_type: "client_credentials",
            client_id: "keycloak",
            client_secret: "02f4e806-1080-45b0-adee-081b7c92e0e3"
        }

        try {
            const response = await axios.post("https://np-intkeycloak.itspty.com/auth/realms/pam/protocol/openid-connect/token", body,
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
            token = response.data.access_token
        } catch (e) {
            console.log("token error:", e)
        }

        return token
    }
}


export async function removeReCaptcha(token,env,extBrand) {
    {
        const brand = await getBrandFullName(extBrand);
        const body = {
            "brand": brand,
            "login": {
                "enabled": false
            },
            "forgotPassword": {
                "enabled": false
            },
            "registration": {
                "enabled": false
            }
        };

        try {
            const response = await axios.post("https://fraud-scoring-config." + env + ".itsops.net/api/v1/config/recaptcha-v3", body,
                { headers: { "Authorization": "Bearer " + token } });
            console.log("status recaptcha:", response.status);
            if (response.status === 200) {
                console.log("ReCaptcha disabled");
            } else {
                console.log("ReCaptcha enabled !!");
            }
        } catch (e) {
            console.log("recaptcha error:", e);
            console.log("ReCaptcha enabled !!");
        }
    }
}

async function getBrandFullName(extBrand) {
    {
        var brand;
        switch (extBrand) {
            case 'bol':
                brand = 'betonline';
                break;
            case 'cbol':
                brand = 'betonline';
                break;
            case 'gc':
                brand = 'gamingcity';
                break;
            case 'wc':
                brand = 'wildcasino';
                break;
            case 'ss':
                brand = 'superslots';
                break;
            case 'sb':
                brand = 'sportsbetting';
                break;
            case 'csb':
                brand = 'sportsbetting';
                break;
            case 'tg':
                brand = 'tigergaming';
                break;
            case 'hr':
                brand = 'highrollercasino';
                break;
            case 'qbc':
                brand = 'queenbeecasino';
                break;
            case 'lv':
                brand = 'lowvig';
                break;
            default:
                console.log("Brand not declarated");
                brand = "Not declarated";
        }
    }
    return brand;
}