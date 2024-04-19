<script>
    import { writable } from 'svelte/store';

    const currentPage = writable(1);
    let livestreamAtFuneralHome = null;
    let selectedPackage = '';
    let additionalLocations = { secondAddress: false, thirdAddress: false };
    let livestreamDuration = 2; // Default duration
    const packagePrices = { 'Solo': 399, 'Anywhere': 499, 'Legacy': 799 };
    let masterPrice = 0;
    let urlFriendlyText = "your_loved_ones_name_here";

    let formData = {
        lovedOnesName: '',
        livestreamDate: '',
        yourName: '',
        email: '',
        phoneNumber: '',
        secondAddress: '',
        thirdAddress: ''
    };

    $: urlFriendlyText = formData.lovedOnesName.replace(/\s+/g, '_').toLowerCase();
    $: masterPrice = packagePrices[selectedPackage];
    $: if (selectedPackage === 'Solo' && (additionalLocations.secondAddress || additionalLocations.thirdAddress)) {
        selectPackage('Anywhere');
    }
    $: additionalCharge = (additionalLocations.secondAddress ? 399 : 0) + 
                          (additionalLocations.thirdAddress ? 329 : 0) + 
                          (livestreamDuration > 2 ? (livestreamDuration - 2) * 99 : 0);

    $: totalCost = masterPrice + additionalCharge;
    let additionalCharges = [];

    $: {
        additionalCharges = [];
        if (additionalLocations.secondAddress) {
            additionalCharges.push({ item: 'Location B', price: 399 });
        }
        if (additionalLocations.thirdAddress) {
            additionalCharges.push({ item: 'Location C', price: 329 });
        }
        if (livestreamDuration > 2) {
            let extraHours = livestreamDuration - 2;
            additionalCharges.push({ item: `Additional Livestream Time (${extraHours}h)`, price: extraHours * 99 });
        }
        totalCost = masterPrice + additionalCharges.reduce((sum, charge) => sum + charge.price, 0);
    }

    function selectPackage(packageName) {
        selectedPackage = packageName;
        masterPrice = packagePrices[packageName];
    }

    function convertText(){
         urlFriendlyText = formData.lovedOnesName.replace(/\s+/g, '_').toLowerCase();
         return urlFriendlyText;
    }
</script>

{#if $currentPage === 1}
<div class="min-h-screen bg-gray-700 flex items-center justify-center">
    <div class="bg-gray-800 border-2 border-gray-900 shadow-2xl rounded-lg">
        <div class="p-6 text-gray-800 grid grid-cols-4 gap-5 text-xl">
            <div class="col-span-4 text-center text-white">Your Loved One's Custom Link</div>
            <div class="col-span-4 text-center text-white">Tributestream.com/celebration_of_life_for_{urlFriendlyText}</div>
            <input type="text" class="col-span-4 bg-gray-800 border-2 border-gray-900 shadow-2xl rounded-lg text-white" bind:value={formData.lovedOnesName} on:input={convertText} placeholder="Loved One's Name" />
            <input type="text" class="col-span-4" bind:value={formData.livestreamDate} placeholder="Livestream Date" />
            <input type="text" class="col-span-4" bind:value={formData.yourName} placeholder="Your Name" />
            <input type="text" class="col-span-4" bind:value={formData.email} placeholder="Email" />
            <input type="text" class="col-span-4" bind:value={formData.phoneNumber} placeholder="Phone Number" />
            <div class="col-span-4 text-center text-white">Are we livestreaming at the funeral home?</div>
            <button class="col-span-2 bg-gray-500 hover:bg-gray-400 rounded-full p-5 text-white" on:click={() => livestreamAtFuneralHome = true}>Yes</button>
            <button class="col-span-2 bg-gray-500 hover:bg-gray-400 rounded-full p-5 text-white" on:click={() => livestreamAtFuneralHome = false}>No</button>
            <button class="col-span-1 bg-gray-500 hover:bg-gray-400 rounded-full p-5 text-white" on:click={() => currentPage.set(2)}>Next</button>
        </div>          
    </div>
</div>
{:else}
<div class="min-h-screen bg-gray-700 flex items-center justify-center">
    <div class="bg-gray-800 border-2 border-gray-900 shadow-2xl rounded-lg grid grid-cols-4 gap-2">
        <div class="col-span-2 bg-gray-500 rounded-full p-5 text-white text-center">
            {#if livestreamAtFuneralHome !== false}
                <button class="bg-gray-500 hover:bg-gray-400 rounded-full p-5 text-white" on:click={() => selectPackage('Solo')}>Solo</button>
            {/if}
            <button class="bg-gray-500 hover:bg-gray-400 rounded-full p-5 text-white" on:click={() => selectPackage('Anywhere')}>Anywhere</button>
            <button class="bg-gray-500 hover:bg-gray-400 rounded-full p-5 text-white" on:click={() => selectPackage('Legacy')}>Legacy</button>
            <label class="block">
                Livestream Duration: {livestreamDuration} hours
                <input type="range" min="1" max="8" bind:value={livestreamDuration} class="w-full">
            </label>
            <label class="block">
                <input type="checkbox" bind:checked={additionalLocations.secondAddress}>
                Second address?
            </label>
            {#if additionalLocations.secondAddress}
                <input type="text" bind:value={formData.secondAddress} placeholder="Enter second address" class="w-full"/>
            {/if}
            <label class="block">
                <input type="checkbox" bind:checked={additionalLocations.thirdAddress}>
                Third address?
            </label>
            {#if additionalLocations.thirdAddress}
                <input type="text" bind:value={formData.thirdAddress} placeholder="Enter third address" class="w-full"/>
            {/if}
        </div>
        <div class="col-span-2 bg-gray-500 rounded-full p-5 text-white text-center">
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead>
                        <tr>
                            <th class="border px-2 text-right">Services</th>
                            <th class="border px-2 text-right">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border px-2 text-right">Base Price</td>
                            <td class="border px-2 text-right"> ${masterPrice}</td>
                        </tr>
                        {#each additionalCharges as charge}
                            <tr>
                                <td class="border px-2 text-right">{charge.item}</td>
                                <td class="border px-2 text-right">${charge.price}</td>
                            </tr>
                        {/each}
                        <tr>
                            <td class="border px-2 text-right">Total Cost</td>
                            <td class="border px-2 text-right">${totalCost}</td>
                        </tr>    
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
{/if}
