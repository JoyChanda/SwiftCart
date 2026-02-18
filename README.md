# SwiftCart Premium E-Commerce

A premium, responsive e-commerce landing page built with HTML, Tailwind CSS, DaisyUI, and Vanilla JavaScript.

## 🚀 Features
- **Modern Premium Design**: Glassmorphism, vibrant gradients, and professional typography.
- **Dynamic Category Filtering**: Interactive category buttons with active state highlighting.
- **Responsive Layout**: Optimized for Desktop and Mobile views.
- **Built-in Animations**: Smooth transitions and hover effects.

## 🧰 Tech Stack
- **HTML5**
- **Tailwind CSS** (via CDN for immediate dev, config provided for build)
- **DaisyUI**
- **Vanilla JavaScript**

## 📂 File Structure
- `index.html`: Main structure and layout.
- `app.js`: Interactivity logic (category selection).
- `package.json`: Project dependencies and scripts.
- `tailwind.config.js`: Tailwind configuration.
- `src/input.css`: Main stylesheet with Tailwind directives.

## 🛠️ How to Run
1. Open `index.html` directly in any browser for an immediate preview (CDN version).
2. To use local development with Vite:
   - Run `npm install`
   - Run `npm run start`

## ✨ UI/UX Highlights
- **Active State Navigation**: Currently selected category is visually highlighted.
- **Micro-interactions**: Product cards scale on hover.
- **Premium Hero**: High-quality background image with clear CTA.

# JavaScript Q&A (Basic Concepts)

This repository contains some important JavaScript interview questions and answers.  
These questions cover fundamental topics like `null vs undefined`, `map() vs forEach()`, `== vs ===`, `async/await`, and `scope`.

---

## 📌 1) What is the difference between `null` and `undefined`?

### ✅ Answer:

### **Null**
`null` is a special value in JavaScript that represents the deliberate absence of any object value.

It is often used to:
- Indicate **"No Value"**
- Reset or clear variables
- Remove a reference from an object

Example:
```js
let user = null;
console.log(user); // null
```

---

### **Undefined**
`undefined` is a primitive value automatically assigned in JavaScript.

It occurs when:
- A variable is declared but not initialized
- A function does not return anything
- An object property does not exist

Example:
```js
let name;
console.log(name); // undefined
```

---

## 📌 2) What is the use of the `map()` function in JavaScript? How is it different from `forEach()`?

### ✅ Answer:

### **map()**
- Used to transform array elements
- Returns a **new array**
- Does not modify the original array

Example:
```js
let numbers = [1, 2, 3];
let doubled = numbers.map(num => num * 2);

console.log(doubled); // [2, 4, 6]
```

---

### **forEach()**
- Used to loop through array elements
- Does not return a new array
- Mostly used for logging, updating values, or performing operations

Example:
```js
let numbers = [1, 2, 3];

numbers.forEach(num => {
  console.log(num);
});
```

---

### 🔥 Key Difference
| Feature | map() | forEach() |
|--------|------|----------|
| Returns new array | ✅ Yes | ❌ No |
| Used for transformation | ✅ Yes | ❌ No |
| Used for side effects | ❌ Not recommended | ✅ Yes |

---

## 📌 3) What is the difference between `==` and `===`?

### ✅ Answer:

### **== (Double Equals)**
- Checks only value
- Performs type conversion (type coercion)

Example:
```js
console.log(2 == "2"); // true
```

---

### **=== (Triple Equals)**
- Checks both value and type
- Does not perform type conversion

Example:
```js
console.log(2 === "2"); // false
```

---

### 🔥 Key Difference
| Operator | Checks | Type Conversion |
|---------|--------|----------------|
| `==` | value only | ✅ Yes |
| `===` | value + type | ❌ No |

---

## 📌 4) What is the significance of `async/await` in fetching API data?

### ✅ Answer:

JavaScript supports asynchronous programming, which helps to create non-blocking applications.  
The `async` and `await` keywords make asynchronous code easier to read and write.

### Benefits of async/await:
- Cleaner and more readable code
- Avoids `.then()` chaining
- Easier error handling using `try/catch`

Example:
```js
async function fetchProducts() {
  try {
    let response = await fetch("https://fakestoreapi.com/products");
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error:", error);
  }
}

fetchProducts();
```

---

## 📌 5) Explain the concept of Scope in JavaScript (Global, Function, Block)

### ✅ Answer:

Scope defines the accessibility or visibility of variables in different parts of the code.  
It answers: **"Where can I use this variable?"**

JavaScript has three main types of scope:
- Global Scope
- Function Scope
- Block Scope

---

### 🌍 Global Scope
Variables declared outside any function or block have global scope variables.

Example:
```js
let userName = "Alice";

function greet() {
  console.log("Hello, " + userName);
}

greet(); // Hello, Alice
console.log(userName); // Alice
```

---

### 🔒 Function Scope
Variables declared inside a function are accessible only inside that function.

Example:
```js
function calculateTotal() {
  let price = 100;
  let tax = price * 0.1;
  let total = price + tax;
  console.log(total);
}

calculateTotal(); // 110
console.log(price); // Error: price is not defined
```

---

### 🧱 Block Scope
Variables declared using `let` or `const` inside `{ }` are only accessible within that block.

Example:
```js
if (true) {
  let message = "Hello";
  console.log(message); // Hello
}

console.log(message); // Error: message is not defined
```

---
