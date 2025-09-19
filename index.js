const habitForm = document.querySelector(".input-section")
const inputHabit = document.querySelector("#input-habit")
const addBtn = document.querySelector(".add-btn")
const habitTextItem = document.querySelector(".habit-text")
const deleteAllBtn = document.querySelector(".delete-all-btn")

let allItems = []

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
    let habitText = inputHabit.value
    if (habitText.length > 0) {
        const inputObj = {
            text: habitText,
            completed: false
        }
        allItems.push(inputObj)
    }
    createHabitItem(habitText)
    inputHabit.value = "" 
}

function createHabitItem(text) {
    const habitsList = document.querySelector(".habits-list")
    const newHabit = document.createElement("li")
    newHabit.classList.add("habit-item")
    newHabit.innerHTML = `
        <input class="input-checkbox" type="checkbox" id="habit-1">
        <label for="habit-1" class="habit-text">${text}</label>
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
    allItems.forEach(item => {
        createHabitItem(item.text)
    })
}

deleteAllBtn.addEventListener("click", () => {
    allItems = []
    updateList()
    localStorage.clear()
})

