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
var _CONTENT = [ 
	"software development", 
	"photography", 
	"filmmaking", 
	"product design",
    "UI/UX design"
];

// Current sentence being processed
var _PART = 0;

// Character number of the current sentence being processed 
var _PART_INDEX = 0;

// Holds the handle returned from setInterval
var _INTERVAL_VAL;

// Element that holds the text
var _ELEMENT = document.querySelector("#text");

// Cursor element 
var _CURSOR = document.querySelector("#cursor");

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
function Type() { 
	// Get substring with 1 characater added
	var text =  _CONTENT[_PART].substring(0, _PART_INDEX + 1);
	_ELEMENT.innerHTML = text;
	_PART_INDEX++;

	// If full sentence has been displayed then start to delete the sentence after some time
	if(text === _CONTENT[_PART]) {
		// Hide the cursor
		//_CURSOR.style.display = 'none';

		clearInterval(_INTERVAL_VAL);
		setTimeout(function() {
			_INTERVAL_VAL = setInterval(Delete, 50);
		}, 1000);
	}
}

/**
 * Function which implements the deleting effect for the typing animation.
 */
function Delete() {
	// Get substring with 1 characater deleted
	var text =  _CONTENT[_PART].substring(0, _PART_INDEX - 1);
	_ELEMENT.innerHTML = text;
	_PART_INDEX--;

	// If sentence has been deleted then start to display the next sentence
	if(text === '') {
		clearInterval(_INTERVAL_VAL);

		// If current sentence was last then display the first one, else move to the next
		if(_PART == (_CONTENT.length - 1))
			_PART = 0;
		else
			_PART++;
		
		_PART_INDEX = 0;

		// Start to display the next sentence after some time
		setTimeout(function() {
			_CURSOR.style.display = 'inline-block';
			_INTERVAL_VAL = setInterval(Type, 100);
		}, 200);
	}
}

// Start the typing effect on load
_INTERVAL_VAL = setInterval(Type, 100);

function getGreeting() {
  fetch('/data').then(response => response.text()).then((greeting) => {
    document.getElementById('greeting-container').innerText = greeting;
  });
}

/**
 * Function which fetches comments with a get request and appends it to a list.
 */
function getComments() {
  fetch('/data').then(response => response.json()).then((comment) => {
    const listElement = document.getElementById('comments-list');
    listElement.innerHTML = '';
    var i;
    for (i = 0; i < comment.length; i++) {
        listElement.appendChild(createListElement(comment[i]));
    }
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
