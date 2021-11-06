function solve() {

    const label = document.querySelector('#info span');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    let stop = {
        next: 'depot'
    };

    async function depart() {
        //Get information about next stop
        //Display name of next stop

        departBtn.disabled = true;

        const url =`http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        const res = await fetch(url);
        stop = await res.json();
        
        label.textContent = `Next stop ${stop.name}`;

        //Activate other button
        arriveBtn.disabled = false;
    }

    async function arrive() {
        //Display name of current stop
        label.textContent = `Arriving at ${stop.name}`;

        //Activate other button
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();