<script>
   
    import {
        livestreamAtFuneralHome,
        selectedPackage,
        selectPackage,
        formData,
        convertText,
        livestreamDuration,
        additionalLocations,
        masterPrice,
        additionalCharges,
        totalCost,
        urlFriendlyText
    } from '$lib/services/calculatorStore.js';

    function handleInput(name) {
        convertText(name);
    }
</script>

  
<div>Your Loved One's Custom Link:</div>
<div>
    Tributestream.com/celebration_of_life_for_{$urlFriendlyText}
</div>
  
  <div class="flex flex-col h-screen items-center justify-center p-4">
    <div class="card bg-white shadow-lg w-full max-w-4xl p-4">
      <!-- Each row with a 33/67 split -->
      <div class="grid grid-rows-3 gap-4">
        <!-- Row 1 -->
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-4 bg-gray-100 p-4">Section 1A</div>
          <div class="col-span-8 bg-gray-300 p-4">Section 1B</div>

          
        </div>
        
        <!-- Row 2 -->
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-4 bg-gray-100 p-4">Section 2A</div>
          <div class="col-span-8 bg-gray-300 p-4">Section 2B</div>


        </div>
  
        <!-- Row 3 -->
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-4 bg-gray-100 p-4">Section 3A</div>
          <div class="col-span-8 bg-gray-300 p-4">Section 3B</div>


        </div>
      </div>
    </div>
  </div>
  
  
<div>
    <div>
      
        <input type="text" bind:value={$formData.lovedOnesName} on:input={() => handleInput($formData.lovedOnesName)} placeholder="Loved One's Name" />
        <input type="text" bind:value={$formData.livestreamDate} placeholder="Livestream Date" />
        <input type="text" bind:value={$formData.yourName} placeholder="Your Name" />
        <input type="text" bind:value={$formData.email} placeholder="Email" />
        <input type="text" bind:value={$formData.phoneNumber} placeholder="Phone Number" />
    </div>

    <div>
        <div>Are we livestreaming at the funeral home?</div>
        <button on:click={() => $livestreamAtFuneralHome = true}>Yes</button>
        <button on:click={() => $livestreamAtFuneralHome = false}>No</button>
    </div>

    <div>
        <button on:click={() => selectPackage('Solo')}>Solo</button>
        <button on:click={() => selectPackage('Anywhere')}>Anywhere</button>
        <button on:click={() => selectPackage('Legacy')}>Legacy</button>
        <div>
            Livestream Duration: {$livestreamDuration} hours
            <input type="range" min="1" max="8" bind:value={$livestreamDuration} on:change={() => updateLivestreamDuration($livestreamDuration)}>
        </div>
    </div>

    <div>
        <label>
            <input type="checkbox" bind:checked={$additionalLocations.secondAddress} on:change={() => updateLocations($additionalLocations)}>
            Second address?
        </label>
        {#if $additionalLocations.secondAddress}
            <input type="text" bind:value={$formData.secondAddress} placeholder="Enter second address"/>
        {/if}
        <label>
            <input type="checkbox" bind:checked={$additionalLocations.thirdAddress} on:change={() => updateLocations($additionalLocations)}>
            Third address?
        </label>
        {#if $additionalLocations.thirdAddress}
            <input type="text" bind:value={$formData.thirdAddress} placeholder="Enter third address"/>
        {/if}
    </div>

    <div>
        <table>
            <thead>
                <tr>
                    <th>Services</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Base Price</td>
                    <td>{$masterPrice}</td>
                </tr>
                {#each $additionalCharges as charge}
                    <tr>
                        <td>{charge.item}</td>
                        <td>{charge.price}</td>
                    </tr>
                {/each}
                <tr>
                    <td>Total Cost</td>
                    <td>{$totalCost}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
