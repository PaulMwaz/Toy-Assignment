function calculateDemeritPoints(speed) {
    const speedLimit = 70;
    const kmPerDemeritPoint = 5;
    let demeritPoints = 0;

    if (speed < speedLimit) {
        console.log("Ok");
    } else {
        let excessSpeed = speed - speedLimit;
        demeritPoints = Math.floor(excessSpeed / kmPerDemeritPoint);
        console.log(`Demerit points: ${demeritPoints}`);

        if (demeritPoints > 12) {
            console.log("License suspended");
        }
    }

    return demeritPoints;
}

const inputSpeed = prompt("Enter the speed of the car (km/h):");
const speed = parseFloat(inputSpeed);

if (!isNaN(speed)) {
    calculateDemeritPoints(speed);
} else {
    console.log("Invalid input. Please enter a valid number.");
}
  