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
<div>
    <div>
        <div>
            <div>Your Loved One's Custom Link</div>
            <div>Tributestream.com/celebration_of_life_for_{urlFriendlyText}</div>
            <input type="text" bind:value={formData.lovedOnesName} on:input={convertText} placeholder="Loved One's Name" />
            <input type="text" bind:value={formData.livestreamDate} placeholder="Livestream Date" />
            <input type="text" bind:value={formData.yourName} placeholder="Your Name" />
            <input type="text" bind:value={formData.email} placeholder="Email" />
            <input type="text" bind:value={formData.phoneNumber} placeholder="Phone Number" />
            <div>Are we livestreaming at the funeral home?</div>
            <button on:click={() => livestreamAtFuneralHome = true}>Yes</button>
            <button on:click={() => livestreamAtFuneralHome = false}>No</button>
            <button on:click={() => currentPage.set(2)}>Next</button>
        </div>          
    </div>
</div>
{:else}
<div>
    <div>
        <div>
            {#if livestreamAtFuneralHome !== false}
                <button on:click={() => selectPackage('Solo')}>Solo</button>
            {/if}
            <button on:click={() => selectPackage('Anywhere')}>Anywhere</button>
            <button on:click={() => selectPackage('Legacy')}>Legacy</button>
            <div>
                Livestream Duration: {livestreamDuration} hours
                <input type="range" min="1" max="8" bind:value={livestreamDuration}>
            </div>
            <div>
                <input type="checkbox" bind:checked={additionalLocations.secondAddress}> Second address?
                {#if additionalLocations.secondAddress}
                    <input type="text" bind:value={formData.secondAddress} placeholder="Enter second address"/>
                {/if}
                <input type="checkbox" bind:checked={additionalLocations.thirdAddress}> Third address?
                {#if additionalLocations.thirdAddress}
                    <input type="text" bind:value={formData.thirdAddress} placeholder="Enter third address"/>
                {/if}
            </div>
        </div>
        <div>
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
                            <td>{masterPrice}</td>
                        </tr>
                        {#each additionalCharges as charge}
                            <tr>
                                <td>{charge.item}</td>
                                <td>{charge.price}</td>
                            </tr>
                        {/each}
                        <tr>
                            <td>Total Cost</td>
                            <td>{totalCost}</td>
                        </tr>    
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
{/if}

<style>
    div, input, button, label, table, th, td {
        border: 1px solid black;
        padding: 10px;
        margin: 5px;
    }
    input[type="range"], input[type="text"], input[type="checkbox"] {
        width: 100%;
    }
    button {
        background-color: lightgray;
        cursor: pointer;
    }
    button:hover {
        background-color: gray;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        text-align: left;
    }
</style>
