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

    // Function to handle text conversion and updates on input
    function handleInput(name) {
        convertText(name);
    }
</script>

<div class="space-y-4">
    <div>
        <div>Your Loved One's Custom Link:</div>
        <div class="mt-1 mb-3 p-2 bg-gray-200">
            Tributestream.com/celebration_of_life_for_{$urlFriendlyText}
        </div>
        <input class="p-2 border border-gray-300 rounded" type="text" bind:value={$formData.lovedOnesName} on:input={() => handleInput($formData.lovedOnesName)} placeholder="Loved One's Name" />
        <input class="p-2 border border-gray-300 rounded mt-1" type="text" bind:value={$formData.livestreamDate} placeholder="Livestream Date" />
        <input class="p-2 border border-gray-300 rounded mt-1" type="text" bind:value={$formData.yourName} placeholder="Your Name" />
        <input class="p-2 border border-gray-300 rounded mt-1" type="text" bind:value={$formData.email} placeholder="Email" />
        <input class="p-2 border border-gray-300 rounded mt-1" type="text" bind:value={$formData.phoneNumber} placeholder="Phone Number" />
    </div>

    <div class="mt-2">
        <div>Are we livestreaming at the funeral home?</div>
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" on:click={() => $livestreamAtFuneralHome = true}>Yes</button>
        <button class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 ml-2" on:click={() => $livestreamAtFuneralHome = false}>No</button>
    </div>

    <div class="mt-2">
        <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" on:click={() => selectPackage('Solo')}>Solo</button>
        <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-2" on:click={() => selectPackage('Anywhere')}>Anywhere</button>
        <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-2" on:click={() => selectPackage('Legacy')}>Legacy</button>
        <div class="mt-2">
            Livestream Duration: {$livestreamDuration} hours
            <input class="w-full" type="range" min="1" max="8" bind:value={$livestreamDuration} on:change={() => updateLivestreamDuration($livestreamDuration)}>
        </div>
    </div>

    <div class="mt-2">
        <label class="inline-flex items-center">
            <input class="mr-2 leading-tight" type="checkbox" bind:checked={$additionalLocations.secondAddress} on:change={() => updateLocations($additionalLocations)}>
            Second address?
        </label>
        {#if $additionalLocations.secondAddress}
            <input class="p-2 border border-gray-300 rounded mt-1" type="text" bind:value={$formData.secondAddress} placeholder="Enter second address"/>
        {/if}
        <label class="inline-flex items-center mt-2">
            <input class="mr-2 leading-tight" type="checkbox" bind:checked={$additionalLocations.thirdAddress} on:change={() => updateLocations($additionalLocations)}>
            Third address?
        </label>
        {#if $additionalLocations.thirdAddress}
            <input class="p-2 border border-gray-300 rounded mt-1" type="text" bind:value={$formData.thirdAddress} placeholder="Enter third address"/>
        {/if}
    </div>

    <div class="mt-4">
        <table class="min-w-full divide-y divide-gray-200">
            <thead>
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">Base Price</td>
                    <td class="px-6 py-4 whitespace-nowrap">{$masterPrice}</td>
                </tr>
                {#each $additionalCharges as charge}
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap">{charge.item}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{charge.price}</td>
                    </tr>
                {/each}
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">Total Cost</td>
                    <td class="px-6 py-4 whitespace-nowrap">{$totalCost}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
