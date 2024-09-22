import React, { useEffect, useState } from "react";

const Todolist = () => {

	const [list, setList] = useState([]);
	const [inputValue, setInputValue] = useState("")
	const [hoveredIndex, setHoveredIndex] = useState(null);
	
	useEffect(()=>{
		const verifySlug = async () => {
			const response = await fetch("https://playground.4geeks.com/todo/users?offset=0&limit=100");
			const data = await response.json();
		
			const exists = data.users.some(user => user.name === "santiagoe16");
		
			if (!exists) {
				await fetch("https://playground.4geeks.com/todo/users/santiagoe16", {method: 'POST'});
			}else{
				upadateList()
			}
		}
		verifySlug();
	},[])

	const upadateList = async () => {
		await fetch('https://playground.4geeks.com/todo/users/santiagoe16')
		.then(resp => {
			return resp.json();
		})
		.then(data => {
		setList(data.todos);
		})
	}
	

	const addTask = async (e) =>{
		
		if(e.key === "Enter"){
			if(inputValue.trim() !== ""){
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						"label": inputValue,
						"is_done": false
					})
				};
				await fetch('https://playground.4geeks.com/todo/todos/santiagoe16', requestOptions)
				await upadateList()
				
				setInputValue("")
			}
		}
	}

	const deleteTask = async (element) => {

		await fetch(`https://playground.4geeks.com/todo/todos/${element.id}`, {method: 'DELETE'})
		.then((response) => response.text())

		await upadateList()
	}

	const cleanTasks = async () =>{

		for (let item of list) {
			await fetch(`https://playground.4geeks.com/todo/todos/${item.id}`, {
			  method: 'DELETE',
			});
		}
		await upadateList()
	}
	
	return (
		<>
			<h1 className="d-flex justify-content-center">todos</h1>
			<div className="m-auto" id="list">
				<input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={addTask} placeholder="What needs to be done?"/>
				<ul>
					{list.map((element, index) => (<li onMouseEnter={()=>setHoveredIndex(index)} onMouseLeave={()=>setHoveredIndex(null)} key={index}>{element.label}<i style={{visibility: hoveredIndex === index ? 'visible' : 'hidden'}} className="fas fa-times mt-1 me-2 ms-2" onClick={() => deleteTask(element)}></i></li>))}
				</ul>
				<div className="d-flex justify-content-between align-items-center">
					<footer>{list.length} item left</footer>
					<button className="me-2 button-clear" onClick={cleanTasks}>Clear</button>
				</div>
			</div>
			<div className="decoration-1 m-auto"></div>
			<div className="decoration-2 m-auto"></div>
			
		</>
	);
};

export default Todolist;