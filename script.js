
/* =====================================================
   TABISH & SHIFA WEDDING INVITATION
   Complete JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     1. ENVELOPE OPENING AND INVITATION TRANSITION
  ===================================================== */

  const openingScreen = document.getElementById("openingScreen");
  const invitation = document.getElementById("invitation");

  if (openingScreen && invitation) {

    // Keep the main invitation hidden until the envelope opens.
    invitation.classList.add("hidden");

    // Start the transition after the envelope animation.
    window.setTimeout(function () {

      openingScreen.classList.add("is-gone");

      invitation.classList.remove("hidden");
      invitation.setAttribute("aria-hidden", "false");

      // Remove the opening screen after its fade-out.
      window.setTimeout(function () {
        openingScreen.style.display = "none";
      }, 1100);

    }, 5300);

  } else {
    console.error(
      "Opening screen or invitation element not found. Check the HTML IDs."
    );
  }


  /* =====================================================
     2. LIVE WEDDING COUNTDOWN
     Countdown target: Dawat-e-Walima, 26 December 2026, 7 PM IST
  ===================================================== */

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  const weddingDate = new Date(
    "2026-12-26T19:00:00+05:30"
  ).getTime();

  function updateCountdown() {

    if (
      !daysElement ||
      !hoursElement ||
      !minutesElement ||
      !secondsElement
    ) {
      return;
    }

    const now = Date.now();
    const difference = weddingDate - now;

    if (difference <= 0) {

      daysElement.textContent = "00";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";

      return;
    }

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
      (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
      (difference / 1000) % 60
    );

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");

  }

  updateCountdown();

  window.setInterval(updateCountdown, 1000);


  /* =====================================================
     3. ADD BOTH WEDDING EVENTS TO CALENDAR
  ===================================================== */

  const calendarButton = document.getElementById("calendarButton");

  if (calendarButton) {

    calendarButton.addEventListener("click", function () {

      const calendarContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Tabish and Shifa//Dawat-e-Walima Invitation//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "BEGIN:VEVENT",
        "UID:tabish-shifa-walima-20261226@example.com",
        "DTSTAMP:20261110T000000Z",
        "DTSTART;TZID=Asia/Kolkata:20261226T190000",
        "DTEND;TZID=Asia/Kolkata:20261226T220000",
        "SUMMARY:Dawat-e-Walima - Tabish and Shifa",
        "LOCATION:Alpa Bachat Sanskrutik Bhavan, Queens Garden, Camp, Pune 411001",
        "DESCRIPTION:Please join us for the Dawat-e-Walima of Tabish and Shifa.",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const calendarBlob = new Blob(
        [calendarContent],
        {
          type: "text/calendar;charset=utf-8"
        }
      );

      const downloadURL = URL.createObjectURL(calendarBlob);

      const downloadLink = document.createElement("a");

      downloadLink.href = downloadURL;
      downloadLink.download = "Tabish-and-Shifa-Walima.ics";

      document.body.appendChild(downloadLink);

      downloadLink.click();

      downloadLink.remove();

      window.setTimeout(function () {
        URL.revokeObjectURL(downloadURL);
      }, 1000);

    });

  }


  /* =====================================================
     4. REAL SCRATCH-TO-REVEAL DATE CARD
  ===================================================== */

  const scratchCanvas = document.getElementById("scratchCanvas");

  const scratchCard = document.getElementById("scratchCard");

  const scratchInstruction = document.getElementById(
    "scratchInstruction"
  );

  const revealButton = document.getElementById(
    "revealDateButton"
  );

  if (scratchCanvas && scratchCard) {

    const ctx = scratchCanvas.getContext("2d", {
      willReadFrequently: true
    });

    let isScratching = false;
    let isRevealed = false;
    let lastProgressCheck = 0;

    /* ---------------------------------------------
       Paint the opaque scratch coating
    --------------------------------------------- */

    function setupScratchCard() {

      if (isRevealed) return;

      const rect = scratchCard.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      const dpr = Math.max(
        1,
        window.devicePixelRatio || 1
      );

      scratchCanvas.width = Math.round(rect.width * dpr);
      scratchCanvas.height = Math.round(rect.height * dpr);

      scratchCanvas.style.width = rect.width + "px";
      scratchCanvas.style.height = rect.height + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.globalCompositeOperation = "source-over";

      // Rose-gold metallic-looking coating.
      const gradient = ctx.createLinearGradient(
        0,
        0,
        rect.width,
        rect.height
      );

      gradient.addColorStop(0, "#51405E");
      gradient.addColorStop(0.25, "#D6B8A7");
      gradient.addColorStop(0.5, "#F1E5E4");
      gradient.addColorStop(0.75, "#B98B91");
      gradient.addColorStop(1, "#302039");

      ctx.fillStyle = gradient;

      ctx.fillRect(
        0,
        0,
        rect.width,
        rect.height
      );

      // Fine decorative texture.
      for (let i = 0; i < 450; i++) {

        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          Math.random() * 1.2,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = "rgba(255,255,255,0.22)";
        ctx.fill();

      }

      // Scratch card text.
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillStyle = "#302039";
      ctx.font = "600 12px sans-serif";

      ctx.fillText(
        "✧  SCRATCH TO REVEAL  ✧",
        rect.width / 2,
        rect.height / 2 - 10
      );

      ctx.fillStyle = "#51405E";
      ctx.font = "10px sans-serif";

      ctx.fillText(
        "A SPECIAL DATE AWAITS",
        rect.width / 2,
        rect.height / 2 + 14
      );

      // Switch to erasing mode.
      ctx.globalCompositeOperation = "destination-out";

    }


    /* ---------------------------------------------
       Find mouse or finger position
    --------------------------------------------- */

    function getPointerPosition(event) {

      const rect = scratchCanvas.getBoundingClientRect();

      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };

    }


    /* ---------------------------------------------
       Erase the coating while dragging
    --------------------------------------------- */

    function scratch(event) {

      if (!isScratching || isRevealed) return;

      const position = getPointerPosition(event);

      ctx.globalCompositeOperation = "destination-out";

      ctx.beginPath();

      ctx.arc(
        position.x,
        position.y,
        23,
        0,
        Math.PI * 2
      );

      ctx.fill();

      if (scratchInstruction) {
        scratchInstruction.style.opacity = "0";
      }

      const now = Date.now();

      if (now - lastProgressCheck > 350) {

        lastProgressCheck = now;

        checkScratchProgress();

      }

    }


    /* ---------------------------------------------
       Check how much of the coating is removed
    --------------------------------------------- */

    function checkScratchProgress() {

      if (isRevealed) return;

      const imageData = ctx.getImageData(
        0,
        0,
        scratchCanvas.width,
        scratchCanvas.height
      );

      const pixels = imageData.data;

      let transparentPixels = 0;
      let totalPixels = 0;

      // Sample every 32nd pixel for efficiency.
      for (let i = 3; i < pixels.length; i += 4 * 32) {

        totalPixels++;

        if (pixels[i] < 80) {
          transparentPixels++;
        }

      }

      const clearedPercentage =
        transparentPixels / totalPixels;

      if (clearedPercentage >= 0.40) {
        revealEntireDate();
      }

    }


    /* ---------------------------------------------
       Reveal the complete date
    --------------------------------------------- */

    function revealEntireDate() {

      if (isRevealed) return;

      isRevealed = true;
      isScratching = false;

      ctx.globalCompositeOperation = "destination-out";

      ctx.clearRect(
        0,
        0,
        scratchCanvas.width,
        scratchCanvas.height
      );

      scratchCanvas.style.pointerEvents = "none";
      scratchCanvas.style.display = "none";

      if (scratchInstruction) {
        scratchInstruction.style.display = "none";
      }

    }


    /* ---------------------------------------------
       Mouse and touchscreen controls
    --------------------------------------------- */

    scratchCanvas.addEventListener(
      "pointerdown",
      function (event) {

        if (isRevealed) return;

        event.preventDefault();

        isScratching = true;

        scratchCanvas.setPointerCapture(event.pointerId);

        const rect = scratchCanvas.getBoundingClientRect();

        const position = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };

        ctx.globalCompositeOperation = "destination-out";

        ctx.beginPath();

        ctx.arc(
          position.x,
          position.y,
          23,
          0,
          Math.PI * 2
        );

        ctx.fill();

        if (scratchInstruction) {
          scratchInstruction.style.opacity = "0";
        }

      }
    );


    scratchCanvas.addEventListener(
      "pointermove",
      scratch
    );


    scratchCanvas.addEventListener(
      "pointerup",
      function () {
        isScratching = false;
        checkScratchProgress();
      }
    );


    scratchCanvas.addEventListener(
      "pointercancel",
      function () {
        isScratching = false;
      }
    );


    scratchCanvas.addEventListener(
      "lostpointercapture",
      function () {
        isScratching = false;
      }
    );


    /* ---------------------------------------------
       Reveal button
    --------------------------------------------- */

    if (revealButton) {

      revealButton.addEventListener(
        "click",
        function (event) {

          event.preventDefault();

          revealEntireDate();

        }
      );

    }


    /* ---------------------------------------------
       Initialise scratch coating
    --------------------------------------------- */

    // Wait until the invitation is visible before painting the scratch card.
    window.setTimeout(setupScratchCard, 5500);

    // Repaint if the card changes size before it is scratched.
    let resizeTimeout;

    window.addEventListener("resize", function () {

      window.clearTimeout(resizeTimeout);

      resizeTimeout = window.setTimeout(function () {

        if (!isRevealed) {
          setupScratchCard();
        }

      }, 200);

    });

  } else {

    console.warn(
      "Scratch card elements not found. Check scratchCanvas and scratchCard IDs."
    );

  }



  console.log(
    "Tabish & Shifa wedding invitation JavaScript loaded successfully."
  );

});
