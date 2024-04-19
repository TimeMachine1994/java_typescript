<script>
    // You can add script here if needed later
  </script>
  
  <section class="relative h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden">
      <div class="video-docker absolute top-0 left-0 w-full h-full">
          <video class="min-w-full min-h-full absolute object-cover"
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
              type="video/mp4" autoplay muted loop playsinline></video>
      </div>
      <div class="video-content space-y-6 z-10">
          <h1 class="text-6xl font-light">Tributestream</h1>
          <input type="text" placeholder="Enter Your Loved Ones Name Here" class="text-gray-900 p-2 w-full max-w-lg text-xl rounded focus:outline-none focus:ring-2 focus:ring-white">
          <div class="flex justify-between items-center w-full max-w-lg gap-4">
              <button class="border-2 border-black text-black bg-transparent hover:bg-[#D5BA7F] font-bold py-2 px-4 rounded">
                  Tributestream Search
              </button>
              <button class="border-2 border-black text-black bg-transparent hover:bg-[#D5BA7F] font-bold py-2 px-4 rounded">
                  Reserve Service
              </button>
          </div>
      </div>
  </section>
  
  <style>
      .video-docker video {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
      }
  
      .video-docker::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.5); /* Overlay to ensure text is readable */
          z-index: 1;
      }
  </style>
  