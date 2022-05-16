import axios from "axios"

export default axios.create({
    // baseURL: "https://powersarjapi.herokuapp.com",
    // baseURL: "http://localhost:3000",
    baseURL:"https://api.powersarj.com",
    auth: {
        username: 'M.a.r.s.i.s',
        password: 'P.o.w.e.r.s.a.r.j'
    },
})