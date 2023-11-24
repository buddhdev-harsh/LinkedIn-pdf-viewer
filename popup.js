function addEyeSymbol(link) {
  const existingEyeSymbol = document.getElementById('LinkedIn_pdf_viwer');
  
  // Check if the eye symbol already exists
  if (!existingEyeSymbol) {
    const eyeSymbol = document.createElement('div');
    eyeSymbol.id = 'LinkedIn_pdf_viwer';
    eyeSymbol.innerHTML = '👁️'; // You can customize the symbol
    eyeSymbol.style.position = 'absolute';

    // Adjust the position a bit higher (e.g., 10 pixels)
    // eyeSymbol.style.top = link.offsetTop - 10 + 'px';

    eyeSymbol.style.left = link.offsetRight + link.offsetWidth + 10 + 'px';
    eyeSymbol.style.fontSize = '20px';
    eyeSymbol.style.cursor = 'pointer';
    eyeSymbol.style.zIndex = '9999';

    // eyeSymbol.style.color = 'white';
    // eyeSymbol.style.textShadow = '0 0 5px black';

    eyeSymbol.addEventListener('click', function () {
      window.open(link.href, '_blank');
    });

    link.parentElement.appendChild(eyeSymbol);

  }
}

function removeEyeSymbol() {
  const removeDiv = document.getElementById('LinkedIn_pdf_viwer');
  if (removeDiv) {
    setTimeout(function () {
      removeDiv.remove();
    }, 800);
  }
}

function scanForPDFLinks() {
  const pdfLinks = Array.from(document.querySelectorAll('a[download$=".pdf"][target="_blank"]'));

  console.log("here, and scanned")
  console.log(pdfLinks)
  pdfLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {
      addEyeSymbol(link);
    });
    link.addEventListener('mouseleave', function () {
      removeEyeSymbol();
    });
  });

  chrome.runtime.sendMessage({ pdfLinks: pdfLinks.map(link => link.textContent) });
}

scanForPDFLinks();

// Set up a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver(() => {
  // Call your function to scan for PDF links whenever the DOM changes
  scanForPDFLinks();
});

// Define the options for the observer (e.g., observe changes to the entire document)
const observerOptions = {
  childList: true,
  subtree: true,   
};

// Start observing the DOM with the specified options
observer.observe(document.body, observerOptions);
