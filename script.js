
const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')
const headerButton = document.querySelector('.header-button')

let toDoData = localStorage.getItem('item') ? JSON.parse(localStorage.getItem('item')) : []
console.log(toDoData);
 
const render = function(){
	todoList.innerHTML = ''
	todoCompleted.innerHTML = ''
	
	toDoData.forEach(function(item,index){

	const li = document.createElement('li')
	li.classList.add('todo-item')	
	li.innerHTML = '<span class="text-todo">' + item.text +'</span>' +
	'<div class="todo-buttons">'+
	'<button class="todo-remove"></button>'+
	'<button class="todo-complete"></button>'+
	'</div>'

	if(item.completed){
		todoCompleted.append(li)
	}else{
		todoList.append(li)
	}

	li.querySelector('.todo-complete').addEventListener('click',function(){
		item.completed = !item.completed
		render()
	})
	//удаление по корзине
	li.querySelector('.todo-remove').addEventListener('click',function(){
		//если в массиве есть item,то удаляем из массива 1 элемент
		if(toDoData.includes(item)){
			toDoData.splice(index,1)
			li.remove()
		}
		
		localStorage.setItem('item', JSON.stringify(toDoData))
		render()
	})

	localStorage.setItem('item', JSON.stringify(toDoData))
	})
}

todoControl.addEventListener('submit',function(event){
	event.preventDefault()
	
	const newToDo = {
	text:headerInput.value,   
	completed:false
}
	console.log(headerInput.value === '');
	if(headerInput.value === '' ){
	headerButton.disabled = true
	
	}
	else{
		toDoData.push(newToDo)
		headerInput.value = ''
		render()
		}
		localStorage.setItem('item',JSON.stringify(toDoData))
	
})

render(toDoData) //Чтоб после загрузки страницы мы 1 раз все отрисовали)