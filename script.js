const spaceship = "Titan";
let shipHealth = 100;
let credits = 1000;
const inventory = ["shield", "repairKit", "repairKit", "repairKit"];
const ITEM_ICONS = {
  repairKit: "./assets/img/icons/repairKit.png",
  shield: "./assets/img/icons/shield.png",
  credits: "./assets/img/icons/credits.png",
};
const ITEM_NAMES = {
  repairKit: "Repair Kit",
  shield: "Shield",
  credits: "Credits",
};

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
          <td><div class="progress-bar"><div class="progress" style="width:${shipHealth}%">${shipHealth}%</div></div></td>
        </tr>
        <tr>
          <td>CREDITS</td>
          <td><img class="icons" src="${ITEM_ICONS.credits}">${credits}</td>
        </tr>
        <tr>
          <td>INVENTORY</td>
          <td>${getInventoryIcons()}</td>
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

function buyItem(item, price, inputId) {
  const amount = Number(document.getElementById(inputId).value);
  if (amount <= 0) {
    showMessage("Please enter a valid amount.");
    renderStatus();
    return;
  }
  const totalCost = amount * price;
  if (credits >= totalCost) {
    credits = credits - totalCost;
    for (let i = 0; i < amount; i++) {
      inventory.push(item);
    }
    showMessage(amount + " " + item + "(s) purchased!");
  } else {
    showMessage("Not enough credits for " + amount + " " + item + "(s).");
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
    document.getElementById("attack").disabled = true;
    document.getElementById("buy-repairkit").disabled = true;
    document.getElementById("buy-shield").disabled = true;
    document.getElementById("use-repairkit").disabled = true;
    showMessage("Your ship was destroyed. Game over!");
  }
  renderStatus();
}

function reset() {
  shipHealth = 100;
  credits = 1000;
  inventory.splice(0, inventory.length);
  inventory.push("shield", "repairKit", "repairKit", "repairKit");
  document.getElementById("attack").disabled = false;
  document.getElementById("buy-repairkit").disabled = false;
  document.getElementById("buy-shield").disabled = false;
  document.getElementById("use-repairkit").disabled = false;
  showMessage("");
  renderStatus();
}

function getInventoryIcons() {
  let html = "";
  for (let i = 0; i < inventory.length; i++) {
    html += /*html*/ `
      <img class="icons" src="${ITEM_ICONS[inventory[i]]}" title="${ITEM_NAMES[inventory[i]]}">
    `;
  }
  return html;
}

renderStatus();
getInventoryIcons();
