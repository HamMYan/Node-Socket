const router = require('express').Router()
const { User } = require('../model/index');

router.get('/', async (req, res) => {
    const users = await User.find();
    res.render('index', { users });
});

router.get('/addUser', async (req, res) => {
    res.render('addUser');
})

router.post('/addUser', async (req, res) => {
    await User.create(req.body)
    res.render('addUser');
})

router.get('/chat/:id', async (req, res) => {
    const chats = await User.find({
        _id: { $ne: req.params.id },
    });
    res.render('chat',{chats,userId: req.params.id})
})

module.exports = router