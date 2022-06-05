// config inicial
const express = require('express')
const mongoose = require('mongoose')
const app = express()
var cors = require('cors');

// forma de ler Json / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(cors())

app.use(express.json())

// rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

app.get('/cors',(req,res) =>{
res.set('Access-Control-Allow-Origin', 'http://192.168.56.1:3000');
res.send({ "msg": "This has CORS enabled" })
})

// rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Oi Express!' })
}
)

// mongodb+srv://RuanSilva:SENHA@apicluster.ibye42e.mongodb.net/bancodaapi?retryWrites=true&w=majority


// entregar uma porta
mongoose.connect('mongodb+srv://RuanSilva:ruanapiteste@apicluster.ibye42e.mongodb.net/bancodaapi?retryWrites=true&w=majority')
.then(() => {
    console.log('Conectado ao MongoDB!')
    app.listen(3001)
})
.catch((err) => console.log(err))
