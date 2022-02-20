'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


const displayMovements = function(movements){
   containerMovements.innerHTML = ''
   let str = ''
   movements.forEach(function(mov,index){
     str = (mov > 0)? str="deposit" : str="withdrawal"
    let html = ` <div class="movements__row">
    <div class="movements__type movements__type--${str}">${index+1} ${str}</div>
    <div class="movements__value">${mov}€</div>
  </div>`
      containerMovements.insertAdjacentHTML('afterbegin',html)
   })
   
}



// How to update the balance?

const displayBalance = function(movements){
     let sum = 0;
      sum = movements.reduce(function(acc,curr){
         return acc+curr
     },0)
     labelBalance.textContent = sum
}


// We need also to generate the usernames for each account

const computeUsername = function(accounts){
    accounts.forEach(function(acc){
        let name = acc.owner.toLowerCase().split(' ').map(function(curr){
            return curr[0];
        })
        acc.username = name.join('')
    })
}

computeUsername(accounts)


// Now we need to retrieve the corresponding movements for each account


btnLogin.addEventListener('click',function(e){
    e.preventDefault();
    let userName = inputLoginUsername.value;
    let password = inputLoginPin.value;
    // now we need to loop over the accounts 
    // if one of the accounts match the username and password, then we need to display the movements and compute the balance
    let currentAccount = accounts.find((acc) => acc.username === userName);
    if(currentAccount?.pin === parseInt(password)){
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}!`
        containerApp.style.opacity = "1";
        inputLoginPin.value = inputLoginUsername.value = ''
        displayMovements(currentAccount.movements);
        displayBalance(currentAccount.movements);
        calculateSummary(currentAccount.movements);
    }
})



// These two can be combined and I need to calculate the interest 


const calculateSummary  =  function (movements){
    const deposit = movements.filter((mov) => mov > 0).reduce((a,b) => a+b)
    labelSumIn.textContent = `${deposit}€`
    const withdrawal = movements.filter((mov) => mov < 0).reduce((a,b) => a+b)
    labelSumOut.textContent = `${Math.abs(withdrawal)}€`
}

