import { env } from "./env"
import { app } from "./app"

app.listen({
    host: '0.0.0.0', //this hosts makes it possible for other front-ends to acess the server
    port: env.PORT,
}).then(()=>{
    console.log('🐶HTTP Server Running!')
})