const personalizedBlessings = {
    '李芊': '新年快乐！愿你的每一天都充满阳光。也感谢有你的陪伴，科研顺利！',
    '肖雨琳': '元旦快乐！愿你在新的一年，身心皆健康，始终保持对生活的热爱，能去想去的地方，吃更多好吃的。',
    '马玥': '愿你在新的一年里梦想成真，快乐无边。傻x烦人的家长学生嘎嘎少，工资蹭蹭涨！',
    '王爽': '新年到，愿你事事顺心，快乐常在。早日回归，升职加薪！',
    '辛雯': '愿新的一年带给你无限的幸福和喜悦。在保持身心健康的基础上能去更多的地方看看，毕竟世界那么大。',
    '黄凌昕': '愿新的一年，你能保持身心愉悦，尽量多得做你想做的，不要犹豫，也不要害怕失去。',
    '张茹双': '愿新的一年带给你无限的幸福和喜悦。记得要在身心健康的基础上，秉持热爱，勇往无前，也期待你早日升级为张老师。',
    '孙庆': '慕然回首又一年，不知不觉我们认识已经快十年，哈哈哈哈，感谢你的包容和陪伴！愿新的一年，你工作顺心，家庭和睦，希望下个十年我们依旧在一起。另外，我的干女儿啥时候能让我见着捏，迫不及待了。'
    // 为其他人添加更多祝福
};

document.getElementById('nameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById('nameInput').value.trim();
    var blessing = personalizedBlessings[name];

    if (name && blessing) {
        window.location.href = 'home.html?name=' + encodeURIComponent(name) + '&blessing=' + encodeURIComponent(blessing);
    } else {
        alert('抱歉！你的新年祝福还没来得及送达！敬请期待..');
    }
});

