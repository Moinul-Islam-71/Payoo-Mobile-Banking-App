// .........................................................................................
// ALL FEATURES TOGGLING BUTTONS
// .........................................................................................


const logout_alert_container           = document.getElementById(`logout_alert_container`);
const balanceEl           = document.getElementById(`userBalance`);
balanceEl.innerText       = localStorage.getItem("balance") || "50"
const userBalance         = parseInt( balanceEl.innerText );

const card_add_money      = document.getElementById(`add_money`);
const card_cash_out       = document.getElementById(`cash_out`);
const card_transfer_money = document.getElementById(`transfer_money`);
const card_get_bonus      = document.getElementById(`get_bonus`);
const card_pay_bill       = document.getElementById(`paybill`);
const card_transactions   = document.getElementById(`transactions`);



// Coupon Database
const coupons = {
    "EID2026"  : 500,
    "RAMADAN"  : 300,
    "PAYOO100" : 100,
};



const transactionData = JSON.parse(localStorage.getItem("transactionData") || "[]");





// Card And Its Parent mapping
const cardMap = [
    { card: card_add_money,      parent: `add_money_parent`          },
    { card: card_cash_out,       parent: `cash_out_parent`           },
    { card: card_transfer_money, parent: `transfer_money_parent`     },
    { card: card_get_bonus,      parent: `get_bonus_parent`          },
    { card: card_pay_bill,       parent: `paybill_parent`            },
    { card: card_transactions,   parent: `transaction_history_parent`},
];

const parentIds = cardMap.map( item => item.parent );





// .........................................................................................

// .........................................................................................









// .........................................................................................
// CUSTOM TOAST NOTIFICATION LOGIC STARTS
// .........................................................................................

/**
 * Function to display dynamic toast notifications.
 * @param {string} message - The text to be displayed.
 * @param {string} type - The type of alert ("success" or "error").
 * @param {number} time - Duration in milliseconds before it disappears.
 */
function showToast(message, type = "error", time = 3000) {
    
    // Selecting the toast container .......................................................... ( . )
    const alertContainer = document.getElementById('alert-container');

    // Determining background and text colors based on type ................................... ( . )
    const bgClass = type === "success" 
        ? "bg-violet-200 text-violet-500" 
        : "bg-red-200 text-red-500";

    // Injecting the toast HTML structure ..................................................... ( . )
    alertContainer.innerHTML = `
        <div class="toast toast-top toast-center">
            <div class="alert ${bgClass} border-none font-bold shadow-lg">
                <span>${message}</span>
            </div>
        </div>
    `;

    // Auto-remove the toast after the specified time .......................................... ( . )
    setTimeout(() => {
        alertContainer.innerHTML = "";
    }, time);
}

// .........................................................................................
// CUSTOM TOAST NOTIFICATION LOGIC ENDS
// .........................................................................................












// .........................................................................................
// FEATURE TOGGLING LOGIC STARTS
// .........................................................................................



// reset_screen with forEach
function reset_screen() {
    parentIds.forEach( id => document.getElementById(id).classList = "hidden" );
}

// Feature toggling with one loop!
cardMap.forEach(({ card, parent }) => {
    card.addEventListener("click", (e) => {
        e.preventDefault();
        reset_screen();
        document.getElementById(parent).classList = "block";
    });
});

// .........................................................................................
// FEATURE TOGGLING LOGIC ENDS                    
// .........................................................................................













// .........................................................................................
// ALL ACTION BUTTONS
// .........................................................................................


const btn_logout = document.getElementById(`btn_logout`);
const btn_add_money = document.getElementById(`btn_add_money`);
const btn_cashout = document.getElementById(`btn_cashout`);
const btn_send_money = document.getElementById(`btn_send_money`);
const btn_get_bonus = document.getElementById(`btn_get_bonus`);
const btn_paybill = document.getElementById(`btn_paybill`);

// .........................................................................................

// .........................................................................................











// .........................................................................................
// RESET FORM LOGIC
// .........................................................................................



function resetForm__Inputs(event) {
    const parent = document.getElementById(event.target.dataset.reset);
    if (!parent) return;
    parent.querySelectorAll('input').forEach(i => i.value = '');
    parent.querySelectorAll('select').forEach(s => s.selectedIndex = 0);
}



// .........................................................................................
//                                                                                         .
// .........................................................................................











// .........................................................................................
// ALL ACTION BUTTONS EVENT LISTENERS                                                      .
// .........................................................................................



function getValue(idName) {
    return document.getElementById(idName).value;
}


