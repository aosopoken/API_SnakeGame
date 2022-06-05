const router = require('express').Router()

const Person = require('../models/Person')

router.post('/', async (req, res) => {

    // req.body

    // {name: "Paulo", salary: 2000, approved: false}
    const {name, score, approved} = req.body

    if (!name) {
        res.status(422).json({message: 'O nome é obrigatório!'})
        return
    }
   
    const person = {
        name,
        score,
        approved
    }
    
    try {

        await Person.create(person)

        res.status(201).json({message: 'Sucesso!'})
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Read - leitura de dados
router.get('/', async (req, res) => {

    try {

        const people = await Person.find()
        
        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {

    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {

        const person = await Person.findOne({ _id: id })

        if(!person) {
            res.status(422).json({message: 'O usuário não foi encontrado!'})
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }

})

// update - atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {name, score, approved} = req.body
    const person = {
        name,
        score,
        approved
    }

    try {
        const updatedPerson = await Person.updateOne({_id: id}, person)

        if (updatedPerson.matchedCount === 0){
            res.status(422).json({message: 'O usuário não foi encontrado!'})
            return
        }

        
        res.status(200).json(person)
    
    } catch (error) {
        res.status(500).json({error: error})
    }

})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const person = await Person.findOne({ _id: id })

    if(!person) {
        res.status(422).json({message: 'O usuário não foi encontrado!'})
        return
    }

    try {

        await Person.deleteOne({_id: id})

        res.status(200).json({message: 'Usuário removido com sucesso'})
        
    } catch (error) {
        res.status(500).json({error: error})
    }

})

module.exports = router