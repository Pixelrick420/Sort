var size;
const main = document.getElementById('main');
var array = [];
var issorted = false;
var issorting = false;

var shortwait = 10;
var longwait = 20;

document.getElementById('size').addEventListener('input', function() {
    if(!issorting){
        size = this.value;
        fill(size);
    }   
});

function fill(size){
    var nums = [4];
    var i = 0;
    while(i < size){
        nums.push(nums[i] + (1.1));
        i += 1;
    }   

    issorted = false;
    main.innerHTML = '';
    array = [];
    for(var i=0; i<size; i++){
        const member = document.createElement('div');
        array.push(member)
        member.className = 'arraymember';
        main.appendChild(member);
        var index = Math.floor((Math.random() * nums.length))
        member.style.height = nums[index].toString() + 'vh';
        nums.splice(index, 1);
    }
}

window.onload = function() {
    fill(30);
};

document.addEventListener('keydown', function(event) {
    if (event.key === ' ') { 
        if(!issorting){
            const algorithm = document.getElementById('options').value;
            sort(algorithm);
        }  
    }
    if (event.key === 'r') { 
        const size = document.getElementById('size').value;
        fill(size);
    }
});

async function sort(algorithm) {
    switch (algorithm) {
        case '1':
            await bubblesort();
            break;
        case '2':
            await insertionsort();
            break;
        case '3':
            array = await quicksort(array, 0, array.length - 1);
            break;
        case '4':
            await selectionsort();
            break;
        
    }
}

async function bubblesort() {
    issorting = true;
    if(!issorted){
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - 1 - i; j++) {
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
        issorted = true;
    }
    issorting = false;
}

async function swap(index1, index2) {
    [array[index1].style.height, array[index2].style.height] =
        [array[index2].style.height, array[index1].style.height];

    await new Promise(resolve => setTimeout(resolve, longwait));
}

async function insertionsort(){
    issorting = true;
    if(!issorted){
        for (let i = 1; i < array.length; i++) { 
            let j = i - 1;
            array[i].classList.add('selected');
            while (j >= 0 && parseFloat(array[j].style.height) > parseFloat(array[j + 1].style.height)) {
                await new Promise(resolve => setTimeout(resolve, shortwait));
                array[j].classList.add('selected');
                await swap(j, j + 1);
                array[j].classList.remove('selected');
                j--;
            }
            array[i].classList.remove('selected'); 
        }
        issorted = true;
    }
    issorting = false;
}

async function quicksort(array, left, right) {
    issorting = true;
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
    issorting = false;
}

async function partition(array, left, right, pivotIndex) {
    let pivotValue = parseFloat(array[pivotIndex].style.height);
    await swap(pivotIndex, right); 
    let partitionIndex = left;

    for (let i = left; i < right; i++) {
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
    if (issorting) return; 
    issorting = true; 

    for (let swapIndex = 0; swapIndex < array.length - 1; swapIndex++) {
        if (!issorting) break; 
        let minIndex = swapIndex;

        array[swapIndex].classList.add('pivot'); 
        for (let i = swapIndex + 1; i < array.length; i++) {
            if (!issorting) break; 

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

    issorting = false; 
}