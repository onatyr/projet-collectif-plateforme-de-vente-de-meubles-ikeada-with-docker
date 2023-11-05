import { makeObservable, observable, action } from "mobx"

// Ceci est un store qui permet de stocker et d'accéder aux données de session supabase dans le localStorage
// On pourrait accèder direct au localStorage, mais là ça a le mérite de séparer ces opérations du reste de l'app
class Session {
    user = "anon"
    token = null

    // on lui dis que "user" et "session" sont des trucs auxquels on va vouloir accèder
    // et que setSession est une méthode pour y assigner des données
    constructor() {
        makeObservable(this, {
            user: observable,
            token: observable,
            setSession: action
        })
    }

    setSession(data) {
        localStorage.setItem('user', JSON.stringify(data.session.user))
        this.user = JSON.parse(localStorage.getItem('user'))

        localStorage.setItem('token', JSON.stringify(data.session.access_token))
        this.token = JSON.parse(localStorage.getItem('token'))
    }

}

// on instancie le Store
export const sessionStore = new Session();