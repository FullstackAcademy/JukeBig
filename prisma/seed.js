const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


const seed = async() => {
    try{ 
const userCount = 5;
const users = [];
for(let i =0; i < userCount; i++){
    const user = await prisma.user.create({
        data: {
            username: `user${i+1}`,
        },
    });
    users.push(user);
    }
    const trackCount = 20;
    const tracks = [];
    for ( let i = 0; i < trackCount; i++ ) {
        const track = await prisma.track.create({
            data: {
                name: `track${i+1}`,
            },
        });
        tracks.push(track);
    }
    const playlistCount = 10;
    for ( let i = 0; i < playlistCount; i++ ) {
        const randomUser = users[Math.floor(Math.random() * users.length)]
        const trackSet = tracks
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 5) + 1);
        await prisma.playlist.create({
            data: {
                name: `playlist${i+1}`,
                description: `Description for playlist${i+1}`,
                owner: {
                    connect: {id: randomUser.id},
                },
                tracks: {
                    connect: trackSet.map((track) => ({ id: track.id})),
                },
            },
        });
    }
    } catch (error) {
        console.error(error)
    } finally {
        await prisma.$disconnect();
    }
}




seed();