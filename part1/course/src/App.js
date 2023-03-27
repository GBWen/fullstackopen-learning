const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
      <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
  )
}

const Header = (props) => {
  const {course} = props;
  return (
      <h1>
        {course}
      </h1>
  )
}

const Content = (props) => {
  const {parts} = props;
  return (
      <div>
        <p>
          {parts[0].name} {parts[0].exercises}
        </p>
        <p>
          {parts[1].name} {parts[1].exercises}
        </p>
        <p>
          {parts[2].name} {parts[2].exercises}
        </p>
      </div>
  )
}

const Total = (props) => {
  const {parts} = props;
  let total = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return (
      <p>
        Number of exercises {total}
      </p>
  )
}

export default App