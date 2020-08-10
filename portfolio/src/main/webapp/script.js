// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// List of sentences
const content = [ 
  "software development", 
  "photography", 
  "filmmaking", 
  "product design",
  "UI/UX design"
];

// Current sentence being processed
var part = 0;

// Character number of the current sentence being processed 
var partIndex = 0;

// Holds the handle returned from setInterval
var intervalVal;

// Element that holds the text
var element = document.querySelector("#text");

// Cursor element 
var cursor = document.querySelector("#cursor");

/**
 * Adds a random greeting to the page.
 */
function addRandomFact() {
  const facts =
      ["I'm doing a degree in Classical Piano Performance.", 'Yogurt soju is my favourite drink.', 'I play foosball during all my breaks.', "I'm open to any discussion about geopolitics."];

  // Pick a random greeting.
  const fact = facts[Math.floor(Math.random() * facts.length)];

  // Add it to the page.
  const factContainer = document.getElementById('fact-container');
  factContainer.innerText = fact;
}

/**
 * Function which implements the typing animation.
 */
function type() { 
  // Get substring with 1 characater added
  var text =  content[part].substring(0, partIndex + 1);
  element.innerHTML = text;
  partIndex++;

  // If full sentence has been displayed then start to delete the sentence after some time
  if(text === content[part]) {
    // Hide the cursor
    //cursor.style.display = 'none';

    clearInterval(intervalVal);
    setTimeout(function() {
      intervalVal = setInterval(deleting, 50);
    }, 1000);
}
}

/**
 * Function which implements the deleting effect for the typing animation.
 */
function deleting() {
  // Get substring with 1 characater deleted
  var text =  content[part].substring(0, partIndex - 1);
  element.innerHTML = text;
  partIndex--;

  // If sentence has been deleted then start to display the next sentence
  if(text === '') {
    clearInterval(intervalVal);

    // If current sentence was last then display the first one, else move to the next
    if(part== (content.length - 1))
        part= 0;
    else
        part++;
    
    partIndex = 0;

    // Start to display the next sentence after some time
    setTimeout(function() {
        cursor.style.display = 'inline-block';
        intervalVal = setInterval(type, 100);
    }, 200);
  }
}

// Start the typing effect on load
intervalVal = setInterval(type, 100);

function getGreeting() {
  fetch('/data').then(response => response.text()).then((greeting) => {
    document.getElementById('greeting-container').innerText = greeting;
  });
}

/**
 * Function which fetches comments with a get request and appends it to a list.
 */
function getComments() {
  fetch('/data').then(response => response.text()).then((comment) => {
    const listElement = document.getElementById('comments-list');
    const commentList = JSON.parse(comment);
    listElement.innerHTML = '';
    commentList.forEach((comment) => {
        listElement.appendChild(createListElement(comment.firstName + " " + comment.lastName + " : " + comment.comment + " ( sentiment score: " + comment.score + " )"));
    })
  });
}

/**
 * Creates list elements for listing comments
 */
function createListElement(comment) {
  const liElement = document.createElement('li');
  liElement.innerText = comment;
  return liElement;
}

/**
 * Function that handles submitting the form and resetting the values in the comment forms fields.
 * It returns false so that the current page does not refresh.
 */
function submitForm() {
   var frm = document.getElementsByName('comment-form')[0];
   frm.submit();
   frm.reset();  
   return false;
}