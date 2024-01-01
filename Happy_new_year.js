const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.targetY = Math.random() * canvas.height;
    this.sx = this.x;
    this.sy = this.y;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.size = Math.random() * 3 + 2;
    this.speed = Math.random() * 2 + 3;
    this.angle = Math.PI / 2;
    this.shrapnels = [];
    this.phase = 'rise';
  }
  
  rise() {
    this.sy -= this.speed;
    this.speed *= 0.98;

    if (this.sy <= this.targetY || this.speed <= 1) {
      this.phase = 'explode';
      this.explode();
    }
  }
  
  explode() {
    for (let i = 0; i < 50; i++) {
      this.shrapnels.push(new Shrapnel(this.sx, this.sy, this.color));
    }
    this.size = 0; // 将爆炸点大小设置为0
            // 播放爆炸音效
    var explosionSound = document.getElementById('explosion-sound');
    explosionSound.play();
  }
  
  fall() {
    this.shrapnels.forEach(shrapnel => shrapnel.fall());
    this.shrapnels = this.shrapnels.filter(shrapnel => shrapnel.light > 0);
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.sx, this.sy, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class Shrapnel {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color.match(/\d+/g);
    this.size = Math.random() * 2 + 1;
    this.speed = Math.random() * 6 + 2;
    this.angle = Math.random() * 2 * Math.PI;
    this.light = 1;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
    this.gravity = 0.02; // 降低重力影响
  }
  
  fall() {
    this.vx *= 0.98;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.light -= 0.007; // 减慢亮度减少的速度
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.light})`;
    ctx.fill();
  }
}

let fireworks = [];

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((firework, index) => {
    if (firework.phase === 'rise') {
      firework.rise();
    } else if (firework.phase === 'explode') {
      firework.fall();
      if (firework.shrapnels.length === 0) {
        fireworks.splice(index, 1);
      }
    }
    firework.draw();
    firework.shrapnels.forEach(shrapnel => shrapnel.draw());
  });
  requestAnimationFrame(animate);
}

animate();

setInterval(() => {
  fireworks.push(new Firework());
}, 900);


function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// 获取 URL 参数中的祝福信息和名字
var blessing = getParameterByName('blessing');
var name = getParameterByName('name');

if (name) {
    // 设置收信人的名字
    document.querySelector('.name-bold').textContent = name;
}

if (blessing) {
    // 显示个性化的祝福信息
    document.getElementById('personalizedBlessing').textContent = blessing;
}


const greeting = document.getElementById('greeting');
setInterval(() => {
  const color1 = `hsl(${Math.random() * 360}, 100%, 50%)`;
  const color2 = `hsl(${Math.random() * 360}, 100%, 50%)`;
  greeting.style.textShadow = `
    0 0 10px ${color1},
    0 0 20px ${color1},
    0 0 30px ${color1},
    0 0 40px ${color2},
    0 0 70px ${color2},
    0 0 80px ${color2},
    0 0 100px ${color2},
    0 0 150px ${color2}
  `;
}, 1000);

// 添加生成随机非红色的函数
function getRandomNonRedColor() {
    let hue = Math.floor(Math.random() * (330 - 30 + 1)) + 30;
    return `hsl(${hue}, 100%, 50%)`;
}



// 添加的按钮点击事件处理器
document.getElementById('startButton').addEventListener('click', function() {
    var audio = document.getElementById('explosion-sound');
    if (audio) {
        audio.play();
    }
});


    // WebSocket连接和消息处理代码
var socket = new WebSocket('ws://localhost:8080');

// document.getElementById('emailForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     var message = document.getElementById('message').value;
//     socket.send(message); // 通过 WebSocket 发送消息
// });

// document.getElementById('emailForm').addEventListener('submit', function(e) {
//   e.preventDefault(); // 阻止表单的默认提交行为
//   var formData = new FormData(this);

//   fetch(this.action, {
//       method: 'POST',
//       body: formData,
//   })
//   .then(response => {
//       if(response.ok) {
//           alert('祝福发送成功！');
//       } else {
//           throw new Error('服务器处理出错');
//       }
//   })
//   // .catch(error => {
//   //     alert('服务器故障，请截图此消息后以别的形式发送给我。');
//   // });
//   .catch(error => {
//   console.log(error); // 输出错误信息到控制台
// });
// });

// document.getElementById('emailForm').addEventListener('submit', function(e) {
//     e.preventDefault(); // 阻止表单的默认提交行为

//     // 从URL参数获取用户名
//     var name = getParameterByName('name');

//     // 设置隐藏字段的值
//     if (name) {
//         document.getElementById('senderInfo').value = "-- 来自 " + name + " 的新年祝福";
//     }
document.getElementById('emailForm').addEventListener('submit', function(e) {
    e.preventDefault(); // 阻止表单的默认提交行为

    var name = getParameterByName('name'); // 从URL获取用户名
    var senderInfoField = document.getElementById('senderInfo');
    if (name && senderInfoField) {
        senderInfoField.value = "-- 来自 " + name + " 的新年祝福";
    }
    var formData = new FormData(this);

    fetch(this.action, {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if(response.ok || response.status === 201 || response.status === 202) {
            alert('祝福发送成功！');
        } else {
            console.log('Response Status:', response.status);
            response.text().then(text => console.log('Response Body:', text));
            throw new Error('服务器处理出错');
        }
    })
    .catch(error => {
        console.error('Fetch Error:', error);
        alert('服务器故障，请截图此消息后以别的形式发送给我。');
    });
});


socket.onmessage = function(event) {
    event.data.text().then(function(text) {
        // 生成随机非红色
        var randomColor = getRandomNonRedColor();

        // 获取 recipientName 的文本内容
        var recipientNameElement = document.querySelector('.name-bold');
        var recipientName = recipientNameElement.textContent;

        // 构建消息并将 recipientName 的颜色设置为随机色
        var messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML += '<p>' + text + ' -- 来自 <span style="color:' + randomColor + '">' + recipientName + '</span> 的新年祝福</p>';
    });
};
