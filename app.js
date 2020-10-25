/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable semi */

const store = {
    mealPrice: 0,
    taxRate: 0,
    tipPercent: 0,
    subtotal: 0,
    currentTip: 0,
    chargesTotal: 0,
    tipTotal: 0,
    mealTotal: 0,
    avgTip: 0
}

// DOM TEMPLATE FUNCTION //


function grabCalc() {
    return `<h2>Enter the Meal Details</h2>
    <div>
        <form>
            <label for="meal-price">Base Meal Price: </label>
            <input type="number" min=0 id="base-price" name="meal-price"><br>
            <label for="tax">Tax Rate: %</label>
            <input type="number" min=0 id="tax-rate" name="tax"><br>
            <label for="tip">Tip Percentage: %</label>
            <input type="number" min=0 id="tip-pct" name="tip">
        </form>
        <button type="button" id="submit">Submit</button>
        <button type="button" id="cancel">Cancel</button>

    </div>
        <h2>Customer Charges</h2>        
    <div>
        <p>Subtotal ${parseFloat(store.subtotal).toFixed(2)}</p>
        <p>Tip ${parseFloat(store.currentTip).toFixed(2)}</p>
        <hr>
        <p>Total ${parseFloat(store.chargesTotal).toFixed(2)}</p>
    </div>
        <h2>My Earnings Info</h2>  
    <div>
        <p>Tip Total: ${parseFloat(store.tipTotal).toFixed(2)}</p>
        <p>Meal Count: ${parseFloat(store.mealTotal).toFixed(2)}</p>
        <p>Average Tip Per Meal: ${parseFloat(store.tipTotal/store.mealTotal).toFixed(2)} </p>
        <button type="button" id="reset">Reset</button>
    </div>`
}


// RENDER FUNCTION(S) //

function render() {
    $('main').html(grabCalc())
}


// MEAL DETAILS EVENT FUNCTIONS //

function submitEvent() {
    $('main').on('click', '#submit', function (event) {
        let number = $('input').val()
        if(isNaN(number)) {
            alert('Please enter a $ value in every field!')
        } else {
            store.mealPrice = $('#base-price').val()
            store.taxRate = $('#tax-rate').val()
            store.tipPercent = $('#tip-pct').val()
            store.mealTotal++
        }
        updateCharges();
    }) 
}


function cancelEvent() {
    $('main').on('click', '#cancel', function (event) {
        $('input').val('')     
    })
}


// // CUSTOMER CHARGES EVENT FUNCTIONS //

function updateCharges() {
    store.subtotal = 0
    store.currentTip = 0
    store.chargesTotal = 0
    store.subtotal += store.mealPrice*(store.taxRate/100) + store.mealPrice
    store.currentTip += store.subtotal*(store.tipPercent/100)
    store.chargesTotal += store.subtotal + store.currentTip
    updateEarnings();
}

// // EARNINGS INFO EVENT FUNCTIONS ///

function updateEarnings() {
    store.tipTotal += store.currentTip;
    store.avgTip = store.tipTotal / store.mealTotal;
    render();
}

function resetEvent() {
    $('main').on('click', '#reset', function (event) {
        store.mealPrice = 0
        store.taxRate = 0
        store.tipPercent = 0
        store.subtotal = 0
        store.currentTip = 0
        store.chargesTotal = 0
        store.tipTotal = 0
        store.mealTotal = 0
        store.avgTip = 0
        render()
    })
}


function main() {
    render()
    cancelEvent()
    submitEvent()
    updateCharges()
    updateEarnings()
    resetEvent()
}

main()