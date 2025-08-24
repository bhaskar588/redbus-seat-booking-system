const TOTAL_SEATS = 60;
const seats = new Array(TOTAL_SEATS).fill(false);
let appExited = false;

// Pre-book first 50 seats
for (let i = 0; i < 50; i++) {
  seats[i] = true;
}

function showSeats() {
  if (appExited) return;

  const display = document.getElementById("seatsDisplay");
  let booked = 0;
  let available = 0;
  let html = "<h3>📋 Seat Status:</h3><ul>";

  for (let i = 0; i < TOTAL_SEATS; i++) {
    if (seats[i]) {
      booked++;
      html += `<li>Seat ${i + 1} - <span style="color: red;">Booked</span></li>`;
    } else {
      available++;
      html += `<li>Seat ${i + 1} - <span style="color: green;">Available</span></li>`;
    }
  }

  html += `</ul><p><strong>Total Booked Seats:</strong> ${booked}</p>`;
  html += `<p><strong>Total Available Seats:</strong> ${available}</p>`;

  if (available === 0) {
    html += `<p style="color: red;">❌ All seats are booked. No seats available.</p>`;
  }

  display.innerHTML = html;
  document.getElementById("message").innerHTML = "";
}

function promptBooking() {
  if (appExited) return;

  const input = prompt("Enter seat numbers to book (e.g., 51 52 53):");
  if (!input) return;

  const parts = input.trim().split(/\s+/);
  let bookedNow = 0;
  let messages = [];

  for (const part of parts) {
    const seatNumber = parseInt(part);
    if (isNaN(seatNumber)) {
      messages.push(`⚠ Invalid input: "${part}" is not a number.`);
    } else if (seatNumber < 1 || seatNumber > TOTAL_SEATS) {
      messages.push(`⚠ Seat ${seatNumber} is invalid (1 - ${TOTAL_SEATS}).`);
    } else if (seats[seatNumber - 1]) {
      messages.push(`❌ Seat ${seatNumber} is already booked.`);
    } else {
      seats[seatNumber - 1] = true;
      messages.push(`✅ Seat ${seatNumber} booked successfully!`);
      bookedNow++;
    }
  }

  const totalBooked = seats.filter(s => s).length;
  const totalAvailable = TOTAL_SEATS - totalBooked;

  if (bookedNow > 0) {
    messages.push(`🧾 ${bookedNow} seat(s) booked in this transaction.`);
  }
  messages.push(`Total booked seats: ${totalBooked}`);
  messages.push(`Remaining available seats: ${totalAvailable}`);

  document.getElementById("message").innerHTML = messages.join("<br>");
  document.getElementById("seatsDisplay").innerHTML = "";
}

function exitApp() {
  appExited = true;

  // Disable all buttons
  const buttons = document.querySelectorAll("#menu button");
  buttons.forEach(button => button.disabled = true);

  document.getElementById("message").innerHTML =
    "🙏 Thank you for using RedBus. Have a safe journey!";
  document.getElementById("seatsDisplay").innerHTML = "";
}
