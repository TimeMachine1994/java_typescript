<script>
    import { page } from '$app/stores';

    // Reactive statement to determine if the current route is the homepage
    $: isHomePage = $page.url.pathname === '/' || $page.url.pathname === '/home';
    $: zClass = isHomePage ? 'z-50' : 'z-0';
    $: positionClass = isHomePage ? 'fixed' : 'relative';
    $: console.log("Current path:", $page.url.pathname, "| Is home page:", isHomePage);

</script>

<!-- Header.svelte -->
<nav class= "{zClass} {positionClass} top-0 left-0 right-0 px-4 py-2 mt-4 mb-4 mx-4 bg-white bg-opacity-80 border border-white/80 shadow-lg rounded-xl backdrop-blur-2xl backdrop-saturate-200">
  <div class="container flex items-center justify-between text-blue-gray-900 max-w-7xl mx-auto">
      <a href="/" class="block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
          Material Tailwind test
        
      </a>
      <div class="hidden lg:flex flex-row items-center gap-6">
          <!-- List of Navigation Items -->
      </div>
      <div class="flex items-center gap-x-1">
          <button class="hidden lg:inline-block px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
              Log In
          </button>
          <button class="hidden lg:inline-block select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
              Sign in
          </button>
          <button class="lg:hidden relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
          </button>
      </div>
  </div>
</nav>
