//variables
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const clearButton = document.querySelector('.clear');

//functions
function timer(seconds){
    //clear existing timers
    clearInterval(countdown);

    //start new timer
    const now = Date.now();
    const then = now + seconds * 1000;
    
    displayTimeLeft(seconds);
    displayEndTime(then);

    //timer function
    //important: setInterval does not start immediately, waits 1 second before starting
    countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    //stop timer so no negative values
    if (secondsLeft < 0){
        clearInterval(countdown);
        return
    }

    displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds){
    let remainder = seconds;
    const hrs = Math.floor(seconds / 3600);
    remainder = remainder % 3600;
    const mins = Math.floor(remainder / 60);
    remainder = remainder % 60;

    const display = `${hrs < 10 ? (hrs === 0? '' : '0') : ''}${hrs === 0 ? '' : hrs + ':'}${mins < 10 ? '0' : ''}${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hr = end.getHours();
    const min = end.getMinutes();
    endTime.textContent = `Be Back at ${hr > 12 ? (hr-12) : hr}:${min < 10 ? '0': ''}${min}`;
}

function startTimer(){
    const time = parseInt(this.dataset.time);
    timer(time);
}

//event listeners
buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});

clearButton.addEventListener('click',()=>{
    timer(0);
    endTime.textContent = '';
});