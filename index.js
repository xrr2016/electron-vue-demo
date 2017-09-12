const socket = new WebSocket('ws://localhost:8000/')
const messages = document.querySelector('.messages')
const sendBtn = document.getElementById('send')

const showMessage = function (type, data) {
  const msg = document.createElement('p')  
  switch (type) {
    case 'enter':
      msg.style.color = 'blue'
      break
    case 'leave':
      msg.style.color = 'red'
      break
    default:
      msg.style.color = 'black'
      break
  }
  msg.innerHTML = data
  messages.appendChild(msg)
}

socket.addEventListener('open', function () {
  console.log('websocket open')
  sendBtn.addEventListener('click', function () {
    const text = document.getElementById('text').value
    if (text) {
      socket.send(text)
    }
  })
})


socket.addEventListener('message', function (event) {
  const msg = JSON.parse(event.data)
  showMessage(msg.type, msg.data)
})

socket.addEventListener('close', function () {
  console.log('websocket close')
})