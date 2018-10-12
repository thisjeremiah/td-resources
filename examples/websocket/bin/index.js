const WebSocket = require('ws')

const PORT = 7000

const wss = new WebSocket.Server({
  port: PORT,
})

console.log('WebSocket server started')

wss.on('connection', ws => {
  console.log('WebSocket connected')

  ws.on('message', _message => {
    // Handle messages from the client
  })

  ws.on('error', error => {
    console.error('WebSocket error')
    console.error(error)
  })

  ws.on('close', () => {
    console.error('WebSocket closed')
  })
})

const broadcastMessage = message => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      const messageString = JSON.stringify(message)
      client.send(messageString)
      return
    }
  })
}

const textList = ['Apple', 'Orange', 'Banana', 'Kiwi']
let textCounter = 0
function nextText() {
  textCounter += 1
  return textList[textCounter % textList.length]
}

// Every 3 seconds, change name and color
setInterval(() => {
  broadcastMessage({
    event: 'SET_STATE',
    body: {
      name: 'text',
      value: nextText(),
    },
  })
  broadcastMessage({
    event: 'SET_STATE',
    body: {
      name: 'r',
      value: Math.random(),
    },
  })
  broadcastMessage({
    event: 'SET_STATE',
    body: {
      name: 'g',
      value: Math.random(),
    },
  })
  broadcastMessage({
    event: 'SET_STATE',
    body: {
      name: 'b',
      value: Math.random(),
    },
  })
}, 3000)
