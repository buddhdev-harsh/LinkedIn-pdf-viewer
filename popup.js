

function addEyeSymbol(link) {
  const eyeSymbol = document.createElement('div');
  eyeSymbol.innerHTML = '👁️'; // You can customize the symbol
  // eyeSymbol.style.position = 'absolute';

  // Adjust the position a bit higher (e.g., 10 pixels)
  // eyeSymbol.style.top = link.offsetTop - 10+ 'px';

  // eyeSymbol.style.left = link.offsetLeft + link.offsetWidth + 10 + 'px';
  eyeSymbol.style.fontSize = '20px';
  eyeSymbol.style.cursor = 'pointer';
  // eyeSymbol.style.zIndex = '9999';

  // eyeSymbol.style.color = 'white';
  // eyeSymbol.style.textShadow = '0 0 5px black';

  eyeSymbol.addEventListener('click', function () {
    console.log("in the main window")
    console.log("here", link.textContent)
    window.open(link.href, '_blank');
  });

  link.parentElement.appendChild(eyeSymbol);
}

function scanForPDFLinks() {
  const pdfLinks = Array.from(document.querySelectorAll('a[href$=".pdf"]'));

  console.log("here, and scanned")
  console.log(pdfLinks)
  pdfLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {
      addEyeSymbol(link);
    });

    link.addEventListener('mouseleave', function () {
      const eyeSymbol = link.parentElement.querySelector('div');
      if (eyeSymbol) {
        setTimeout(function () {eyeSymbol.remove();}, 3000);
      }
    });
  });

  chrome.runtime.sendMessage({ pdfLinks: pdfLinks.map(link => link.textContent) });
}


scanForPDFLinks();