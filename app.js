var cardController = (function() {

	var CreateProject = function(project_id, name, target) {
	this.project_id = project_id;
	this.name = name;
	this.target = target;
	this.projectTask = [];
	this.current_score = 0;
	};

	CreateProject.prototype.addProjectTask = function(task_id, task, score) {
		return {
			task_id: task_id,
			task: task,
			score: score
		}
	};

	var ProjectTask = function(task_id, task, score) {
		this.task_id = task_id;
		this.task = task;
		this.score = score;
	};

	// var projectData = {
	// 	taskDetail : [],
	// 	currentScore : 0
	// };

	var allData = [];
	/* 
	allData = [
		{
			project_id: 1,
		 	name: "Try Vegan for 30 days",
		 	target: 30,
		 	current_score: 6,
		 	projectTask: [
				{
					task_id: 0,
					task: "Get rid of meat",
					score: 3
				},
				{
					task_id: 1,
					task: "Buy veg",
					score: 3
				}
		 	]
		},
		{	project_id: 2,
		 	name: "Food Recipe",
		 	target: 7,
		 	current_score: 2,
		 	projectTask: [
				{
					task_id: 0,
					task: "Quinoa",
					score: 1
				},
				{
					task_id: 1,
					task: "Brocoli",
					score: 1
				}
		 	]
		}
	]
	*/


	var calculateScore = function(projectID) {
		var sum = 0;
		var pos = getProjectPos(projectID);
		for (var i=0, len=allData[pos].projectTask.length; i<len; i++) {
			sum += allData[pos].projectTask[i].score;
		}
		allData[pos].current_score = sum;
	};

	var getProjectPos = function(projectID) {
		var projectPos = allData.map(function(element) {
				return element.project_id;
			}).indexOf(projectID);
		return projectPos;
	}

	return {

		// creat a new project to project board

		addProject: function(name,targetScore) {
		
			var ID, project;

			if (allData.length > 0) {
				ID = allData[allData.length - 1].project_id + 1;
			} else {
				ID = 0;
			}

			project = new CreateProject(ID, name, targetScore);
			project.addProjectTask();
			
			allData.push(project);

			return project;
		},

		addTask: function(projectID, task, score) {
			var taskID, newProjectTask;

			var projectPos = getProjectPos(projectID);

			if (allData[projectPos].projectTask.length > 0) {
				taskID = allData[projectPos].projectTask[allData[projectPos].projectTask.length - 1].task_id + 1;
			} else {
				taskID = 0;
			}
			
			newProjectTask = new ProjectTask(taskID, task, score);
			allData[projectPos].projectTask.push(newProjectTask);
			calculateScore(projectID);
			return newProjectTask;

		},


		getProject: function(projectID) {
			var projectPos = allData.map(function(element) {
				return element.project_id;
			}).indexOf(projectID);

			return allData[projectPos];
		},

		testProject: function() {
			console.log(allData);
		}
	}

})();

//***************************************************************************************
//***************************** UI Controller *******************************************
//***************************************************************************************

var UIController = (function() {

	var DOMstrings = {
		btnNewProject: '.card-create-new-project',
		btnOpenProject: '.card-open-project',
		projectName: '.project-name',
		projectScore: '.target-score',
		btnSubmit: '.submit-project',
		popupNewProject: '#popup-card',
		projectList: '#project-list',
		formSubmit: '#form-submit',
		projectContent: '.project-content',
		projectTitle: '.project-title',
		targetScore: '.target-score-num',
		projectID: '#project-id',

		//project task
		taskEditor: '.task_editor',
		submitButton: '.myButton',
    	textAreaBox: '.task_text',
	    taskScore: '.score_box',
	    displayDescription: '.task_description',
	    displayScore: '.task_score',
	    displayTaskList: '.task_list',
	    currentScore: '.current_score_num'
	};



	return {

		// Get project name and target score from input
		getProjectInput: function() {
			return {
				name: document.querySelector(DOMstrings.projectName).value,
				targetScore: parseFloat(document.querySelector(DOMstrings.projectScore).value)
			};
		},
		// Add Project to the list
		addProjectToProjectList: function(obj) {

			var element, html, newHtml;
			element = DOMstrings.projectList;
			html = '<li class="box" ><a class="card-open-project" id="card-%id%" href="#">%project-name%</a></li>';
			newHtml = html.replace('%id%', obj.project_id);
			newHtml = newHtml.replace('%project-name%',obj.name);
			document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
		},

		addProjectTaskSection: function(obj) {

			document.querySelector(DOMstrings.projectTitle).textContent = obj.name;
			document.querySelector(DOMstrings.targetScore).textContent = obj.target;
			document.querySelector(DOMstrings.projectID).textContent = obj.project_id;
			document.querySelector(DOMstrings.currentScore).textContent = 0;
		},

		//********************* Project task detail******************************************
		//***********************************************************************************
		getInput: function() {

	      return {
	        task: document.querySelector(DOMstrings.textAreaBox).value,
	        score: parseFloat(document.querySelector(DOMstrings.taskScore).value)
      		};
     	},

     	addTaskItem: function(obj) {
     		var html, newHtml, element;
     		element = DOMstrings.displayTaskList
     		html = '<div class="task_item"><div class="task_description">%task description%</div><div class="task_score">%score%</div></div>'
     		newHtml = html.replace('%task description%',obj.task);
     		newHtml = newHtml.replace('%score%',obj.score);

     		document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
     	},

     	displayCurrentScore: function(obj) {
     		
     		document.querySelector('.current_score_num').textContent = obj.current_score;
     	},

     	clearField: function() {
		    var fields, fieldArr;
		    fields = document.querySelectorAll('.task_text' + ',' + '.score_box');
		    fieldArr = Array.prototype.slice.call(fields);
		    fieldArr.forEach(function(element,index){
		    	element.value = "";
		    });
		      fieldArr[0].focus();
		},

		clearProjectTask: function() {
			var fields, fieldsArr;
			fields = document.querySelectorAll(DOMstrings.displayDescription + ',' + DOMstrings.displayScore);
			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function(element, index) {
				element.textContent = "";
			});
		},

		displayProject: function(obj) {
			document.querySelector(DOMstrings.projectTitle).textContent = obj.name;
			document.querySelector(DOMstrings.projectID).textContent = obj.project_id;
			document.querySelector('.target-score-num').textContent = obj.target;
			document.querySelector('.current_score_num').textContent = obj.current_score;

			for (var i=0; i < obj.projectTask.length; i++) {
				document.querySelectorAll('.task_description')[i].textContent = obj.projectTask[i].task;
				document.querySelectorAll('.task_score')[i].textContent = obj.projectTask[i].score;
			}

		},


		getDOMstrings: function() {
			return DOMstrings;
		}
	};

})();


