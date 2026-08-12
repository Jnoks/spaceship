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
  if (shipHealth < 100 && inventory.length > 0) {
    inventory.pop();
    shipHealth = shipHealth + 50;
    if (shipHealth > 100) {
      shipHealth = 100;
    }
    console.log(
      "The spaceship was repaired. +50 health! Health is now " + shipHealth,
    );
  } else if (inventory.length <= 0) {
    console.log("No repair kits left.");
  } else if (shipHealth === 100) {
    console.log("Health is already at 100");
  }
  renderStatus();
}

function buyRepairKit() {
  if (credits >= 250) {
    credits = credits - 250;
    inventory.push("repairKit");
    console.log("Repair kit purchased! Credits left: " + credits);
  } else {
    console.log("Not enough credits to buy a repair kit.");
  }
  renderStatus();
}

function takeDamage() {
  if (shipHealth > 0) {
    const damage = Number(document.getElementById("damage-input").value);
    shipHealth = shipHealth - damage;
    if (shipHealth < 0) {
      shipHealth = 0;
    }
  } else {
  }
  renderStatus();
}

renderStatus();
