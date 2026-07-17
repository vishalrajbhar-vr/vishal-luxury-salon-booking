import app from './src/app.js'
import dotenv from 'dotenv'
import connectDB from './src/config/database.js'
dotenv.config({ path: './config.env' })

const port = process.env.PORT

connectDB()
app.get('/', (req, res) => {
    res.send('Hello RajbhaR....!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(`http://localhost:${port}`)
})