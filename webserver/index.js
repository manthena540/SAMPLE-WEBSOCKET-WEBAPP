const http = require('http')
const {WebSocketServer} = require ('ws')


const url = require('url')

const uuidv4 = require("uuid").v4

const server = http.createServer()

const wsServer = new WebSocketServer({server})

const port = 8000


const connections ={ }
const users = { }


const broadcast = () =>{
    Object.keys(connections).forEach(uuid =>{
        const connection = connections[uuid]
        const message = JSON.stringify(users)
        connection.send(message)
    })
    
}

//message state
const handleMessage = (bytes, uuid) =>{
    //mesage:  {"x":0,"y":100}

    const message=JSON.parse(bytes.toString())
    const user = users[uuid]
    user.state=message

    broadcast()

    console.log(`${user.username} updated their state: ${JSON.stringify(user.state)}`)
    //user
    //user.state.x = message.x
    //user.state.y = message.y
    //user.username
    //user.state = message

}


const handleClose = uuid =>{


console.log(`${users[uuid].username} disconnected`)
   delete connections[uuid]
   delete users[uuid]

   broadcast()

}


wsServer.on("connection",(connection, request)=>{
    // ws://localhost8000?usernmae=prasad

    const {username} = url.parse(request.url,true).query
    const uuid = uuidv4()
    console.log(username)
    console.log(uuid)
    //broadcast //fanout

    connections[uuid] = connection
//jonson.stringfy
    
    users[uuid] = {
       username,
        state:{ }
    }


    connection.on("message",message=>handleMessage(message,uuid))
    connection.on("close",()=>handleClose(uuid))


})

server.listen(port,()=>{
    console.log(`websocker server is running on port ${port} `)
})



