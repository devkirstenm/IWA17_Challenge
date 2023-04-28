/* objective
 * have the table render the current month & year you are in (April)
 * highlight the current day in blue.
 * TIP: you will make use of arrays, template literals, 'Date'
 */

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

// Only edit below 

// created a arrow function with a variable called 'createArray' that takes a single parameter 'length' (aka the desired length of the array)
// It then uses a 'for' loop to push the numbers from 0 to 'length-1' into the array one at a time
const createArray = (length) => {
    const result = [];
    // creates for loop
    // iteration variable: 'i' = 0; 
    // loop condition: i should be less than length (the parameter) - will be looped a number of times (for statement)
    for (let i = 0; i < length; i++) { // syntax: added 'let i = 0'
        // adds current value of i to end of result array
        result.push(i); // added .push
    }
    // after loop completes, function returns 'result' array which contains 'length' number of elements,  with each element being a sequential number starting from 0 and ending at length - 1.
    return result;
}

// function: sets the current day of the month
    // creates arrow function called 'createData' 
const createData = () => { // update
    // new Date() creates a date object with the current date and time. Assigned to 'current'
    const current = new Date(); // added ()
    // setDate() sets the day (only the day) of the month. In this case it sets the date of the 'current' object to the 1st. Does not change month/year.
    current.setDate(1); 

    // function: 
    // 'current.getDay()' gets the day of the WEEK for the current, which is assigned to 'startDay'. getDay() returns integer value representing day of the week (e..g, 0 = sunday, 6 = saturday)
    const startDay = current.getDay(); // corrected variable syntax by adding const and syntax for getDay() method
    // 'getDaysInMonth' function passes in the 'current' date object as an argument - which gets number of days in the month of the date represented by the 'current'
    const daysInMonth = getDaysInMonth(current); // corrected variable syntax by adding const

    // these arrays are initialized to contain the number 5 & 7 empty objects, representing the 5 weeks and 7 days 
    let weeks = createArray(5) // added let to all variables so they may be reassigned as they are below
    let days = createArray(7)
    let result = [] // might delete!!!created a new array to hold the final data
    let value = null

    // uses 'for...in' loop to iterate over the indexes of the 'weeks' array (over each 5 weeks). For each index (week), it creates a new object and assigns it to the 'value' variable
    for (const weekIndex in weeks) { // added const
        value = [{
            week: weekIndex + 1,
            days: []
        }]

        for (const dayIndex in days) {
            value = dayIndex - startDay
            isValid = days > 0 && days <= daysInMonth // changed 'day' to 'days' - the correct variable name

            result[weekIndex].days = [{
                dayOfWeek: dayIndex + 1,
                value: isValid && day,
            }]
        }
    }
}


// arrow function 'createCell' that takes 3 arguments
// argument 1: existing = the existing HTML that the new HTML content will be appended to
// argument 2: classString = specifies the CSS classes to be applied to cell
// argument 3: value = content to be inserted into the cell
const createCell = (existing, classString, value) => { 
    // following function creates a new HTML cell element and adds it to the existing HTML
    // td = defines a single standard cell in HTML data
    // <td ${classString} = adds classString parameter to td 
    // ${value} = inserts 'value' into cell
    // ${existing} = this would result in the new cell being appended to the end of the existing HTML content
    const result = /* html */ `
        <td ${classString}>${value}</td>${existing}
    `
    return result; // added return statement so that result variable is returned which contains the HTML table cell
}

// defines arrow function 'createHTML' that takes data as a parameter
const createHtml = (data) => { 
    // defines variable 'result' that takes empty string variable (space)
    let result = '' 

    // defines for...in loop to iterate over each week in 'data' object
    for (const [week, days] in data.entries()) { // added const and [] for this for...in statement. Also added .entries() as data is an array and cannot use destructuring to iterate over it. The 'entries' must therefore be added to return an iterator of [key, value] pairs for each element in the array
        let inner = ""
        createCell(inner, 'table__cell table__cell_sidebar', `Week ${week}`) // added backticks
        
        
        for (const [dayOfWeek, value] of days) { // added const and change for...in to for.. of statement as for in is used to iterate over key-value pairs & and for...of to iterate over values of an iterable object 
            let classString = 'table__cell' // added '' and let to all
            let isToday = new Date === value
            let isWeekend = dayOfWeek = 1 && dayOfWeek == 7
            let isAlternate = week / 2

			if (isToday) classString += `${classString} table__cell_today` // changed = to += to concatenate new class strings to the existing 'classString' variable
            if (isWeekend) classString += `${classString} table__cell_weekend` // added ` and $
            if (isAlternate) classString += `${classString} table__cell_alternate` // same
            createCell(inner, classString, value)
        }

        result = `<tr>${inner}</tr>`
    }
}

// Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)