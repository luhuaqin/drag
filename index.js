// 左侧拖放元素区域
const dragEl = document.querySelector('#dragDiv')

dragEl.ondragover = e => {
  e.preventDefault()
}

// 左侧区域拖放
dragEl.ondrop = e => {
  if(listDrag) {
    dragEl.appendChild(listDrag);
    listDrag = null
  }
}

// 左侧需要被拖拽元素
let dragged = null;
dragEl.ondragstart = e => {
  dragged = e.target;
}

const dropDivEl = document.querySelector('#sortable')
// 排序区域拖拽元素
let listDrag = null;
dropDivEl.ondragstart = e => {
  listDrag = e.target;
}

dropDivEl.ondragover = e => {
  e.preventDefault()
}

// 排序区域拖放
let dropEl = null
dropDivEl.ondrop = e => {
  // 拖放区域元素，外部拖拽进来时为ul，内部排序为li
  dropEl = e.target;
  // 判断元素是否为外部拖拽元素
  if(dragged) {
    // 如果是外部拖拽进来，判定为新元素，则添加为ul子元素
    dropDivEl.appendChild(dragged)
    dragged = null
  }else {
    // 不是外部拖拽进来的元素，代表是内部拖拽排序，则元素互换位置
    let dragIdx = getIndex(listDrag);
    let dropIdx = getIndex(dropEl);
    if(dropEl.tagName === 'LI') {
      if(dragIdx > dropIdx) {
        dropDivEl.insertBefore(listDrag, dropEl)
      }else {
        dropDivEl.insertBefore(listDrag, dropEl.nextSibling)
      }
    }
  }
}

const getIndex = (el) => {
  let index = 0;
  // previousElementSibling：获取上一个兄弟元素
  while(el = el.previousElementSibling) {
    index ++;
  }
  return index
}

const save = () => {
  const list = document.querySelector('#sortable')
  const contentArr = [];
    list.childNodes.forEach(item => {
    console.log(item, item.innerHTML, item.innerText)
    contentArr.push(item.innerText)
  })
  console.log(contentArr);
}