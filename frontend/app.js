const operationSelect = document.getElementById('operation');
const aInput = document.getElementById('a');
const bInput = document.getElementById('b');
const calculatorForm = document.getElementById('calculator');
const resultDisplay = document.getElementById('result');

// Update placeholder and visibility based on selected operation
operationSelect.addEventListener('change', () => {
    const selectedOperation = operationSelect.value;

    if (['sin', 'cos', 'tan'].includes(selectedOperation)) {
        bInput.style.display = 'none'; // Hide second input
        bInput.value = ''; // Clear any existing value
        aInput.placeholder = 'Enter degree'; // Update placeholder
    } else {
        bInput.style.display = ''; // Show second input for arithmetic operations
        aInput.placeholder = 'Enter the first number'; // Default placeholder
        bInput.placeholder = 'Enter the second number'; // Placeholder for second input
    }
});

// Handle form submission
calculatorForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const a = parseFloat(aInput.value);
    const bInputValue = bInput.value;
    const b = bInputValue ? parseFloat(bInputValue) : null; // Use null if b is not provided
    const operation = operationSelect.value;

    // Input validation for arithmetic and trigonometric operations
    if (
        isNaN(a) || 
        (['add', 'subtract', 'multiply', 'divide'].includes(operation) && isNaN(b))
    ) {
        resultDisplay.innerText = "Error: Please provide valid inputs.";
        return;
    }

    const data = { operation: operation, a: a, b: b };

    const response = await fetch('http://127.0.0.1:5000/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.result) {
        resultDisplay.innerHTML = ""; // Clear previous result
        if (['sin', 'cos', 'tan'].includes(operation)) {
            katex.render(result.result, resultDisplay); // Render LaTeX for trigonometric results
        } else {
            resultDisplay.innerText = `Result: ${result.result}`; // Plain text for arithmetic results
        }
    } else {
        resultDisplay.innerText = `Error: ${result.error}`;
    }
});
