const spaceship = "Titan";
let shipHealth = 100;
let credits = 1000;
let inventory = ["repairKit", "repairKit", "repairKit"];

function renderStatus() {
  console.log("Spaceship name: " + spaceship);
  console.log("Spaceship health: " + shipHealth);
  console.log("Spaceship credits: " + credits);
  console.log("Spaceship inventory: " + inventory);
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
}

function buyRepairKit() {
  if (credits >= 250) {
    credits = credits - 250;
    inventory.push("repairKit");
    console.log("Repair kit purchased! Credits left: " + credits);
  } else {
    console.log("Not enough credits to buy a repair kit.");
  }
}

function takeDamage() {
  if (shipHealth > 0) {
    shipHealth = shipHealth - 25;
    console.log("You took 25 damage. Health is now " + shipHealth);
    if (shipHealth === 0) {
      console.log("Your ship was destroyed. Game over!");
    }
  } else {
    console.log("Your ship was destroyed. Game over!");
  }
}
