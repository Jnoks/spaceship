const spaceship = "Titan";
let shipHealth = 100;
let credits = 1000;
const inventory = ["repairKit", "repairKit", "repairKit"];

function renderStatus() {
  document.getElementById("stats").innerHTML = /*html*/ `
    <h2>Stats</h2>
    <table>
        <tr>
          <td>Name</td>
          <td>${spaceship}</td>
        </tr>
        <tr>
          <td>Health</td>
          <td>${shipHealth}</td>
        </tr>
        <tr>
          <td>Credits</td>
          <td>${credits}</td>
        </tr>
        <tr>
          <td>Inventory</td>
          <td>${inventory}</td>
        </tr>
    </table>
  `;
}

function useRepairKit() {
  if (inventory.length <= 0) {
    // Keine Repair Kits übrig anzeigen
    renderStatus();
    return;
  }
  if (shipHealth >= 100) {
    // Health ist bereits voll anzeigen
    renderStatus();
    return;
  }
  inventory.pop();
  shipHealth = shipHealth + 50;
  if (shipHealth > 100) {
    shipHealth = 100;
  }
  // Erfolgreiche Reparatur auf der Seite anzeigen
  renderStatus();
}

function buyRepairKit() {
  const amount = Number(document.getElementById("repairkit-input").value);
  if (amount <= 0) {
    // Ungültige Eingabe auf der Seite anzeigen
    renderStatus();
    return; // Guard Clause = Verhindert ungültige Werte
  }
  const totalCost = amount * 250;
  if (credits >= totalCost) {
    credits = credits - totalCost;
    for (let i = 0; i < amount; i++) {
      inventory.push("repairKit");
    }
    // Anzeigen auf der Seite das etwas gekauft wurde
  } else {
    //Nicht genug geld anzeigen auf der seite
  }
  renderStatus();
}

function takeDamage() {
  const damage = Number(document.getElementById("damage-input").value);
  if (damage <= 0) {
    // Ungültige Eingabe auf der Seite anzeigen
    renderStatus();
    return;
  }
  if (shipHealth <= 0) {
    // Schiff ist bereits zerstört anzeigen
    renderStatus();
    return;
  }
  shipHealth = shipHealth - damage;
  if (shipHealth < 0) {
    shipHealth = 0;
  }
  if (shipHealth === 0) {
    // Game over auf der Seite anzeigen
  } else {
    // Erlittenen Schaden auf der Seite anzeigen
  }
  renderStatus();
}

renderStatus();
