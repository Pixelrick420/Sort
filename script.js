
var size;
const main = document.getElementById('main');
var array = [];
var issorted = false;
var issorting = false;
var stopSorting = false;

var shortwait = 10;
var longwait = 20;

document.getElementById('size').addEventListener('input', function() {
    if(!issorting){
        size = this.value;
        fill(size);
    }   
});

function fill(size){
    issorted = false;
    main.innerHTML = '';
    array = [];
    for(var i=0; i<size; i++){
        const member = document.createElement('div');
        array.push(member);
        member.className = 'arraymember';
        main.appendChild(member);
        member.style.height = Math.floor((Math.random() * 400 + 50)).toString() + 'px';
    }
    console.log(array.length);
}

window.onload = function() {
    fill(20);
};

async function sort(algorithm) {
    stopSorting = false;
    issorting = true;
    switch (algorithm) {
        case '1':
            await bubblesort();
            break;
        case '2':
            await insertionsort();
            break;
        case '3':
            await quicksort(array, 0, array.length - 1);
            break;
        case '4':
            await selectionsort();
            break;
    }
    issorting = false;
}

async function bubblesort() {
    if(!issorted){
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - 1 - i; j++) {
                if (stopSorting) return; 
                array[j].classList.add('selected');
                array[j + 1].classList.add('selected');
                await new Promise(resolve => setTimeout(resolve, shortwait)); 
                if (parseFloat(array[j + 1].style.height) < parseFloat(array[j].style.height)) {
                    await swap(j, j + 1);
                }
                array[j].classList.remove('selected');
                array[j + 1].classList.remove('selected');
            }
        }
    }
}

async function swap(index1, index2) {
    [array[index1].style.height, array[index2].style.height] =
        [array[index2].style.height, array[index1].style.height];

    await new Promise(resolve => setTimeout(resolve, longwait));
}

async function insertionsort(){
    if(!issorted){
        for (let i = 1; i < array.length; i++) { 
            let j = i - 1;
            array[i].classList.add('selected');
            while (j >= 0 && parseFloat(array[j].style.height) > parseFloat(array[j + 1].style.height)) {
                if (stopSorting){
                    for(i = 0; i < array.length; i++){
                        array[i].classList.remove('selected');
                    }
                    return; 
                } 
                await new Promise(resolve => setTimeout(resolve, shortwait));
                array[j].classList.add('selected');
                await swap(j, j + 1);
                array[j].classList.remove('selected');
                j--;
            }
            array[i].classList.remove('selected'); 
        }
    }
}

async function quicksort(array, left, right) {
    if (stopSorting) return; 

    if (left >= right) {
        return;
    }

    var pivotIndex = Math.floor(Math.random() * (right - left + 1)) + left;
    var pivotValue = parseFloat(array[pivotIndex].style.height);
    
    array[pivotIndex].classList.add('pivot');
    await new Promise(resolve => setTimeout(resolve, shortwait)); 

    let partitionIndex = await partition(array, left, right, pivotIndex);

    array[pivotIndex].classList.remove('pivot');

    await quicksort(array, left, partitionIndex - 1);
    await quicksort(array, partitionIndex + 1, right);
}

async function partition(array, left, right, pivotIndex) {
    if (stopSorting) return; 
    let pivotValue = parseFloat(array[pivotIndex].style.height);
    await swap(pivotIndex, right); 
    let partitionIndex = left;

    for (let i = left; i < right; i++) {
        if (stopSorting) return;
        array[i].classList.add('selected');
        if (parseFloat(array[i].style.height) < pivotValue) {
            await swap(i, partitionIndex);
            partitionIndex++;
        }
        await new Promise(resolve => setTimeout(resolve, shortwait)); 
        array[i].classList.remove('selected');
    }
    await swap(partitionIndex, right); 

    return partitionIndex;
}

async function selectionsort() {
    for (let swapIndex = 0; swapIndex < array.length - 1; swapIndex++) {
        if (stopSorting) break; 
        let minIndex = swapIndex;

        array[swapIndex].classList.add('pivot'); 
        for (let i = swapIndex + 1; i < array.length; i++) {
            if (stopSorting) break; 

            array[i].classList.add('selected'); 
            await new Promise(resolve => setTimeout(resolve, shortwait));

            if (parseFloat(array[i].style.height) < parseFloat(array[minIndex].style.height)) {
                array[minIndex].classList.remove('pivot');
                minIndex = i;
                array[minIndex].classList.add('pivot'); 
            }
            array[i].classList.remove('selected'); 

        }

        if (minIndex != swapIndex) {
            await swap(minIndex, swapIndex);
        }

        array[swapIndex].classList.remove('pivot');
        if (minIndex != swapIndex) {
            array[minIndex].classList.remove('pivot');
        }
    }
}

function sortorreset(){
    var span = document.getElementById('sortorreset');

    if(span.innerText == 'Sort'){
        span.innerText = 'Reset';
        if(!issorting){
            const algorithm = document.getElementById('options').value;
            sort(algorithm);
        }  

    } 
    else {
        span.innerText = 'Sort';
        stopSorting = true; 
        issorting = false;
        issorted = false;
        fill(document.getElementById('size').value);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const heading = document.getElementById('heading');
    const text = heading.innerText;
    const characters = text.split('');
    
    heading.innerHTML = '';
    characters.forEach((char, index) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.className = 'char';
        span.dataset.index = index;
        heading.appendChild(span);
    });

    const spans = Array.from(heading.children);
    spans.sort(() => Math.random() - 0.5);
    spans.forEach(span => heading.appendChild(span));

    async function sortHeading() {
        const spans = Array.from(heading.children);
        for (let i = 0; i < spans.length - 1; i++) {
            for (let j = 0; j < spans.length - 1 - i; j++) {
                const indexA = parseInt(spans[j].dataset.index);
                const indexB = parseInt(spans[j + 1].dataset.index);
                if (indexA > indexB) {
                    heading.insertBefore(spans[j + 1], spans[j]);
                    await new Promise(resolve => setTimeout(resolve, 1)); 
                    const temp = spans[j];
                    spans[j] = spans[j + 1];
                    spans[j + 1] = temp;
                }
            }
        }
    }

    sortHeading();
});
