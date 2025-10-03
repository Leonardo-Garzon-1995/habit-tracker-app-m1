const habitForm = document.querySelector(".input-section")
const inputHabit = document.querySelector("#input-habit")
const addBtn = document.querySelector(".add-btn")
const habitTextItem = document.querySelector(".habit-text")
const deleteAllBtn = document.querySelector(".delete-all-btn")

let allItems = []
let itemId = 0


window.addEventListener("DOMContentLoaded", () => {
    getItems()
    updateList()
})

habitForm.addEventListener("submit", (e) => {
    e.preventDefault()
    addHabit()
    saveItems()
})

// add habit item 
function addHabit() {
    let habitText = inputHabit.value.trim()
    if (habitText.length > 0) {
        const inputObj = {
            id: generateId(),
            text: habitText,
            completed: false
        }
        allItems.push(inputObj) 
        createHabitItem(inputObj)
    }
    
    inputHabit.value = "" 
}

function generateId() {
    for (let t of allItems) {
        if (t.id === itemId) {
            itemId++
        }
    }
    return itemId
}

function createHabitItem(item) {
    const habitsList = document.querySelector(".habits-list")
    const newHabit = document.createElement("li")
    newHabit.classList.add("habit-item")
    let attrChecked = item.completed ? "checked" : ""
    newHabit.innerHTML = `
        <input class="input-checkbox" type="checkbox" id="habit-${item.id}" ${attrChecked}>
        <label for="habit-1" class="habit-text">${item.text}</label>
        <button class="delete-item-btn">
            <i class="fa-solid fa-trash"></i>
        </button>
    `
    habitsList.appendChild(newHabit)
}

function saveItems() {
    localStorage.setItem("habit-item", JSON.stringify(allItems))
}

function getItems() {
    const savedItems = localStorage.getItem("habit-item")
    if (savedItems) {
        allItems = JSON.parse(savedItems)
    }
}

function updateList() {
    const habitsList = document.querySelector(".habits-list")
    habitsList.innerHTML = ""
    allItems.forEach(i=> {
        createHabitItem(i.text)
    })
}

deleteAllBtn.addEventListener("click", () => {
    allItems = []
    updateList()
    localStorage.clear()
})

