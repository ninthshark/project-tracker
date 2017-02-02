var cardController = (function() {

	var CreateProject = function(project_id, name, target) {
	this.project_id = project_id;
	this.name = name;
	this.target = target;
	// this.projectTask = [];
	};

	CreateProject.prototype.addProjectTask = function() {
		this.projectTask = [];
	};

	var ProjectTask = function(task_id, task, score) {
		this.task_id = task_id;
		this.task = task;
		this.score = score;
	};

	var projectData = {
		taskDetail : [],
		currentScore : 0
	};

	var allData = [];

	return {

		addProject: function(name,targetScore) {
		
			var ID, project;

			if (allData.length > 0) {
				ID = allData[allData.length - 1].project_id + 1;
			} else {
				ID = 0;
			}

			project = new CreateProject(ID, name, targetScore);
			allData.push(project);

			return project;
		},

		test: function() {
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
		formSubmit: '#form-submit'
	};



	return {

		getProjectInput: function() {
			return {
				name: document.querySelector(DOMstrings.projectName).value,
				targetScore: document.querySelector(DOMstrings.projectScore).value
			};
		},

		addProjectList: function(obj) {

			var element, html, newHtml;
			element = DOMstrings.projectList;
			html = '<li class="box" id="card%id%"><a class="card-open-project" href="#">%project-name%</a></li>';
			newHtml = html.replace('%id%', obj.project_id);
			newHtml = newHtml.replace('%project-name%',obj.name);
			document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
		},

		getDOMstrings: function() {
			return DOMstrings;
		}
	};

})();

var appController = (function(cardCtrl, UICtrl) {

	var setupEventListener = function() {

		var DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.projectList).addEventListener('click', function(event){
			var name = event.target.className;
			if (name === "card-create-new-project") {

				document.querySelector(DOM.popupNewProject).style.display = "block";

				// change type submit to just button to prevent page reload.
				document.querySelector(DOM.btnSubmit).addEventListener('click', addNewProject);
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

	var addNewProject = function() {
		var projectInput = UICtrl.getProjectInput();
		var newProject = cardCtrl.addProject(projectInput.name, projectInput.targetScore);
		UICtrl.addProjectList(newProject);

	}; 

	return {
		init: function() {
			console.log('Application has started!!!')
			return setupEventListener();
		}
	};
})(cardController,UIController);

appController.init();


var addProject = function(name,targetScore) {
	var ID, project;
	if (allData.length > 0) {
		ID = allData[allData.length - 1].project_id + 1;
	} else {
		ID = 0;
	}

	project = new CreateProject(ID, name, targetScore);
	allData.push(project);
	return project;
}; 

var addTask = function(task, score) {
	var ID, newProjectTask;

	if (projectData.taskDetail.length > 0) {
		ID = projectData.taskDetail[projectData.taskDetail.length - 1].task_id + 1;
	} else {
		ID = 0;
	}

	newProjectTask = new ProjectTask(ID, task, score);
	projectData.taskDetail.push(newProjectTask);
	return newProjectTask;

}

var addTaskToProject = function(projectID,task) {
	var projectIndex = allData.map(function(element) {
		return element.project_id;
	}).indexOf(projectID);

	allData[projectIndex].addProjectTask();
	// allData[projectIndex].projectTask.push(task);
};


// var newProject = addProject("Portfolio Website", 100);
// addProject("eCommerce for Heart foundation", 200);
// addProject("Friends iOS app about his life", 70);

// newProject.addProjectTask();
// allData[0].projectTask.push({task_id: 1, task: "Hello world", score: 2});

// var newTask = addTask("added new item", 2);
// var newTask1 = addTask("changed information", 1);
// allData.projectTask.push(newTask);
// addTaskToProject(0);
// addTaskToProject(0,newTask1);
// addTaskToProject(0,newTask);
// allData[0].projectTask.push(newTask);
// allData[0].projectTask.push(newTask1);
// console.log(newTask)
// console.log(projectData);
// console.log(allData);
// console.log(allData[0].projectTask[1]);