function notify(e, message, type = "error") {
    showToast(message, type);
    resetForm__Inputs(e);
}

function validateAddMoney(bank, account_number, add_amount) {
    if ( bank === "" || bank === "Select a Bank" ) return "Please Select a Bank!";
    if ( account_number.length !== 11 ) return "Invalid Account Number (Must be 11 digits)";
    if ( isNaN(add_amount) || add_amount <= 0 ) return "Enter a valid amount";
    return null;
}


function validateCashout( Agent_number, cashout_amount, cashout_add_pin ) {
    if ( Agent_number.length !== 11 ) return "Invalid Agent Number (Must be 11 digits)";
    if ( isNaN(cashout_amount) || cashout_amount <= 0 ) return "Enter a valid amount";
    if ( cashout_amount > parseInt( balanceEl.innerText ) ) return "Insufficient Balance!";
    return null;
}

function validateTransfer_Money( user_account_number, transfer_add_amount ) {
    if ( user_account_number.length !== 11 ) return "Invalid User Number (Must be 11 digits)";
    if (isNaN(transfer_add_amount) || transfer_add_amount <= 0) return "Enter a valid amount";
    if (transfer_add_amount > parseInt( balanceEl.innerText )) return "Insufficient Balance!";
    return null;
}

function validateGetBonus(coupon) {
    if (!coupon) return "Enter a coupon code!";
    if (!coupons[coupon.toUpperCase()]) return "Invalid Coupon!";
    return coupons[coupon.toUpperCase()];
}

function validatePayment( bill_selector, biller_account_number, paybill_amount ) {
    if ( bill_selector === "" || bill_selector === "Select" ) return "Select Payment Option!";
    if ( biller_account_number.length !== 11 ) return "Invalid Biller Account Number (Must be 11 digits)";
    if ( isNaN(paybill_amount) || paybill_amount <= 0 ) return "Enter a valid amount";
    if ( paybill_amount > parseInt( balanceEl.innerText ) ) return "Insufficient Balance!";
    return null;
}



btn_logout.addEventListener("click",
    (e) => {
        e.preventDefault();

        logout_alert_container.classList = "fixed bottom-5 inset-x-0 mx-auto z-50 w-max max-w-[90vw]"

        const btn_logout_cancel = document.getElementById(`btn_logout_cancel`);
        const btn_logout_ok = document.getElementById(`btn_logout_ok`);

        btn_logout_cancel.addEventListener("click", 
            (e) => {
                logout_alert_container.classList = "hidden fixed bottom-5 inset-x-0 mx-auto z-50 w-max max-w-[90vw]"
            }
        )

        btn_logout_ok.addEventListener("click", 
            (e) => {
                setTimeout(() => {
                    window.location.href = "./index.html";
                }, 500);
            }
        )
    }
)

document.addEventListener("click",
    (e) => {
        if(
            !logout_alert_container.contains(e.target) && 
            !btn_logout.contains(e.target)
        ) {
            logout_alert_container.classList = "hidden fixed bottom-5 inset-x-0 mx-auto z-50 w-max max-w-[90vw]"
        }
    }
) 


btn_add_money.addEventListener( "click",
    (e) => {
        e.preventDefault();
        
        const bank           =   getValue(`bank_selector`);
        const account_number =   getValue(`bank_account_number`);
        const add_amount     =   parseInt( getValue(`add_amount`) );
        const pin            =   getValue(`add_pin`);
        const data           =   { type: e.target.dataset.type, time: new Date().toLocaleString(), amount: add_amount }


        const error = validateAddMoney(bank, account_number, add_amount);

        if( error ) { notify (e, error); return; }

        if( pin !== '1234' ) { notify (e, "Invalid PIN!"); return; }

        balanceEl.innerText =  parseInt( balanceEl.innerText ) + add_amount;
        localStorage.setItem("balance", balanceEl.innerText)

        transactionData.push(data);

        localStorage.setItem("transactionData", JSON.stringify(transactionData));
        
        notify(e, "Money Added Successfully!", "success");   
    }
)



btn_cashout.addEventListener( "click",
    (e) => {
        e.preventDefault();
        
        const Agent_number     =   getValue(`agent_number`);
        const cashout_amount   =   parseInt( getValue(`cashout_amount`) );
        const cashout_add_pin  =   getValue(`cashout_add_pin`);
        const data             =   { type: e.target.dataset.type, time: new Date().toLocaleString(), amount: cashout_amount }
        
        
        const error = validateCashout( Agent_number, cashout_amount ); 
        
        if ( error ) { notify( e, error ); return; }
        
        
        if( cashout_add_pin !== '1234' ) { notify(e, "Invalid PIN!"); return; }
        
        
        balanceEl.innerText =  parseInt( balanceEl.innerText ) - cashout_amount;
        localStorage.setItem("balance", balanceEl.innerText)
        
        transactionData.push(data)

        localStorage.setItem("transactionData", JSON.stringify(transactionData));

        notify( e, "Cashout Successful!", "success" );
    }
)




