let nuevoH = 0;
let nuevaV = 0;
let primerH = 0;
let primeraV = 0;
let selectedCard = null;
var Formulario = document.getElementById('valorCarga');
var Formulario2 = document.getElementById('valorCarga2');
var Data = document.getElementById('Data');
let ultimoSelectedCard = null;
let posicion = 0;
let velocidad = 1;
let animacionIntervalo;
let intervalosAnimacion = [];
let count = 0;
let arrowOriginalPositions = {};
let alcance = 0

const contenedor = document.getElementById('contenedor4');
const rect = contenedor.getBoundingClientRect();
const counterElement = document.getElementById('counter')
const arrowContainer = document.getElementById('arrow-container')
const arrowSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-16 arrow z-10">
    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
  </svg>`;

const cards = [
  document.getElementById('Electron'),
  document.getElementById('Proton'),
  document.getElementById('Carga'),
];

document.body.style.overflow = 'hidden';

cards.forEach(card => {
  card.addEventListener('mousedown', (e) => mouseDown(e, card));
});

function mouseDown(e, cardElement) {
  saveArrowOriginalPositions();

  primerH = e.clientX;
  primeraV = e.clientY;
  selectedCard = cardElement;

  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseUp);
  if (selectedCard) {
    ultimoSelectedCard = selectedCard;
  }
}

function mouseMove(e) {
  if (!selectedCard) return;

  nuevoH = primerH - e.clientX;
  nuevaV = primeraV - e.clientY;

  const newLeft = selectedCard.offsetLeft - nuevoH;
  const newTop = selectedCard.offsetTop - nuevaV;

  primerH = e.clientX;
  primeraV = e.clientY;

  if (!isOverlapping(newLeft, newTop, selectedCard)) {
    selectedCard.style.top = newTop + 'px';
    selectedCard.style.left = newLeft + 'px';
    createNewCard(selectedCard)
    DaleDatos(selectedCard)
    counterElement.classList.remove("hidden");
    const ultimaCargaFuera = encontrarCargaFueraSidebar();
    if (ultimaCargaFuera) {
      rotarFlechaHaciaCarga(ultimaCargaFuera);
    }
    rotarFlechaHaciaCarga(selectedCard);
  }
}

function mouseUp() {
  document.removeEventListener('mousemove', mouseMove);
  selectedCard = null;
  restoreArrowPositionsAfterDrag();
}

function isOverlapping(newLeft, newTop, movingCard) {
  const cardRect = {
    left: newLeft,
    top: newTop,
    right: newLeft + movingCard.offsetWidth,
    bottom: newTop + movingCard.offsetHeight,
  };

  for (const card of cards) {
    if (card === movingCard) continue;

    const otherRect = {
      left: card.offsetLeft,
      top: card.offsetTop,
      right: card.offsetLeft + card.offsetWidth,
      bottom: card.offsetTop + card.offsetHeight,
    };

    if (
      !(cardRect.right < otherRect.left ||
        cardRect.left > otherRect.right ||
        cardRect.bottom < otherRect.top ||
        cardRect.top > otherRect.bottom)
    ) {
      return true;
    }
  }
  return false;
}

function createNewCard(selectedCard){
  let contenedor;
  let newCard = document.createElement('div');
  switch(selectedCard.id){
    case 'Carga':
      contenedor = document.getElementById('contenedor1');
      newCard.classList.add('z-40', 'w-[40px]', 'h-[40px]', 'bg-yellow-500', 'rounded-full', 'cursor-pointer', 'mr-10','fixed');
      contenedor.appendChild(newCard);
      newCard.setAttribute('ValorCarga', "0");
      newCard.setAttribute('Tipo', "Carga");
      break;
    case 'Electron':
      contenedor = document.getElementById('contenedor2');
      newCard.classList.add('z-40', 'w-[40px]', 'h-[40px]', 'bg-green-500', 'rounded-full', 'cursor-pointer', 'mr-10','fixed');
      contenedor.appendChild(newCard);
      newCard.setAttribute('ValorCarga', "-1.6x10^-19");
      newCard.setAttribute('Tipo', "Electron");
      break;
    case 'Proton':
      contenedor = document.getElementById('contenedor3');
      newCard.classList.add('z-40', 'w-[40px]', 'h-[40px]', 'bg-blue-500', 'rounded-full', 'cursor-pointer', 'mr-10','fixed');
      contenedor.appendChild(newCard);
      newCard.setAttribute('ValorCarga', "1.6x10^-19");
      newCard.setAttribute('Tipo', "Electron");
      break;
  }
  newCard.addEventListener('mousedown', (e) => mouseDown(e, newCard));
  cards.push(newCard);
}

function DaleDatos(selectedCard) {
  if (selectedCard.getAttribute('Tipo') === 'Carga' && parseFloat(selectedCard.getAttribute('ValorCarga')) === 0) {
    Data.classList.add("hidden");
    Formulario.classList.remove("hidden");
    Formulario2.classList.add("hidden");

  } else if (selectedCard.getAttribute('Tipo') === 'Carga' || selectedCard.getAttribute('Tipo') === 'Electron' || selectedCard.getAttribute('Tipo') === 'Proton') {
    const cargaValor = selectedCard.getAttribute('ValorCarga');
    const cargaValorText = document.getElementById('cargaValorText');
    cargaValorText.textContent = cargaValor + ' C';
    Formulario2.classList.remove("hidden");
    Formulario.classList.add("hidden");

  } else{
    Formulario2.classList.add("hidden");
    Formulario.classList.add("hidden");

  }
}

document.addEventListener('DOMContentLoaded', () => {
  const miFormulario = document.getElementById('miFormulario');
  const datoCarga = document.getElementById('datoCarga');

  miFormulario.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const valorCargaString = datoCarga.value;
    const valorCarga = parseFloat(valorCargaString.replace('x10^-', 'e-').replace('x10^', 'e'));
    
    if (!isNaN(valorCarga)) {
      Formulario.classList.add("hidden");
      ultimoSelectedCard.setAttribute('ValorCarga', valorCarga); 
    } else {
    }
  });
});

function DetenerAnimacion() {
  intervalosAnimacion.forEach(intervalo => {
    clearInterval(intervalo);
  });
  Data.classList.add("hidden");
}

function animarObjeto(cargas) {
  cargas.forEach(objeto => {
    // Obtenemos la posición de la carga
    const cargaRect = objeto.getBoundingClientRect();
    const puntoX = cargaRect.x + cargaRect.width / 2; // Punto medio horizontal de la carga
    const puntoY = cargaRect.y + cargaRect.height / 2; // Punto medio vertical de la carga

    // Calculamos el campo eléctrico en el punto donde se encuentra la carga
    const campoElectrico = calcularCampoElectricoEnPunto(puntoX, puntoY);

    // Determinamos la dirección en la que debería moverse la carga según el campo eléctrico
    let direccionX = campoElectrico.campoElectricoX > 0 ? -1 : 1; // Si el campo eléctrico en X es positivo, la carga debería moverse hacia la izquierda
    let direccionY = campoElectrico.campoElectricoY > 0 ? -1 : 1; // Si el campo eléctrico en Y es positivo, la carga debería moverse hacia arriba

    objeto.style.left = (parseInt(objeto.style.left) + velocidad * direccionX) + 'px';
     objeto.style.top = (parseInt(objeto.style.top) + velocidad * direccionY) + 'px';

    const sidebar = document.getElementById('separator-sidebar');
    const objetoRect = objeto.getBoundingClientRect();
    const sidebarRect = sidebar.getBoundingClientRect();

    if (
      objetoRect.right < sidebarRect.left || 
      objetoRect.left > sidebarRect.right || 
      objetoRect.bottom < sidebarRect.top || 
      objetoRect.top > sidebarRect.bottom
    ) {
      let estiloObjeto = window.getComputedStyle(objeto);
      let posicionInicial = parseInt(estiloObjeto.left);
      let posicion = posicionInicial || 0;

      const animacionIntervalo = setInterval(() => {
        posicion -= velocidad * direccionX; // Movemos la carga en X según la dirección calculada
        objeto.style.left = posicion + 'px';
      }, 10);

      intervalosAnimacion.push(animacionIntervalo); 
    }
  });
}


function Animacion(cargas, valoresCargas, cargasFueraSidebar) {
  var vCargas = valoresCargas.join(' C, ');
  var campoE = 0; 
  var Fuerza = 0; 

  const nCarga = document.getElementById('nCarga');
  const vCarga = document.getElementById('vCarga');
  const CampoE = document.getElementById('campoE');
  const fuerzaE = document.getElementById('Fuerza');

  Data.classList.remove("hidden");
  Formulario2.classList.add("hidden");
  Formulario.classList.add("hidden");

  const puntoX = window.innerWidth / 2;
  const puntoY =  window.innerHeight / 2;

  const campoElectrico = calcularCampoElectricoEnPunto(puntoX, puntoY);

  campoE = Math.sqrt(campoElectrico.campoElectricoX ** 2 + campoElectrico.campoElectricoY ** 2);
  Fuerza = campoElectrico.fuerzaElectrica;
  nCarga.textContent = cargasFueraSidebar;
  vCarga.textContent = vCargas + ' C';
  CampoE.textContent = campoE + ' N/C';
  fuerzaE.textContent = Fuerza + ' N';

  animarObjeto(cargas);
}


function Reload(){
  location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
  const countCargasBtn = document.getElementById('countCargasBtn');

  countCargasBtn.addEventListener('click', () => {
    const main = document.querySelector('main');
    const separatorSidebar = document.getElementById('separator-sidebar');
    const cargas = main.querySelectorAll('.bg-yellow-500, .bg-green-500, .bg-blue-500'); 

    let cargasFueraSidebar = 0;
    let valoresCargas = [];

    cargas.forEach(carga => {
      const cargaRect = carga.getBoundingClientRect();
      const sidebarRect = separatorSidebar.getBoundingClientRect();

      if (
        cargaRect.right < sidebarRect.left || 
        cargaRect.left > sidebarRect.right || 
        cargaRect.bottom < sidebarRect.top || 
        cargaRect.top > sidebarRect.bottom
        ){
          cargasFueraSidebar++;
          valoresCargas.push(carga.getAttribute('ValorCarga'));
      }
    });

    if (cargas.length > 0) {
      Animacion(cargas, valoresCargas, cargasFueraSidebar);
    }
  });
});

function calcularCampoElectricoEnPunto(puntoX, puntoY) {
  const k = 8.9875e9; // Constante de Coulomb
  let campoElectricoX = 0;
  let campoElectricoY = 0;
  let fuerzaElectrica = 0;

  cards.forEach(carga => {
    const cargaX = carga.offsetLeft + carga.offsetWidth / 2; // Posición X del centro de la carga
    const cargaY = carga.offsetTop + carga.offsetHeight / 2; // Posición Y del centro de la carga
    const valorCarga = parseFloat(carga.getAttribute('ValorCarga')); // Valor de la carga

    if (!isNaN(valorCarga)) { // Asegurarse de que el valor de la carga es un número válido
      // Distancia entre el punto de observación y el centro de la carga
      const distanciaX = puntoX - cargaX;
      const distanciaY = puntoY - cargaY;
      const distancia = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);

      // Evitar la división por cero
      if (distancia > 0) {
        // Componentes del campo eléctrico generadas por la carga
        const campoX = k * valorCarga * distanciaX / (distancia * distancia * distancia); // Componente X del campo eléctrico
        const campoY = k * valorCarga * distanciaY / (distancia * distancia * distancia); // Componente Y del campo eléctrico

        // Suma de los componentes X e Y del campo eléctrico
        campoElectricoX += campoX;
        campoElectricoY += campoY;

        // Fuerza eléctrica generada por la carga (solo para mostrar)
        const fuerza = k * valorCarga / (distancia * distancia);
        fuerzaElectrica += fuerza;
      }
    }
  });

  return { campoElectricoX, campoElectricoY, fuerzaElectrica };
}

function updateIcons(){
  arrowContainer.innerHTML = '';
  count = 156
  
  for (let i = 0; i < count; i++){
    arrowContainer.innerHTML += arrowSVG;
  }
}

updateIcons();

function updateArrowDirections() {
  const arrows = document.querySelectorAll('.arrow');

  arrows.forEach(arrow => {
    let minDistance = Infinity;
    let closestCharge = null;

    cards.forEach(card => {
      const chargeRect = card.getBoundingClientRect();
      const chargeX = chargeRect.left + chargeRect.width / 2;
      const chargeY = chargeRect.top + chargeRect.height / 2;

      const arrowRect = arrow.getBoundingClientRect();
      const arrowX = arrowRect.left + arrowRect.width / 2;
      const arrowY = arrowRect.top + arrowRect.height / 2;

      const distance = Math.sqrt(Math.pow(chargeX - arrowX, 2) + Math.pow(chargeY - arrowY, 2));

      if (distance < minDistance) {
        minDistance = distance;
        closestCharge = { x: chargeX, y: chargeY };
      }
    });

    if (closestCharge) {
      const dx = closestCharge.x - arrowRect.left;
      const dy = closestCharge.y - arrowRect.top;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      arrow.style.transform = `rotate(${angle}deg)`;
    }
  });
}

function rotarFlechaHaciaCarga(carga) {
  const arrows = document.getElementsByClassName('arrow');

  // Calcula la posición de la carga
  const cargaRect = carga.getBoundingClientRect();
  const cargaX = cargaRect.left + cargaRect.width / 2;
  const cargaY = cargaRect.top + cargaRect.height / 2;

  // Calcula la distancia de cada flecha a la carga y guarda las 4 más cercanas
  const closestArrows = [];
  for (const arrow of arrows) {
      const arrowRect = arrow.getBoundingClientRect();
      const arrowX = arrowRect.left + arrowRect.width / 2;
      const arrowY = arrowRect.top + arrowRect.height / 2;

      const distance = Math.sqrt(Math.pow(cargaX - arrowX, 2) + Math.pow(cargaY - arrowY, 2));
      closestArrows.push({ arrow, distance });
  }

  let maxChargeOutsideSidebar = 0;
  const main = document.querySelector('main');
  const separatorSidebar = document.getElementById('separator-sidebar');
  const cargas = main.querySelectorAll('.bg-yellow-500, .bg-green-500, .bg-blue-500');

  cargas.forEach(c => {
      const cargaValue = Math.abs(parseFloat(c.getAttribute('ValorCarga')));
      const cargaRect = c.getBoundingClientRect();
      const sidebarRect = separatorSidebar.getBoundingClientRect();
      if (
          cargaRect.right < sidebarRect.left || 
          cargaRect.left > sidebarRect.right || 
          cargaRect.bottom < sidebarRect.top || 
          cargaRect.top > sidebarRect.bottom
      ) {
          if (Math.abs(cargaValue) > Math.abs(maxChargeOutsideSidebar)) {
              maxChargeOutsideSidebar = cargaValue;
          }
      }
  });

  let alcance = 0;

  if (carga.getAttribute('ValorCarga') == maxChargeOutsideSidebar) {
      alcance = 200;
  } else {
      alcance = Math.abs(parseFloat(carga.getAttribute('ValorCarga')));
  }

  // Ordena las flechas por distancia y toma solo las más cercanas
  closestArrows.sort((a, b) => a.distance - b.distance);
  const closestArrowsToRotate = closestArrows.slice(0, alcance);

  // Rota cada una de las flechas más cercanas hacia la carga
  for (const { arrow } of closestArrowsToRotate) {
      const arrowRect = arrow.getBoundingClientRect();
      const arrowX = arrowRect.left + arrowRect.width / 2;
      const arrowY = arrowRect.top + arrowRect.height / 2;

      const deltaX = cargaX - arrowX;
      const deltaY = cargaY - arrowY;

      let rotation = 0;

      if (parseFloat(carga.getAttribute('ValorCarga')) > 0) {
          rotation = (Math.atan2(deltaY, deltaX) * (180 / Math.PI)) + 270;
      } else {
          rotation = (Math.atan2(deltaY, deltaX) * (180 / Math.PI)) + 90;
      }

      arrow.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
  }
}


function encontrarCargaFueraSidebar() {
  const main = document.querySelector('main');
  const separatorSidebar = document.getElementById('separator-sidebar');
  const cargas = main.querySelectorAll('.bg-yellow-500, .bg-green-500, .bg-blue-500');

  let ultimaCargaFuera = null;

  cargas.forEach(carga => {
    const cargaRect = carga.getBoundingClientRect();
    const sidebarRect = separatorSidebar.getBoundingClientRect();

    if (
      cargaRect.right < sidebarRect.left ||
      cargaRect.left > sidebarRect.right ||
      cargaRect.bottom < sidebarRect.top ||
      cargaRect.top > sidebarRect.bottom
    ) { ultimaCargaFuera = carga; }
  });

  return ultimaCargaFuera;
}

countCargasBtn.addEventListener('click', () => {
  const ultimaCargaFuera = encontrarCargaFueraSidebar();
  if (ultimaCargaFuera) {
    rotarFlechaHaciaCarga(ultimaCargaFuera);
  }
});

function actualizarFlecha(carga) {
  const arrow = document.getElementById('arrow');
  const arrowRect = arrow.getBoundingClientRect();
  const arrowX = arrowRect.left + arrowRect.width / 2;
  const arrowY = arrowRect.top + arrowRect.height / 2;

  const cargaRect = carga.getBoundingClientRect();
  const cargaX = cargaRect.left + cargaRect.width / 2;
  const cargaY = cargaRect.top + cargaRect.height / 2;

  const deltaX = cargaX - arrowX;
  const deltaY = cargaY - arrowY;
  const rotation = (Math.atan2(deltaY, deltaX) * (180 / Math.PI)) + 90;

  arrow.style.transformOrigin = 'center center';
  arrow.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
}

function actualizarDireccionFlecha() {
  const ultimaCargaFuera = encontrarCargaFueraSidebar();
  if (ultimaCargaFuera) {
    rotarFlechaHaciaCarga(ultimaCargaFuera);
  }
}

function iniciarActualizarFlechaInterval() {
  detenerActualizarFlechaInterval();
  actualizarFlechaInterval = setInterval(actualizarDireccionFlecha, 1); 
}

function detenerActualizarFlechaInterval() {
  if (actualizarFlechaInterval) {
    clearInterval(actualizarFlechaInterval);
  }
}

function restoreArrowPositions() {
  const arrows = document.querySelectorAll('.arrow');
  arrows.forEach(arrow => {
    arrowOriginalPositions[arrow.id] = { 
      left: arrow.style.left, 
      top: arrow.style.top 
    };
  });
}

function restoreArrowPositionsAfterDrag() {
  const arrows = document.querySelectorAll('.arrow');
  arrows.forEach(arrow => {
    const originalPosition = arrowOriginalPositions[arrow.id];
    if (originalPosition) {
      arrow.style.left = originalPosition.left;
      arrow.style.top = originalPosition.top;
    }
  });
}

function saveArrowOriginalPositions() {
  const arrows = document.querySelectorAll('.arrow');
  arrows.forEach(arrow => {
    arrowOriginalPositions[arrow.id] = { 
      left: arrow.style.left, 
      top: arrow.style.top 
    };
  });
}

iniciarActualizarFlechaInterval();