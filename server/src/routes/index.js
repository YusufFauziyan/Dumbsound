// import package
const express = require('express')
const router = express.Router()

// import middleware
const { auth } = require('../middlewares/auth')
const { uploadFile } = require ('../middlewares/uploadFile')

// import modules
const {
    register,
    login,
    checkAuth
} = require ('../controllers/auth')

const {
    addArtis,
    getArtiss,
    getArtis,
} = require ('../controllers/artis')

const {
    addMusic,
    getMusics,
    getMusic
} = require ('../controllers/music')

const {
    addTransaction,
    getTransactions,
    getTransaction,
    notification,
    updateTransaction
} = require ('../controllers/transaction')

const {
    getUsers,
    getUser
} = require ('../controllers/user')


// METHOD HERE
// users
router.get('/users', getUsers)
router.get('/user/:id', getUser)

// Transaction
router.post('/transaction',auth, addTransaction)
router.get('/transactions', getTransactions)
router.get('/transaction/:id', getTransaction)
router.patch('/transaction/:id', updateTransaction)

router.post('/notification', notification)

// Artis
router.post('/artis', addArtis)
router.get('/artiss', getArtiss)
router.get('/artis/:id', getArtis)

// Music
router.post('/music', auth, uploadFile('imageSong', 'fileSong'), addMusic)
router.get('/musics', getMusics)
router.get('/music/:id', getMusic)


// Validation user
router.post('/register', register)
router.post('/login', login)
router.get('/check-auth', auth, checkAuth)


// exports router
module.exports = router