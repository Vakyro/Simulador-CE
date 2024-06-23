<main class="p-5 absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
  <div class="grid-background absolute top-0 left-0 w-full h-full"></div>
  <div class="relative z-10 p-4">

    <div class="fixed justify-center z-30 left-[47.5%]">
      <div class="items-center space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex">
        <div class="space-x-1">
          <button id="countCargasBtn" title="previous" type="button" class="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow text-white z-30 cursor-pointer" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
            </svg>
          </button>

          <button title="next" type="button" class="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow text-white z-30 cursor-pointer" onClick=DetenerAnimacion()>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-fill" viewBox="0 0 16 16">
              <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <aside id="separator-sidebar" class="fixed top-[2.5%] right-[1%] z-40 w-64 h-[28%] transition-transform translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 rounded-lg ">
        <ul class="space-y-2 font-medium">
          <li>
            <div id="contenedor1" class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100">
              <div id="Carga" class="z-40 w-[40px] h-[40px] bg-yellow-500 rounded-full cursor-pointer mr-10 fixed" ValorCarga="0" Tipo="Carga"></div>
              <div class="z-30 w-[40px] h-[40px] bg-yellow-500 rounded-full cursor-pointer mr-10"></div>
              <span class="ms-3">Carga</span>
            </div>
          </li>
          <li>
            <div id="contenedor2" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group" >
              <div id="Electron" class="z-40 w-[40px] h-[40px] bg-green-500 rounded-full cursor-pointer mr-10 fixed" ValorCarga="-1.6x10^-19" Tipo="Electron"></div>
              <div class="z-30 w-[40px] h-[40px] bg-green-500 rounded-full cursor-pointer mr-10"></div>
              <span class="ms-3">Electrón</span>
            </div>
          </li>
          <li>
            <div id="contenedor3" class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100">
              <div id="Proton" class="z-40 w-[40px] h-[40px] bg-blue-500 rounded-full cursor-pointer mr-10 fixed" ValorCarga="1.6x10^-19" Tipo="Proton"></div>
              <div class="z-30 w-[40px] h-[40px] bg-blue-500 rounded-full cursor-pointer mr-10"></div>
              <span class="ms-3">Protón</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>

    <button class="z-50 fixed top-[32%] right-[2%] text-white hover:text-gray-400 transition-colors duration-300" onClick=Reload()>
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
      </svg>
    </button>

    <div id="valorCarga" class="card px-4 py-4 rounded-lg bg-gray-800 w-72 hidden fixed bottom-5 z-30">
      <h1 class="text-center font-bold text-2xl text-white">Dale Valor a la carga</h1>
      <form id="miFormulario" class="my-6">
        <input id="datoCarga" class="p-2 my-2 rounded w-[100%] focus:outline-blue-600" placeholder="1.8x10E-5......" type="text">
        <button id="botonEnviar" class="bg-blue-600 hover:bg-blue-500 text-white font-semibold p-2 mt-3 rounded w-[100%]">Asignar</button>
      </form>
    </div>

    <div id="valorCarga2" class="card px-4 py-4 rounded-lg bg-gray-800 w-72 hidden fixed bottom-5 z-30">
      <h1 class="text-center font-bold text-2xl text-white">Valor de la carga</h1>
      <p id="cargaValorText" class="text-white font-semibold p-2 mt-3 rounded w-[100%] text-center"></p>
    </div>

    <div id="Data" class="bg-gray-700 max-w-[300px] rounded-xl hover:bg-gray-900 hover:scale-110 duration-700 p-6 fixed bottom-5 hidden z-30">
      <h4 class="py-2 text-white font-bold text-2xl">Datos</h4>
      <p class="text-lg leading-7 text-slate-300 space-y-4">Número de Cargas: <span id="nCarga"></span></p>
      <p class="text-lg leading-7 text-slate-300 space-y-4">Valor de las Cargas: <span id="vCarga"></span></p>
      <p class="text-lg leading-7 text-slate-300 space-y-4">Campo Eléctrico: <span id="campoE"></span></p>
      <p class="text-lg leading-7 text-slate-300 space-y-4">Fuerza: <span id="Fuerza"></span></p>
    </div>

    <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
      <div id="contenedor4" class="flex items-center">
        <div class="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
      </div>
    </div>

    <div id="counter" class="counter-container z-10 ml-10 hidden">
      <div id="arrow-container" class="arrow-container grid gap-4 grid-cols-12 grid-rows-3 z-10">
      </div>
    </div>

  </div>
</main>

<style>
  .grid-background {
    background-size: 40px 40px;
    background-image: 
      linear-gradient(to right, white 1px, transparent 1px),
      linear-gradient(to bottom, white 1px, transparent 1px);
  }
</style>

<script type="text/javascript" src="<?=JS?>simulador.js"></script>