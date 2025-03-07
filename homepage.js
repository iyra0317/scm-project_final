/*window.addEventListener('load', () => {
    // Get current time
    const now = new Date();
    const hours = now.getHours();
    let greeting;
  
    // Determine the greeting based on the time of day
    if (hours < 12) {
      greeting = "Good Morning!";
    } else if (hours >= 12 && hours < 18) {
      greeting = "Good Afternoon!";
    } else {
      greeting = "Good Evening!";
    }
  
    // Create a div to show the greeting
    const greetingDiv = document.createElement('div');
    greetingDiv.classList.add('greeting-message');
    greetingDiv.textContent = greeting + " Welcome to Job Pro!";
  
    // Add styles to the greeting div
    greetingDiv.style.position = 'fixed';
    greetingDiv.style.top = '20px';
    greetingDiv.style.right = '20px';
    greetingDiv.style.backgroundColor = '#343a40';
    greetingDiv.style.color = 'white';
    greetingDiv.style.padding = '15px';
    greetingDiv.style.borderRadius = '10px';
    greetingDiv.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    greetingDiv.style.zIndex = '1000';
    greetingDiv.style.fontSize = '1.2em';
  
    // Append the greeting div to the body
    document.body.appendChild(greetingDiv);
  
    // Remove the greeting message after 5 seconds
    setTimeout(() => {
      greetingDiv.remove();
    }, 5000);
  });
  window.addEventListener('load', () => {
    // Get current time
    const now = new Date();
    const hours = now.getHours();
    let greeting;
  
    // Determine the greeting based on the time of day
    if (hours < 12) {
      greeting = "Good Morning!";
    } else if (hours >= 12 && hours < 18) {
      greeting = "Good Afternoon!";
    } else {
      greeting = "Good Evening!";
    }*/
  
    const welcomeMessage = `${greeting} Welcome to Job Pro!`;
    document.getElementById('welcomeMessage').textContent = welcomeMessage;
  
    // Get the modal
    const modal = document.getElementById("welcomeModal");
  
    // Display the modal
    modal.style.display = "block";
  
    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];
  
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
  
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  
    // Auto-close the modal after 5 seconds
    setTimeout(() => {
      modal.style.display = "none";
    }, 5000);
  
  