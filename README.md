1) создаём новый репозиторий на гите
2) клонируем его на компьютер 
3) в склонированной папке устанавливаем create-react-app slack
4) устанавливаем модули
 firebase md5 react-redux react-router-dom redux redux-devtools-extension semantic-ui-css semantic-ui-react
 5) git checkout -b 'setupFairbase'
 6) создаем комппоненты Autoresation -> Login.js Registration.js + Root->Root.js все стаитфул компоненты. 
 7)В Root.js подключаем компоненты App Login Registration
  <Switch>
          <Route exact path='/' component = {App}/>
          <Route path='/login' component = {Login}/>
          <Route path='/registr' component = {Registration}/>
          {/* <Route path='/contact' render = {(props)=> <Contact {...props} text = {this.state.headerText}/>}/> */}
    </Switch>
 8) Комитим изменения в ветке (git add . git commit -m '', git push)
 9)создаем новую ветку git checkout -b 'registerForm'
 10) создаём форму регистрации с помощью библиотеки semantic-ui-css в файле Registration.js
        ( grid - grid.column Header Form -Form input, Button, Message )
 11) Комитим изменения в ветке (git add . git commit -m '', git push)
 12) создаём новую ветку git checkout -b registerUser



 

 grid - grid.column Header Form -Form input
