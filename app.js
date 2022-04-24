const express = require('express');
const { Sequelize, DataTypes, Op } = require('sequelize');
const bodyparser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express()
const port = 8080;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
// app.use(upload.single('file'));

let sequelize = new Sequelize('library', 'Allen', 'Allen020125??!', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

const books = sequelize.define('book', {
    bno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    type: DataTypes.STRING,
    title: DataTypes.STRING,
    press: DataTypes.STRING,
    year: DataTypes.INTEGER,
    author: DataTypes.STRING,
    price: DataTypes.DECIMAL(7, 2),
    total: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
}, {
    timestamps: false
})

const cards = sequelize.define('card', {
    cid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: DataTypes.STRING,
    unit: DataTypes.STRING,
    type: DataTypes.STRING,
}, {
    timestamps: false
})

const borrow = sequelize.define('borrow', {
    cid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bno: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    borrow_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    return_date: DataTypes.DATE,
    operatorID: DataTypes.INTEGER
}, {
    timestamps: false,
    freezeTableName: true
})
borrow.removeAttribute('id');

const administrator = sequelize.define('administrator', {
    aid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: DataTypes.STRING,
    contact: DataTypes.STRING
}, {
    timestamps: false
})

//用户管理
app.post('/user/signup', async (req, res) => {
    let admin = await administrator.findOne({ where: { aid: req.body.id } })
    if (admin == null) {
        admin = await administrator.create({
            aid: req.body.id,
            password: req.body.password,
            name: req.body.name,
            contact: req.body.contact
        })
        res.send("success")
    }
    else {
        res.send("signed up before")
    }
})

app.post('/user/login', async (req, res) => {
    let admin = await administrator.findOne({ where: { aid: req.body.id } })
    if (admin == null) {
        res.send("unsigned")
    }
    else if (admin.password !== req.body.password) {
        res.send("wrong")
    }
    else {
        res.send({ name: admin.name, id: admin.aid })
    }
})

//书籍管理
app.post('/book/store', async (req, res) => {
    try {
        let book = await books.findOne({ where: { bno: req.body.bno } })
        console.log(req.body)
        if (book == null) {
            book = await books.create({
                bno: req.body.bno,
                type: req.body.type,
                title: req.body.title,
                press: req.body.press,
                year: req.body.year,
                author: req.body.author,
                price: req.body.price,
                total: req.body.amount,
                stock: req.body.amount,
            })
        }
        else {
            book.total += parseInt(req.body.amount)
            book.stock += parseInt(req.body.amount)
            await book.save()
        }
        res.send("success")
    } catch (e) {
        console.log(e)
    }
})

app.post('/book/storeBatch', upload.single('file'), async (req, res) => {
    console.log(req.file);
    let data = fs.readFileSync(req.file.path)
    let records = data.toString().split("\r\n")
    for (let i in records) {
        let record = records[i].split(" ")
        let book = await books.findOne({ where: { bno: record[0] } })
        // console.log(req.body)
        if (book == null) {
            book = await books.create({
                bno: record[0],
                type: record[1],
                title: record[2],
                press: record[3],
                year: record[4],
                author: record[5],
                price: record[6],
                total: parseInt(record[7]),
                stock: parseInt(record[7]),
            })
        }
        else {
            book.total += parseInt(record[7])
            book.stock += parseInt(record[7])
            await book.save()
        }
    }
    res.send("success")
})

app.post('/book/query', async (req, res) => {
    let queryString = req.body.op
    // let booklist = await books.findAll({
    //     where: {
    //          (queryString)
    //     }
    // })
    queryString = "books.findAll({\nwhere: {\n" + queryString + "\n}\n})"
    // console.log(queryString)
    let booklist = eval(queryString)
    booklist.then((books) => {
        // console.log(JSON.stringify(books, null, 4))
        res.send(JSON.stringify(books, null, 4))
    }).catch((e) => {
        console.log(e)
    })
})

// app.post('/book/queryByBno', async (req, res) => {
//     try {
//         const book = await books.findOne({ where: { bno: req.body.bno } })
//         console.log("book: \n" + JSON.stringify(book, null, 4))
//         res.send(JSON.stringify(book, null, 4))
//     } catch (e) {
//         console.log(e)
//     }
// })

//借记管理
app.post('/borrow/getRecords', async (req, res) => {
    try {
        const {count, rows} = await borrow.findAndCountAll({ where: { cid: req.body.cid, return_date: null } })
        // console.log(JSON.stringify(records, null, 4))
        // console.log(JSON.stringify(records))
        if (count == 0) {
            console.log("no")
            res.send("no card")
        }
        else
        {
            console.log(JSON.stringify(rows))
            res.send(JSON.stringify(rows, null, 4))
        }
    } catch (e) {
        console.log(e)
    }
})

app.post('/borrow/getBooks', async (req, res) => {
    const card = await cards.findOne({ where: { cid: req.body.cid } })
    if (card == null) {
        res.send("no card")
    }
    else {
        let booklist = null
        if (req.body.bno == null || req.body.bno == "") {
            booklist = await books.findAll()
        }
        else {
            booklist = await books.findAll({ where: { bno: req.body.bno } })
        }
        console.log(booklist)
        res.send(JSON.stringify(booklist, null, 4))
    }
})

app.post('/borrow/getBorrowed', async (req, res) => {
    try {
        let borrowedList = req.body.borrows
        // console.log(borrowedList)
        let borrowedBooks = []
        if (borrowedList != [] && borrowedList != null) {
            for (let record of borrowedList) {
                const book = await books.findOne({ where: { bno: record.bno } })
                borrowedBooks.push(book)
            }
        }
        res.send(JSON.stringify(borrowedBooks, null, 4))
    } catch (e) {
        console.log(e)
    }
})

app.post('/borrow/borrow', async (req, res) => {
    try {
        const card = await cards.findOne({ where: { cid: req.body.cid } })
        if (card == null) {
            res.send("no card")
        }
        else {
            const hasBorrowed = await borrow.findOne({ where: { cid: req.body.cid, bno: req.body.bno, return_date: null } })
            if (hasBorrowed == null) {
                let date = new Date()
                // console.log(date.toLocaleDateString())
                await borrow.create({
                    cid: req.body.cid,
                    bno: req.body.bno,
                    borrow_date: date.toLocaleDateString(),
                    return_date: null,
                    operatorID: req.body.operatorID,
                })
                const borrowedBook = await books.findOne({ where: { bno: req.body.bno } })
                borrowedBook.stock--
                await borrowedBook.save()
                const newBooks = await books.findAll()
                res.send(JSON.stringify(newBooks, null, 4))
            }
            else {
                res.send("borrowed")
            }
        }
    } catch (e) {
        console.log(e)
    }
})

app.post('/borrow/return', async (req, res) => {
    try {
        // await borrow.destroy({where: {
        //     cid: req.body.cid,
        //     bno: req.body.bno,
        //     return_date: null
        // }})
        // console.log("req:\n" + JSON.stringify(req.body))
        let record = await borrow.findOne({
            where: {
                cid: req.body.cid,
                bno: req.body.bno,
                return_date: null
            }
        })
        let date = new Date()
        record.return_date = date.toLocaleDateString()
        await record.save()
        let book = await books.findOne({ where: { bno: req.body.bno } })
        book.stock++
        await book.save()
        const records = await borrow.findAll({ where: { cid: req.body.cid, return_date: null } })
        let borrowedBooks = []
        for (let record of records) {
            book = await books.findOne({ where: { bno: record.bno } })
            borrowedBooks.push(book)
        }
        res.send(JSON.stringify(borrowedBooks, null, 4))
    } catch (e) {
        console.log(e)
    }
})

//借阅证管理
app.post('/cards/create', async (req, res) => {
    try {
        const card = await cards.findOne({ where: { cid: req.body.cid } })
        if (card == null) {
            await cards.create({
                cid: req.body.cid,
                name: req.body.username,
                unit: req.body.unit,
                type: req.body.type
            })
            res.send("success")
        }
        else {
            res.send("duplicated")
        }
    } catch (e) {
        console.log(e)
    }
})

app.post('/cards/search', async (req, res) => {
    try {
        if (req.body.cid == null || req.body.cid == "") {
            const cardlist = await cards.findAll()
            // await cardlist.reload()
            console.log(JSON.stringify(cardlist, null, 4))
            res.send(JSON.stringify(cardlist, null, 4))
        }
        else {
            const cardlist = await cards.findAll({ where: { cid: req.body.cid } })
            res.send(JSON.stringify(cardlist, null, 4))
        }
    } catch (e) {
        console.log(e)
    }
})

app.post('/cards/delete', async (req, res) => {
    try {
        let { count } = await borrow.findAndCountAll({ where: { cid: req.body.cid, return_date: null } })
        if (count > 0) {
            res.send("error")
        }
        else {
            await cards.destroy({ where: { cid: req.body.cid } })//得先判断有没有书要还
            const cardlist = await cards.findAll()
            res.send(JSON.stringify(cardlist, null, 4))
        }
        // res.send("success")
    } catch (e) {
        console.log(e)
    }
})



app.use('/', express.static('dist'));

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}!`);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})