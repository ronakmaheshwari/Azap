import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();
console.log("Connected to db");

async function main() {
    console.log("Seeding test...")
    const alice = await prisma.user.upsert({
        where:{number:'1111111111'},
        update:{},
        create:{
            number:'1111111111',
            name:'alice',
            password: await bcrypt.hash("Pass@123",10),
            Balance:{
                create:{
                    amount:20000,
                    locked:0
                }
            },
            OnRampTransaction:{
                create:{
                    startTime:new Date(),
                    status:"Success",
                    amount:20000,
                    token:"token_1",
                    provider:"HDFC"   
                }
            },
        },
    })

    const bob = await prisma.user.upsert({
        where:{number:'2222222222'},
        update:{},
        create:{
            number:'2222222222',
            name:'Bob',
            email:'bob@gmail.com',
            password:await bcrypt.hash("Pass@123",10),
            Balance:{
                create:{
                    amount:5000,
                    locked:0
                }
            },
            OnRampTransaction:{
                create:{
                    amount:2000,
                    startTime:new Date(),
                    status:'Failure',
                    token:"token_2",
                    provider:'ICIC'
                }
            }
        }
    })
    console.log(alice,bob);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error while seeding DB", e);
    await prisma.$disconnect();
    process.exit(1);
  });