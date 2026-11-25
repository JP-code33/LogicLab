const circuitCanvas = document.getElementById("circuitCanvas")
const emptyMessage = document.getElementById("emptyMessage")
const propertiesContent = document.getElementById("propertiesContent")
const simulationStatus = document.getElementById("simulationStatus")
const components = []
let selectedComponentId = null
let nextComponentId = 1

const gateNames = {INPUT: "Input Switch", OUTPUT: "Output LED", AND: "AND gate", OR: "OR gate", NOT: "NOT gate", XOR: "XOR gate", NAND: "NAND gate", NOR: "NOR gate"}
document.querySelectorAll(".componentButton").forEach((button) => {
    button.addEventListener("click", () => {
        addComponent(button.dataset.component)
    })
})

function addComponent(type) {
    const component = {id: nextComponentId, type: type, name: gateNames[type], x: 30 +(components.length % 4) * 155, y: 35 + Math.floor(components.length / 4) * 100, value: false}    
    nextComponentId++
    components.push(component)
    drawComponents();
    selectComponent(component.id)
    simulationStatus.textContent = "Component added"
}

function drawComponents() {
    circuitCanvas.querySelectorAll(".circuitComponent").forEach((item) => {
        item.remove()
    })
    emptyMessage.hidden = components.length > 0
    components.forEach((component) => {
        const componentCard = document.createElement("button")
        componentCard.type = "button"
        componentCard.className = "circuitComponent"
        componentCard.dataset.id = component.id
        componentCard.style.cssText = `position: absolute; left: ${component.x}px; top: ${component.y}px; min-width: 110px; min-height: 58px; padding: 10px; border: 1px solid #466071; border-radius: 9px; background: #29031d; color: #edf4f7; text-align: center;`
        const signalText = component.type === "INPUT" ? (component.value ? "Signal:1" : "Signal:0") : component.name
        componentCard.textContent = signalText
        if (component.id === selectedComponentId) {
            componentCard.style.borderColor = "#72e3b0"
        }
        if(component.type === "INPUT" && component.value) {
            componentCard.style.background = "#285642"
        }
        componentCard.addEventListener("click", () => {
            if(component.type === "INPUT") {
                component.value = !component.value
                simulationStatus.textContent = "Input changed"
                drawComponents()
            }
            selectComponent(component.id)
        })
        circuitCanvas.appendChild(componentCard)
    })
}

function selectComponent(id) {
    selectedComponentId = id
    const component = components.find((item) => item.id === id)
    if (!component) {
        propertiesContent.innerHTML = `<p class="helpText">Select a component to edit its seetings.</p>`
        drawComponents()
        return
    }
    propertiesContent.replaceChildren()
    const title = document.createElement("h3")
    title.textContent = component.name
    const details = document.createElement("p")
    details.className = "helpText"
    details.textContent = `Component ID: ${component.id}`
    propertiesContent.append(title, details)

    if(component.type === "INPUT") {
        const valueLabel = document.createElement("p")
        valueLabel.className = "helpText"
        valueLabel.textContent = `Current input: ${component.value ? 1 : 0}`
        propertiesContent.appendChild(valueLabel)
    }
    const deleteButton = document.createElement("button")
    deleteButton.className = "secondaryButton"
    deleteButton.textContent = "Delete component"
    
    deleteButton.addEventListener("click", () => {
        const componentIndex = components.findIndex((item) => item.id === selectedComponentId)
        if(componentIndex !== -1) {
        components.splice(componentIndex, 1)
        }
        selectedComponentId = null
        selectComponent(null)
        drawComponents()
        simulationStatus.textContent = "Component deleted"
    })
    propertiesContent.appendChild(deleteButton)
    drawComponents()
}

document.getElementById("clearButton").addEventListener("click", () => {
    components.length = 0
    selectedComponentId = null
    selectComponent(null)
    drawComponents()
    document.getElementById("truthTableContainer").replaceChildren()
    simulationStatus.textContent = "Workspace cleared"
})
drawComponents();

