import { PORT } from './config/app.config.js'


const app = express()


app.listen(PORT, () => {
    console.log('Server listening on port : ', PORT);
})