//**************************************************************************************************
//**************************** Application Controller **********************************************
//**************************************************************************************************

var appController = (function(cardCtrl, UICtrl) {
	var DOM = UICtrl.getDOMstrings();
	var setupEventListener = function() {

		

		document.querySelector(DOM.projectList).addEventListener('click', function(event){
			var name = event.target.id;
			console.log(name);
			if (name === "card") {

				document.querySelector(DOM.popupNewProject).style.display = "block";

				// change type submit to just button to prevent page reload.
				document.querySelector(DOM.btnSubmit).addEventListener('click', addNewProject);
				
			}
			else {
				var projectID = name.split('-')[1]
				var ID = parseFloat(projectID);
				var project = cardCtrl.getProject(ID);
				UICtrl.clearProjectTask();
				UICtrl.displayProject(project);
				
			}

		});
		// Listening on project task button
		// Listening to mouse click event on myButton
	    document.querySelector(DOM.submitButton).addEventListener('click', controlAddTask);

	    //Listening to enter key event
	    document.querySelector(DOM.taskEditor).addEventListener('keypress',function(event) {
	      if (event.keycode === 13 || event.which === 13) {
	          controlAddTask();
	      }
	    });

		

		cardToggle();

	};

	var cardToggle = function() {

		var popup = document.getElementById("book1");

		var popup_click = document.getElementById("popup-card");

		var popup_close = document.getElementsByClassName("close-popup")[0];

		// popup.onclick = function() {
		// 	popup_click.style.display = "block";
		// }

		popup_close.onclick = function() {
			popup_click.style.display = "none";
		}

		window.onclick = function(event) {
			if (event.target === popup_click) {
				popup_click.style.display = "none";
			}
		}
	};

	// Get input from project create page

	var addNewProject = function() {
		var projectInput = UICtrl.getProjectInput();
		var newProject = cardCtrl.addProject(projectInput.name, projectInput.targetScore);
		UICtrl.addProjectToProjectList(newProject);
	
		document.querySelector(DOM.projectContent).style.display = "block";
		UICtrl.addProjectTaskSection(newProject);
		UICtrl.clearProjectTask();

	};

	// Get project ID

	var getProjectID = function() {
		var ID = document.getElementById('project-id').textContent;
		return parseFloat(ID);
	}

	//**************** Project task ********************************
	var updateScore = function(projectID) {
		
	    var project = cardCtrl.getProject(projectID);

	    UICtrl.displayCurrentScore(project);
  	};

  	var controlAddTask = function() {
	    var input, newTask, projectID;
	    input = UICtrl.getInput();
	    console.log(input);
	    projectID = getProjectID();

	    if (input.task !== "" && !isNaN(input.score)) {
	      	newTask = cardCtrl.addTask(projectID,input.task,input.score);
	      	UICtrl.addTaskItem(newTask);
	      	updateScore(projectID);
	      	UICtrl.clearField();
	 	}

  	};

	return {
		init: function() {
			console.log('Application has started!!!')
			return setupEventListener();
		}
	};
})(cardController,UIController);

appController.init();