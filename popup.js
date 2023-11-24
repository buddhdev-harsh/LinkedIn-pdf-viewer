function addEyeSymbol(link) {
  const existingEyeSymbol = document.getElementById('LinkedIn_pdf_viwer');
  
  // Check if the eye symbol already exists
  if (!existingEyeSymbol) {
    const eyeSymbol = document.createElement('div');
    eyeSymbol.id = 'LinkedIn_pdf_viwer';
    eyeSymbol.innerHTML = '👁️'; // You can customize the symbol
    eyeSymbol.style.position = 'absolute';

    eyeSymbol.style.left = link.offsetRight + link.offsetWidth + 10 + 'px'; // Adding 10 pixels for spacing
    eyeSymbol.style.fontSize = '30px';
    eyeSymbol.style.cursor = 'pointer';
    eyeSymbol.style.zIndex = '9999';

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

  pdfLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {
      addEyeSymbol(link);
    });
    link.addEventListener('mouseleave', function () {
      removeEyeSymbol();
    });
  });

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
