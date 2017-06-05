
// to do list that gets an input from the user and display it on the screen
//if clicked on it toggle the line through 
//delete 
class CreateTodo extends React.Component {

constructor(props) {
        super(props);

        this.state = {
            error: null
        };
    }

    renderError() {
        if (!this.state.error) { return null; }

        return <div style={{ color: 'red' }}>{this.state.error}</div>;
    }

    render() {
        return (
            <form onSubmit={this.handleCreate.bind(this)}>
                <input type="text" placeholder="What do I need to do?" ref="createInput" />
                <button>Create</button>
                {this.renderError()}
            </form>
        );
    }

    handleCreate(event) {
        event.preventDefault();

        const createInput = this.refs.createInput;
        const task = createInput.value;
        const validateInput = this.validateInput(task);

        if (validateInput) {
            this.setState({ error: validateInput });
            return;
        }

        this.setState({ error: null });
        this.props.createTask(task);
        this.refs.createInput.value = '';
    }

    validateInput(task) {
        if (!task) {
            return 'Please enter a task.';
        } else if (_.find(this.props.todos, todo => todo.task === task)) {
            return 'Task already exists.';
        } else {
            return null;
        }
    }
}












class TodoListItem extends React.Component {
 constructor(props) {
  super(props);

  this.state = {
      isEditing: false
  };
}

renderTaskSection() {
  const { task, isCompleted } = this.props;

  const taskStyle = {
      color: isCompleted ? 'green' : 'red',
      cursor: 'pointer'
  };

  if (this.state.isEditing) {
      return (
          <td>
              <form onSubmit={this.onSaveClick.bind(this)}>
                  <input type="text" defaultValue={task} ref="editInput" />
              </form>
          </td>
      );
  }

  return (
      <td style={taskStyle}
          onClick={this.props.toggleTask.bind(this, task)}
      >
          {task}
      </td>
  );
}

renderActionsSection() {
  if (this.state.isEditing) {
      return (
          <td>
              <button onClick={this.onSaveClick.bind(this)}>Save</button>
              <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
          </td>
      );
  }

  return (
      <td>
          <button onClick={this.onEditClick.bind(this)}>Edit</button>
          <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
      </td>
  );
}

render() {
  return (
      <tr>
          {this.renderTaskSection()}
          {this.renderActionsSection()}
      </tr>
  );
}

onEditClick() {
  this.setState({ isEditing: true });
}

onCancelClick() {
  this.setState({ isEditing: false });
}

onSaveClick(event) {
  event.preventDefault();

  const oldTask = this.props.task;
  const newTask = this.refs.editInput.value;
  this.props.saveTask(oldTask, newTask);
  this.setState({ isEditing: false });
}
}









var TodoListHeader = () => (
	<thead>
		<tr>
			<th>Task</th>
			<th>Action</th>
		</tr>
	</thead>
)











class TodoList extends React.Component {

	 renderItems() {
        const props = _.omit(this.props, 'todos');

        return _.map(this.props.todos, (todo, index) => <TodoListItem key={index} {...todo} {...props} />);
    }

    render() {
        return (
            <table>
                <TodoListHeader />
                <tbody>
                    {this.renderItems()}
                </tbody>
            </table>
        );
    }
}




var todos = [
	{
		task: "make dinner",
		isCompleted: false
	},
	{
		task:"Grocery",
		isCompleted: true
	}
];

//App
//========================
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos
		};
	}

	render() {
		return (
			<div>
				<h1>To Do List</h1>
				<CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)} />
				<TodoList 
					todos={this.state.todos}
					toggleTask={this.toggleTask.bind(this)}
          saveTask={this.saveTask.bind(this)}
          deleteTask={this.deleteTask.bind(this)}
				/>
			</div>
		);
	}
	toggleTask(task) {
		const foundTodo = _.find(this.state.todos, todo => todo.task === task);
    foundTodo.isCompleted = !foundTodo.isCompleted;
    this.setState({ todos: this.state.todos });
	}
	
	createTask(task) {
		this.state.todos.push({
            task,
            isCompleted: false
        });
        this.setState({ todos: this.state.todos });
	}
	saveTask(oldTask, newTask) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
        foundTodo.task = newTask;
        this.setState({ todos: this.state.todos });
    }

    deleteTask(taskToDelete) {
        _.remove(this.state.todos, todo => todo.task === taskToDelete);
        this.setState({ todos: this.state.todos });
    }
	
}



ReactDOM.render(<App />, document.getElementById('app'));
