// Matrix Rain Effect
const canvas = document.getElementById('matrixRain');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Matrix rain characters
const text = "GD&D";
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = [];
let isPulsing = false;
let pulseValue = 0;
let pulseDirection = 1;

// Initialize drops
function initDrops() {
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
}
initDrops();

// Drawing the matrix rain
function drawMatrixRain() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate opacity based on pulsing state
    let opacity = isPulsing ? 0.5 + (pulseValue * 0.7) : 0.5;
    ctx.fillStyle = `rgba(255, 0, 0, ${opacity})`;
    ctx.font = fontSize + 'px PixelFont';

    // Update pulse value if pulsing
    if (isPulsing) {
        pulseValue += 0.02 * pulseDirection;
        if (pulseValue >= 1) {
            pulseDirection = -1;
        } else if (pulseValue <= 0) {
            pulseDirection = 1;
        }
    }

    for (let i = 0; i < drops.length; i++) {
        const char = text[Math.floor(Math.random() * text.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Animation loop
function animate() {
    drawMatrixRain();
    requestAnimationFrame(animate);
}

animate();

const categoryConfig = {
    gtav: {
        name: "GTA V",
        image: "Grand_Theft_Auto_V.png" // Replace with your GTA V image
    },
    minecraft: {
        name: "Minecraft",
        image: "f913145e0948bb00f52ef0573fa4bfff-l.webp" // Replace with your Minecraft image
    },
    godofwar: {
        name: "God of War",
        image: "a82494790f85450a2d5cb2137b3a4e87.webp" // Replace with your God of War image
    },
    battleroyale: {
        name: "Battle Royale",
        image: "81CNQe3zmEL.jpg" // Replace with your Battle Royale image
    }
};

// Categorized questions and answers
const questionsAndAnswers = {
    random: [], // Will be populated with questions from all categories
    gtav: [
        {
            question: "What city is GTA V set in?",
            answer: "Los Santos (based on Los Angeles)"
        },
        {
            question: "Who are the three main playable characters in GTA V?",
            answer: "Michael De Santa, Franklin Clinton, and Trevor Phillips"
        },
        {
            question: "What is the name of the in-game social media platform?",
            answer: "LifeInvader"
        },
        {
            question: "What is the name of Franklin's dog?",
            answer: "Chop"
        },
        {
            question: "What is the name of Trevor's company?",
            answer: "Trevor Phillips Enterprises (TPE)"
        },
        {
            question: "What is the biggest heist in GTA V's story mode?",
            answer: "The Union Depository Heist"
        },
        {
            question: "What vehicle does Michael drive at the start of the game?",
            answer: "Obey Tailgater (Audi-inspired sedan)"
        }
    ],
    minecraft: [
        {
            question: "What material do you need to make a Nether Portal?",
            answer: "Obsidian"
        },
        {
            question: "What hostile mob appears when you sleep in the Nether?",
            answer: "The bed explodes"
        },
        {
            question: "What do you need to craft a basic crafting table?",
            answer: "4 wooden planks"
        },
        {
            question: "What mob drops gunpowder?",
            answer: "Creeper"
        },
        {
            question: "How many pieces of iron do you need for a full set of armor?",
            answer: "24 iron ingots"
        },
        {
            question: "What happens if you shear a Mooshroom?",
            answer: "It turns into a regular cow"
        },
        {
            question: "What is the strongest natural block in Minecraft?",
            answer: "Obsidian"
        }
    ],
    godofwar: [
        {
            question: "What is the name of Kratos' son?",
            answer: "Atreus"
        },
        {
            question: "What is Kratos' signature weapon in God of War (2018)?",
            answer: "The Leviathan Axe"
        },
        {
            question: "What does Atreus' mother's name, Faye, turn out to be short for?",
            answer: "Laufey the Just"
        },
        {
            question: "What realm is God of War (2018) primarily set in?",
            answer: "Midgard"
        },
        {
            question: "What does Kratos call Atreus throughout most of the game?",
            answer: "Boy"
        },
        {
            question: "Who is the main antagonist in God of War (2018)?",
            answer: "Baldur"
        },
        {
            question: "What is the name of the World Serpent?",
            answer: "Jörmungandr"
        }
    ],
    battleroyale: [
        {
            question: "What is the name of the flying bus in Fortnite?",
            answer: "Battle Bus"
        },
        {
            question: "In PUBG, what do you need to revive a knocked teammate?",
            answer: "Nothing, just time and staying alive"
        },
        {
            question: "What is the maximum squad size in most Battle Royale games?",
            answer: "4 players"
        },
        {
            question: "What happens if you stay outside the play zone too long?",
            answer: "You take damage and eventually die"
        },
        {
            question: "What is the building material with the most health in Fortnite?",
            answer: "Metal"
        },
        {
            question: "In Apex Legends, what is the maximum team size?",
            answer: "3 players (trios)"
        },
        {
            question: "What's the name of Fortnite's in-game currency?",
            answer: "V-Bucks"
        }
    ]
};

// Populate random category with questions from all other categories
function populateRandomCategory() {
    questionsAndAnswers.random = [];
    for (let category in questionsAndAnswers) {
        if (category !== 'random') {
            questionsAndAnswers.random.push(...questionsAndAnswers[category]);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const pickButton = document.getElementById('pickButton');
    const loadingContainer = document.getElementById('loadingContainer');
    const questionContainer = document.getElementById('questionContainer');
    const questionBox = document.querySelector('.question-box');
    const showAnswerButton = document.getElementById('showAnswerButton');
    const questionText = document.getElementById('questionText');
    const answerText = document.getElementById('answerText');

    let currentCategory = null;
    let currentQuestion = null;
    let isAnimating = false;
    let usedQuestions = {};

    // Initialize used questions tracking for each category
    for (let category in questionsAndAnswers) {
        usedQuestions[category] = new Set();
    }

    // Populate random category
    populateRandomCategory();

    function fadeOut(element) {
        return new Promise(resolve => {
            element.style.opacity = '1';
            element.style.transition = 'opacity 0.5s ease';
            
            requestAnimationFrame(() => {
                element.style.opacity = '0';
                setTimeout(() => {
                    element.classList.add('hidden');
                    resolve();
                }, 500);
            });
        });
    }

    function fadeIn(element, delay = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                element.classList.remove('hidden');
                element.style.opacity = '0';
                element.style.transition = 'opacity 0.5s ease';
                
                requestAnimationFrame(() => {
                    element.style.opacity = '1';
                    setTimeout(resolve, 500);
                });
            }, delay);
        });
    }

    // Create and show category selection UI
function createCategoryButtons() {
    const categoryContainer = document.createElement('div');
    categoryContainer.className = 'category-container';
    
    // Create grid for main categories
    const categoryGrid = document.createElement('div');
    categoryGrid.className = 'category-grid';
    
    // Create main category buttons
    Object.entries(categoryConfig).forEach(([category, config]) => {
        const button = document.createElement('button');
        button.className = 'category-button';
        button.dataset.category = category;
        
        const img = document.createElement('img');
        img.src = config.image;
        img.alt = config.name;
        img.className = 'category-image';
        
        const overlay = document.createElement('div');
        overlay.className = 'category-overlay';
        overlay.textContent = config.name;
        
        button.appendChild(img);
        button.appendChild(overlay);
        button.addEventListener('click', () => selectCategory(category));
        
        categoryGrid.appendChild(button);
    });
    
    // Add grid to container
    categoryContainer.appendChild(categoryGrid);
    
    // Create random button in fixed container
    const randomButtonContainer = document.createElement('div');
    randomButtonContainer.className = 'random-button-container';
    
    const randomButton = document.createElement('button');
    randomButton.className = 'category-button random-button';
    randomButton.dataset.category = 'random';
    
    const randomOverlay = document.createElement('div');
    randomOverlay.className = 'category-overlay';
    randomOverlay.textContent = 'Random Question';
    
    randomButton.appendChild(randomOverlay);
    randomButton.addEventListener('click', () => selectCategory('random'));
    
    randomButtonContainer.appendChild(randomButton);
    categoryContainer.appendChild(randomButtonContainer);

    return categoryContainer;
}
    
    function getRandomQuestion(category) {
        // Reset used questions if all have been used
        if (usedQuestions[category].size === questionsAndAnswers[category].length) {
            usedQuestions[category].clear();
        }

        // Get available questions
        const availableQuestions = questionsAndAnswers[category].filter((_, index) => 
            !usedQuestions[category].has(index)
        );
        
        // Pick a random question
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const questionIndex = questionsAndAnswers[category].indexOf(availableQuestions[randomIndex]);
        
        // Mark question as used
        usedQuestions[category].add(questionIndex);
        
        return questionsAndAnswers[category][questionIndex];
    }

    async function selectCategory(category) {
        currentCategory = category;
        await startNewQuestion();
    }

    async function showCategorySelection() {
        const existingContainer = document.querySelector('.category-container');
        if (existingContainer) {
            await fadeOut(existingContainer);
            existingContainer.remove();
        }
        
        // Remove any existing post-answer buttons
        const existingButtons = document.querySelector('.post-answer-buttons');
        if (existingButtons) {
            await fadeOut(existingButtons);
            existingButtons.remove();
        }
        
        const categoryButtons = createCategoryButtons();
        document.querySelector('.container').appendChild(categoryButtons);
        return fadeIn(categoryButtons);
    }

    async function startNewQuestion() {
        if (isAnimating) return;
        isAnimating = true;

        // Reset card state and hide category buttons if they exist
        questionBox.classList.remove('flipped');
        const categoryContainer = document.querySelector('.category-container');
        if (categoryContainer) {
            categoryContainer.remove();
        }

        // Fade out current content
        await fadeOut(questionContainer);

        // Show loading animation
        await fadeIn(loadingContainer);
        
        // Wait for loading animation and pick new question
        await new Promise(resolve => setTimeout(resolve, 3000));
        currentQuestion = getRandomQuestion(currentCategory);
        
        // Update text content
        questionText.textContent = currentQuestion.question;
        answerText.textContent = currentQuestion.answer;

        // Hide loading, show question
        await fadeOut(loadingContainer);
        await fadeIn(questionContainer);
        
        // Start pulsing effect
        isPulsing = true;
        pulseValue = 0;
        pulseDirection = 1;
        
        isAnimating = false;
    }

    async function showPostAnswerButtons() {
        const existingButtons = document.querySelector('.post-answer-buttons');
        if (existingButtons) {
            existingButtons.remove();
        }

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'post-answer-buttons';

        const changeCategoryBtn = document.createElement('button');
        changeCategoryBtn.className = 'animated-button';
        changeCategoryBtn.textContent = 'Change Category';
        changeCategoryBtn.addEventListener('click', async () => {
            buttonContainer.remove();
            await showCategorySelection();
        });

        const nextQuestionBtn = document.createElement('button');
        nextQuestionBtn.className = 'animated-button';
        nextQuestionBtn.textContent = 'Next Question';
        nextQuestionBtn.addEventListener('click', async () => {
            buttonContainer.remove();
            await startNewQuestion();
        });

        buttonContainer.appendChild(changeCategoryBtn);
        buttonContainer.appendChild(nextQuestionBtn);
        document.querySelector('.container').appendChild(buttonContainer);
        return fadeIn(buttonContainer);
    }

    // Event listeners
    pickButton.addEventListener('click', () => {
        pickButton.classList.add('hidden');
        showCategorySelection();
    });

    showAnswerButton.addEventListener('click', async () => {
        if (isAnimating) return;
        isAnimating = true;

        isPulsing = false;
        questionBox.classList.add('flipped');
        
        await showPostAnswerButtons();
        
        isAnimating = false;
    });

    // Add smooth cursor effects
    document.addEventListener('mousemove', (e) => {
        const buttons = document.querySelectorAll('.animated-button');
        buttons.forEach(button => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });

    // Show initial pick button
    pickButton.classList.remove('hidden');
    pickButton.classList.add('slide-in');
});