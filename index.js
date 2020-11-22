const Discord = require('discord.js')
const client = new Discord.Client()
const axios = require('axios')

require('dotenv').config({
    path: `.env.development`
})

const prefix = "!-"

client.on('ready', () => {
    console.log('Arranco el Bot')
})

client.on('message', message => {
    if (message.author.bot) {
        console.log('entre a bot')
        return
    };
    if (!message.content.startsWith(prefix)) {
        console.log('entre a prefix')
        return
    };

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    console.log('commandBody ', commandBody)
    console.log('args ', args)
    console.log('command ', command)

    // Distingir operaciones

    let opt = ''
    const ayuda = "Funciones: " +
    "\nSuma: !-s num1 num2 ... " +
    "\nResta: !-r num1 num2 ... " +
    "\nMultiplicación: !-m num1 num2 ..." +
    "\nDivición: !-d num1 num2 ... "

    if(command == 'd'){
        console.log('Divicion')
        try {
            operaciones(args, 4).then(resp =>{
                if(isNaN(resp))
                    message.reply('Tipos de datos invalidos.')
                else if(!isFinite(resp))
                    message.reply('No se puede dividir entre 0.')
                else
                    message.reply(`${resp}`)
            })
        } catch (error) {
            message.reply('Algo salio mal.')
        }
    }else if(command == 's')
        opt = 1
    else if (command == 'r')
        opt = 2
    else if (command == 'm')
        opt = 3
    
    if(opt != ''){
        operaciones(args, opt).then(resp =>{
            console.log('Respuesta: ',resp)
            console.log('Tipo de la respuesta: ', typeof resp)
            if(isNaN(resp))
                message.reply('Tipos de datos invalidos.')
            else
                message.reply(`${resp}`)
        })
    }else
        message.reply(ayuda)
})

/* *********************************************
                    Operaciones
********************************************* */

const operaciones = async (args, tipo) =>{
    return new Promise( async resolve => {
        const numArgs = args.map(x => parseFloat(x))
        console.log(numArgs)
        let sum = ''

        switch (tipo) {
            case 1:
                console.log('Suma')
                sum = numArgs.reduce((counter, x) => counter += x)
                break
            case 2:
                console.log('Resta')
                sum = numArgs.reduce((counter, x) => counter -= x)
                break
            case 3:
                console.log('Multiplicacion')
                sum = numArgs.reduce((counter, x) => counter *= x)
                break
            case 4:
                console.log('Divicion')
                sum = numArgs.reduce((counter, x) => counter /= x)
                break
            default:
                break
        }
        resolve(sum)
    })
}

client.login(process.env.DISCORD_TOKEN)