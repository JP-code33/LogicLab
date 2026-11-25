const circuitCanvas = document.getElementById("circuitCanvas")
const emptyMessage = document.getElementById(emptyMessage)
const propertiesContent = document.getElementById("propertiesContent")
const simulationStatus = document.getElementById("simulationStatus")
const components = []
let selectedComponentID = null
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
    selectedComponent(component.id)
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
        componentCard.style.cssText = `position: absolute; left: ${component.x}px; top: ${component.y}px; min-width: 110px; min-height: 58px; padding: 10px; border: 1px solid #466071; border-radius = 9px; background: #29031d; color: #edf4f7; text-align: center;`
        
    })
}

