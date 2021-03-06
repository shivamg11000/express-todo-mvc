$(document).ready(function(){

  // enter todo and submit
  $('form').on('submit', function(){

      var item = $('form input');
      var todo = { item: item.val() }

      $.ajax({
        type: 'POST',
        url: `/user/${extractUserId(document.cookie)}/todos`,
        data: todo,
        success: function(todo){ 
          $("#todo-table ul").append(`<li>${todo.item}</li>`)
        }
      })

      return false
  })


  // click on the todo to delete it
  $(document).on('click', 'li', function(){
      var item = $(this).text().replace(/ /g, "-")
      
      $.ajax({
        type: 'DELETE',
        url: `/user/${extractUserId(document.cookie)}/todos/` + item,     // url like - '/todo/get-some-milk' 
        success: function(todo){
          let todos = []
          $("#todo-table ul li").each(function(){
            const todoVal = $(this).text()
            if ( todoVal != todo.item )
               todos.push(todoVal)
          })

          $("#todo-table ul").html(todos.map(todo => `<li>${todo}</li>`))
        }
      })

  })

  // logout user
  /*$('.logout').click(function(){
      $.ajax({
        type: 'POST',
        url: '/logout',
      })  
  })*/

})


function extractUserId(cookie){
  return  /.+?=(.+)/g.exec(cookie)[1]
}