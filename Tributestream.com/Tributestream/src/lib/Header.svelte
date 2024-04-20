<script>
    import { page } from '$app/stores';

    // Reactive statement to determine if the current route is the homepage
    $: isHomePage = $page.url.pathname === '/' || $page.url.pathname === '/home';
    $: zClass = isHomePage ? 'z-50' : 'z-0';
    $: positionClass = isHomePage ? 'fixed' : 'relative';
    $: console.log("Current path:", $page.url.pathname, "| Is home page:", isHomePage);

</script>
 
  
  <nav class="{zClass} {positionClass} top-0 left-0 right-0 px-4 py-2 mt-4 mb-4 mx-4 bg-white bg-opacity-80 border border-white/80 shadow-lg rounded-xl backdrop-blur-2xl backdrop-saturate-200">
    <div class="container flex items-center justify-between text-black max-w-7xl mx-auto">
      <!-- Title on the left -->
      <a href="/" class="block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
        Tributestream
      </a>
      
      <!-- Navigation buttons on the right -->
      <div class="hidden lg:flex flex-row items-center gap-6">
        <button class="px-4 py-2 font-sans text-xs font-bold text-center uppercase align-middle transition-all rounded-lg hover:bg-gray-900/10 active:bg-gray-900/20">
          Our process
        </button>
        <button class="px-4 py-2 font-sans text-xs font-bold text-center uppercase align-middle transition-all rounded-lg hover:bg-gray-900/10 active:bg-gray-900/20">
          Shop
        </button>
        <button class="px-4 py-2 font-sans text-xs font-bold text-center uppercase align-middle transition-all rounded-lg hover:bg-gray-900/10 active:bg-gray-900/20">
          Who we are
        </button>
      </div>
      
      <!-- Log In and Sign In buttons -->
      <div class="flex items-center gap-x-1">
        <button class="hidden lg:inline-block px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
          Log In
        </button>
        <button class="hidden lg:inline-block select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
          Book Us
        </button>
      </div>
    </div>
  </nav>
  