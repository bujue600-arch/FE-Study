import '../style/div_style.css'

const divEl = document.createElement('div')
divEl.innerHTML = '这是一个div组件'
divEl.className = 'div-cpn'
document.body.appendChild(divEl)