import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

// POST - Criar novo usuário
app.post('/users', async (req, res) => {
    try {
        const { nome, idade, email } = req.body

        // Validação básica
        if (!nome || !idade || !email) {
            return res.status(400).json({
                error: 'Nome, idade e email são obrigatórios'
            })
        }

        const user = await prisma.user.create({
            data: {
                nome,
                idade: parseInt(idade),
                email
            }
        })

        res.status(201).json(user)
    } catch (error) {
        console.error('Erro ao criar usuário:', error)
        res.status(500).json({ error: 'Erro ao criar usuário' })
    }
})

// GET - Listar todos os usuários (com filtro opcional)
app.get('/users', async (req, res) => {

    try {
        const { id, name, email, age } = req.query

        const filters = {
            ...(id && { id: parseInt(id) }),
            ...(name && { nome: name }),
            ...(email && { email }),
            ...(age && { idade: parseInt(age) })
        }

        const users = await prisma.user.findMany({
            where: Object.keys(filters).length > 0 ? filters : undefined
        })

        res.status(200).json(users)
    } catch (error) {
        console.error('Erro ao buscar usuários:', error)
        res.status(500).json({ error: 'Erro ao buscar usuários' })
    }
})

// PUT - Atualizar usuário
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nome, idade, email } = req.body

        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                ...(nome && { nome }),
                ...(idade && { idade: parseInt(idade) }),
                ...(email && { email })
            }
        })

        res.status(200).json({ message:'Usuário atualizado com sucesso:' })
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error)
        res.status(500).json({ error: 'Erro ao atualizar usuário' })
    }
})

// DELETE - Deletar usuário
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params

        await prisma.user.delete({
            where: { id: parseInt(id) }
        })

        res.status(200).json({ message: 'Usuário deletado com sucesso' })
    } catch (error) {
        console.error('Erro ao deletar usuário:', error)
        res.status(500).json({ error: 'Erro ao deletar usuário' })
    }
})

// Abrir servidor
app.listen(3000, () => {
    console.clear()
    console.log(`
    |================================|
    | Servidor rodando na porta 3000 |
    |================================|
`)
})