btn_send_money.addEventListener( "click",
    (e) => {
        
        
        e.preventDefault();
        
        const user_account_number     =   getValue(`user_account_number`);
        const transfer_add_amount     =   parseInt( getValue(`transfer_add_amount`) );
        const transfer_add_pin        =   getValue(`transfer_add_pin`);
        const data                    =   { type: e.target.dataset.type, time: new Date().toLocaleString(), amount: transfer_add_amount }
        
        console.log(user_account_number, transfer_add_amount, transfer_add_pin);
        
        const error = validateTransfer_Money( user_account_number, transfer_add_amount );
        
        
        
        if( error ) { notify( e, error ); return; }
        
        if( transfer_add_pin !== '1234' ) { notify( e, "Invalid PIN!" ); return; }
        
        balanceEl.innerText =  parseInt( balanceEl.innerText ) - transfer_add_amount;
        localStorage.setItem("balance", balanceEl.innerText)
        
        transactionData.push(data);

        localStorage.setItem("transactionData", JSON.stringify(transactionData));

        notify( e, "Balance Transfer Successful!", "success");
    }
)






btn_get_bonus.addEventListener("click", (e) => {
    e.preventDefault();

    const coupon = getValue(`add_coupon`).trim();
    const result = validateGetBonus(coupon);
    
    if ( typeof result === "string") { notify( e, result ); return; }
    
    balanceEl.innerText = parseInt( balanceEl.innerText ) + result;
    localStorage.setItem("balance", balanceEl.innerText)
    
    const data   =   { type: e.target.dataset.type, time: new Date().toLocaleString(), amount: result }
    
    transactionData.push(data)

    localStorage.setItem("transactionData", JSON.stringify(transactionData));
    
    notify(e, `🎉 Bonus Added: ${result}`, "success");
});



btn_paybill.addEventListener( "click",
    (e) => {
        e.preventDefault();
        
        const bill_selector           =   getValue(`bill_selector`);
        const biller_account_number   =   getValue(`biller_account_number`);
        const paybill_amount          =   parseInt( getValue(`paybill_amount`) );
        const paybill_add_pin         =   getValue(`paybill_add_pin`);
        const data                    =   { type: e.target.dataset.type, bill: bill_selector, time: new Date().toLocaleString(), amount: paybill_amount }
        
        
        const error = validatePayment(bill_selector, biller_account_number, paybill_amount);
        
        if( error ) { notify (e, error); return; }
        
        if( paybill_add_pin !== '1234' ) { notify (e, "Invalid PIN!"); return; }
        
        balanceEl.innerText =  parseInt( balanceEl.innerText ) - paybill_amount;
        localStorage.setItem("balance", balanceEl.innerText)
        
        transactionData.push(data)
        
        localStorage.setItem("transactionData", JSON.stringify(transactionData));
        
        notify(e, "Payment Successful", "success");   
    }
)



card_transactions.addEventListener( "click",
    (e) => {
        e.preventDefault();

        const transaction_container = document.getElementById(`transaction_container`);

         transaction_container.innerHTML = "";

        transactionData.map( item => {
            console.log(item.type, item.time, item.amount)


            const transactionCardView = document.createElement("div");

            transactionCardView.innerHTML = `
                <div
                        class="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer group">
                        <div class="flex items-center gap-4">
                            <div
                                class="w-12 h-12 bg-gray-50 rounded-full flex justify-center items-center group-hover:bg-violet-50 transition-colors">
                                <img src="./assets/cards/transactions.svg" class="w-6 h-6" alt="icon">
                            </div>
                            <div>
                                <h3 class="text-lg font-bold text-gray-800"> 
                                     ${item.type === "Payment" ? item.bill + " - " + item.type + " " + item.amount + "tk" : item.type + " " + item.amount + "tk"}
                                </h3>
                                <p class="text-sm text-gray-400">${item.time}</p>
                            </div>
                        </div>

                        <button class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="text-gray-400" viewBox="0 0 16 16">
                                <path
                                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            </svg>
                        </button>
                        
                    </div>
            `

            transaction_container.appendChild(transactionCardView);
        } )
    }
)