
    document.addEventListener('DOMContentLoaded', async function () {
      // Retrieve battery level from localStorage or set it to 100%
      let batteryLevel = localStorage.getItem('batteryLevel');

      if (batteryLevel === null) {
        batteryLevel = 100;
        localStorage.setItem('batteryLevel', batteryLevel);
      }

    //   function updateBatteryStatus() {
    //     // Update the battery status text
    //     document.getElementById('batteryStatus').innerText = `Battery Level: ${batteryLevel}%`;

    //     // Decrease the battery level by 1%
    //     batteryLevel -= 1;

    //     // Store the updated battery level in localStorage
    //     localStorage.setItem('batteryLevel', batteryLevel);

    //     // Check if the battery is still discharging
    //     if (batteryLevel < 0) {
    //       clearInterval(intervalId); // Stop the interval when the battery level is negative
    //       document.getElementById('batteryStatus').innerText = 'Battery Level: 0%'; // Set to 0% if it goes below
    //       batteryLevel=100;
    //     }
    //   }

    //   // Call updateBatteryStatus every minute
    //   const intervalId =setTimeout(updateBatteryStatus, 60000);
    //   // Initial call to update battery status immediately
    //   updateBatteryStatus();
    // let lastUpdateTimestamp = localStorage.getItem('lastUpdateTimestamp') || Date.now();

    // function updateBatteryStatus() {
    //     // Calculate time difference since the last update
    //     const currentTime = Date.now();
    //     const timeDifference = currentTime - lastUpdateTimestamp;

    //     // Update the battery level based on time elapsed (e.g., decrease by 1% every 60,000 milliseconds)
    //     const decreasePercentage = Math.floor(timeDifference / 60000);
    //     let batteryLevel = 100 - decreasePercentage;

    //     // Ensure battery level is not negative
    //     batteryLevel = Math.max(0, batteryLevel);

    //     // Update the battery status text
    //     document.getElementById('batteryStatus').innerText = `Battery Level: ${batteryLevel}%`;

    //     // Store the current timestamp in localStorage for the next update
    //     localStorage.setItem('lastUpdateTimestamp', currentTime);

    //     // Check if the battery is still discharging
    //     if (batteryLevel > 0) {
    //       // Schedule the next update using requestAnimationFrame
    //       requestAnimationFrame(updateBatteryStatus);
    //     }
    //   }
    //   updateBatteryStatus();

    // const randomNumber = Math.floor(Math.random() * 101);

    batteryLevel=100;
    for(let i=0;i<100;i++) {
        document.getElementById('batteryStatus').innerText = `Battery Level: ${batteryLevel}%`;
        batteryLevel--;
        await new Promise(resolve => setTimeout(resolve, 60000)); // Adjust the delay as needed

    }
    

    });
  