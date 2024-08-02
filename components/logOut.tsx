import { particle } from '../config/config'


export default function LogOut () {
    particle.auth.logout().then(() => {
        console.log("logout");
    window.localStorage.clear()
})
}


