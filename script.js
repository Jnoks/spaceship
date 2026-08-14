const spaceship = "Titan";
let shipHealth = 100;
let credits = 1000;
const inventory = ["shield", "repairKit", "repairKit", "repairKit"];

function renderStatus() {
  document.getElementById("stats").innerHTML = /*html*/ `
    <h2>STATS</h2>
    <table>
        <tr>
          <td>NAME</td>
          <td>${spaceship}</td>
        </tr>
        <tr>
          <td>HEALTH</td>
          <td>${shipHealth}</td>
        </tr>
        <tr>
          <td>CREDITS</td>
          <td>${credits}</td>
        </tr>
        <tr>
          <td>INVENTORY</td>
          <td>${inventory.join(", ")}</td>
        </tr>
    </table>
  `;
  if (shipHealth <= 0) {
    document.body.classList.add("destroyed");
    document.getElementById("game-over").classList.remove("hidden");
  } else {
    document.body.classList.remove("destroyed");
    document.getElementById("game-over").classList.add("hidden");
  }
}

function showMessage(text) {
  document.getElementById("message").innerHTML =
    '<span class="prompt">> </span>' + text;
}

function useRepairKit() {
  const index = inventory.indexOf("repairKit");
  if (index == -1) {
    showMessage("No repair kits left.");
    renderStatus();
    return;
  }
  if (shipHealth >= 100) {
    showMessage("Health is already at 100.");
    renderStatus();
    return;
  }
  inventory.splice(index, 1);
  shipHealth = shipHealth + 50;
  if (shipHealth > 100) {
    shipHealth = 100;
  }
  showMessage("The spaceship was repaired. +50 health!");
  renderStatus();
}

function buyRepairKit() {
  const amount = Number(document.getElementById("repairkit-input").value);
  if (amount <= 0) {
    showMessage("Please enter a valid amount.");
    renderStatus();
    return;
  }
  const totalCost = amount * 100;
  if (credits >= totalCost) {
    credits = credits - totalCost;
    for (let i = 0; i < amount; i++) {
      inventory.push("repairKit");
    }
    showMessage(amount + " repair kit(s) purchased!");
  } else {
    showMessage("Not enough credits for " + amount + " repair kits.");
  }
  renderStatus();
}

function buyShield() {
  const amount = Number(document.getElementById("shield-input").value);
  if (amount <= 0) {
    showMessage("Please enter a valid amount.");
    renderStatus();
    return;
  }
  const totalCost = amount * 50;
  if (credits >= totalCost) {
    credits = credits - totalCost;
    for (let i = 0; i < amount; i++) {
      inventory.push("shield");
    }
    showMessage(amount + " shield(s) purchased!");
  } else {
    showMessage("Not enough credits for " + amount + " a shield(s).");
  }
  renderStatus();
}

function takeDamage() {
  let damage = Number(document.getElementById("damage-input").value);
  if (damage <= 0) {
    showMessage("Please enter a valid amount.");
    renderStatus();
    return;
  }
  if (shipHealth <= 0) {
    showMessage("Your ship is already destroyed.");
    renderStatus();
    return;
  }
  const index = inventory.indexOf("shield");
  if (index !== -1) {
    inventory.splice(index, 1);
    damage = damage / 2;
    showMessage(
      "You took " +
        damage +
        " damage. Damage was reduced by 50% due to a shield",
    );
  } else {
    showMessage("You took " + damage + " damage.");
  }
  shipHealth = shipHealth - damage;
  if (shipHealth < 0) {
    shipHealth = 0;
  }
  if (shipHealth === 0) {
    showMessage("Your ship was destroyed. Game over!");
  }
  renderStatus();
}

renderStatus();
