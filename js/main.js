const button = document.querySelector('button');

async function getTwitchStreamData() {
  const inputValue = document.querySelector('input').value;
  const res = await fetch(`/api?streamer=${inputValue}`);
  const data = await res.json();

  console.log(data);
  document.querySelector('#handleName').textContent = data.handleName;
  document.querySelector('#realName').textContent = data.realName;
  document.querySelector('#type').textContent = data.streamType;
}

button.addEventListener('click', getTwitchStreamData);
