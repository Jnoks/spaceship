const spaceship = "Titan";
let shipHealth = 100;
let credits = 1000;
let repairKits = 3;

function getStatus() {
  console.log("Spaceship name: " + spaceship);
  console.log("Spaceship health: " + shipHealth);
  console.log("Spaceship credits: " + credits);
  console.log("Spaceship repair kits: " + repairKits);
}

function useRepairKit() {
  if (repairKits > 0) {
    repairKits = repairKits - 1;
    shipHealth = shipHealth + 50;
    if (shipHealth > 100) {
      shipHealth = 100;
    }
    console.log(
      "The spaceship was repaired. +50 health! Health is now " + shipHealth,
    );
  } else {
    console.log("No repair kits left.");
  }
}

function buyRepairKit() {
  if (credits >= 250) {
    credits = credits - 250;
    repairKits = repairKits + 1;
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
