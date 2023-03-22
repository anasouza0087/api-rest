const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const DB = {
    games: [
        {
            id: 1,
            title: 'Max Payne',
            year: 2000,
            price: 10
        },
        {
            id: 2,
            title: 'Super Monaco GP',
            year: 1990,
            price: 50
        },
        {
            id: 3,
            title: 'Zelda',
            year: 1996,
            price: 100
        },
    ]
}

app.get('/games', (req, res) => {
    res.statusCode = 200
    res.json(DB.games)
})

app.get('/game/:id', (req, res) => {
    const id = req.params.id

    if (isNaN(id)) {
        res.sendStatus = 400
    } else {
        const parseId = parseInt(id)
        const game = DB.games.find(game => game.id == parseId)

        if (game != undefined) {
            res.statusCode = 200
            res.json(game)
        } else {
            res.sendStatus(404)
        }
    }
})

app.post('/game', (req, res) => {
    const { title, year, price } = req.body

    DB.games.push({
        id: 4,
        title,
        price,
        year
    })
    res.sendStatus(200)
})

app.delete('/game/:id', (req, res) => {
    const id = req.params.id
    if (isNaN(id)) {
        res.sendStatus(400)
    } else {
        const parseId = parseInt(id)
        const gameIndex = DB.games.findIndex(game => game.id == parseId)

        if (gameIndex == -1) {
            res.sendStatus(404)
        } else {
            DB.games.splice(gameIndex, 1)
            res.sendStatus(200)
        }
    }
})

app.put('/game/:id', (req, res) => {
    const id = req.params.id

    if (isNaN(id)) {
        res.sendStatus = 400
    } else {
        const parseId = parseInt(id)
        const game = DB.games.find(game => game.id == parseId)

        if (game != undefined) {
            const { title, price, year } = req.body
            if (title != undefined) {
                game.title = title
            }
            if (year != undefined) {
                game.year = year
            }
            if (price != undefined) {
                game.price = price
            }
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    }
})


app.listen(4000, () => {
    console.log('API Online!')
})