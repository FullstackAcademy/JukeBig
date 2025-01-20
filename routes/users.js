const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        console.log(users)
        res.json(users); 
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try{
        const user = await prisma.user.findUnique({
            where: { id: parseInt(req.params.id)},
            include: {playlists: true},
        });
        if (!user) return res.status(404).json({ error: 'user not found'})
            res.json(user);
    } catch (error){
        next(error);
    }
});

module.exports = router;