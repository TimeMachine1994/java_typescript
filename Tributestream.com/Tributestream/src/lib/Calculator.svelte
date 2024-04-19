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
            <form>
                <p>Your Loved One's Custom Link</p>
                <p>Tributestream.com/celebration_of_life_for_{urlFriendlyText}</p>
            </form>

            <div>
                <p>Loved One's Name</p>
                <input type="text" bind:value={formData.lovedOnesName} on:input={convertText} placeholder="Loved One's Name" />
                <p>Livestream Date</p>
                <input type="text" bind:value={formData.livestreamDate} placeholder="Livestream Date" />
                <p>Your Name</p>
                <input type="text" bind:value={formData.yourName} placeholder="Your Name" />
                <p>Email</p>
                <input type="text" bind:value={formData.email} placeholder="Email" />
                <p>Phone Number</p>
                <input type="text" bind:value={formData.phoneNumber} placeholder="Phone Number" />
                <p>Are we livestreaming at the funeral home?</p>
                <button on:click={() => livestreamAtFuneralHome = true}>Yes</button>
                <button on:click={() => livestreamAtFuneralHome = false}>No</button>
                <button on:click={() => currentPage.set(2)}>Next</button>
            </div>          
        </div>
    </div>
</div>
{:else}
<div>
    <div>
        <div>
            <div>
                {#if livestreamAtFuneralHome !== false}
                    <button on:click={() => selectPackage('Solo')}>Solo</button>
                {/if}
                <button on:click={() => selectPackage('Anywhere')}>Anywhere</button>
                <button on:click={() => selectPackage('Legacy')}>Legacy</button>
            </div>
            <label>
                Livestream Duration: {livestreamDuration} hours
                <input type="range" min="1" max="8" bind:value={livestreamDuration}>
            </label>
            <label>
                <input type="checkbox" bind:checked={additionalLocations.secondAddress}>
                Second address?
            </label>
            {#if additionalLocations.secondAddress}
                <input type="text" bind:value={formData.secondAddress} placeholder="Enter second address" />
            {/if}
            <label>
                <input type="checkbox" bind:checked={additionalLocations.thirdAddress}>
                Third address?
            </label>
            {#if additionalLocations.thirdAddress}
                <input type="text" bind:value={formData.thirdAddress} placeholder="Enter third address" />
            {/if}
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
