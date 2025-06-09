import axios from 'axios'

const tonapi = axios.create({
  baseURL: "https://tonapi.io/v2/",
  headers: {
    'Authorization': 'Bearer AHNKO56KDTDIYGIAAAAKPVWGBLOQ2J4Z6W4ZYIP35GPCI6BSG647XSPXK6YEJHY4MTVHRFA'
  },
})

export { tonapi }