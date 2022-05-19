let getId = id => document.getElementById(id);
let getSel = sel => document.querySelector(sel);

const startTimerCenter = getSel('.startTimerCenter');
const stopTimerCenter = getSel('.stopTimerCenter');
const resetTimerCenter = getSel('.resetTimerCenter');
const loopTimerCenter = getSel('.loopTimerCenter');

const hhCurrent = getSel('.hhCurrent');
const mmCurrent = getSel('.mmCurrent');
const ssCurrent = getSel('.ssCurrent');
const hhCenter = getSel('.hhCenter');
const mmCenter = getSel('.mmCenter');
const ssCenter = getSel('.ssCenter');ol
const resultCenter = getSel('.resultCenter');

const startTimerBottom = getSel('.startTimerBottom');
const stopTimerBottom = getSel('.stopTimerBottom');
const resetTimerBottom = getSel('.resetTimerBottom');

const mmBottom = getSel('.mmBottom');
const ssBottom = getSel('.ssBottom');
const minusMinute = getSel('.minusMinute');
const plusMinute = getSel('.plusMinute');
const setNumbersTimerBottom = getSel('.setNumbersTimerBottom');


let ssCenterValue = 0;
let mmCenterValue = 0;
let hhCenterValue = 0;
let mmSetBottomValue = 1;
let ssBottomValue = -1;
let mmBottomValue;
let isInitStart = true;
let idStartCenterTimer;
let idStartBottomTimer;


setInterval(() => {
    const d = new Date();
    let dd = d.getUTCDate();
    let month = d.getUTCMonth() + 1;
    let yy = d.getFullYear();
    let hh = d.getHours();
    let mm = d.getMinutes();
    let ss = d.getSeconds();
    if (dd < 10) dd = "0" + dd;
    if (month < 10) month = "0" + month;
    if (hh < 10) hh = "0" + hh;
    if (mm < 10) mm = "0" + mm;
    if (ss < 10) ss = "0" + ss;
    hhCurrent.textContent = hh;
    mmCurrent.textContent = mm;
    ssCurrent.textContent = ss;
    getSel('.currentDate').textContent = `${dd}.${month}.${yy}`;
});

startTimerCenter.onclick = function () {

    function startTimer() {
        ++ssCenterValue;
        if (ssCenterValue < 10) {
            ssCenter.textContent = '0' + ssCenterValue;

        } else if (ssCenterValue == 60) {
            ssCenter.textContent = '00';
            ssCenterValue = 0;
            mmCenterValue++;
            mmCenter.textContent = mmCenterValue + ' :';

            if (mmCenterValue < 10) {
                mmCenter.textContent = '0' + mmCenterValue;
            }

        } else {
            ssCenter.textContent = ssCenterValue;
        }

        if (mmCenterValue == 60) {
            mmCenter.textContent = '00';
            mmCenterValue = 0;
            hhCenterValue++;
            hhCenter.textContent = hhCenterValue + ' :';
        }
    }

    idStartCenterTimer = setInterval(startTimer, 1000);

}
stopTimerCenter.onclick = () => {
    clearInterval(idStartCenterTimer);
}
resetTimerCenter.onclick = () => {
    ssCenter.textContent = '00';
    ssCenterValue = 0;
    mmCenter.textContent = '00';
    mmCenterValue = 0;
    hhCenter.textContent = '00';
    hhCenterValue = 0;
    clearInterval(idStartCenterTimer);
}
loopTimerCenter.onclick = () => {
    ss = ssCenter.textContent;
    mm = mmCenter.textContent;
    hh = hhCenter.textContent;
    resultCenter.innerHTML += `<div>${hh}:${mm}:${ss}</div>`;

}

plusMinute.onclick = () => {
    mmSetBottomValue++;
    setNumbersTimerBottom.textContent = mmSetBottomValue;
}
minusMinute.onclick = () => {
    if (mmSetBottomValue > 0) {
        mmSetBottomValue--;
        setNumbersTimerBottom.textContent = mmSetBottomValue;
    }
}


startTimerBottom.onclick = () => {

    if (isInitStart) {
        mmBottomValue = mmSetBottomValue; 
        isInitStart = false;
    }

    if (mmBottomValue < 10) {
        mmBottom.textContent = '0' + mmBottomValue;
    } else {
        mmBottom.textContent = mmBottomValue;
    }

    function getSeconds() {
        if (ssBottomValue == -1) {
            ssBottomValue = 59;
            mmBottomValue--;
            return ssBottomValue;
        } else if (ssBottomValue < 10) {
            return '0' + ssBottomValue;
        } else {
            return ssBottomValue;
        }
    }

    function startTimer() {
        ssBottom.textContent = getSeconds();
        if (mmBottomValue < 10) {
            mmBottom.textContent = '0' + mmBottomValue;
        } else {
            mmBottom.textContent = mmBottomValue;
        }
        if (ssBottomValue == 0) {
            ssBottomValue = 60;
            if (mmBottomValue == 0) {
                clearInterval(idStartBottomTimer);
                return;
            }
            mmBottomValue--;
        }
        ssBottomValue--;
    }

    idStartBottomTimer = setInterval(startTimer, 1000);
}
stopTimerBottom.onclick = () => {
    clearInterval(idStartBottomTimer);
}

resetTimerBottom.onclick = () => {
    ssBottom.textContent = '00';
    ssBottomValue = -1;
    mmBottom.textContent = '00';
    isInitStart = true;
    clearInterval(idStartBottomTimer);
}